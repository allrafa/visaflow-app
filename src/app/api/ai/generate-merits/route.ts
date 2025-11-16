import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { generateFinalMerits } from '@/lib/services/aiService';
import { withErrorHandling } from '@/lib/errors/errorHandler';
import { getProcessById } from '@/lib/services/processService';
import { getCriteriaByProcessId } from '@/lib/services/criteriaService';
import { z } from 'zod';

const generateMeritsSchema = z.object({
  processId: z.string().uuid('Invalid process ID'),
});

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    
    const body = await request.json();
    const validated = generateMeritsSchema.parse(body);
    
    // Verificar ownership do processo
    const process = await getProcessById(validated.processId, user.id);
    
    // Buscar todos os critérios do processo
    const criteriaList = await getCriteriaByProcessId(validated.processId);
    
    if (criteriaList.length === 0) {
      return NextResponse.json(
        {
          error: 'No criteria found for this process',
          code: 'NO_CRITERIA',
        },
        { status: 400 }
      );
    }
    
    // Preparar dados para geração
    const criteriaData = criteriaList.map((c) => ({
      id: c.id,
      criteria: c.criteria,
      overview: c.overview || undefined,
      context: c.context || undefined,
      impact: c.impact || undefined,
      evidence: c.evidence || undefined,
      validationScore: c.validationScore || undefined,
    }));
    
    // Gerar Final Merits Statement
    const result = await generateFinalMerits({
      processId: validated.processId,
      northStar: process.northStar || undefined,
      criteria: criteriaData,
    });
    
    return NextResponse.json(result);
  })(request);
}



