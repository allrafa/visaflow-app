# 🚀 FASE 5 - CRITÉRIOS EB-1A: PLANO DE EXECUÇÃO COMPLETO

**Versão:** 1.0  
**Data:** Janeiro 2025  
**Status:** 📋 **AGUARDANDO APROVAÇÃO**

---

## 📊 ANÁLISE DE COMPLEXIDADE

**Tipo:** COMPLEX (5 etapas principais, múltiplas sub-etapas)  
**Etapas Identificadas:** 5 etapas principais + 15+ sub-etapas  
**Arquivos Envolvidos:** 
- `/src/lib/templates/criteria.ts` (melhorar)
- `/src/components/criteria/CriteriaForm.tsx` (melhorar)
- `/src/lib/services/aiService.ts` (expandir)
- `/src/lib/services/metricsService.ts` (expandir)
- `/src/app/api/ai/validate-content/route.ts` (melhorar)
- `/src/app/api/ai/detect-suspicious/route.ts` (melhorar)
- `/src/components/validation/SuspiciousAlerts.tsx` (melhorar)
- `/src/components/criteria/MetricsCalculator.tsx` (melhorar)

**Dependências:**
- ✅ Anthropic SDK (já instalado)
- ✅ React Hook Form + Zod (já instalado)
- ✅ shadcn/ui components (já instalado)
- ⚠️ Precisa: Melhorar prompts Claude API
- ⚠️ Precisa: Base de conhecimento de casos reais

---

## 🎯 PLANO DE EXECUÇÃO (Ultra-Think)

### ETAPA 5.1: Templates de Critérios (10 critérios com 4 subseções)

**Objetivo:** Expandir e melhorar templates existentes com exemplos reais, guias detalhados e base de conhecimento

**Sub-etapas:**

1. **5.1.1** - Expandir templates com exemplos reais
   - Arquivo: `src/lib/templates/criteria.ts`
   - Ação: Adicionar campo `examples` e `guidelines` em cada template
   - Tempo estimado: 30min

2. **5.1.2** - Adicionar guias de preenchimento por critério
   - Arquivo: `src/lib/templates/criteria.ts`
   - Ação: Criar função `getCriteriaGuidelines(criteriaId)` com dicas específicas
   - Tempo estimado: 45min

3. **5.1.3** - Criar constantes de evidências recomendadas
   - Arquivo: `src/lib/constants/evidenceTypes.ts` (novo)
   - Ação: Criar lista de tipos de evidências por critério
   - Tempo estimado: 30min

**Arquivos a criar/modificar:**
- ✅ `src/lib/templates/criteria.ts` (modificar)
- ✅ `src/lib/constants/evidenceTypes.ts` (criar)

---

### ETAPA 5.2: Formulário de Critérios com 4 subseções

**Objetivo:** Melhorar UX, adicionar validação em tempo real, integração com templates

**Sub-etapas:**

1. **5.2.1** - Adicionar validação em tempo real por subseção
   - Arquivo: `src/components/criteria/CriteriaForm.tsx`
   - Ação: Adicionar debounced validation para cada textarea
   - Tempo estimado: 30min

2. **5.2.2** - Integrar guias de preenchimento no formulário
   - Arquivo: `src/components/criteria/CriteriaForm.tsx`
   - Ação: Adicionar tooltips/accordions com guidelines
   - Tempo estimado: 45min

3. **5.2.3** - Adicionar indicadores de progresso por subseção
   - Arquivo: `src/components/criteria/CriteriaForm.tsx`
   - Ação: Mostrar progresso visual (0-100%) por subseção
   - Tempo estimado: 30min

4. **5.2.4** - Melhorar feedback de validação
   - Arquivo: `src/components/criteria/CriteriaForm.tsx`
   - Ação: Mostrar issues inline por subseção
   - Tempo estimado: 30min

**Arquivos a criar/modificar:**
- ✅ `src/components/criteria/CriteriaForm.tsx` (modificar)
- ✅ `src/components/criteria/CriteriaGuidelines.tsx` (criar)

---

### ETAPA 5.3: Validação com Claude API

**Objetivo:** Melhorar prompts, adicionar análise baseada em casos reais, detectar padrões de aprovação vs rejeição

**Sub-etapas:**

1. **5.3.1** - Melhorar prompt de validação com conhecimento de casos reais
   - Arquivo: `src/lib/services/aiService.ts`
   - Ação: Expandir prompt com padrões de 13 casos estudados
   - Tempo estimado: 45min

2. **5.3.2** - Adicionar análise de padrões de aprovação vs rejeição
   - Arquivo: `src/lib/services/aiService.ts`
   - Ação: Criar função `analyzeApprovalPatterns()`
   - Tempo estimado: 60min

3. **5.3.3** - Melhorar detecção de texto gerado por IA
   - Arquivo: `src/lib/services/aiService.ts`
   - Ação: Adicionar análise específica para detectar AI-generated text
   - Tempo estimado: 45min

4. **5.3.4** - Adicionar score de qualidade detalhado (0-100)
   - Arquivo: `src/lib/services/aiService.ts`
   - Ação: Criar breakdown de score por subseção
   - Tempo estimado: 30min

**Arquivos a criar/modificar:**
- ✅ `src/lib/services/aiService.ts` (modificar)
- ✅ `src/lib/constants/approvalPatterns.ts` (criar - base de conhecimento)

---

### ETAPA 5.4: Detecção de Práticas Suspeitas

**Objetivo:** Expandir lista de padrões, melhorar detecção, adicionar alertas específicos para 2025

**Sub-etapas:**

1. **5.4.1** - Expandir lista de práticas suspeitas
   - Arquivo: `src/lib/services/aiService.ts`
   - Ação: Adicionar mais padrões (Globee, Stevie, matérias pagas, etc)
   - Tempo estimado: 30min

2. **5.4.2** - Criar sistema de severidade por prática
   - Arquivo: `src/lib/constants/suspiciousPractices.ts` (novo)
   - Ação: Criar lista completa com severidade e recomendações
   - Tempo estimado: 45min

3. **5.4.3** - Melhorar componente de alertas
   - Arquivo: `src/components/validation/SuspiciousAlerts.tsx`
   - Ação: Adicionar ações corretivas sugeridas
   - Tempo estimado: 30min

4. **5.4.4** - Adicionar detecção específica para endurecimento 2025
   - Arquivo: `src/lib/services/aiService.ts`
   - Ação: Adicionar análise baseada em mudanças do USCIS 2025
   - Tempo estimado: 45min

**Arquivos a criar/modificar:**
- ✅ `src/lib/services/aiService.ts` (modificar)
- ✅ `src/lib/constants/suspiciousPractices.ts` (criar)
- ✅ `src/components/validation/SuspiciousAlerts.tsx` (modificar)

---

### ETAPA 5.5: Calculadora de Métricas

**Objetivo:** Expandir para todos os critérios, métricas mais precisas baseadas em casos reais

**Sub-etapas:**

1. **5.5.1** - Adicionar métricas para todos os 10 critérios
   - Arquivo: `src/lib/services/metricsService.ts`
   - Ação: Implementar cálculos para AWARDS, MEMBERSHIP, PRESS, JUDGING, etc
   - Tempo estimado: 60min

2. **5.5.2** - Melhorar precisão baseada em casos reais
   - Arquivo: `src/lib/services/metricsService.ts`
   - Ação: Ajustar thresholds baseado em 13 casos estudados
   - Tempo estimado: 45min

3. **5.5.3** - Adicionar métricas específicas por critério
   - Arquivo: `src/components/criteria/MetricsCalculator.tsx`
   - Ação: Mostrar campos específicos por critério
   - Tempo estimado: 45min

4. **5.5.4** - Adicionar comparação com benchmarks
   - Arquivo: `src/lib/services/metricsService.ts`
   - Ação: Comparar com percentis de casos aprovados
   - Tempo estimado: 30min

**Arquivos a criar/modificar:**
- ✅ `src/lib/services/metricsService.ts` (modificar)
- ✅ `src/components/criteria/MetricsCalculator.tsx` (modificar)
- ✅ `src/lib/constants/metricsBenchmarks.ts` (criar)

---

## ⚠️ RISCOS IDENTIFICADOS:

- ❌ **Custo de API Claude** (muitas chamadas podem ser caras)
  - Mitigação: Implementar cache, debounce, e limitar chamadas
  
- ❌ **Performance** (validação em tempo real pode ser lenta)
  - Mitigação: Usar debounce, mostrar loading states, otimizar prompts
  
- ⚠️ **Base de conhecimento** (precisa dados reais de casos)
  - Mitigação: Usar dados do documento VISAFLOW CONTEXT.md como base inicial

- ⚠️ **Complexidade de prompts** (prompts muito longos podem falhar)
  - Mitigação: Dividir em múltiplas chamadas, usar streaming quando possível

---

## ✅ PONTOS DE VALIDAÇÃO:

- [ ] Após etapa 5.1: Templates expandidos e testados
- [ ] Após etapa 5.2: Formulário com validação em tempo real funcionando
- [ ] Após etapa 5.3: Validação Claude retornando scores precisos
- [ ] Após etapa 5.4: Detecção de práticas suspeitas funcionando
- [ ] Após etapa 5.5: Calculadora de métricas para todos os critérios
- [ ] Final: Zero TypeScript errors, testes passando, documentação atualizada

---

## 📋 ESTIMATIVA TOTAL: ~8-10 horas

**Breakdown:**
- ETAPA 5.1: ~1h 45min
- ETAPA 5.2: ~2h 15min
- ETAPA 5.3: ~3h
- ETAPA 5.4: ~2h 30min
- ETAPA 5.5: ~2h 30min

---

## 🚦 STATUS: AGUARDANDO APROVAÇÃO DO USUÁRIO

**Próximos passos após aprovação:**
1. Iniciar execução etapa por etapa
2. Validar cada etapa antes de prosseguir
3. Documentar mudanças no CHANGELOG.md
4. Criar testes unitários para novas funcionalidades

---

## 📝 NOTAS ADICIONAIS

- Todos os arquivos devem seguir Clean Code Commandments
- TypeScript strict mode obrigatório
- Validação Zod em todas as entradas
- Error handling completo
- Logs estruturados para debugging



