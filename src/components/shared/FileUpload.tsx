'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, File, FileText, Image as ImageIcon, Download } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { FileListSkeleton } from '@/components/ui/skeleton';
import { useToast } from '@/lib/hooks/useToast';
import { useUploadFile, useDeleteUpload } from '@/lib/hooks/useUpload';
import { cn } from '@/lib/utils/cn';

interface FileUploadProps {
  taskId: string;
  onUploadSuccess?: () => void;
  className?: string;
}

// Helper function to get file icon based on file type
function getFileIcon(fileType: string) {
  if (fileType.startsWith('image/')) {
    return <ImageIcon className="h-4 w-4 flex-shrink-0 text-blue-500" />;
  }
  if (fileType === 'application/pdf') {
    return <FileText className="h-4 w-4 flex-shrink-0 text-red-500" />;
  }
  if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return <FileText className="h-4 w-4 flex-shrink-0 text-blue-600" />;
  }
  return <File className="h-4 w-4 flex-shrink-0 text-gray-500" />;
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({ taskId, onUploadSuccess, className }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { addToast } = useToast();
  const uploadFileMutation = useUploadFile();
  const deleteUploadMutation = useDeleteUpload();
  
  // Buscar uploads via API (não há hook específico, então vamos usar query direto)
  // Por enquanto, vamos manter o fetch direto mas melhorar o código
  const [files, setFiles] = React.useState<Array<{
    id: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize?: number;
  }>>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadFiles = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/uploads?taskId=${taskId}`);
      if (!response.ok) {
        throw new Error('Failed to load files');
      }
      const data = await response.json();
      setFiles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load files');
      console.error('Failed to load files:', err);
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  React.useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const handleFileUpload = async (file: File) => {
    setError(null);

    try {
      await uploadFileMutation.mutateAsync({ taskId, file });

      await loadFiles();
      onUploadSuccess?.();

      addToast({
        type: 'success',
        title: 'Arquivo enviado',
        description: `O arquivo ${file.name} foi enviado com sucesso.`,
      });

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload file';
      setError(errorMessage);
      addToast({
        type: 'error',
        title: 'Erro ao enviar arquivo',
        description: errorMessage,
      });
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleDelete = async (fileId: string) => {
    if (!confirm('Tem certeza que deseja deletar este arquivo?')) {
      return;
    }

    try {
      await deleteUploadMutation.mutateAsync(fileId);
      await loadFiles();
      addToast({
        type: 'success',
        title: 'Arquivo deletado',
        description: 'O arquivo foi removido com sucesso.',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete file';
      addToast({
        type: 'error',
        title: 'Erro ao deletar arquivo',
        description: errorMessage,
      });
    }
  };

  const uploading = uploadFileMutation.isPending;

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Arquivos Anexados</h3>
          <p className="text-xs text-muted-foreground">
            PDF, DOCX, PNG ou JPG (máx. 10MB)
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Enviando...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Enviar Arquivo
            </>
          )}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.docx,.png,.jpg,.jpeg"
          onChange={handleFileSelect}
        />
      </div>

      {error && (
        <ErrorMessage message={error} />
      )}

      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'rounded-lg border-2 border-dashed p-6 text-center transition-colors',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50 hover:bg-muted/50',
          uploading && 'opacity-50 pointer-events-none'
        )}
      >
        <Upload className={cn(
          'mx-auto h-8 w-8 mb-2 transition-colors',
          isDragging ? 'text-primary' : 'text-muted-foreground'
        )} />
        <p className="text-sm font-medium mb-1">
          {isDragging ? 'Solte o arquivo aqui' : 'Arraste e solte um arquivo'}
        </p>
        <p className="text-xs text-muted-foreground">
          ou clique no botão "Enviar Arquivo" acima
        </p>
      </div>

      {loading ? (
        <FileListSkeleton count={3} />
      ) : !files || files.length === 0 ? (
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhum arquivo anexado ainda
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {Array.isArray(files) && files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {getFileIcon(file.fileType)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.fileName}</p>
                  {file.fileSize && (
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.fileSize)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={file.fileName}
                    title="Baixar arquivo"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(file.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Deletar arquivo"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

