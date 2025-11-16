import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getProcessById } from '@/lib/services/processService';
import { getCriteriaByProcessId } from '@/lib/services/criteriaService';
import { getAllCriteriaTemplates } from '@/lib/templates/criteria';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';

export default async function CriteriaListPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let user;
  try {
    user = await getAuthUser();
  } catch {
    redirect('/login');
  }

  const { id: processId } = await params;
  
  // Verificar ownership
  let process;
  try {
    process = await getProcessById(processId, user.id);
  } catch {
    redirect('/dashboard');
  }

  const existingCriteria = await getCriteriaByProcessId(processId);
  const allTemplates = getAllCriteriaTemplates();
  
  const existingCriteriaMap = new Map<string, typeof existingCriteria[0]>(
    existingCriteria.map((c) => [c.criteria, c])
  );

  return (
    <div className="container space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Critérios EB-1A</h1>
        <p className="text-muted-foreground">
          Gerencie os critérios do processo: {process.title}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allTemplates.map((template) => {
          const existing = existingCriteriaMap.get(template.id);
          const isCreated = !!existing;

          return (
            <Card key={template.id} className={isCreated ? 'border-green-500' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">
                      {template.description}
                    </CardDescription>
                  </div>
                  {isCreated ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 ml-2" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-2" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  {template.subsections.length} subseções obrigatórias
                </div>
                {existing && existing.isValidated && existing.validationScore !== null && (
                  <Badge variant="secondary">
                    Score: {existing.validationScore}/100
                  </Badge>
                )}
                <Link
                  href={
                    isCreated
                      ? `/dashboard/process/${processId}/criteria/${existing.id}`
                      : `/dashboard/process/${processId}/criteria/${template.id}/create`
                  }
                >
                  <Button variant={isCreated ? 'outline' : 'default'} className="w-full">
                    {isCreated ? 'Editar' : 'Criar'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

