'use client';

import { useState } from 'react';
import { Task } from '@/types/database';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TaskTable } from '@/components/tasks/TaskTable';
import { useRouter } from 'next/navigation';

interface TaskTableSectionProps {
  initialTasks: Task[];
  processId: string;
  initialPhaseFilter?: string;
}

const PHASE_OPTIONS = [
  { value: 'ALL', label: 'Todas as Fases' },
  { value: 'ELIGIBILITY', label: '1. Elegibilidade' },
  { value: 'EVIDENCE', label: '2. Evidências' },
  { value: 'LETTERS', label: '3. Cartas' },
  { value: 'PETITION', label: '4. Dossiê Final' },
  { value: 'FILING', label: '5. Protocolo' },
];

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'Todos os Status' },
  { value: 'PENDING', label: 'Pendente' },
  { value: 'IN_PROGRESS', label: 'Em Progresso' },
  { value: 'UNDER_REVIEW', label: 'Em Revisão' },
  { value: 'COMPLETED', label: 'Concluída' },
];

export function TaskTableSection({
  initialTasks,
  processId,
  initialPhaseFilter = 'ALL',
}: TaskTableSectionProps) {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [phaseFilter, setPhaseFilter] = useState(initialPhaseFilter);
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPhase = phaseFilter === 'ALL' || task.phase === phaseFilter;
    const matchesStatus = statusFilter === 'ALL' || task.status === statusFilter;
    return matchesSearch && matchesPhase && matchesStatus;
  });

  const handleTaskUpdate = async (taskId: string, data: Partial<Task>) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, ...updatedTask } : t)));
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Erro ao atualizar tarefa. Tente novamente.');
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    if (!confirm('Tem certeza que deseja deletar esta tarefa?')) {
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Erro ao deletar tarefa. Tente novamente.');
    }
  };

  const handlePhaseFilterChange = (value: string) => {
    // Update URL and let the page reload with new phase filter
    if (value !== 'ALL') {
      window.location.href = `/dashboard/process/${processId}/tasks?phase=${value}`;
    } else {
      window.location.href = `/dashboard/process/${processId}/tasks`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Search */}
          <div>
            <Label htmlFor="search" className="text-sm font-medium text-gray-700">
              Buscar
            </Label>
            <div className="relative mt-1.5">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="search"
                type="text"
                placeholder="Buscar tarefas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Phase Filter */}
          <div>
            <Label htmlFor="phase" className="text-sm font-medium text-gray-700">
              Fase
            </Label>
            <Select value={phaseFilter} onValueChange={handlePhaseFilterChange}>
              <SelectTrigger id="phase" className="mt-1.5">
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

          {/* Status Filter */}
          <div>
            <Label htmlFor="status" className="text-sm font-medium text-gray-700">
              Status
            </Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status" className="mt-1.5">
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

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Mostrando <span className="font-medium text-gray-900">{filteredTasks.length}</span> de{' '}
          <span className="font-medium text-gray-900">{tasks.length}</span> tarefas
        </div>
      </div>

      {/* Tasks Table */}
      <TaskTable
        tasks={filteredTasks}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
}
