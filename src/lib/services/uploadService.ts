import { createClient } from '@supabase/supabase-js';
import { prisma } from '../db/client';
import { NotFoundError, ValidationError } from '../errors/AppError';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
] as const;

export function validateUploadedFile(file: File): void {
  if (!ALLOWED_MIME_TYPES.includes(file.type as any)) {
    throw new ValidationError(
      `File type not allowed. Allowed types: PDF, DOCX, PNG, JPG`
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new ValidationError(
      `File too large. Maximum size is 10MB`
    );
  }
}

export function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .substring(0, 100);
}

export interface CreateUploadInput {
  taskId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  storagePath: string;
}

/**
 * Create upload record
 */
export async function createUpload(input: CreateUploadInput) {
  // Verificar se task existe
  const task = await prisma.task.findUnique({
    where: { id: input.taskId },
  });

  if (!task) {
    throw new NotFoundError('Task', input.taskId);
  }

  return prisma.upload.create({
    data: {
      taskId: input.taskId,
      fileName: input.fileName,
      fileType: input.fileType,
      fileSize: BigInt(input.fileSize),
      fileUrl: input.fileUrl,
      storagePath: input.storagePath,
    },
  });
}

/**
 * Get uploads by task ID
 */
export async function getUploadsByTaskId(taskId: string) {
  return prisma.upload.findMany({
    where: { taskId },
    orderBy: { uploadedAt: 'desc' },
  });
}

/**
 * Get upload by ID
 */
export async function getUploadById(uploadId: string) {
  const upload = await prisma.upload.findUnique({
    where: { id: uploadId },
    include: {
      task: true,
    },
  });

  if (!upload) {
    throw new NotFoundError('Upload', uploadId);
  }

  return upload;
}

/**
 * Delete upload
 */
export async function deleteUpload(uploadId: string, userId: string) {
  const upload = await prisma.upload.findUnique({
    where: { id: uploadId },
    include: {
      task: {
        include: {
          process: true,
        },
      },
    },
  });

  if (!upload) {
    throw new NotFoundError('Upload', uploadId);
  }

  // Verificar ownership
  if (upload.task.process.userId !== userId) {
    throw new ValidationError('You do not have permission to delete this upload');
  }

  // Deletar do Supabase Storage
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  try {
    await supabase.storage
      .from('uploads')
      .remove([upload.storagePath]);
  } catch (error) {
    console.error('Failed to delete file from storage:', error);
    // Continuar mesmo se falhar no storage
  }

  // Deletar registro do banco
  return prisma.upload.delete({
    where: { id: uploadId },
  });
}

