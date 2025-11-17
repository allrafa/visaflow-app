'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/database';
import { X, Save, Upload, FileText, Trash2, Calendar, CheckCircle2, Clock } from 'lucide-react';
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
  { value: 'PENDING', label: '⏳ Pendente', color: 'bg-gray-100 text-gray-700' },
  { value: 'IN_PROGRESS', label: '🔄 Em Progresso', color: 'bg-blue-100 text-blue-700' },
  { value: 'UNDER_REVIEW', label: '👀 Em Revisão', color: 'bg-purple-100 text-purple-700' },
  { value: 'COMPLETED', label: '✅ Concluída', color: 'bg-green-100 text-green-700' },
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
    notes: '', // Campo para notas/observações
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const currentStatus = STATUS_OPTIONS.find(s => s.value === formData.status);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(task.id, {
        title: formData.title,
        description: formData.description,
        status: formData.status as Task['status'],
        phase: formData.phase as Task['phase'],
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
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl">{formData.title}</DialogTitle>
              <DialogDescription className="mt-1">
                Edite as informações, adicione notas e documentos
              </DialogDescription>
            </div>
            <Badge className={`${currentStatus?.color} ml-4`}>
              {currentStatus?.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status e Fase - Lado a Lado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status" className="text-sm font-semibold">Status da Tarefa</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="mt-2">
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

            <div>
              <Label htmlFor="phase" className="text-sm font-semibold">Fase do Processo</Label>
              <Select
                value={formData.phase}
                onValueChange={(value) => setFormData({ ...formData, phase: value })}
              >
                <SelectTrigger className="mt-2">
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
          </div>

          {/* Título */}
          <div>
            <Label htmlFor="title" className="text-sm font-semibold">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-2"
              placeholder="Nome da tarefa..."
            />
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="description" className="text-sm font-semibold">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-2"
              placeholder="O que precisa ser feito nesta tarefa..."
            />
          </div>

          {/* Notas e Observações - Área de Texto Maior */}
          <div className="border-t border-gray-200 pt-6">
            <Label htmlFor="notes" className="text-sm font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notas e Observações
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={6}
              className="mt-2 font-mono text-sm"
              placeholder="Use este espaço para:
• Adicionar notas importantes sobre o progresso
• Incluir links úteis ou referências
• Documentar decisões tomadas
• Registrar próximos passos
• Qualquer outra observação relevante"
            />
            <p className="mt-2 text-xs text-gray-500">
              💡 Suas notas são salvas junto com a tarefa e podem ser consultadas a qualquer momento
            </p>
          </div>

          {/* Upload de Documentos */}
          <div className="border-t border-gray-200 pt-6">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Documentos e Evidências
            </Label>
            <div className="mt-3 space-y-3">
              {/* Botão de Upload */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="w-full sm:w-auto"
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
                  Aceito: PDF, Word, Imagens (máx. 10MB)
                </span>
              </div>

              {/* Lista de Arquivos para Upload */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-700">
                    📎 Arquivos Prontos para Upload ({uploadedFiles.length})
                  </p>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md bg-white border p-2"
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

              {/* Placeholder para arquivos salvos */}
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                <FileText className="mx-auto h-10 w-10 text-gray-300" />
                <p className="mt-3 text-sm font-medium text-gray-600">
                  Nenhum arquivo salvo ainda
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Arquivos que você fizer upload aparecerão aqui
                </p>
              </div>
            </div>
          </div>

          {/* Informações da Tarefa */}
          <div className="border-t border-gray-200 pt-6">
            <p className="mb-3 text-sm font-semibold text-gray-700">📊 Informações</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-gray-600 block text-xs">Criado em</span>
                  <span className="font-medium">
                    {format(new Date(task.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-gray-600 block text-xs">Última atualização</span>
                  <span className="font-medium">
                    {format(new Date(task.updatedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
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
