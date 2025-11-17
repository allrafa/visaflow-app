/**
 * Script para popular tarefas em processo existente
 *
 * Uso:
 * npx tsx scripts/seed-tasks-existing-process.ts
 */

import { prisma } from '../src/lib/db/client';
import { seedDefaultTasks } from '../src/lib/services/taskSeedService';

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
      console.log(`   ⚠️  NENHUMA TAREFA! Criando 290 tarefas...`);

      try {
        await seedDefaultTasks(process.id);

        // Verificar quantas foram criadas
        const newCount = await prisma.task.count({
          where: { processId: process.id },
        });

        console.log(`   ✅ Sucesso! ${newCount} tarefas criadas!\n`);
      } catch (error: any) {
        console.error(`   ❌ Erro ao criar tarefas:`, error.message);
      }
    } else if (taskCount < 290) {
      console.log(`   ⚠️  Apenas ${taskCount}/290 tarefas. Considere recriar.\n`);
    } else {
      console.log(`   ✅ OK! Processo já tem tarefas.\n`);
    }
  }

  console.log('✨ Finalizado!');
}

main()
  .catch((error) => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
