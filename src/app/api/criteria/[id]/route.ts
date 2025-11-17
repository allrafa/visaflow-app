import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import {
  getCriteriaById,
  updateCriteria,
  deleteCriteria,
} from '@/lib/services/criteriaService';
import { updateCriteriaSchema } from '@/lib/validators/criteria.schema';
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
    const criteria = await getCriteriaById(id);
    
    // Verificar ownership através do processo
    await getProcessById(criteria.process.id, user.id);
    
    return NextResponse.json(criteria);
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
    const validated = updateCriteriaSchema.parse(body);

    // Verificar ownership
    const criteria = await getCriteriaById(id);
    await getProcessById(criteria.process.id, user.id);

    // Atualizar critério
    const updatedCriteria = await updateCriteria(id, validated);

    // Registrar atividade
    const wasValidated = !criteria.validationScore && validated.validationScore;
    if (wasValidated) {
      // Log validação de critério
      await logActivity({
        processId: criteria.process.id,
        userId: user.id,
        userName: user.email,
        action: 'CRITERIA_VALIDATED',
        entityType: 'criteria',
        entityId: id,
        entityName: `${criteria.criteria}`,
        description: `${user.email} validou o critério: ${criteria.criteria}`,
        metadata: { validationScore: validated.validationScore },
      });
    } else {
      // Log atualização de critério
      await logActivity({
        processId: criteria.process.id,
        userId: user.id,
        userName: user.email,
        action: 'CRITERIA_UPDATED',
        entityType: 'criteria',
        entityId: id,
        entityName: `${criteria.criteria}`,
        description: `${user.email} atualizou o critério: ${criteria.criteria}`,
      });
    }

    return NextResponse.json(updatedCriteria);
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
    const criteria = await getCriteriaById(id);
    await getProcessById(criteria.process.id, user.id);

    // Registrar atividade ANTES de deletar
    await logActivity({
      processId: criteria.process.id,
      userId: user.id,
      userName: user.email,
      action: 'CRITERIA_DELETED',
      entityType: 'criteria',
      entityId: id,
      entityName: `${criteria.criteria}`,
      description: `${user.email} removeu o critério: ${criteria.criteria}`,
    });

    await deleteCriteria(id);
    return NextResponse.json({ success: true }, { status: 200 });
  })(request);
}



