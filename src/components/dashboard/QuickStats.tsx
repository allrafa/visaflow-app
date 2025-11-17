'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle2, TrendingUp } from 'lucide-react';

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
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Days Elapsed</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{daysElapsed}/{totalDays}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((daysElapsed / totalDays) * 100)}% of timeline
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tasks Done</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tasksDone}/{totalTasks}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((tasksDone / totalTasks) * 100)}% completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completion}%</div>
          <p className="text-xs text-muted-foreground">
            Overall progress
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

