import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import {
  getTaskById,
  updateTask,
  deleteTask,
} from '@/lib/services/taskService';
import { updateTaskSchema } from '@/lib/validators/task.schema';
import { withErrorHandling } from '@/lib/errors/errorHandler';
import { getProcessById } from '@/lib/services/processService';
import { logActivity } from '@/lib/services/activityService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    const { id } = await params;
    const task = await getTaskById(id);
    
    // Verificar ownership através do processo
    await getProcessById(task.process.id, user.id);
    
    return NextResponse.json(task);
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
    const validated = updateTaskSchema.parse(body);

    // Verificar ownership
    const task = await getTaskById(id);
    await getProcessById(task.process.id, user.id);

    // Atualizar task
    const updatedTask = await updateTask(id, validated);

    // Registrar atividade
    const wasCompleted = task.status !== 'COMPLETED' && validated.status === 'COMPLETED';
    if (wasCompleted) {
      // Log tarefa completada
      await logActivity({
        processId: task.process.id,
        userId: user.id,
        userName: user.email,
        action: 'TASK_COMPLETED',
        entityType: 'task',
        entityId: id,
        entityName: task.title,
        description: `${user.email} completou a tarefa: ${task.title}`,
      });
    } else {
      // Log tarefa atualizada
      await logActivity({
        processId: task.process.id,
        userId: user.id,
        userName: user.email,
        action: 'TASK_UPDATED',
        entityType: 'task',
        entityId: id,
        entityName: task.title,
        description: `${user.email} atualizou a tarefa: ${task.title}`,
      });
    }

    return NextResponse.json(updatedTask);
  })(request);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    const { id } = await params;

    // Verificar ownership
    const task = await getTaskById(id);
    await getProcessById(task.process.id, user.id);

    // Registrar atividade ANTES de deletar
    await logActivity({
      processId: task.process.id,
      userId: user.id,
      userName: user.email,
      action: 'TASK_DELETED',
      entityType: 'task',
      entityId: id,
      entityName: task.title,
      description: `${user.email} deletou a tarefa: ${task.title}`,
    });

    await deleteTask(id);
    return NextResponse.json({ success: true }, { status: 200 });
  })(request);
}

