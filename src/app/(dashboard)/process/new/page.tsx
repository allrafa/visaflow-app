'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProcessSchema, type CreateProcessInput } from '@/lib/validators/process.schema';
import { useCreateProcess } from '@/lib/hooks/useProcess';
import { useToast } from '@/lib/hooks/useToast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorMessage } from '@/components/shared/ErrorMessage';

export default function NewProcessPage() {
  const router = useRouter();
  const createProcessMutation = useCreateProcess();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProcessInput>({
    resolver: zodResolver(createProcessSchema),
  });

  const onSubmit = async (data: CreateProcessInput) => {
    try {
      const process = await createProcessMutation.mutateAsync(data);
      addToast({
        type: 'success',
        title: 'Processo criado',
        description: 'O processo foi criado com sucesso.',
      });
      router.push(`/process/${process.id}`);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao criar processo',
        description: err instanceof Error ? err.message : 'Ocorreu um erro ao criar o processo',
      });
    }
  };

  const loading = createProcessMutation.isPending;
  const error = createProcessMutation.error instanceof Error ? createProcessMutation.error.message : null;

  return (
    <div className="container max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Novo Processo</h1>
        <p className="text-muted-foreground">
          Crie um novo processo EB-1A
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Processo</CardTitle>
          <CardDescription>
            Preencha os dados básicos do seu processo
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4">
              <ErrorMessage message={error} />
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Título *
              </label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Ex: Rafael Raio - EB-1A Process"
                disabled={loading}
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Descrição
              </label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Descrição opcional do processo"
                rows={4}
                disabled={loading}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="northStar" className="text-sm font-medium">
                North Star Statement
              </label>
              <Textarea
                id="northStar"
                {...register('northStar')}
                placeholder="Tese principal do seu caso (opcional)"
                rows={6}
                disabled={loading}
              />
              {errors.northStar && (
                <p className="text-sm text-destructive">
                  {errors.northStar.message}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Criando...
                  </>
                ) : (
                  'Criar Processo'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}



