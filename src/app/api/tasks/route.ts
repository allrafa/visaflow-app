import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { createTask, getTasksByProcessId } from '@/lib/services/taskService';
import { createTaskSchema } from '@/lib/validators/task.schema';
import { withErrorHandling } from '@/lib/errors/errorHandler';
import { getProcessById } from '@/lib/services/processService';

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    const { searchParams } = new URL(request.url);
    const processId = searchParams.get('processId');
    const phase = searchParams.get('phase');

    if (!processId) {
      return NextResponse.json(
        { error: 'processId is required' },
        { status: 400 }
      );
    }

    // Verificar ownership
    await getProcessById(processId, user.id);

    const tasks = await getTasksByProcessId(
      processId,
      phase as any || undefined
    );
    return NextResponse.json(tasks);
  })(request);
}

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    const body = await request.json();
    
    // Validar input
    const validated = createTaskSchema.parse(body);
    
    // Verificar ownership do processo
    await getProcessById(validated.processId, user.id);
    
    // Criar task
    const task = await createTask(validated);
    
    return NextResponse.json(task, { status: 201 });
  })(request);
}

