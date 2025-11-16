# 🎯 Próximos Passos - VisaFlow

**Data:** Janeiro 2025  
**Status:** ⏳ Ações Críticas Pendentes

---

## 📊 ANÁLISE DE COMPLEXIDADE

**Tipo:** MODERATE (5-8 etapas)  
**Etapas Identificadas:** 8 etapas principais  
**Dependências:** 
- Acesso ao Supabase Dashboard (manual)
- Migrations SQL prontas
- Scripts de validação prontos

---

## 🚨 AÇÕES CRÍTICAS (ALTA PRIORIDADE)

### 1️⃣ Aplicar Migration 005 - RLS Policies

**Status:** ⏳ Pendente  
**Tempo estimado:** 5-10 minutos  
**Tipo:** Ação manual no Supabase Dashboard

**Passos:**

1. Acesse o Supabase Dashboard SQL Editor:
   ```
   https://supabase.com/dashboard/project/[seu-projeto]/sql/new
   ```

2. Abra o arquivo:
   ```
   supabase/migrations/005_add_missing_rls_policies.sql
   ```

3. Copie **TODO** o conteúdo do arquivo

4. Cole no SQL Editor do Supabase

5. Execute (clique em "Run" ou pressione Cmd/Ctrl + Enter)

6. Verifique se não houve erros

**Validação:**
```bash
npx tsx scripts/verify-all-rls-policies.ts
```

---

### 2️⃣ Criar Bucket "uploads" no Supabase Storage

**Status:** ⏳ Pendente  
**Tempo estimado:** 3-5 minutos  
**Tipo:** Ação manual no Supabase Dashboard

**Passos:**

1. Acesse Storage no Dashboard:
   ```
   https://supabase.com/dashboard/project/[seu-projeto]/storage/buckets
   ```

2. Clique em **"New bucket"**

3. Configure:
   - **Nome:** `uploads` (exatamente este nome)
   - **Public:** ❌ **Desmarcado** (bucket privado)
   - **File size limit:** `10485760` (10MB)
   - **Allowed MIME types:** 
     - `application/pdf`
     - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
     - `image/png`
     - `image/jpeg`

4. Clique em **"Create bucket"**

---

### 3️⃣ Aplicar Migration 006 - Storage Policies

**Status:** ⏳ Pendente  
**Tempo estimado:** 5-10 minutos  
**Tipo:** Ação manual no Supabase Dashboard  
**Pré-requisito:** Bucket "uploads" criado (etapa 2)

**Passos:**

1. Acesse o Supabase Dashboard SQL Editor:
   ```
   https://supabase.com/dashboard/project/[seu-projeto]/sql/new
   ```

2. Abra o arquivo:
   ```
   supabase/migrations/006_setup_storage_bucket.sql
   ```

3. Copie **TODO** o conteúdo do arquivo

4. Cole no SQL Editor do Supabase

5. Execute (clique em "Run" ou pressione Cmd/Ctrl + Enter)

6. Verifique se não houve erros

**Validação:**
```bash
npx tsx scripts/verify-storage.ts
```

---

## ✅ VALIDAÇÃO COMPLETA

Após aplicar ambas as migrations, execute:

```bash
# Verificar RLS policies
npx tsx scripts/verify-all-rls-policies.ts

# Verificar Storage
npx tsx scripts/verify-storage.ts
```

**Resultado esperado:**
- ✅ Todas as políticas RLS encontradas
- ✅ Bucket "uploads" configurado
- ✅ Políticas de Storage criadas

---

## 🧪 PRÓXIMOS PASSOS (Após migrations)

### 4️⃣ Completar Integração Tasks CRUD

**Status:** ⏳ Pendente  
**Tempo estimado:** 2-3 horas

**Tarefas:**
- Validar TaskBoard funcionando completamente
- Testar criação de tasks em ambiente real
- Testar edição de tasks
- Testar deleção de tasks
- Validar dependências entre tasks
- Testar mudanças de status

**Arquivos envolvidos:**
- `src/components/tasks/TaskBoard.tsx`
- `src/components/tasks/TaskCard.tsx`
- `src/components/tasks/TaskModal.tsx`
- `src/app/api/tasks/route.ts`
- `src/app/api/tasks/[id]/route.ts`

---

### 5️⃣ Finalizar Upload System

**Status:** ⏳ Pendente  
**Tempo estimado:** 2-3 horas

**Tarefas:**
- Testar upload de arquivos via interface
- Validar validações de tipo de arquivo
- Validar validações de tamanho (10MB max)
- Verificar integração com Supabase Storage
- Testar download de arquivos
- Testar deleção de arquivos
- Validar paths de storage

**Arquivos envolvidos:**
- `src/components/shared/FileUpload.tsx`
- `src/lib/services/uploadService.ts`
- `src/app/api/uploads/route.ts`
- `src/app/api/uploads/[id]/route.ts`

---

### 6️⃣ Integrar Criteria Forms

**Status:** ⏳ Pendente  
**Tempo estimado:** 3-4 horas

**Tarefas:**
- Testar criação de critérios
- Testar edição de critérios
- Validar templates funcionando (4 subseções)
- Verificar cálculo de métricas
- Testar validação de conteúdo
- Validar scores de qualidade

**Arquivos envolvidos:**
- `src/components/criteria/CriteriaForm.tsx`
- `src/components/criteria/CriteriaTemplate.tsx`
- `src/lib/services/criteriaService.ts`
- `src/lib/services/metricsService.ts`
- `src/app/api/criteria/route.ts`

---

### 7️⃣ Testar Validation com IA

**Status:** ⏳ Pendente  
**Tempo estimado:** 2-3 horas

**Tarefas:**
- Testar validação de conteúdo com Claude API
- Validar detecção de práticas suspeitas
- Verificar scores de qualidade (0-100)
- Testar feedback acionável
- Validar edge cases (erros de API, respostas inválidas)

**Arquivos envolvidos:**
- `src/lib/services/aiService.ts`
- `src/app/api/ai/validate-content/route.ts`
- `src/app/api/ai/detect-suspicious/route.ts`
- `src/components/validation/ContentValidator.tsx`

---

## 📋 CHECKLIST DE VALIDAÇÃO

Após completar todas as etapas:

- [ ] Migration 005 aplicada sem erros
- [ ] Migration 006 aplicada sem erros
- [ ] Bucket "uploads" criado e configurado
- [ ] Todas as políticas RLS validadas
- [ ] Tasks CRUD funcionando completamente
- [ ] Upload system testado e funcionando
- [ ] Criteria forms integrados e testados
- [ ] Validation com IA funcionando
- [ ] Testes E2E passando
- [ ] Coverage >35% mantido

---

## 🐛 Troubleshooting

### Erro: "policy already exists"
**Solução:** A migration já foi aplicada. Isso é normal se você executar novamente.

### Erro: "bucket does not exist"
**Solução:** Crie o bucket manualmente primeiro (ver etapa 2).

### Erro: "permission denied"
**Solução:** Verifique se está usando Service Role Key nas variáveis de ambiente.

### Políticas não aparecem após aplicar
**Solução:** 
1. Verifique se executou sem erros
2. Recarregue a página do SQL Editor
3. Execute query de verificação manual

---

## ✅ VALIDAÇÃO DOS SQLs

**Status:** ✅ **SQLs Validados e Corrigidos**

- ✅ Migration 005: Validada e correta
- ✅ Migration 006: Corrigida (comparação direta de paths)
- 📄 Ver detalhes em: `docs/VALIDACAO_SQL.md`

**Correções Aplicadas:**
- Migration 006: Substituído `storage.foldername()` por comparação direta `storage_path = name`
- INSERT policy: Usa `split_part(name, '/', 1)` para validar userId

---

## 📝 Notas Importantes

1. **Ordem importa:** Aplique Migration 005 primeiro, depois 006
2. **Bucket primeiro:** Crie o bucket antes de aplicar Migration 006
3. **Validação:** Sempre valide após aplicar cada migration
4. **Backup:** Migrations são seguras e podem ser executadas múltiplas vezes
5. **SQLs Validados:** Ambos os SQLs foram validados e corrigidos

---

**Última atualização:** Janeiro 2025

