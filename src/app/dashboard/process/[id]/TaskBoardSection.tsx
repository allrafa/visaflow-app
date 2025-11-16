'use client';

import { useState } from 'react';
import { TaskBoard } from '@/components/tasks/TaskBoard';
import { TaskModal } from '@/components/tasks/TaskModal';
import type { Task } from '@/types/database';

interface TaskBoardSectionProps {
  processId: string;
}

export function TaskBoardSection({ processId }: TaskBoardSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string | undefined>();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleNewTask = (phase: string) => {
    setSelectedPhase(phase);
    setSelectedTask(null);
    setModalOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setSelectedPhase(undefined);
    setModalOpen(true);
  };

  const handleSuccess = () => {
    // Força reload do TaskBoard incrementando refreshKey
    setRefreshKey((prev) => prev + 1);
    setModalOpen(false);
    setSelectedTask(null);
    setSelectedPhase(undefined);
  };

  return (
    <>
      <TaskBoard
        processId={processId}
        onTaskClick={handleTaskClick}
        onNewTask={handleNewTask}
        refreshKey={refreshKey}
      />
      <TaskModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedTask(null);
          setSelectedPhase(undefined);
        }}
        processId={processId}
        task={selectedTask}
        phase={selectedPhase}
        onSuccess={handleSuccess}
      />
    </>
  );
}

