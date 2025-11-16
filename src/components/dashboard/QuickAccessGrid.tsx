'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { FolderPlus, CheckSquare, Mail, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickAccessItem {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  badge?: string;
}

interface QuickAccessGridProps {
  pendingTasks?: number;
  draftLetters?: number;
}

export function QuickAccessGrid({ pendingTasks = 0, draftLetters = 0 }: QuickAccessGridProps) {
  const items: QuickAccessItem[] = [
    {
      title: 'Start New Process',
      description: 'Begin a new EB-1A petition',
      href: '/dashboard/process/new',
      icon: FolderPlus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'My Tasks',
      description: `${pendingTasks} pending tasks`,
      href: '/dashboard/tasks',
      icon: CheckSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      badge: pendingTasks > 0 ? pendingTasks.toString() : undefined,
    },
    {
      title: 'Letters',
      description: `${draftLetters} drafts`,
      href: '/dashboard/letters',
      icon: Mail,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      badge: draftLetters > 0 ? draftLetters.toString() : undefined,
    },
    {
      title: 'Reports & Analytics',
      description: 'View your progress',
      href: '/dashboard/analytics',
      icon: BarChart3,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <Card className="group cursor-pointer p-6 transition-all hover:shadow-lg hover:border-blue-300 relative">
            {item.badge && (
              <div className="absolute top-4 right-4">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {item.badge}
                </span>
              </div>
            )}

            <div className="flex flex-col items-center text-center space-y-3">
              <div className={cn('rounded-lg p-3 transition-colors', item.bgColor, 'group-hover:scale-110 transition-transform')}>
                <item.icon className={cn('h-6 w-6', item.color)} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
