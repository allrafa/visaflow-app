'use client';

import { useState, useMemo } from 'react';
import { Task, Process, UpdateTaskInput } from '@/types/database';
import { TasksBoard } from './TasksBoard';
import { TaskFilter } from './TaskFilter';
import { TaskSearch } from './TaskSearch';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { updateTask } from '@/lib/api/tasks';
import { useToast } from '@/lib/hooks/useToast';

interface TasksPageClientProps {
  initialTasks: (Task & { processName: string })[];
  processes: Process[];
}

export function TasksPageClient({ initialTasks, processes }: TasksPageClientProps) {
  const { addToast } = useToast();
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProcess, setSelectedProcess] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Filter tasks based on all criteria
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());

      // Process filter
      const matchesProcess = selectedProcess === 'all' || task.processId === selectedProcess;

      // Status filter
      const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;

      // Priority filter
      const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;

      return matchesSearch && matchesProcess && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, selectedProcess, selectedStatus, selectedPriority]);

  const handleTaskUpdate = async (taskId: string, updates: UpdateTaskInput) => {
    try {
      // Optimistic update
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
      );

      // API call
      await updateTask(taskId, updates);

      addToast({
        type: 'success',
        title: 'Task updated',
        description: 'The task has been updated successfully.',
      });
    } catch (error) {
      // Revert on error
      setTasks(initialTasks);
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Failed to update task. Please try again.',
      });
    }
  };

  const handleTaskClick = (task: Task) => {
    // TODO: Open task modal for editing
    console.log('Task clicked:', task);
  };

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'PENDING').length,
    inProgress: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
    done: tasks.filter((t) => t.status === 'COMPLETED').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Total Tasks</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{taskStats.total}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-gray-600">To Do</p>
          <p className="mt-1 text-3xl font-bold text-gray-700">{taskStats.todo}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-gray-600">In Progress</p>
          <p className="mt-1 text-3xl font-bold text-blue-600">{taskStats.inProgress}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Done</p>
          <p className="mt-1 text-3xl font-bold text-green-600">{taskStats.done}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <TaskSearch value={searchQuery} onChange={setSearchQuery} />
        <TaskFilter
          processes={processes}
          selectedProcess={selectedProcess}
          selectedStatus={selectedStatus}
          selectedPriority={selectedPriority}
          onProcessChange={setSelectedProcess}
          onStatusChange={setSelectedStatus}
          onPriorityChange={setSelectedPriority}
        />
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Kanban Board */}
      {filteredTasks.length === 0 ? (
        <div className="rounded-lg bg-white p-16 text-center shadow-sm">
          <p className="text-gray-500">
            {searchQuery || selectedProcess !== 'all' || selectedStatus !== 'all'
              ? 'No tasks match your filters.'
              : 'No tasks yet. Create your first task to get started!'}
          </p>
        </div>
      ) : (
        <TasksBoard
          tasks={filteredTasks}
          onTaskUpdate={handleTaskUpdate}
          onTaskClick={handleTaskClick}
        />
      )}
    </div>
  );
}
