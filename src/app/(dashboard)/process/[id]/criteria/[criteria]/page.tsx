import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getProcessById } from '@/lib/services/processService';
import { getCriteriaById } from '@/lib/services/criteriaService';
import { CriteriaForm } from '@/components/criteria/CriteriaForm';
import { CriteriaValidator } from '@/components/criteria/CriteriaValidator';
import { SuspiciousAlerts } from '@/components/validation/SuspiciousAlerts';
import { MetricsCalculator } from '@/components/criteria/MetricsCalculator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getCriteriaTemplate } from '@/lib/templates/criteria';

export default async function CriteriaDetailPage({
  params,
}: {
  params: Promise<{ id: string; criteria: string }>;
}) {
  let user;
  try {
    user = await getAuthUser();
  } catch {
    redirect('/login');
  }

  const { id: processId, criteria: criteriaId } = await params;
  
  // Verificar ownership
  let process;
  try {
    process = await getProcessById(processId, user.id);
  } catch {
    redirect('/dashboard');
  }

  // Buscar critério existente
  // Nota: criteriaId aqui é o ID do critério, não o tipo
  // Se não existir, redirecionar para criação
  let criteria;
  try {
    criteria = await getCriteriaById(criteriaId);
    if (criteria.process.id !== processId) {
      redirect(`/dashboard/process/${processId}`);
    }
  } catch {
    // Critério não existe, redirecionar para criação
    redirect(`/dashboard/process/${processId}/criteria/${criteriaId}/create`);
  }

  const template = getCriteriaTemplate(criteriaId);
  if (!template) {
    redirect(`/dashboard/process/${processId}`);
  }

  const content = criteria
    ? {
        overview: criteria.overview ?? undefined,
        context: criteria.context ?? undefined,
        impact: criteria.impact ?? undefined,
        evidence: criteria.evidence ?? undefined,
      }
    : {
        overview: undefined,
        context: undefined,
        impact: undefined,
        evidence: undefined,
      };

  const allContent = [
    criteria?.overview || '',
    criteria?.context || '',
    criteria?.impact || '',
    criteria?.evidence || '',
  ].join('\n\n');

  return (
    <div className="container max-w-5xl space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/process/${processId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{template.name}</h1>
          <p className="text-muted-foreground">{template.description}</p>
        </div>
      </div>

      <SuspiciousAlerts content={allContent} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {criteria ? (
            <CriteriaForm
              criteriaId={criteriaId}
              processId={processId}
              initialData={criteria}
              onSave={() => window.location.reload()}
            />
          ) : (
            <div className="rounded-lg border border-dashed p-12 text-center">
              <p className="text-muted-foreground mb-4">
                Este critério ainda não foi criado.
              </p>
              <Link href={`/dashboard/process/${processId}/criteria/${criteriaId}/create`}>
                <Button>Criar Critério</Button>
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {criteria && (
            <>
              <CriteriaValidator
                criteriaId={criteriaId}
                content={content}
              />
              <MetricsCalculator criteria={criteriaId} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

