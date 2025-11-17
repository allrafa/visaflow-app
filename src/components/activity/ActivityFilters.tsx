'use client';

import { ActivityAction } from '@/types/database';

interface Process {
  id: string;
  title: string;
}

interface ActivityFiltersProps {
  processes: Process[];
  selectedProcess: string;
  selectedAction: ActivityAction | 'all';
  selectedPeriod: string;
  onProcessChange: (processId: string) => void;
  onActionChange: (action: ActivityAction | 'all') => void;
  onPeriodChange: (period: string) => void;
}

const ACTION_OPTIONS: Array<{ value: ActivityAction | 'all'; label: string }> = [
  { value: 'all', label: 'Todas as Ações' },
  { value: 'TASK_CREATED', label: 'Tarefas Criadas' },
  { value: 'TASK_COMPLETED', label: 'Tarefas Completadas' },
  { value: 'CRITERIA_VALIDATED', label: 'Critérios Validados' },
  { value: 'LETTER_CREATED', label: 'Cartas Criadas' },
  { value: 'LETTER_SIGNED', label: 'Cartas Assinadas' },
  { value: 'FILE_UPLOADED', label: 'Arquivos Enviados' },
  { value: 'COLLABORATOR_INVITED', label: 'Colaboradores Convidados' },
];

const PERIOD_OPTIONS = [
  { value: '7', label: 'Últimos 7 dias' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: '90', label: 'Últimos 90 dias' },
  { value: '365', label: 'Último ano' },
];

export function ActivityFilters({
  processes,
  selectedProcess,
  selectedAction,
  selectedPeriod,
  onProcessChange,
  onActionChange,
  onPeriodChange,
}: ActivityFiltersProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">Filtros</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Process Filter */}
        <div>
          <label
            htmlFor="process-filter"
            className="mb-2 block text-xs font-medium text-gray-700"
          >
            Processo
          </label>
          <select
            id="process-filter"
            value={selectedProcess}
            onChange={(e) => onProcessChange(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">Todos os Processos</option>
            {processes.map((process) => (
              <option key={process.id} value={process.id}>
                {process.title}
              </option>
            ))}
          </select>
        </div>

        {/* Action Filter */}
        <div>
          <label
            htmlFor="action-filter"
            className="mb-2 block text-xs font-medium text-gray-700"
          >
            Tipo de Ação
          </label>
          <select
            id="action-filter"
            value={selectedAction}
            onChange={(e) => onActionChange(e.target.value as ActivityAction | 'all')}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {ACTION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Period Filter */}
        <div>
          <label
            htmlFor="period-filter"
            className="mb-2 block text-xs font-medium text-gray-700"
          >
            Período
          </label>
          <select
            id="period-filter"
            value={selectedPeriod}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {PERIOD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
