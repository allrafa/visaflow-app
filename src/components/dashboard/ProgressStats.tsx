'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileText, CheckCircle2, Clock, Target } from 'lucide-react';

interface ProgressStatsProps {
  totalProcesses: number;
  completedTasks: number;
  totalTasks: number;
  activeCriteria: number;
  progress: number;
}

export function ProgressStats({
  totalProcesses,
  completedTasks,
  totalTasks,
  activeCriteria,
  progress,
}: ProgressStatsProps) {
  const taskCompletionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: 'Processos Ativos',
      value: totalProcesses,
      icon: FileText,
      color: 'text-blue-500',
    },
    {
      label: 'Tarefas Concluídas',
      value: `${completedTasks}/${totalTasks}`,
      icon: CheckCircle2,
      color: 'text-green-500',
      progress: taskCompletionRate,
    },
    {
      label: 'Critérios Ativos',
      value: activeCriteria,
      icon: Target,
      color: 'text-purple-500',
    },
    {
      label: 'Progresso Geral',
      value: `${progress}%`,
      icon: Clock,
      color: 'text-orange-500',
      progress: progress,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.label}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.progress !== undefined && (
              <div className="mt-2">
                <Progress value={stat.progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}



