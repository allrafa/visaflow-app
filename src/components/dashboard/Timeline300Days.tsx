'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { ProcessPhase } from '@/types/database';

interface Timeline300DaysProps {
  processId: string;
  currentPhase: ProcessPhase;
  progress: number; // 0-100
  startDate?: Date;
  completedTasks?: number;
  totalTasks?: number;
}

interface Milestone {
  id: number;
  day: number;
  label: string;
  phase: ProcessPhase;
  description: string;
}

const MILESTONES: Milestone[] = [
  // ELIGIBILITY milestones
  { id: 1, day: 14, label: 'Auto-avaliação completa', phase: 'ELIGIBILITY', description: 'Todos os 10 critérios avaliados' },
  { id: 2, day: 30, label: 'Estratégia definida', phase: 'ELIGIBILITY', description: '3-5 critérios escolhidos' },
  { id: 3, day: 60, label: 'Evidências inventariadas', phase: 'ELIGIBILITY', description: 'Gaps identificados' },
  
  // EVIDENCE milestones
  { id: 4, day: 75, label: 'Primeiro critério completo', phase: 'EVIDENCE', description: '1 critério validado' },
  { id: 5, day: 105, label: '3 critérios validados', phase: 'EVIDENCE', description: 'Mínimo necessário atingido' },
  { id: 6, day: 150, label: 'Todos critérios finalizados', phase: 'EVIDENCE', description: 'Todos critérios escolhidos completos' },
  
  // LETTERS milestones
  { id: 7, day: 155, label: 'Recomendadores confirmados', phase: 'LETTERS', description: '7-10 recomendadores confirmados' },
  { id: 8, day: 170, label: 'Todas cartas recebidas', phase: 'LETTERS', description: 'Drafts de todas as cartas' },
  { id: 9, day: 180, label: 'Cartas assinadas', phase: 'LETTERS', description: 'Versões finais assinadas' },
  
  // PETITION milestones
  { id: 10, day: 195, label: 'Final Merits escrito', phase: 'PETITION', description: 'Narrativa completa (20-30 páginas)' },
  { id: 11, day: 205, label: 'Petição completa', phase: 'PETITION', description: 'Dossiê finalizado' },
  { id: 12, day: 210, label: 'Validação final', phase: 'PETITION', description: 'Score >80, aprovado' },
  
  // FILING milestones
  { id: 13, day: 215, label: 'Petição enviada', phase: 'FILING', description: 'Enviada ao USCIS' },
  { id: 14, day: 224, label: 'Aprovação USCIS', phase: 'FILING', description: 'I-140 aprovado (premium)' },
  { id: 15, day: 240, label: 'NVC documentos', phase: 'FILING', description: 'DS-260 e documentos enviados' },
  { id: 16, day: 280, label: 'Entrevista agendada', phase: 'FILING', description: 'Data de entrevista confirmada' },
  { id: 17, day: 300, label: 'Green Card! 🎉', phase: 'FILING', description: 'LPR status alcançado' },
];

const PHASE_COLORS: Record<ProcessPhase, string> = {
  ELIGIBILITY: 'bg-blue-500',
  EVIDENCE: 'bg-green-500',
  LETTERS: 'bg-purple-500',
  PETITION: 'bg-orange-500',
  FILING: 'bg-red-500',
};

const PHASE_LABELS: Record<ProcessPhase, string> = {
  ELIGIBILITY: 'Elegibilidade',
  EVIDENCE: 'Evidências',
  LETTERS: 'Cartas',
  PETITION: 'Petição',
  FILING: 'Protocolo',
};

export function Timeline300Days({
  processId,
  currentPhase,
  progress,
  startDate,
  completedTasks = 0,
  totalTasks = 289,
}: Timeline300DaysProps) {
  const currentDay = useMemo(() => {
    if (!startDate) return 0;
    const daysSinceStart = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.min(300, daysSinceStart));
  }, [startDate]);

  const completedMilestones = useMemo(() => {
    return MILESTONES.filter(m => {
      const phaseOrder = ['ELIGIBILITY', 'EVIDENCE', 'LETTERS', 'PETITION', 'FILING'];
      const currentPhaseIndex = phaseOrder.indexOf(currentPhase);
      const milestonePhaseIndex = phaseOrder.indexOf(m.phase);
      return milestonePhaseIndex < currentPhaseIndex || 
             (milestonePhaseIndex === currentPhaseIndex && m.day <= currentDay);
    });
  }, [currentPhase, currentDay]);

  const nextMilestone = useMemo(() => {
    return MILESTONES.find(m => {
      const phaseOrder = ['ELIGIBILITY', 'EVIDENCE', 'LETTERS', 'PETITION', 'FILING'];
      const currentPhaseIndex = phaseOrder.indexOf(currentPhase);
      const milestonePhaseIndex = phaseOrder.indexOf(m.phase);
      return milestonePhaseIndex > currentPhaseIndex || 
             (milestonePhaseIndex === currentPhaseIndex && m.day > currentDay);
    });
  }, [currentPhase, currentDay]);

  const progressPercentage = (currentDay / 300) * 100;
  const taskProgressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Timeline EB-1A (300 dias)
        </CardTitle>
        <CardDescription>
          Progresso do processo desde o início
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Dias decorridos</span>
            <span className="font-semibold">
              {currentDay > 0 ? `${currentDay}/300` : 'Não iniciado'}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tarefas completadas</span>
            <span className="font-semibold">
              {completedTasks}/{totalTasks} ({Math.round(taskProgressPercentage)}%)
            </span>
          </div>
          <Progress value={taskProgressPercentage} className="h-2" />
        </div>

        {/* Current Status */}
        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Fase Atual</span>
            <Badge className={cn(PHASE_COLORS[currentPhase], 'text-white')}>
              {PHASE_LABELS[currentPhase]}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Progresso Geral</span>
            <span className="text-sm font-semibold">{progress}%</span>
          </div>
        </div>

        {/* Next Milestone */}
        {nextMilestone && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">Próximo Marco</span>
            </div>
            <p className="text-sm text-blue-800">{nextMilestone.label}</p>
            <p className="text-xs text-blue-600">{nextMilestone.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-blue-600">Dia {nextMilestone.day}</span>
              {currentDay > 0 && (
                <span className="text-xs text-blue-600">
                  {nextMilestone.day - currentDay} dias restantes
                </span>
              )}
            </div>
          </div>
        )}

        {/* Milestones Timeline */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Marcos Principais</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {MILESTONES.map((milestone) => {
              const isCompleted = completedMilestones.some(m => m.id === milestone.id);
              const isCurrent = milestone.phase === currentPhase && 
                                milestone.day <= currentDay + 5 && 
                                milestone.day >= currentDay - 5;
              
              return (
                <div
                  key={milestone.id}
                  className={cn(
                    'flex items-start gap-3 rounded-lg p-2 text-xs transition-colors',
                    isCompleted && 'bg-green-50 border border-green-200',
                    isCurrent && !isCompleted && 'bg-blue-50 border border-blue-200',
                    !isCompleted && !isCurrent && 'bg-gray-50'
                  )}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className={cn(
                        'h-4 w-4 rounded-full border-2',
                        isCurrent ? 'border-blue-600 bg-blue-100' : 'border-gray-300'
                      )} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        'font-medium',
                        isCompleted && 'text-green-900',
                        isCurrent && !isCompleted && 'text-blue-900',
                        !isCompleted && !isCurrent && 'text-gray-600'
                      )}>
                        Dia {milestone.day}: {milestone.label}
                      </span>
                    </div>
                    <p className={cn(
                      'text-xs mt-0.5',
                      isCompleted ? 'text-green-700' : 'text-gray-500'
                    )}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase Timeline Bar */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Linha do Tempo por Fase</h4>
          <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
            {/* ELIGIBILITY: Days 0-60 */}
            <div 
              className="absolute left-0 h-full bg-blue-500" 
              style={{ width: '20%' }}
              title="ELIGIBILITY (0-60 dias)"
            />
            {/* EVIDENCE: Days 60-150 */}
            <div 
              className="absolute left-[20%] h-full bg-green-500" 
              style={{ width: '30%' }}
              title="EVIDENCE (60-150 dias)"
            />
            {/* LETTERS: Days 150-180 */}
            <div 
              className="absolute left-[50%] h-full bg-purple-500" 
              style={{ width: '10%' }}
              title="LETTERS (150-180 dias)"
            />
            {/* PETITION: Days 180-210 */}
            <div 
              className="absolute left-[60%] h-full bg-orange-500" 
              style={{ width: '10%' }}
              title="PETITION (180-210 dias)"
            />
            {/* FILING: Days 210-300 */}
            <div 
              className="absolute left-[70%] h-full bg-red-500" 
              style={{ width: '30%' }}
              title="FILING (210-300 dias)"
            />
            {/* Current position indicator */}
            {currentDay > 0 && (
              <div 
                className="absolute top-0 h-full w-1 bg-black z-10"
                style={{ left: `${progressPercentage}%` }}
              />
            )}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Day 0</span>
            <span>Day 300</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

