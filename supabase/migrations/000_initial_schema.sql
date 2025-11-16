-- ============================================
-- MIGRATION INICIAL - SCHEMA COMPLETO
-- ============================================
-- Aplicar este SQL PRIMEIRO no Supabase Dashboard
-- Depois aplicar o RLS (001_enable_rls_safe.sql)

-- Criar Enums
DO $$ BEGIN
    CREATE TYPE "ProcessPhase" AS ENUM ('ELIGIBILITY', 'EVIDENCE', 'LETTERS', 'PETITION', 'FILING');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'WITH_UPLOAD', 'BLOCKED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "EB1Criteria" AS ENUM ('AWARDS', 'MEMBERSHIP', 'PRESS', 'JUDGING', 'ORIGINAL', 'SCHOLARLY', 'CRITICAL', 'HIGH_SALARY', 'EXHIBITIONS', 'COMMERCIAL_SUCCESS');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Criar Tabelas (com verificação de existência)
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "processes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "north_star" TEXT,
    "current_phase" "ProcessPhase" NOT NULL DEFAULT 'ELIGIBILITY',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "processes_pkey" PRIMARY KEY ("id")
);

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

CREATE TABLE IF NOT EXISTS "uploads" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_type" TEXT NOT NULL,
    "file_size" BIGINT NOT NULL,
    "file_url" TEXT NOT NULL,
    "storage_path" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "uploads_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "criteria_evidences" (
    "id" TEXT NOT NULL,
    "process_id" TEXT NOT NULL,
    "criteria" "EB1Criteria" NOT NULL,
    "overview" TEXT,
    "context" TEXT,
    "impact" TEXT,
    "evidence" TEXT,
    "metrics_data" JSONB,
    "is_validated" BOOLEAN NOT NULL DEFAULT false,
    "validation_score" INTEGER,
    "validation_issues" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "criteria_evidences_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "recommendation_letters" (
    "id" TEXT NOT NULL,
    "process_id" TEXT NOT NULL,
    "recommender_name" TEXT NOT NULL,
    "recommender_title" TEXT NOT NULL,
    "recommender_org" TEXT,
    "recommender_email" TEXT,
    "content" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "recommendation_letters_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "audit_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "before" JSONB,
    "after" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- Criar Índices (com verificação)
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");
CREATE INDEX IF NOT EXISTS "processes_user_id_idx" ON "processes"("user_id");
CREATE INDEX IF NOT EXISTS "tasks_process_id_phase_idx" ON "tasks"("process_id", "phase");
CREATE INDEX IF NOT EXISTS "uploads_task_id_idx" ON "uploads"("task_id");
CREATE INDEX IF NOT EXISTS "criteria_evidences_process_id_criteria_idx" ON "criteria_evidences"("process_id", "criteria");
CREATE INDEX IF NOT EXISTS "recommendation_letters_process_id_idx" ON "recommendation_letters"("process_id");
CREATE INDEX IF NOT EXISTS "audit_logs_user_id_created_at_idx" ON "audit_logs"("user_id", "created_at");
CREATE INDEX IF NOT EXISTS "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- Criar Foreign Keys (com verificação)
DO $$ BEGIN
    ALTER TABLE "processes" ADD CONSTRAINT "processes_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "tasks" ADD CONSTRAINT "tasks_process_id_fkey" 
    FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "uploads" ADD CONSTRAINT "uploads_task_id_fkey" 
    FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "criteria_evidences" ADD CONSTRAINT "criteria_evidences_process_id_fkey" 
    FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "recommendation_letters" ADD CONSTRAINT "recommendation_letters_process_id_fkey" 
    FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;



