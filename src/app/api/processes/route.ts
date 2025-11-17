import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { createProcess, getProcessesByUserId } from '@/lib/services/processService';
import { createProcessSchema } from '@/lib/validators/process.schema';
import { withErrorHandling } from '@/lib/errors/errorHandler';
import { ensureUserExists } from '@/lib/auth/ensureUserExists';
import { z } from 'zod';
import { logActivity } from '@/lib/services/activityService';

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    await ensureUserExists(user);
    const processes = await getProcessesByUserId(user.id);
    return NextResponse.json(processes);
  })(request);
}

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();

    // Ensure user exists in public.users table
    await ensureUserExists(user);

    const body = await request.json();

    // Validar input
    const validated = createProcessSchema.parse(body);

    // Criar processo
    const process = await createProcess({
      userId: user.id,
      ...validated,
    });

    // Registrar atividade
    await logActivity({
      processId: process.id,
      userId: user.id,
      userName: user.email,
      action: 'PROCESS_CREATED',
      entityType: 'process',
      entityId: process.id,
      entityName: process.title,
      description: `${user.email} criou o processo: ${process.title}`,
    });

    return NextResponse.json(process, { status: 201 });
  })(request);
}

