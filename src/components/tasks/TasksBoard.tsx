'use client';

import { useState } from 'react';
import { Task } from '@/types/database';
import { TaskCard } from './TaskCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

interface TasksBoardProps {
  tasks: Task[];
  onTaskUpdate?: (taskId: string, updates: Partial<Task>) => void;
  onTaskClick?: (task: Task) => void;
}

interface ColumnConfig {
  id: TaskStatus;
  title: string;
  color: string;
  bgColor: string;
}

const COLUMNS: ColumnConfig[] = [
  {
    id: 'PENDING',
    title: 'To Do',
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
  },
  {
    id: 'IN_PROGRESS',
    title: 'In Progress',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'COMPLETED',
    title: 'Done',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
  },
];

export function TasksBoard({ tasks, onTaskUpdate, onTaskClick }: TasksBoardProps) {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: TaskStatus) => {
    if (draggedTask && draggedTask.status !== status) {
      onTaskUpdate?.(draggedTask.id, { status });
    }
    setDraggedTask(null);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {COLUMNS.map((column) => {
        const columnTasks = getTasksByStatus(column.id);

        return (
          <div
            key={column.id}
            className="flex flex-col"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            {/* Column Header */}
            <div className={cn('mb-4 flex items-center justify-between rounded-lg p-4', column.bgColor)}>
              <h3 className={cn('text-lg font-semibold', column.color)}>
                {column.title}
              </h3>
              <Badge variant="secondary" className="ml-2">
                {columnTasks.length}
              </Badge>
            </div>

            {/* Tasks Container */}
            <div className="flex-1 space-y-3">
              {columnTasks.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-sm text-gray-500">No tasks</p>
                </Card>
              ) : (
                columnTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    onClick={() => onTaskClick?.(task)}
                    className="cursor-move"
                  >
                    <TaskCard task={task} />
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
