import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import {
  getProcessById,
  updateProcess,
  deleteProcess,
} from '@/lib/services/processService';
import { updateProcessSchema } from '@/lib/validators/process.schema';
import { withErrorHandling } from '@/lib/errors/errorHandler';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    const { id } = await params;
    const process = await getProcessById(id, user.id);
    return NextResponse.json(process);
  })(request);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    const { id } = await params;
    const body = await request.json();
    
    // Validar input
    const validated = updateProcessSchema.parse(body);
    
    // Atualizar processo
    const process = await updateProcess(id, user.id, validated);
    return NextResponse.json(process);
  })(request);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    const { id } = await params;
    await deleteProcess(id, user.id);
    return NextResponse.json({ success: true }, { status: 200 });
  })(request);
}

