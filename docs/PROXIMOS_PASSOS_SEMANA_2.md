# 🎯 Próximos Passos - Semana 2 (Core Features)

**Data:** Janeiro 2025  
**Status:** Em progresso - Validação e Testes

---

## 📋 RESUMO DO STATUS ATUAL

### ✅ Implementado
- ✅ Dashboard completo
- ✅ Tasks CRUD (componentes e APIs)
- ✅ Upload System (componentes e APIs)
- ✅ Criteria Forms (componentes e APIs)
- ✅ Validation com IA (APIs e serviços)
- ✅ RLS policies criadas (migrations 001-005)

### ⏳ Pendente
- ⚠️ Configurar Supabase Storage bucket
- ⚠️ Aplicar migrations 005 e 006
- ⚠️ Testes em ambiente real
- ⚠️ Validação completa de funcionalidades

---

## 🚨 TAREFAS CRÍTICAS (Prioridade Alta)

### 1. Configurar Supabase Storage Bucket

**Prioridade:** 🔴 **ALTA** (bloqueia uploads)

**Passos:**

1. **Criar bucket manualmente no Supabase Dashboard:**
   - Acesse: https://supabase.com/dashboard/project/[seu-projeto]/storage/buckets
   - Clique em "New bucket"
   - Configure:
     - **Nome:** `uploads`
     - **Public:** ❌ false (bucket privado)
     - **File size limit:** `10485760` (10MB)
     - **Allowed MIME types:** 
       - `application/pdf`
       - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
       - `image/png`
       - `image/jpeg`

2. **Aplicar Migration 006:**
   - Acesse SQL Editor no Supabase Dashboard
   - Execute: `supabase/migrations/006_setup_storage_bucket.sql`
   - Ou execute via script: `npx tsx scripts/setup-storage.ts`

3. **Validar configuração:**
   ```bash
   npx tsx scripts/setup-storage.ts
   ```

**Arquivos relacionados:**
- `supabase/migrations/006_setup_storage_bucket.sql`
- `scripts/setup-storage.ts`
- `src/app/api/uploads/route.ts`

---

### 2. Aplicar Migration 005 - RLS Policies Faltantes

**Prioridade:** 🔴 **ALTA** (bloqueia operações UPDATE)

**Passos:**

1. **Aplicar migration no Supabase Dashboard:**
   - Acesse SQL Editor
   - Execute: `supabase/migrations/005_add_missing_rls_policies.sql`

2. **Validar aplicação:**
   ```bash
   npx tsx scripts/verify-all-rls-policies.ts
   ```

**O que esta migration faz:**
- Adiciona UPDATE policy para uploads
- Garante RLS habilitado em tasks
- Cria políticas completas para tasks (SELECT, INSERT, UPDATE, DELETE)

**Arquivos relacionados:**
- `supabase/migrations/005_add_missing_rls_policies.sql`
- `scripts/verify-all-rls-policies.ts`

---

## 🧪 TESTES EM AMBIENTE REAL

### 3. Testar Tasks CRUD Completo

**Prioridade:** 🟡 **MÉDIA**

**Checklist:**

- [ ] Criar processo de teste
- [ ] Criar task em cada fase
- [ ] Editar task (título, descrição, status)
- [ ] Mover task entre fases
- [ ] Adicionar dependências entre tasks
- [ ] Deletar task
- [ ] Verificar que tasks aparecem no TaskBoard
- [ ] Verificar que mudanças de status funcionam

**Como testar:**

1. Iniciar servidor: `npm run dev`
2. Fazer login no sistema
3. Criar novo processo
4. Navegar para página do processo
5. Testar todas as operações acima

**Arquivos relacionados:**
- `src/components/tasks/TaskBoard.tsx`
- `src/components/tasks/TaskModal.tsx`
- `src/app/api/tasks/route.ts`
- `src/app/api/tasks/[id]/route.ts`

---

### 4. Testar Upload System Completo

**Prioridade:** 🟡 **MÉDIA** (depende da tarefa 1)

**Checklist:**

- [ ] Fazer upload de arquivo PDF (< 10MB)
- [ ] Fazer upload de arquivo DOCX (< 10MB)
- [ ] Fazer upload de arquivo PNG (< 10MB)
- [ ] Fazer upload de arquivo JPG (< 10MB)
- [ ] Tentar upload de arquivo > 10MB (deve falhar)
- [ ] Tentar upload de tipo não permitido (deve falhar)
- [ ] Verificar arquivo aparece na lista
- [ ] Baixar arquivo (clicar no link)
- [ ] Deletar arquivo
- [ ] Verificar arquivo deletado do Storage

**Como testar:**

1. Garantir que bucket `uploads` está configurado (tarefa 1)
2. Criar processo e task
3. Na página da task, usar componente FileUpload
4. Testar todos os cenários acima

**Arquivos relacionados:**
- `src/components/shared/FileUpload.tsx`
- `src/app/api/uploads/route.ts`
- `src/lib/services/uploadService.ts`

---

### 5. Testar Criteria Forms Completo

**Prioridade:** 🟡 **MÉDIA**

**Checklist:**

- [ ] Criar critério para cada tipo (AWARDS, MEMBERSHIP, etc.)
- [ ] Preencher todas as 4 subseções (overview, context, impact, evidence)
- [ ] Verificar templates aparecem corretamente
- [ ] Verificar validação em tempo real (debounce)
- [ ] Clicar em "Validar com IA"
- [ ] Verificar score de qualidade aparece
- [ ] Verificar issues/sugestões aparecem
- [ ] Salvar critério
- [ ] Editar critério existente
- [ ] Verificar métricas calculadas

**Como testar:**

1. Criar processo
2. Navegar para página de critérios
3. Selecionar um critério
4. Preencher formulário
5. Testar validação com IA
6. Salvar e verificar

**Arquivos relacionados:**
- `src/components/criteria/CriteriaForm.tsx`
- `src/app/api/criteria/route.ts`
- `src/lib/templates/criteria.ts`
- `src/lib/services/criteriaService.ts`

---

### 6. Testar Validation com IA

**Prioridade:** 🟡 **MÉDIA**

**Checklist:**

- [ ] Validar conteúdo de critério (validate-content)
- [ ] Verificar score de qualidade (0-100)
- [ ] Verificar issues/sugestões retornadas
- [ ] Testar detecção de práticas suspeitas (detect-suspicious)
- [ ] Verificar alertas aparecem no formulário
- [ ] Testar geração de Final Merits (generate-merits)
- [ ] Verificar resposta estruturada

**Como testar:**

1. Garantir que `ANTHROPIC_API_KEY` está configurada
2. Preencher critério com conteúdo
3. Clicar em "Validar com IA"
4. Verificar resposta da API
5. Testar detecção de práticas suspeitas
6. Testar geração de Final Merits

**Arquivos relacionados:**
- `src/app/api/ai/validate-content/route.ts`
- `src/app/api/ai/detect-suspicious/route.ts`
- `src/app/api/ai/generate-merits/route.ts`
- `src/lib/services/aiService.ts`

---

## 📊 ORDEM DE EXECUÇÃO RECOMENDADA

1. **Configurar Storage** (tarefa 1) - 15min
2. **Aplicar Migration 005** (tarefa 2) - 10min
3. **Aplicar Migration 006** (tarefa 1, passo 2) - 10min
4. **Testar Tasks CRUD** (tarefa 3) - 30min
5. **Testar Upload System** (tarefa 4) - 30min
6. **Testar Criteria Forms** (tarefa 5) - 45min
7. **Testar Validation com IA** (tarefa 6) - 30min

**Tempo total estimado:** ~2.5 horas

---

## 🔍 VALIDAÇÕES FINAIS

Após completar todas as tarefas acima, validar:

- [ ] Todos os testes passando: `npm run test`
- [ ] Build compilando: `npm run build`
- [ ] Zero erros TypeScript: `npm run type-check`
- [ ] Zero warnings ESLint: `npm run lint`
- [ ] RLS validado: `npx tsx scripts/verify-all-rls-policies.ts`
- [ ] Storage configurado: `npx tsx scripts/setup-storage.ts`

---

## 📝 NOTAS IMPORTANTES

1. **Storage é crítico:** Uploads não funcionarão sem bucket configurado
2. **RLS é crítico:** Operações UPDATE podem falhar sem migration 005
3. **IA requer API key:** Validação com IA não funcionará sem `ANTHROPIC_API_KEY`
4. **Testes são essenciais:** Validar em ambiente real antes de considerar completo

---

## 🚀 PRÓXIMOS PASSOS APÓS VALIDAÇÃO

Após validar todas as funcionalidades acima:

1. **Semana 3 - Day 1:** Final Merits Generator
2. **Semana 3 - Day 2:** Letters Templates
3. **Semana 3 - Day 3:** Testes Completos
4. **Semana 3 - Day 4:** Polish UI/UX
5. **Semana 3 - Day 5:** Deploy + Monitoring

---

**Última atualização:** Janeiro 2025



