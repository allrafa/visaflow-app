'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Mail, CheckSquare } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const quickActions = [
  {
    title: 'Novo Processo',
    description: 'Criar um novo processo EB-1A',
    href: '/dashboard/process/new',
    icon: Plus,
    variant: 'default' as const,
  },
  {
    title: 'Gerenciar Critérios',
    description: 'Adicionar ou editar critérios',
    href: '/dashboard/process',
    icon: FileText,
    variant: 'outline' as const,
  },
  {
    title: 'Cartas de Recomendação',
    description: 'Gerenciar cartas de recomendação',
    href: '/dashboard/letters',
    icon: Mail,
    variant: 'outline' as const,
  },
  {
    title: 'Final Merits Statement',
    description: 'Gerar documento final',
    href: '/dashboard/final-merits',
    icon: CheckSquare,
    variant: 'outline' as const,
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <CardDescription>
          Acesso rápido às funcionalidades principais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 sm:grid-cols-2">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Button
                variant={action.variant}
                className="w-full justify-start gap-2"
              >
                <action.icon className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs opacity-70">
                    {action.description}
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}



