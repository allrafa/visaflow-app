-- ============================================
-- MIGRATION 002: CRIAR APENAS TABELAS VISAFLOW
-- ============================================
-- Esta migration cria apenas as tabelas específicas do VisaFlow
-- Não cria users/tasks/audit_logs pois já existem de outro projeto

-- Criar Tabelas específicas do VisaFlow
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

-- Criar Índices
CREATE INDEX IF NOT EXISTS "processes_user_id_idx" ON "processes"("user_id");
CREATE INDEX IF NOT EXISTS "uploads_task_id_idx" ON "uploads"("task_id");
CREATE INDEX IF NOT EXISTS "criteria_evidences_process_id_criteria_idx" ON "criteria_evidences"("process_id", "criteria");
CREATE INDEX IF NOT EXISTS "recommendation_letters_process_id_idx" ON "recommendation_letters"("process_id");

-- NOTA: Foreign keys serão criadas depois, pois precisamos criar uma tabela tasks específica do VisaFlow
-- ou adaptar a estrutura existente



