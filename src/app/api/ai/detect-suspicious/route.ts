import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { detectSuspiciousPractices } from '@/lib/services/aiService';
import { withErrorHandling } from '@/lib/errors/errorHandler';
import { z } from 'zod';

const detectRequestSchema = z.object({
  content: z.string(),
});

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    await getAuthUser(); // Verificar autenticação
    
    const body = await request.json();
    const validated = detectRequestSchema.parse(body);
    
    const issues = await detectSuspiciousPractices(validated.content);
    
    return NextResponse.json({ issues });
  })(request);
}



