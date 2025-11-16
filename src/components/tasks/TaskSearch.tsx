'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TaskSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TaskSearch({
  value,
  onChange,
  placeholder = 'Search tasks...',
}: TaskSearchProps) {
  return (
    <div className="relative w-full sm:max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
