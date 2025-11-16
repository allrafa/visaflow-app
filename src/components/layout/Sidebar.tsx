'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import {
  LayoutDashboard,
  FolderOpen,
  ListChecks,
  Award,
  Mail,
  FileText,
  HelpCircle,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  description?: string;
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview of all processes',
  },
  {
    name: 'My Processes',
    href: '/process',
    icon: FolderOpen,
    description: 'Manage EB-1A processes',
  },
  {
    name: 'Tasks',
    href: '/tasks',
    icon: ListChecks,
    description: 'Track progress',
  },
  {
    name: 'Criteria',
    href: '/criteria',
    icon: Award,
    description: '10 EB-1A criteria',
  },
  {
    name: 'Letters',
    href: '/letters',
    icon: Mail,
    description: 'Recommendation letters',
  },
  {
    name: 'Final Merits',
    href: '/final-merits',
    icon: FileText,
    description: 'Generate I-140',
  },
];

const secondaryNavigation: NavItem[] = [
  {
    name: 'Help & Docs',
    href: '/help',
    icon: HelpCircle,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActiveRoute = (href: string): boolean => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden w-64 border-r bg-gray-50 md:block">
      <nav className="flex h-full flex-col">
        {/* Main Navigation */}
        <div className="flex-1 space-y-1 p-4">
          <p className="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Main Menu
          </p>
          {navigation.map((item) => {
            const isActive = isActiveRoute(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
                title={item.description}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5 flex-shrink-0 transition-colors',
                    isActive
                      ? 'text-white'
                      : 'text-gray-500 group-hover:text-gray-700'
                  )}
                />
                <span className="flex-1">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Secondary Navigation */}
        <div className="border-t p-4">
          {secondaryNavigation.map((item) => {
            const isActive = isActiveRoute(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5 flex-shrink-0',
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-gray-600'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}



