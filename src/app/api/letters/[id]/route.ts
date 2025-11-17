import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getLetterById, updateLetter, deleteLetter } from '@/lib/services/letterService';
import { withErrorHandling } from '@/lib/errors/errorHandler';
import { updateLetterSchema } from '@/lib/validators/letter.schema';
import { ensureOwnership } from '@/lib/auth/getAuthUser';
import { logActivity } from '@/lib/services/activityService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    const { id } = await params;
    
    const letter = await getLetterById(id);
    
    // Verificar ownership através do processo
    await ensureOwnership(user.id, letter.process.userId, 'process');
    
    return NextResponse.json(letter);
  })(request);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    const { id } = await params;

    const letter = await getLetterById(id);

    // Verificar ownership através do processo
    await ensureOwnership(user.id, letter.process.userId, 'process');

    const body = await request.json();
    const validated = updateLetterSchema.parse(body);

    const updated = await updateLetter(id, validated);

    // Registrar atividade baseada no status
    const wasSigned = letter.status !== 'signed' && validated.status === 'signed';
    const wasFinal = letter.status !== 'final' && validated.status === 'final';

    if (wasSigned) {
      await logActivity({
        processId: letter.process.id,
        userId: user.id,
        userName: user.email,
        action: 'LETTER_SIGNED',
        entityType: 'letter',
        entityId: id,
        entityName: letter.recommenderName,
        description: `${user.email} recebeu a carta assinada de ${letter.recommenderName}`,
      });
    } else if (wasFinal) {
      await logActivity({
        processId: letter.process.id,
        userId: user.id,
        userName: user.email,
        action: 'LETTER_FINALIZED',
        entityType: 'letter',
        entityId: id,
        entityName: letter.recommenderName,
        description: `${user.email} finalizou a carta de recomendação de ${letter.recommenderName}`,
      });
    } else {
      await logActivity({
        processId: letter.process.id,
        userId: user.id,
        userName: user.email,
        action: 'LETTER_UPDATED',
        entityType: 'letter',
        entityId: id,
        entityName: letter.recommenderName,
        description: `${user.email} atualizou a carta de recomendação de ${letter.recommenderName}`,
      });
    }

    return NextResponse.json(updated);
  })(request);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    const { id } = await params;

    const letter = await getLetterById(id);

    // Verificar ownership através do processo
    await ensureOwnership(user.id, letter.process.userId, 'process');

    // Registrar atividade ANTES de deletar
    await logActivity({
      processId: letter.process.id,
      userId: user.id,
      userName: user.email,
      action: 'LETTER_DELETED',
      entityType: 'letter',
      entityId: id,
      entityName: letter.recommenderName,
      description: `${user.email} removeu a carta de recomendação de ${letter.recommenderName}`,
    });

    await deleteLetter(id);

    return NextResponse.json({ success: true });
  })(request);
}



