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
    
    await deleteCriteria(id);
    return NextResponse.json({ success: true }, { status: 200 });
  })(request);
}



