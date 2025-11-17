'use client';

import Link from 'next/link';
import { FolderPlus, CheckSquare, Mail, BarChart3 } from 'lucide-react';

interface QuickAccessItem {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  purpleShade: 'purple-1' | 'purple-2' | 'purple-3';
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
      purpleShade: 'purple-1',
    },
    {
      title: 'My Tasks',
      description: `${pendingTasks} pending tasks`,
      href: '/dashboard/tasks',
      icon: CheckSquare,
      purpleShade: 'purple-2',
      badge: pendingTasks > 0 ? pendingTasks.toString() : undefined,
    },
    {
      title: 'Letters',
      description: `${draftLetters} drafts`,
      href: '/dashboard/letters',
      icon: Mail,
      purpleShade: 'purple-3',
      badge: draftLetters > 0 ? draftLetters.toString() : undefined,
    },
    {
      title: 'Reports & Analytics',
      description: 'View your progress',
      href: '/dashboard/analytics',
      icon: BarChart3,
      purpleShade: 'purple-1',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-fade-in">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <div className="card-hover group cursor-pointer p-6 relative">
            {item.badge && (
              <div className="absolute top-4 right-4">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs font-bold text-white">
                  {item.badge}
                </span>
              </div>
            )}

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="icon-container rounded-lg p-3 bg-purple-muted">
                <item.icon className={`h-6 w-6 text-${item.purpleShade}`} />
              </div>

              <div>
                <h3 className="text-subtitle font-semibold">{item.title}</h3>
                <p className="mt-1 text-body text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
