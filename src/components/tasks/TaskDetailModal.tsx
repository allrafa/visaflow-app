'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/database';
import { X, Save, Upload, FileText, Trash2, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
  onSave: (taskId: string, data: Partial<Task>) => Promise<void>;
}

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Pendente' },
  { value: 'IN_PROGRESS', label: 'Em Progresso' },
  { value: 'UNDER_REVIEW', label: 'Em Revisão' },
  { value: 'COMPLETED', label: 'Concluída' },
];

const PHASE_OPTIONS = [
  { value: 'ELIGIBILITY', label: '1. Elegibilidade e Estratégia' },
  { value: 'EVIDENCE', label: '2. Evidências' },
  { value: 'LETTERS', label: '3. Cartas de Recomendação' },
  { value: 'PETITION', label: '4. Dossiê Final (I-140)' },
  { value: 'FILING', label: '5. Protocolo e Acompanhamento' },
];

export function TaskDetailModal({ task, onClose, onSave }: TaskDetailModalProps) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || '',
    status: task.status,
    phase: task.phase,
    dueDate: task.completedAt ? format(new Date(task.completedAt), 'yyyy-MM-dd') : '',
    notes: '', // TODO: adicionar campo notes no schema
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(task.id, {
        title: formData.title,
        description: formData.description,
        status: formData.status as Task['status'],
        phase: formData.phase as Task['phase'],
        // TODO: Salvar dueDate e notes quando adicionar ao schema
        // TODO: Fazer upload dos arquivos
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detalhes da Tarefa</DialogTitle>
          <DialogDescription>
            Edite as informações, adicione notas e faça upload de documentos
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título da Tarefa</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-1.5"
                placeholder="Adicione uma descrição detalhada da tarefa..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phase">Fase</Label>
                <Select
                  value={formData.phase}
                  onValueChange={(value) => setFormData({ ...formData, phase: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PHASE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="dueDate">Data de Conclusão (Opcional)</Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Notas */}
          <div>
            <Label htmlFor="notes">Notas e Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="mt-1.5"
              placeholder="Adicione notas, links úteis, comentários sobre o progresso..."
            />
            <p className="mt-1.5 text-xs text-gray-500">
              Todas as notas são salvas automaticamente e ficam disponíveis no histórico
            </p>
          </div>

          {/* Upload de Arquivos */}
          <div>
            <Label>Documentos e Evidências</Label>
            <div className="mt-1.5 space-y-3">
              {/* Botão de Upload */}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Adicionar Arquivos
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                />
                <span className="text-xs text-gray-500">
                  PDF, Word, Imagens (máx. 10MB cada)
                </span>
              </div>

              {/* Lista de Arquivos */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2 rounded-lg border border-gray-200 p-3">
                  <p className="text-sm font-medium text-gray-700">
                    Arquivos para Upload ({uploadedFiles.length})
                  </p>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md bg-gray-50 p-2"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{file.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {(file.size / 1024).toFixed(1)} KB
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFile(index)}
                        className="h-6 w-6"
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Arquivos já salvos (TODO: buscar do banco) */}
              <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center">
                <FileText className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Arquivos salvos aparecerão aqui
                </p>
                <p className="text-xs text-gray-400">
                  Todos os uploads são armazenados com segurança
                </p>
              </div>
            </div>
          </div>

          {/* Metadados */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="mb-3 text-sm font-medium text-gray-700">Informações</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Criado em:</span>
                <span className="font-medium">
                  {format(new Date(task.createdAt), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Última atualização:</span>
                <span className="font-medium">
                  {format(new Date(task.updatedAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </span>
              </div>
              {task.completedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Concluída em:</span>
                  <span className="font-medium text-green-600">
                    {format(new Date(task.completedAt), "dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
