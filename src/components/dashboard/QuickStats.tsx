'use client';

import { CheckCircle2, TrendingUp, Clock, ListTodo } from 'lucide-react';

interface QuickStatsProps {
  daysElapsed: number;
  totalDays: number;
  tasksDone: number;
  totalTasks: number;
  completion: number; // 0-100
}

export function QuickStats({
  daysElapsed,
  totalDays,
  tasksDone,
  totalTasks,
  completion,
}: QuickStatsProps) {
  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: ListTodo,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Done',
      value: tasksDone,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'In Progress',
      value: Math.max(0, totalTasks - tasksDone),
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Completion',
      value: `${completion}%`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border border-border bg-card hover:shadow-sm transition-shadow"
          >
            <div className={`p-2 rounded-full ${stat.bgColor} mb-2`}>
              <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-1">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

