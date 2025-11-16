'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface DocSection {
  title: string;
  items: {
    title: string;
    href: string;
  }[];
}

const DOC_SECTIONS: DocSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '#introduction' },
      { title: 'Quick Start', href: '#quick-start' },
      { title: 'System Overview', href: '#overview' },
    ],
  },
  {
    title: 'Core Features',
    items: [
      { title: 'Processes', href: '#processes' },
      { title: 'Tasks', href: '#tasks' },
      { title: 'Criteria', href: '#criteria' },
      { title: 'Letters', href: '#letters' },
      { title: 'Final Merits', href: '#final-merits' },
    ],
  },
  {
    title: 'EB-1A Guide',
    items: [
      { title: 'What is EB-1A?', href: '#what-is-eb1a' },
      { title: 'Eligibility', href: '#eligibility' },
      { title: 'Documentation', href: '#documentation' },
      { title: 'Common Mistakes', href: '#mistakes' },
    ],
  },
  {
    title: 'Best Practices',
    items: [
      { title: 'Building Your Case', href: '#building-case' },
      { title: 'Evidence Quality', href: '#evidence-quality' },
      { title: 'Letter Writing', href: '#letter-writing' },
    ],
  },
];

export function DocsNavigation() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {DOC_SECTIONS.map((section, sectionIdx) => (
        <div key={sectionIdx}>
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            {section.title}
          </h3>
          <ul className="space-y-1">
            {section.items.map((item, itemIdx) => (
              <li key={itemIdx}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                    'hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
