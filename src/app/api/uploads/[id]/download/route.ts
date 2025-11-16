import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getUploadById } from '@/lib/services/uploadService';
import { withErrorHandling } from '@/lib/errors/errorHandler';
import { getProcessById } from '@/lib/services/processService';
import { getTaskById } from '@/lib/services/taskService';

/**
 * GET /api/uploads/[id]/download
 * Gera signed URL para download de arquivo privado
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    const { id } = await params;

    // Buscar upload
    const upload = await getUploadById(id);
    
    // Verificar ownership através do processo
    const task = await getTaskById(upload.taskId);
    await getProcessById(task.process.id, user.id);

    // Gerar signed URL válida por 1 hora
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    const { data: signedUrlData, error } = await supabase.storage
      .from('uploads')
      .createSignedUrl(upload.storagePath, 3600);

    if (error || !signedUrlData) {
      return NextResponse.json(
        { error: 'Failed to generate download URL' },
        { status: 500 }
      );
    }

    // Redirecionar para signed URL
    return NextResponse.redirect(signedUrlData.signedUrl);
  })(request);
}

