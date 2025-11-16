import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { validateCriteriaContent } from '@/lib/services/aiService';
import { withErrorHandling } from '@/lib/errors/errorHandler';
import { z } from 'zod';

const validateRequestSchema = z.object({
  criteria: z.string(),
  overview: z.string().optional(),
  context: z.string().optional(),
  impact: z.string().optional(),
  evidence: z.string().optional(),
});

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    await getAuthUser(); // Verificar autenticação
    
    const body = await request.json();
    const validated = validateRequestSchema.parse(body);
    
    const result = await validateCriteriaContent(validated.criteria, {
      overview: validated.overview,
      context: validated.context,
      impact: validated.impact,
      evidence: validated.evidence,
    });
    
    return NextResponse.json(result);
  })(request);
}



