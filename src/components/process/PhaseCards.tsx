'use client';

import { useRouter } from 'next/navigation';
import { Task } from '@/types/database';
import {
  CheckCircle2,
  Circle,
  Clock,
  FileSearch,
  FileText,
  Mail,
  FileCheck,
  Send,
  ChevronRight,
} from 'lucide-react';

interface PhaseCardsProps {
  tasks: Task[];
  processId: string;
}

const PHASES = [
  {
    id: 'ELIGIBILITY',
    name: '1. Elegibilidade e Estratégia',
    description: 'Análise de elegibilidade e definição da estratégia do caso',
    icon: FileSearch,
    purpleShade: 'purple-1' as const,
  },
  {
    id: 'EVIDENCE',
    name: '2. Evidências',
    description: 'Coleta e organização de documentos comprobatórios',
    icon: FileText,
    purpleShade: 'purple-2' as const,
  },
  {
    id: 'LETTERS',
    name: '3. Cartas de Recomendação',
    description: 'Solicitação e revisão de cartas de apoio',
    icon: Mail,
    purpleShade: 'purple-3' as const,
  },
  {
    id: 'PETITION',
    name: '4. Dossiê Final (I-140)',
    description: 'Elaboração e revisão do dossiê completo',
    icon: FileCheck,
    purpleShade: 'purple-1' as const,
  },
  {
    id: 'FILING',
    name: '5. Protocolo e Acompanhamento',
    description: 'Protocolo junto ao USCIS e acompanhamento',
    icon: Send,
    purpleShade: 'purple-2' as const,
  },
];

export function PhaseCards({ tasks, processId }: PhaseCardsProps) {
  const router = useRouter();

  const getPhaseStats = (phaseId: string) => {
    const phaseTasks = tasks.filter((task) => task.phase === phaseId);
    const total = phaseTasks.length;
    const completed = phaseTasks.filter((task) => task.status === 'COMPLETED').length;
    const inProgress = phaseTasks.filter((task) => task.status === 'IN_PROGRESS').length;
    const pending = phaseTasks.filter((task) => task.status === 'PENDING').length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, pending, progress };
  };

  const handlePhaseClick = (phaseId: string) => {
    router.push(`/dashboard/process/${processId}/tasks?phase=${phaseId}`);
  };

  return (
    <div className="space-y-4">
      {PHASES.map((phase) => {
        const stats = getPhaseStats(phase.id);
        const PhaseIcon = phase.icon;

        return (
          <div
            key={phase.id}
            className="card-hover cursor-pointer p-6"
            onClick={() => handlePhaseClick(phase.id)}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="icon-container rounded-lg p-3 bg-purple-muted">
                  <PhaseIcon className={`h-6 w-6 text-${phase.purpleShade}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-title font-semibold">{phase.name}</h3>
                  <p className="text-body text-muted-foreground mt-1">{phase.description}</p>
                </div>
              </div>
              <div className="icon-container">
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-body font-medium">Progresso</span>
                <span className="text-body font-semibold">{stats.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-gradient-to-r from-purple-3 to-purple-1 transition-all duration-500"
                  style={{ width: `${stats.progress}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <span className="text-body font-semibold">{stats.total}</span>
                </div>
                <span className="text-body text-muted-foreground">Total</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="icon-container">
                  <CheckCircle2 className="h-5 w-5 text-purple-3" />
                </div>
                <span className="text-body font-medium">{stats.completed}</span>
                <span className="text-body text-muted-foreground">Concluídas</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="icon-container">
                  <Clock className="h-5 w-5 text-purple-2" />
                </div>
                <span className="text-body font-medium">{stats.inProgress}</span>
                <span className="text-body text-muted-foreground">Em Progresso</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="icon-container">
                  <Circle className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-body font-medium">{stats.pending}</span>
                <span className="text-body text-muted-foreground">Pendentes</span>
              </div>
            </div>

            {/* Status Badge */}
            {stats.progress === 100 && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-muted w-fit">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-3" />
                  <span className="text-small font-medium text-purple-3">Fase Concluída</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
