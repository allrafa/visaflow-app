import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { createCriteria, getCriteriaByProcessId } from '@/lib/services/criteriaService';
import { createCriteriaSchema } from '@/lib/validators/criteria.schema';
import { withErrorHandling } from '@/lib/errors/errorHandler';
import { getProcessById } from '@/lib/services/processService';
import { logActivity } from '@/lib/services/activityService';

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

    // Verificar ownership
    await getProcessById(processId, user.id);

    const criteria = await getCriteriaByProcessId(processId);
    return NextResponse.json(criteria);
  })(request);
}

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    const body = await request.json();

    // Validar input
    const validated = createCriteriaSchema.parse(body);

    // Verificar ownership do processo
    await getProcessById(validated.processId, user.id);

    // Criar critério
    const criteria = await createCriteria(validated);

    // Registrar atividade
    await logActivity({
      processId: validated.processId,
      userId: user.id,
      userName: user.email,
      action: 'CRITERIA_CREATED',
      entityType: 'criteria',
      entityId: criteria.id,
      entityName: `${criteria.criteria}`,
      description: `${user.email} adicionou o critério: ${criteria.criteria}`,
    });

    return NextResponse.json(criteria, { status: 201 });
  })(request);
}



