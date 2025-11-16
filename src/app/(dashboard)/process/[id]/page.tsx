import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { getProcessById } from '@/lib/services/processService';
import { TimelinePhases } from '@/components/dashboard/TimelinePhases';
import { TaskBoardSection } from './TaskBoardSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2, ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

export default async function ProcessDetailPage({
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

  const { id } = await params;
  let process;
  try {
    process = await getProcessById(id, user.id);
  } catch {
    redirect('/dashboard');
  }

  return (
    <div className="container space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{process.title}</h1>
            {process.description && (
              <p className="text-muted-foreground">{process.description}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/final-merits/${id}`}>
            <Button variant="default">
              <FileText className="mr-2 h-4 w-4" />
              Final Merits
            </Button>
          </Link>
          <Link href={`/dashboard/process/${id}/edit`}>
            <Button variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </Link>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Deletar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {process.northStar && (
            <Card>
              <CardHeader>
                <CardTitle>North Star Statement</CardTitle>
                <CardDescription>
                  Tese principal do seu caso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm">
                  {process.northStar}
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tarefas</CardTitle>
                  <CardDescription>
                    {process.tasks.length} tarefas no total
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Link href={`/dashboard/letters/${process.id}`}>
                    <Button variant="outline" size="sm">
                      Recommendation Letters
                    </Button>
                  </Link>
                  <Link href={`/dashboard/process/${process.id}/criteria`}>
                    <Button variant="outline" size="sm">
                      Gerenciar Critérios
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <TaskBoardSection processId={process.id} />
            </CardContent>
          </Card>
        </div>

        <div>
          <TimelinePhases
            currentPhase={process.currentPhase as any}
            processId={process.id}
            progress={process.progress}
          />
        </div>
      </div>
    </div>
  );
}

