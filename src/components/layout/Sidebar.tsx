'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import {
  LayoutDashboard,
  FolderOpen,
  Award,
  Mail,
  FileText,
  HelpCircle,
  Clock,
  ListTodo,
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
    description: 'Overview of all processes and progress',
  },
  {
    name: 'My Processes',
    href: '/dashboard',
    icon: FolderOpen,
    description: 'Manage your EB-1A processes - view all tasks organized by phase',
  },
  {
    name: 'Criteria',
    href: '/dashboard/criteria',
    icon: Award,
    description: 'Prove 3+ of 10 EB-1A criteria - Core of your petition (80% of weight). Each criterion requires 4 subsections with evidence.',
  },
  {
    name: 'Letters',
    href: '/dashboard/letters',
    icon: Mail,
    description: 'Obtain 5-7 recommendation letters from recognized experts - External validation (20% of weight)',
  },
  {
    name: 'Final Merits',
    href: '/dashboard/final-merits',
    icon: FileText,
    description: 'Generate complete I-140 petition (20-30 pages) - Demonstrates sustained international acclaim beyond minimum criteria',
  },
];

const secondaryNavigation: NavItem[] = [
  {
    name: 'Next Actions',
    href: '/dashboard/actions',
    icon: ListTodo,
    description: 'View all prioritized actions across processes',
  },
  {
    name: 'Recent Activity',
    href: '/dashboard/activity',
    icon: Clock,
    description: 'View complete timeline of actions and changes',
  },
  {
    name: 'Help & Docs',
    href: '/dashboard/help',
    icon: HelpCircle,
    description: 'Documentation and guides',
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
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {/* Main Navigation */}
        <div className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = isActiveRoute(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={isActive ? 'sidebar-item-active' : 'sidebar-item'}
                title={item.description}
              >
                <div className="icon-container">
                  <item.icon className="sidebar-icon text-purple-1" />
                </div>
                <span className="flex-1">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Secondary Navigation */}
        <div className="sidebar-footer space-y-1">
          {secondaryNavigation.map((item) => {
            const isActive = isActiveRoute(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={isActive ? 'sidebar-item-active' : 'sidebar-item'}
                title={item.description}
              >
                <div className="icon-container">
                  <item.icon className="sidebar-icon text-purple-2" />
                </div>
                <span className="flex-1">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}



