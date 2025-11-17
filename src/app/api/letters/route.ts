import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { createLetter, getLettersByProcessId } from '@/lib/services/letterService';
import { getProcessById } from '@/lib/services/processService';
import { withErrorHandling } from '@/lib/errors/errorHandler';
import { createLetterSchema } from '@/lib/validators/letter.schema';
import { z } from 'zod';
import { logActivity } from '@/lib/services/activityService';

const getLettersSchema = z.object({
  processId: z.string().uuid('Invalid process ID'),
});

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    
    const { searchParams } = new URL(request.url);
    const processId = searchParams.get('processId');
    
    if (!processId) {
      return NextResponse.json(
        { error: 'processId is required' },
        { status: 400 }
      );
    }

    // Verificar ownership do processo
    await getProcessById(processId, user.id);
    
    const letters = await getLettersByProcessId(processId);
    
    return NextResponse.json(letters);
  })(request);
}

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();

    const body = await request.json();
    const validated = createLetterSchema.parse(body);

    // Verificar ownership do processo
    await getProcessById(validated.processId, user.id);

    const letter = await createLetter(validated);

    // Registrar atividade
    await logActivity({
      processId: validated.processId,
      userId: user.id,
      userName: user.email,
      action: 'LETTER_CREATED',
      entityType: 'letter',
      entityId: letter.id,
      entityName: letter.recommenderName,
      description: `${user.email} criou a carta de recomendação de ${letter.recommenderName}`,
    });

    return NextResponse.json(letter, { status: 201 });
  })(request);
}



