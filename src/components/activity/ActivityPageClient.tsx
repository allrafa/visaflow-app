'use client';

import { useState } from 'react';
import { Activity, ActivityAction } from '@/types/database';
import { ActivityFeed } from './ActivityFeed';
import { ActivityFilters } from './ActivityFilters';
import { ActivityStats } from './ActivityStats';

interface Process {
  id: string;
  title: string;
  currentPhase: string;
}

interface ActivityPageClientProps {
  processes: Process[];
  initialActivities: Activity[];
  totalActivities: number;
  userId: string;
}

export function ActivityPageClient({
  processes,
  initialActivities,
  totalActivities,
  userId,
}: ActivityPageClientProps) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [selectedProcess, setSelectedProcess] = useState<string>('all');
  const [selectedAction, setSelectedAction] = useState<ActivityAction | 'all'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('30');

  // Filtrar atividades
  const filteredActivities = activities.filter((activity) => {
    if (selectedProcess !== 'all' && activity.processId !== selectedProcess) {
      return false;
    }
    if (selectedAction !== 'all' && activity.action !== selectedAction) {
      return false;
    }

    // Filtro de período
    const days = parseInt(selectedPeriod);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    if (activity.createdAt < cutoffDate) {
      return false;
    }

    return true;
  });

  // Estatísticas
  const stats = {
    total: totalActivities,
    last24h: activities.filter((a) => {
      const yesterday = new Date();
      yesterday.setHours(yesterday.getHours() - 24);
      return a.createdAt >= yesterday;
    }).length,
    last7days: activities.filter((a) => {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      return a.createdAt >= lastWeek;
    }).length,
  };

  // Se não há atividades e migration não foi aplicada
  if (totalActivities === 0 && initialActivities.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-amber-100 p-4">
              <svg
                className="h-12 w-12 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900">
            Tabela de Atividades Não Criada
          </h3>

          <p className="text-gray-600">
            A migration 009 ainda não foi aplicada. Por favor, siga as instruções em:
          </p>

          <code className="block rounded bg-gray-100 p-3 text-sm text-gray-800">
            docs/APLICAR_MIGRATION_009_MANUAL.md
          </code>

          <p className="text-sm text-gray-500">
            Após aplicar a migration, esta página começará a rastrear automaticamente todas as
            atividades dos seus processos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <ActivityStats stats={stats} />

      {/* Filters */}
      <ActivityFilters
        processes={processes}
        selectedProcess={selectedProcess}
        selectedAction={selectedAction}
        selectedPeriod={selectedPeriod}
        onProcessChange={setSelectedProcess}
        onActionChange={setSelectedAction}
        onPeriodChange={setSelectedPeriod}
      />

      {/* Activity Feed */}
      <ActivityFeed
        activities={filteredActivities}
        emptyMessage={
          filteredActivities.length === 0
            ? 'Nenhuma atividade encontrada com os filtros selecionados.'
            : undefined
        }
      />
    </div>
  );
}
