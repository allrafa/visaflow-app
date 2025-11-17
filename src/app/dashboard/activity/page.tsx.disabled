import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { prisma } from '@/lib/db/client';
import { ActivityPageClient } from '@/components/activity/ActivityPageClient';

export const metadata = {
  title: 'Atividades Recentes | VisaFlow',
  description: 'Timeline completa de todas as atividades dos seus processos EB-1A',
};

export default async function ActivityPage() {
  // Auth check
  let user;
  try {
    user = await getAuthUser();
  } catch {
    redirect('/auth/login');
  }

  // Buscar todos os processos do usuário
  const processes = await prisma.process.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      title: true,
      currentPhase: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  // Buscar atividades recentes (últimos 30 dias)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // NOTA: Esta query vai falhar se a migration não foi aplicada
  // Retornamos array vazio para não quebrar a aplicação
  let activities = [];
  let totalActivities = 0;

  try {
    [activities, totalActivities] = await Promise.all([
      prisma.activity.findMany({
        where: {
          processId: {
            in: processes.map((p) => p.id),
          },
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 50, // Primeiras 50 atividades
      }),
      prisma.activity.count({
        where: {
          processId: {
            in: processes.map((p) => p.id),
          },
        },
      }),
    ]);
  } catch (error: any) {
    // Se tabela não existe, retorna vazio
    console.warn('Activity table not found. Please apply migration 009.');
    console.warn('Error:', error.message);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto space-y-8 p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Atividades Recentes
          </h1>
          <p className="mt-2 text-gray-600">
            Timeline completa de todas as ações nos seus processos EB-1A
          </p>
        </div>

        {/* Client Component with Filters and Feed */}
        <ActivityPageClient
          processes={processes}
          initialActivities={activities}
          totalActivities={totalActivities}
          userId={user.id}
        />
      </div>
    </div>
  );
}
