-- ============================================
-- CRIAR TABELA TASKS DO VISAFLOW
-- ============================================
-- Esta migration cria a tabela tasks específica do VisaFlow
-- NOTA: Se já existe uma tabela tasks de outro projeto, 
-- este SQL vai falhar. Nesse caso, precisamos adaptar.

-- Criar tabela tasks do VisaFlow
CREATE TABLE IF NOT EXISTS "tasks" (
    "id" TEXT NOT NULL,
    "process_id" TEXT NOT NULL,
    "phase" "ProcessPhase" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "order" INTEGER NOT NULL DEFAULT 0,
    "depends_on" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- Criar índice
CREATE INDEX IF NOT EXISTS "tasks_process_id_phase_idx" ON "tasks"("process_id", "phase");

-- Foreign key para processes
DO $$ BEGIN
    ALTER TABLE "tasks" ADD CONSTRAINT "tasks_process_id_fkey" 
    FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Atualizar foreign key de uploads para usar tasks
DO $$ BEGIN
    ALTER TABLE "uploads" DROP CONSTRAINT IF EXISTS "uploads_task_id_fkey";
    ALTER TABLE "uploads" ADD CONSTRAINT "uploads_task_id_fkey" 
    FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;



