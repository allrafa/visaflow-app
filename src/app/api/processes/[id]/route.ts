import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import {
  getProcessById,
  updateProcess,
  deleteProcess,
} from '@/lib/services/processService';
import { updateProcessSchema } from '@/lib/validators/process.schema';
import { withErrorHandling } from '@/lib/errors/errorHandler';
import { logActivity } from '@/lib/services/activityService';

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

    // Registrar atividade
    await logActivity({
      processId: id,
      userId: user.id,
      userName: user.email,
      action: 'PROCESS_UPDATED',
      entityType: 'process',
      entityId: id,
      entityName: process.title,
      description: `${user.email} atualizou o processo: ${process.title}`,
    });

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

    // Buscar info do processo ANTES de deletar
    const process = await getProcessById(id, user.id);

    // Registrar atividade ANTES de deletar
    await logActivity({
      processId: id,
      userId: user.id,
      userName: user.email,
      action: 'PROCESS_DELETED',
      entityType: 'process',
      entityId: id,
      entityName: process.title,
      description: `${user.email} deletou o processo: ${process.title}`,
    });

    await deleteProcess(id, user.id);
    return NextResponse.json({ success: true }, { status: 200 });
  })(request);
}

