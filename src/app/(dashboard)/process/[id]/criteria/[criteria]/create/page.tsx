'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCriteriaSchema, type CreateCriteriaInput } from '@/lib/validators/criteria.schema';
import { getCriteriaTemplate } from '@/lib/templates/criteria';
import { CriteriaForm } from '@/components/criteria/CriteriaForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateCriteriaPage({
  params,
}: {
  params: Promise<{ id: string; criteria: string }>;
}) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [processId, setProcessId] = useState<string | null>(null);
  const [criteriaId, setCriteriaId] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => {
      setProcessId(p.id);
      setCriteriaId(p.criteria);
    });
  }, [params]);

  if (!processId || !criteriaId) {
    return <div>Loading...</div>;
  }

  const template = getCriteriaTemplate(criteriaId);
  if (!template) {
    router.push(`/dashboard/process/${processId}`);
    return null;
  }

  const handleCreate = async (data: {
    overview?: string;
    context?: string;
    impact?: string;
    evidence?: string;
  }) => {
    setCreating(true);
    try {
      const response = await fetch('/api/criteria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          processId,
          criteria: criteriaId,
          ...data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create criteria');
      }

      const created = await response.json();
      router.push(`/dashboard/process/${processId}/criteria/${created.id}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container max-w-5xl space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/process/${processId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Criar: {template.name}</h1>
          <p className="text-muted-foreground">{template.description}</p>
        </div>
      </div>

      <CreateCriteriaForm
        processId={processId}
        criteriaId={criteriaId}
        template={template}
        onSubmit={handleCreate}
        creating={creating}
      />
    </div>
  );
}

function CreateCriteriaForm({
  processId,
  criteriaId,
  template,
  onSubmit,
  creating,
}: {
  processId: string;
  criteriaId: string;
  template: any;
  onSubmit: (data: any) => void;
  creating: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCriteriaInput>({
    resolver: zodResolver(createCriteriaSchema),
    defaultValues: {
      processId,
      criteria: criteriaId as any,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {template.subsections.map((subsection: any, index: number) => (
        <Card key={subsection.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">
                  {index + 1}. {subsection.title}
                </CardTitle>
                <CardDescription className="mt-1">
                  {subsection.description}
                </CardDescription>
              </div>
              {subsection.required && (
                <span className="text-xs text-muted-foreground">Obrigatório</span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              {...register(
                subsection.id === 'recipient' ? 'overview' :
                subsection.id === 'excellence' ? 'context' :
                subsection.id === 'requirements' ? 'impact' :
                'evidence'
              )}
              placeholder={subsection.placeholder}
              rows={8}
              className="font-mono text-sm"
              disabled={creating}
            />
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end gap-2">
        <Link href={`/dashboard/process/${processId}`}>
          <Button type="button" variant="outline" disabled={creating}>
            Cancelar
          </Button>
        </Link>
        <Button type="submit" disabled={creating}>
          {creating ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Criando...
            </>
          ) : (
            'Criar Critério'
          )}
        </Button>
      </div>
    </form>
  );
}

