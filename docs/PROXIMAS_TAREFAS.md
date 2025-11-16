# 📋 PRÓXIMAS TAREFAS - VISAFLOW

**Data:** Janeiro 2025  
**Status Atual:** Semana 2 completa, RLS quase completo

---

## ✅ CONCLUÍDO ATÉ AGORA

### Semana 1: Fundação ✅
- ✅ Setup completo do projeto
- ✅ Prisma schema + migrations
- ✅ Auth (Supabase)
- ✅ Layout base + Error Boundaries
- ✅ Services layer + validações

### Semana 2: Core Features ✅
- ✅ Dashboard implementado
- ✅ Tasks CRUD completo
- ✅ Upload system completo
- ✅ Criteria forms completo
- ✅ Validation com IA completo
- ✅ RLS policies criadas (pendente aplicação da migration 005)

---

## 🚨 TAREFA IMEDIATA (CRÍTICA)

### 1. Aplicar Migration 005 - RLS Policies Faltantes

**Prioridade:** 🔴 **ALTA** (bloqueia testes completos)

**O que fazer:**
1. Acessar Supabase Dashboard SQL Editor
2. Aplicar arquivo: `supabase/migrations/005_add_missing_rls_policies.sql`
3. Validar aplicação com script: `npx tsx scripts/verify-all-rls-policies.ts`

**Arquivos criados:**
- ✅ `supabase/migrations/005_add_missing_rls_policies.sql`
- ✅ `scripts/verify-all-rls-policies.ts`
- ✅ `docs/RLS_COMPLETO_STATUS.md`

**Status:** ⏳ **AGUARDANDO APLICAÇÃO**

---

## 🎯 SEMANA 3: ADVANCED + POLISH

### Day 1: Final Merits Generator

**Tarefas:**
- [ ] Criar API route `/api/ai/generate-merits`
- [ ] Implementar serviço `generateFinalMerits()` em `aiService.ts`
- [ ] Criar componente `FinalMeritsGenerator.tsx`
- [ ] Integrar com formulário de critérios
- [ ] Gerar documento estruturado (20-30 páginas)
- [ ] Sistema de referências cruzadas automático
- [ ] Calculadora de métricas de impacto

**Arquivos a criar/modificar:**
- `src/app/api/ai/generate-merits/route.ts`
- `src/lib/services/aiService.ts` (adicionar função)
- `src/components/criteria/FinalMeritsGenerator.tsx`
- `src/app/(dashboard)/final-merits/page.tsx`

**Estimativa:** 6-8 horas

---

### Day 2: Letters Templates

**Tarefas:**
- [ ] Criar templates de cartas de recomendação
- [ ] Sistema de personalização por recomendador
- [ ] Editor de cartas com preview
- [ ] Validação de conteúdo com IA
- [ ] Sistema de status (draft → review → final → signed)
- [ ] Export para PDF/DOCX

**Arquivos a criar/modificar:**
- `src/lib/templates/letterTemplates.ts`
- `src/components/letters/LetterEditor.tsx`
- `src/components/letters/LetterPreview.tsx`
- `src/app/(dashboard)/letters/page.tsx`
- `src/app/api/letters/route.ts`

**Estimativa:** 6-8 horas

---

### Day 3: Testes Completos

**Tarefas:**
- [ ] Testes unitários para services (Vitest)
  - [ ] `processService.test.ts`
  - [ ] `taskService.test.ts`
  - [ ] `uploadService.test.ts`
  - [ ] `criteriaService.test.ts`
  - [ ] `aiService.test.ts`
- [ ] Testes E2E com Playwright
  - [ ] Fluxo completo: criar processo → tasks → uploads → critérios
  - [ ] Validação com IA
  - [ ] Isolamento RLS (usuários não veem dados de outros)
- [ ] Testes de integração API
  - [ ] Todas as rotas CRUD
  - [ ] Validações de entrada
  - [ ] Tratamento de erros

**Arquivos a criar:**
- `tests/unit/services/*.test.ts`
- `tests/e2e/flows/*.spec.ts`
- `tests/integration/api/*.test.ts`

**Estimativa:** 8-10 horas

---

### Day 4: Polish UI/UX

**Tarefas:**
- [ ] Melhorar feedback visual (toasts, loading states)
- [ ] Otimizar performance (lazy loading, code splitting)
- [ ] Melhorar responsividade mobile
- [ ] Adicionar animações sutis (Framer Motion)
- [ ] Melhorar acessibilidade (ARIA labels, keyboard navigation)
- [ ] Dark mode (opcional)
- [ ] Onboarding para novos usuários

**Arquivos a modificar:**
- Componentes existentes (melhorias incrementais)
- `src/components/shared/Toast.tsx` (se não existir)
- `src/components/shared/LoadingSpinner.tsx` (melhorias)

**Estimativa:** 6-8 horas

---

### Day 5: Deploy + Monitoring

**Tarefas:**
- [ ] Configurar Vercel deployment
- [ ] Configurar variáveis de ambiente em produção
- [ ] Configurar Sentry para error tracking
- [ ] Configurar Vercel Analytics
- [ ] Smoke tests em produção
- [ ] Documentação de deploy
- [ ] Monitoramento básico (uptime, errors, performance)

**Arquivos a criar/modificar:**
- `.github/workflows/deploy.yml`
- `vercel.json` (se necessário)
- `docs/DEPLOYMENT.md`

**Estimativa:** 4-6 horas

---

## 📊 RESUMO DE ESTIMATIVAS

| Dia | Tarefa | Estimativa | Prioridade |
|-----|--------|------------|------------|
| **Imediato** | Aplicar Migration 005 | 15min | 🔴 Alta |
| **Day 1** | Final Merits Generator | 6-8h | 🟡 Média |
| **Day 2** | Letters Templates | 6-8h | 🟡 Média |
| **Day 3** | Testes Completos | 8-10h | 🔴 Alta |
| **Day 4** | Polish UI/UX | 6-8h | 🟢 Baixa |
| **Day 5** | Deploy + Monitoring | 4-6h | 🔴 Alta |

**Total Semana 3:** 30-40 horas

---

## 🔍 VALIDAÇÕES NECESSÁRIAS

### Após aplicar Migration 005:

- [ ] RLS habilitado em todas as tabelas
- [ ] Todas as políticas criadas (18 políticas)
- [ ] Teste de isolamento: usuário A não vê dados de usuário B
- [ ] Teste de UPDATE em uploads funciona
- [ ] Teste de CRUD completo em tasks funciona

### Antes de Deploy:

- [ ] Todos os testes passando
- [ ] Zero erros TypeScript
- [ ] Zero warnings ESLint
- [ ] Lighthouse score > 90
- [ ] RLS validado em produção
- [ ] Variáveis de ambiente configuradas

---

## 📝 NOTAS IMPORTANTES

1. **RLS é crítico:** Não fazer deploy sem RLS aplicado e validado
2. **Testes são essenciais:** Especialmente testes E2E para validar fluxos completos
3. **Performance:** Monitorar queries lentas e otimizar índices se necessário
4. **Segurança:** Validar todas as validações de entrada (Zod schemas)
5. **Documentação:** Manter CHANGELOG.md atualizado

---

**Próxima Ação:** Aplicar Migration 005 no Supabase Dashboard



