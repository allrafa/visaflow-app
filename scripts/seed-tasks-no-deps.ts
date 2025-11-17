/**
 * Script para popular tarefas SEM dependências (resolve problema de deps circulares)
 *
 * Uso:
 * npx tsx scripts/seed-tasks-no-deps.ts
 */

import { prisma } from '../src/lib/db/client';
import { DEFAULT_TASKS } from '../src/lib/constants/default-tasks';

async function main() {
  console.log('🔍 Buscando processos sem tarefas...\n');

  // Buscar todos os processos
  const processes = await prisma.process.findMany({
    include: {
      _count: {
        select: {
          tasks: true,
        },
      },
    },
  });

  console.log(`📊 Total de processos encontrados: ${processes.length}\n`);

  for (const process of processes) {
    const taskCount = process._count.tasks;

    console.log(`📁 Processo: ${process.title}`);
    console.log(`   ID: ${process.id}`);
    console.log(`   Tarefas atuais: ${taskCount}`);

    if (taskCount === 0) {
      console.log(`   ⚠️  NENHUMA TAREFA! Criando ${DEFAULT_TASKS.length} tarefas SEM dependências...`);

      try {
        // Criar tarefas SEM dependências (deixar vazio por enquanto)
        const tasksToCreate = DEFAULT_TASKS.map((task) => ({
          processId: process.id,
          phase: task.phase,
          title: task.title,
          description: task.description,
          status: 'PENDING' as const,
          order: task.order,
          dependsOn: [], // ✅ IGNORA dependências temporariamente
        }));

        await prisma.task.createMany({
          data: tasksToCreate,
          skipDuplicates: true,
        });

        // Verificar quantas foram criadas
        const newCount = await prisma.task.count({
          where: { processId: process.id },
        });

        console.log(`   ✅ Sucesso! ${newCount} tarefas criadas!\n`);
        console.log(`   ℹ️  Nota: Dependências foram removidas temporariamente`);
        console.log(`   ℹ️  Você pode adicionar dependências manualmente depois se necessário\n`);
      } catch (error: any) {
        console.error(`   ❌ Erro ao criar tarefas:`, error.message);
      }
    } else if (taskCount < DEFAULT_TASKS.length) {
      console.log(`   ⚠️  Apenas ${taskCount}/${DEFAULT_TASKS.length} tarefas. Considere recriar.\n`);
    } else {
      console.log(`   ✅ OK! Processo já tem ${taskCount} tarefas.\n`);
    }
  }

  console.log('✨ Finalizado!');
  console.log('\n📍 Próximo passo: Acesse http://localhost:3002/dashboard/process/[id] para ver as tarefas!');
}

main()
  .catch((error) => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
