import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { createUpload, getUploadsByTaskId } from '@/lib/services/uploadService';
import { withErrorHandling } from '@/lib/errors/errorHandler';
import { getTaskById } from '@/lib/services/taskService';
import { getProcessById } from '@/lib/services/processService';

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');

    if (!taskId) {
      return NextResponse.json(
        { error: 'taskId is required' },
        { status: 400 }
      );
    }

    // Verificar ownership
    const task = await getTaskById(taskId);
    await getProcessById(task.process.id, user.id);

    const uploads = await getUploadsByTaskId(taskId);
    
    // Gerar signed URLs para cada upload (bucket privado)
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    const uploadsWithUrls = await Promise.all(
      uploads.map(async (upload) => {
        // Gerar signed URL válida por 1 hora
        const { data: signedUrlData } = await supabase.storage
          .from('uploads')
          .createSignedUrl(upload.storagePath, 3600);

        return {
          ...upload,
          fileUrl: signedUrlData?.signedUrl || upload.fileUrl,
        };
      })
    );

    return NextResponse.json(uploadsWithUrls);
  })(request);
}

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const taskId = formData.get('taskId') as string;

    if (!file || !taskId) {
      return NextResponse.json(
        { error: 'file and taskId are required' },
        { status: 400 }
      );
    }

    // Verificar ownership
    const task = await getTaskById(taskId);
    await getProcessById(task.process.id, user.id);

    // Validar arquivo
    const { validateUploadedFile, sanitizeFileName } = await import('@/lib/services/uploadService');
    validateUploadedFile(file);

    // Upload para Supabase Storage
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    const sanitizedName = sanitizeFileName(file.name);
    const storagePath = `${user.id}/${taskId}/${Date.now()}_${sanitizedName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(storagePath, file, {
        contentType: file.type,
      });

    if (uploadError || !uploadData) {
      return NextResponse.json(
        { error: uploadError?.message || 'Failed to upload file' },
        { status: 500 }
      );
    }

    // Criar registro no banco primeiro
    const upload = await createUpload({
      taskId,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      fileUrl: '', // Será substituído na leitura com signed URL
      storagePath,
    });

    // Retornar upload com URL de download
    return NextResponse.json({
      ...upload,
      fileUrl: `/api/uploads/${upload.id}/download`,
    }, { status: 201 });
  })(request);
}

