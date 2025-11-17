# ✅ APLICAR MIGRATION 009 - VERSÃO CORRIGIDA

**Data:** 17/11/2025
**Status:** ✅ **PRONTO PARA APLICAR**

---

## 🎯 CORREÇÕES APLICADAS

### ✅ Problema 1: UUID incompatível
- **Antes:** Usava `UUID`
- **Depois:** Usa `TEXT` (compatível com schema existente)

### ✅ Problema 2: Tabela collaborators não existe
- **Antes:** Policy referenciava `collaborators` (não existe ainda)
- **Depois:** Policy simplificada (apenas processos próprios)
- **Nota:** Quando Sprint 4 for implementado, a policy será atualizada

---

## 📋 PASSO A PASSO (5 MINUTOS)

### 1. Acesse Supabase Dashboard

URL: https://supabase.com/dashboard

### 2. Selecione Projeto VisaFlow

Clique no seu projeto na lista

### 3. Abra SQL Editor

Menu lateral → **SQL Editor** → **New Query**

### 4. Cole o SQL Corrigido

Copie **TODO** o conteúdo abaixo:

\`\`\`sql
-- Migration 009: Create Activities Table
-- Data: 16/11/2025
-- Descrição: Tabela de atividades para timeline user-friendly do processo

-- ============================================
-- 1. CREATE ENUM: ActivityAction
-- ============================================

CREATE TYPE activity_action AS ENUM (
  -- Process actions
  'PROCESS_CREATED',
  'PROCESS_UPDATED',
  'PROCESS_DELETED',

  -- Task actions
  'TASK_CREATED',
  'TASK_UPDATED',
  'TASK_COMPLETED',
  'TASK_DELETED',

  -- Criteria actions
  'CRITERIA_CREATED',
  'CRITERIA_UPDATED',
  'CRITERIA_VALIDATED',
  'CRITERIA_DELETED',

  -- Letter actions
  'LETTER_CREATED',
  'LETTER_UPDATED',
  'LETTER_SENT',
  'LETTER_SIGNED',
  'LETTER_DELETED',

  -- Upload actions
  'FILE_UPLOADED',
  'FILE_DELETED',

  -- Collaborator actions
  'COLLABORATOR_INVITED',
  'COLLABORATOR_ACCEPTED',
  'COLLABORATOR_REMOVED'
);

-- ============================================
-- 2. CREATE TABLE: activities
-- ============================================

CREATE TABLE activities (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  process_id TEXT NOT NULL REFERENCES processes(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL, -- Supabase Auth user ID (TEXT para compatibilidade)
  user_name TEXT, -- Cache do nome para performance
  action activity_action NOT NULL,

  -- Entidade afetada
  entity_type TEXT NOT NULL, -- "task", "criteria", "letter", "file"
  entity_id TEXT, -- TEXT para compatibilidade com todos os IDs
  entity_name TEXT, -- Cache do nome/título para exibir

  -- Descrição legível (gerada automaticamente)
  description TEXT NOT NULL,

  -- Metadata adicional (JSON)
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Timestamp
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 3. CREATE INDEXES
-- ============================================

-- Index para queries por processo (mais comum)
CREATE INDEX idx_activities_process_created
  ON activities(process_id, created_at DESC);

-- Index para queries por usuário
CREATE INDEX idx_activities_user_created
  ON activities(user_id, created_at DESC);

-- Index para queries por tipo de ação
CREATE INDEX idx_activities_action
  ON activities(action);

-- Index para queries por entidade
CREATE INDEX idx_activities_entity
  ON activities(entity_type, entity_id);

-- Index GIN para metadata (permite queries em JSON)
CREATE INDEX idx_activities_metadata
  ON activities USING GIN (metadata);

-- ============================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Policy: Usuários podem ver atividades dos processos que pertencem
-- NOTA: Quando implementar colaboradores (Sprint 4), adicionar UNION com tabela collaborators
CREATE POLICY "Users can view activities of their processes"
  ON activities
  FOR SELECT
  USING (
    process_id IN (
      SELECT id FROM processes WHERE user_id = auth.uid()::text
    )
  );

-- Policy: Sistema pode inserir atividades (via service role)
CREATE POLICY "Service can insert activities"
  ON activities
  FOR INSERT
  WITH CHECK (true);

-- Policy: Ninguém pode atualizar ou deletar atividades (append-only log)
-- Não criar policies de UPDATE/DELETE = nega por padrão

-- ============================================
-- 5. COMMENTS (Documentação)
-- ============================================

COMMENT ON TABLE activities IS 'Timeline user-friendly de atividades do processo EB-1A';
COMMENT ON COLUMN activities.process_id IS 'ID do processo relacionado';
COMMENT ON COLUMN activities.user_id IS 'ID do usuário que executou a ação (Supabase Auth)';
COMMENT ON COLUMN activities.user_name IS 'Cache do nome do usuário para performance (evita joins)';
COMMENT ON COLUMN activities.action IS 'Tipo de ação executada (enum)';
COMMENT ON COLUMN activities.entity_type IS 'Tipo de entidade afetada (task, criteria, letter, file)';
COMMENT ON COLUMN activities.entity_id IS 'ID da entidade afetada';
COMMENT ON COLUMN activities.entity_name IS 'Cache do nome/título da entidade para exibir';
COMMENT ON COLUMN activities.description IS 'Descrição legível da ação (ex: "Rafael completou a tarefa Avaliar Elegibilidade")';
COMMENT ON COLUMN activities.metadata IS 'Dados extras específicos da ação (JSON)';

-- ============================================
-- 6. FUNCTION: Limpar atividades antigas (opcional, para manutenção)
-- ============================================

CREATE OR REPLACE FUNCTION cleanup_old_activities(days_to_keep INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM activities
  WHERE created_at < NOW() - (days_to_keep || ' days')::INTERVAL;

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION cleanup_old_activities IS 'Remove atividades mais antigas que X dias (padrão: 90 dias)';

-- ============================================
-- Migration completa
-- ============================================
\`\`\`

### 5. Execute

Clique no botão **Run** (ou pressione Ctrl+Enter)

### 6. Aguarde Sucesso

Você deve ver:
```
Success. No rows returned
```

---

## ✅ VERIFICAR SE FUNCIONOU

Execute esta query para confirmar:

\`\`\`sql
-- Verificar se tabela foi criada
SELECT COUNT(*) FROM activities;
-- Deve retornar: 0

-- Verificar enum
SELECT unnest(enum_range(NULL::activity_action));
-- Deve retornar: 23 linhas (os 23 tipos de ação)
\`\`\`

---

## 🎉 APÓS APLICAR COM SUCESSO

### Teste a Página

1. Acesse: http://localhost:3002/dashboard/activity
2. Você deve ver a página de **Atividades Recentes**
3. Como ainda não há atividades, verá:
   - 3 cards de estatísticas (todos com valor 0)
   - Filtros funcionais
   - Mensagem "Nenhuma atividade recente"

**Isso é normal e significa que funcionou!** ✅

---

## 📊 O QUE FOI CRIADO

| Item | Quantidade | Status |
|------|------------|--------|
| Enum `activity_action` | 23 valores | ✅ |
| Tabela `activities` | 10 colunas | ✅ |
| Indexes | 5 | ✅ |
| RLS Policies | 2 | ✅ |
| Functions | 1 (`cleanup_old_activities`) | ✅ |

---

## 🔮 PRÓXIMOS PASSOS

Depois que a migration estiver aplicada:

1. ✅ Página `/dashboard/activity` funcionará
2. ⏳ Integrar `logActivity()` nas APIs (Sprint futuro)
3. ⏳ Começar a rastrear ações automaticamente

---

## ❓ SE DER ERRO

### Erro: "type activity_action already exists"

**Solução:** Você já executou parte da migration antes. Execute:

\`\`\`sql
-- Limpar e tentar novamente
DROP TYPE IF EXISTS activity_action CASCADE;
DROP TABLE IF EXISTS activities CASCADE;

-- Depois execute a migration completa novamente
\`\`\`

### Erro: "relation activities already exists"

**Solução:** Tabela já foi criada. Apenas verifique:

\`\`\`sql
SELECT COUNT(*) FROM activities;
\`\`\`

Se retornar 0, está funcionando!

---

**Boa sorte!** 🚀

Se funcionar, me avise que eu atualizo a documentação com o status de "Migration Aplicada".
