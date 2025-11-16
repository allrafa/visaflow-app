# ✅ Checklist Pré-Testes em Ambiente Real

**Data:** Janeiro 2025  
**Objetivo:** Validar que tudo está pronto para testes em ambiente real

---

## 🔍 Validação Automática

Execute o script de validação completa:

```bash
npm run validate:all
```

Este script verifica:
- ✅ TypeScript compila sem erros
- ✅ Build de produção compila
- ✅ Migrations críticas existem
- ✅ Scripts de verificação existem
- ✅ Variáveis de ambiente configuradas
- ✅ Testes unitários executam

---

## 🚨 Ações Críticas (Manuais)

### 1. Aplicar Migration 005 - RLS Policies

- [ ] Acessar Supabase Dashboard SQL Editor
- [ ] Abrir arquivo: `supabase/migrations/005_add_missing_rls_policies.sql`
- [ ] Copiar TODO o conteúdo
- [ ] Colar no SQL Editor
- [ ] Executar (Run)
- [ ] Validar: `npm run verify:rls`

**Status:** ⏳ Pendente

---

### 2. Configurar Supabase Storage Bucket

#### 2.1 Criar Bucket Manualmente

- [ ] Acessar: Supabase Dashboard → Storage → Buckets
- [ ] Clicar em "New bucket"
- [ ] Configurar:
  - [ ] Nome: `uploads` (exatamente)
  - [ ] Public: ❌ Desmarcado (privado)
  - [ ] File size limit: `10485760` (10MB)
  - [ ] Allowed MIME types:
    - [ ] `application/pdf`
    - [ ] `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
    - [ ] `image/png`
    - [ ] `image/jpeg`
- [ ] Clicar em "Create bucket"

#### 2.2 Aplicar Migration 006

- [ ] Acessar Supabase Dashboard SQL Editor
- [ ] Abrir arquivo: `supabase/migrations/006_setup_storage_bucket.sql`
- [ ] Copiar TODO o conteúdo
- [ ] Colar no SQL Editor
- [ ] Executar (Run)
- [ ] Validar: `npm run verify:storage`

**Status:** ⏳ Pendente

---

### 3. Validar Migrations Aplicadas

Execute:

```bash
npm run verify:migrations
```

Deve mostrar:
- ✅ Migration 005 aplicada (4 políticas de tasks encontradas)
- ✅ Migration 006 aplicada (bucket existe + 4 políticas de Storage)

**Status:** ⏳ Pendente

---

## 🧪 Preparação para Testes

### 4. Verificar Variáveis de Ambiente

- [ ] `NEXT_PUBLIC_SUPABASE_URL` configurada
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` configurada
- [ ] `SUPABASE_SERVICE_ROLE_KEY` configurada
- [ ] `ANTHROPIC_API_KEY` configurada (para testes de IA)
- [ ] `DATABASE_URL` configurada (Prisma)

**Como verificar:**
```bash
npx tsx scripts/validate-env.ts
```

**Status:** ✅ Configuradas (assumindo)

---

### 5. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

- [ ] Servidor inicia sem erros
- [ ] Acessível em http://localhost:3000
- [ ] Sem erros no console

**Status:** ⏳ Pendente (executar antes dos testes)

---

## 📋 Checklist de Testes em Ambiente Real

Após aplicar migrations e iniciar servidor:

### Tasks CRUD

- [ ] Criar processo de teste
- [ ] Criar task em cada fase (ELIGIBILITY, EVIDENCE, LETTERS, PETITION, FILING)
- [ ] Editar task (título, descrição, status)
- [ ] Adicionar dependências entre tasks
- [ ] Deletar task
- [ ] Verificar TaskBoard mostra todas as tasks

### Upload System

- [ ] Upload de arquivo PDF (< 10MB)
- [ ] Upload de arquivo DOCX (< 10MB)
- [ ] Upload de arquivo PNG (< 10MB)
- [ ] Upload de arquivo JPG (< 10MB)
- [ ] Tentar upload > 10MB (deve falhar)
- [ ] Tentar upload tipo não permitido (deve falhar)
- [ ] Baixar arquivo (clicar no link)
- [ ] Deletar arquivo
- [ ] Verificar arquivo deletado do Storage

### Criteria Forms

- [ ] Criar critério AWARDS
- [ ] Criar critério MEMBERSHIP
- [ ] Preencher todas as 4 subseções (overview, context, impact, evidence)
- [ ] Verificar templates aparecem corretamente
- [ ] Verificar validação em tempo real (debounce)
- [ ] Clicar em "Validar com IA"
- [ ] Verificar score de qualidade aparece
- [ ] Salvar critério
- [ ] Editar critério existente

### Validation com IA

- [ ] Validar conteúdo de critério (validate-content)
- [ ] Verificar score de qualidade (0-100)
- [ ] Verificar issues/sugestões retornadas
- [ ] Testar detecção de práticas suspeitas (detect-suspicious)
- [ ] Verificar alertas aparecem no formulário
- [ ] Testar geração de Final Merits (generate-merits)

---

## ✅ Critérios de Sucesso

Todos os itens acima devem estar marcados antes de considerar Semana 2 completa.

---

## 📝 Notas

- **Migrations são críticas:** Sistema não funcionará completamente sem elas
- **Storage é crítico:** Uploads não funcionarão sem bucket configurado
- **IA requer API key:** Validação com IA não funcionará sem `ANTHROPIC_API_KEY`
- **Testes são essenciais:** Validar em ambiente real antes de considerar completo

---

**Última atualização:** Janeiro 2025



