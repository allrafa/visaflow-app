import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getLetterById, updateLetter, deleteLetter } from '@/lib/services/letterService';
import { withErrorHandling } from '@/lib/errors/errorHandler';
import { updateLetterSchema } from '@/lib/validators/letter.schema';
import { ensureOwnership } from '@/lib/auth/getAuthUser';

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
    
    await deleteLetter(id);
    
    return NextResponse.json({ success: true });
  })(request);
}



