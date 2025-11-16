'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Process } from '@/types/database';

interface TaskFilterProps {
  processes: Process[];
  selectedProcess: string;
  selectedStatus: string;
  selectedPriority: string;
  onProcessChange: (processId: string) => void;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
}

export function TaskFilter({
  processes,
  selectedProcess,
  selectedStatus,
  selectedPriority,
  onProcessChange,
  onStatusChange,
  onPriorityChange,
}: TaskFilterProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Process Filter */}
      <div className="w-full sm:w-auto sm:min-w-[200px]">
        <Select value={selectedProcess} onValueChange={onProcessChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Processes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Processes</SelectItem>
            {processes.map((process) => (
              <SelectItem key={process.id} value={process.id}>
                {process.candidateName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status Filter */}
      <div className="w-full sm:w-auto sm:min-w-[150px]">
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="TODO">To Do</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="DONE">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Priority Filter */}
      <div className="w-full sm:w-auto sm:min-w-[150px]">
        <Select value={selectedPriority} onValueChange={onPriorityChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="LOW">🟢 Low</SelectItem>
            <SelectItem value="MEDIUM">🟡 Medium</SelectItem>
            <SelectItem value="HIGH">🔴 High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
