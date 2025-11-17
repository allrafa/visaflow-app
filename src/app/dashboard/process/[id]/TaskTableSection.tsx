'use client';

import { useState } from 'react';
import { Task } from '@/types/database';
import { TaskTable } from '@/components/tasks/TaskTable';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TaskTableSectionProps {
  initialTasks: Task[];
  processId: string;
}

const PHASE_FILTERS = [
  { value: 'ALL', label: 'Todas as Fases' },
  { value: 'ELIGIBILITY', label: '1. Elegibilidade' },
  { value: 'EVIDENCE', label: '2. Evidências' },
  { value: 'LETTERS', label: '3. Cartas' },
  { value: 'PETITION', label: '4. Dossiê Final' },
  { value: 'FILING', label: '5. Protocolo' },
];

const STATUS_FILTERS = [
  { value: 'ALL', label: 'Todos os Status' },
  { value: 'PENDING', label: 'Pendente' },
  { value: 'IN_PROGRESS', label: 'Em Progresso' },
  { value: 'COMPLETED', label: 'Concluída' },
];

export function TaskTableSection({ initialTasks, processId }: TaskTableSectionProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Filtrar tarefas
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

      if (!response.ok) throw new Error('Failed to update task');

      const updatedTask = await response.json();

      // Atualizar lista local
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, ...updatedTask } : t))
      );
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Erro ao atualizar tarefa. Tente novamente.');
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    if (!confirm('Tem certeza que deseja deletar esta tarefa?')) return;

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete task');

      // Remover da lista local
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Erro ao deletar tarefa. Tente novamente.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Filtros e Busca */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Busca */}
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar tarefas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtros */}
        <div className="flex gap-2">
          <Select value={phaseFilter} onValueChange={setPhaseFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Fase" />
            </SelectTrigger>
            <SelectContent>
              {PHASE_FILTERS.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_FILTERS.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Mostrando <strong>{filteredTasks.length}</strong> de{' '}
          <strong>{tasks.length}</strong> tarefas
        </span>
        {(searchQuery || phaseFilter !== 'ALL' || statusFilter !== 'ALL') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setPhaseFilter('ALL');
              setStatusFilter('ALL');
            }}
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Tabela de Tarefas */}
      <TaskTable
        tasks={filteredTasks}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
}
