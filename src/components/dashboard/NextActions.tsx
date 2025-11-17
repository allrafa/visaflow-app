'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Clock, CheckCircle2, XCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export interface NextAction {
  id: string;
  priority: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW' | 'BLOCKED';
  title: string;
  description?: string;
  dueDate?: Date;
  href?: string;
  phase?: string;
}

interface NextActionsProps {
  actions: NextAction[];
  maxItems?: number;
}

const PRIORITY_CONFIG = {
  URGENT: {
    icon: AlertCircle,
    color: 'bg-red-100 text-red-800 border-red-200',
    iconColor: 'text-red-600',
    badge: 'bg-red-500',
  },
  HIGH: {
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    iconColor: 'text-yellow-600',
    badge: 'bg-yellow-500',
  },
  MEDIUM: {
    icon: Info,
    color: 'bg-green-100 text-green-800 border-green-200',
    iconColor: 'text-green-600',
    badge: 'bg-green-500',
  },
  LOW: {
    icon: CheckCircle2,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    iconColor: 'text-blue-600',
    badge: 'bg-blue-500',
  },
  BLOCKED: {
    icon: XCircle,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    iconColor: 'text-gray-600',
    badge: 'bg-gray-500',
  },
} as const;

export function NextActions({ actions, maxItems = 5 }: NextActionsProps) {
  const displayActions = actions.slice(0, maxItems);

  if (displayActions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Next Actions</CardTitle>
          <CardDescription>Próximas ações prioritárias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-green-500" />
            <p className="text-sm">Nenhuma ação pendente!</p>
            <p className="text-xs mt-1">Todas as tarefas estão em dia.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Next Actions</CardTitle>
        <CardDescription>Próximas ações prioritárias</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActions.map((action) => {
            const config = PRIORITY_CONFIG[action.priority];
            const Icon = config.icon;

            const content = (
              <div
                className={cn(
                  'flex items-start gap-3 rounded-lg border p-4 transition-all duration-200',
                  config.color,
                  'hover:shadow-md cursor-pointer hover:scale-[1.01]'
                )}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <Icon className={cn('h-5 w-5', config.iconColor)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className={cn(
                            'text-xs font-semibold text-white',
                            config.badge
                          )}
                        >
                          {action.priority}
                        </Badge>
                        {action.phase && (
                          <span className="text-xs text-muted-foreground">
                            {action.phase}
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-sm">{action.title}</h4>
                      {action.description && (
                        <p className="text-xs mt-1 opacity-80 line-clamp-2">
                          {action.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {action.dueDate && (
                    <div className="mt-2 text-xs opacity-70">
                      Due: {action.dueDate.toLocaleDateString('pt-BR')}
                    </div>
                  )}
                </div>
              </div>
            );

            if (action.href) {
              return (
                <Link key={action.id} href={action.href} className="block">
                  {content}
                </Link>
              );
            }

            return <div key={action.id}>{content}</div>;
          })}
        </div>

        {actions.length > maxItems && (
          <div className="mt-6">
            <Link href="/dashboard/actions" className="block">
              <Button variant="outline" size="sm" className="w-full hover:bg-purple-muted hover:border-purple-1 transition-colors">
                Ver todas as {actions.length} ações
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

