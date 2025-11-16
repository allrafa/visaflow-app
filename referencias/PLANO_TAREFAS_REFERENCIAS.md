# 📋 Plano de Tarefas Baseado em Referências

**Baseado em:** Caso EB-1A aprovado (557 páginas, primeira tentativa)  
**Objetivo:** Implementar funcionalidades do VisaFlow usando estratégias comprovadas

---

## 🎯 Visão Geral

Este documento mapeia diretamente as referências para tarefas de implementação, garantindo que o VisaFlow incorpore as melhores práticas identificadas no caso de sucesso.

---

## 📊 Fase 1: Análise e Extração de Padrões

### Tarefa 1.1: Análise Estrutural da Petição ✅

**Objetivo:** Entender a estrutura completa de uma petição aprovada

**Referências:**
- `/2-petition/README.md` (seção "The Structure")
- `/latex_public/inkin.tex` (estrutura completa)
- `/2-petition/media/structure.png` (diagrama visual)

**Entregáveis:**
- [ ] Documento com estrutura mapeada (seções, páginas, ordem)
- [ ] Diagrama de dependências entre seções
- [ ] Lista de componentes obrigatórios vs. opcionais

**Tempo estimado:** 4 horas

---

### Tarefa 1.2: Extração de Templates de Critérios ✅

**Objetivo:** Criar templates reutilizáveis para cada critério EB-1A

**Referências:**
- `/2-petition/README.md` (seção "Proving a Criterion")
- `/latex_public/Body/Evidence/` (código LaTeX de cada critério)
- `/2-petition/media/excerpt-thumbs/` (exemplos visuais)

**Critérios a analisar:**
1. Award (Google Developer Expert)
2. Award (Digital Breakthrough)
3. Association (IEEE Senior Membership)
4. Association (Google Developer Experts)
5. Judging (IEEE Review Panel)
6. Role (Apache Beam, Akvelon, Calltouch, Gran's School)
7. Contribution (PHPStan, Flutter Code Editor)
8. Articles (Comparable - Medium blog)
9. Salary
10. (Não usados: Media, Scientific Articles, Exhibitions, Commercial Success)

**Entregáveis:**
- [ ] Template JSON para cada critério com 4 subseções
- [ ] Exemplos de texto para cada subseção
- [ ] Checklist de evidências necessárias por critério

**Tempo estimado:** 16 horas (2h por critério)

---

### Tarefa 1.3: Mapeamento de Estratégias de Evidências ✅

**Objetivo:** Documentar padrões de evidências que funcionam

**Referências:**
- `/2-petition/README.md` (seção "Formatting the Exhibits")
- `/latex_public/Exhibits/` (estrutura de evidências)
- `/2-petition/media/exhibit-types.png` (tipos de evidências)

**Tipos de evidências:**
1. Screenshots (80% - verificáveis online)
2. Supporting Letters (cartas de recomendação)
3. Contracts/Agreements (contratos)
4. Statistics (dados públicos)
5. News Articles (cobertura de imprensa)
6. Video Transcripts (transcrições)

**Entregáveis:**
- [ ] Schema de validação para cada tipo de evidência
- [ ] Regras de formatação (screenshots, URLs, etc.)
- [ ] Checklist de verificação de qualidade

**Tempo estimado:** 8 horas

---

### Tarefa 1.4: Análise de Final Merits Statement ✅

**Objetivo:** Entender como construir narrativa de "sustained international acclaim"

**Referências:**
- `/latex_public/Body/Merits/Merits.tex`
- `/2-petition/README.md` (seção "Final Merit Determination")

**Padrões identificados:**
- Biografia focada em realizações
- Todas as realizações (usadas ou não)
- Construção de narrativa de "top expert"
- Percentuais e estatísticas de impacto

**Entregáveis:**
- [ ] Template estruturado de Final Merits
- [ ] Exemplos de métricas de impacto
- [ ] Guia de construção de narrativa

**Tempo estimado:** 6 horas

---

## 🛠️ Fase 2: Implementação de Templates e Estruturas

### Tarefa 2.1: Sistema de Templates de Critérios 🚧

**Objetivo:** Implementar sistema de templates baseado em estrutura de 4 subseções

**Baseado em:**
- Estrutura extraída em Tarefa 1.2
- `/latex_public/commands/` (comandos LaTeX reutilizáveis)

**Implementação:**
```typescript
// src/lib/templates/criteria.ts
interface CriteriaTemplate {
  id: string;
  name: string;
  subsections: {
    id: string;
    title: string;
    description: string;
    required: boolean;
    evidenceTypes: string[];
  }[];
  comparableEvidence?: boolean;
}
```

**Entregáveis:**
- [ ] Schema TypeScript para templates
- [ ] Templates para todos os 10 critérios EB-1A
- [ ] Validação de completude (4 subseções)
- [ ] Interface de edição de templates

**Tempo estimado:** 24 horas

---

### Tarefa 2.2: Gerador de Final Merits Statement 🚧

**Objetivo:** Implementar gerador automático de Final Merits Statement

**Baseado em:**
- Template extraído em Tarefa 1.4
- Estratégias de construção de narrativa

**Funcionalidades:**
- Coletar todas as realizações (critérios + extras)
- Calcular métricas de impacto
- Gerar percentuais (ex: "Top 0.025%")
- Construir narrativa coerente

**Entregáveis:**
- [ ] Função de geração de Final Merits
- [ ] Cálculo automático de métricas
- [ ] Template de formatação
- [ ] Integração com dados de critérios

**Tempo estimado:** 16 horas

---

### Tarefa 2.3: Sistema de Validação de Evidências 🚧

**Objetivo:** Implementar validação automática de evidências

**Baseado em:**
- Padrões extraídos em Tarefa 1.3
- `/2-petition/README.md` (seção "Screenshots")

**Validações:**
- ✅ URL presente e acessível
- ✅ Formato correto (PDF, PNG, JPG)
- ✅ Tamanho adequado (<10MB)
- ✅ Screenshots têm URL visível
- ✅ Links funcionam
- ✅ Evidências verificáveis online

**Entregáveis:**
- [ ] Schema de validação por tipo
- [ ] Funções de validação
- [ ] Feedback de erros específicos
- [ ] Score de qualidade (0-100)

**Tempo estimado:** 20 horas

---

### Tarefa 2.4: Sistema de Referências Automáticas 🚧

**Objetivo:** Implementar sistema de referências cruzadas (como LaTeX)

**Baseado em:**
- `/latex_public/commands/ExhibitRef.tex`
- `/latex_public/commands/SectionRef.tex`
- `/latex_public/commands/ListOfExhibits.tex`

**Funcionalidades:**
- Referências automáticas a evidências
- Referências a seções com números de página
- Lista automática de evidências
- Atualização automática ao adicionar/remover

**Entregáveis:**
- [ ] Sistema de labels e referências
- [ ] Geração automática de lista de evidências
- [ ] Numeração automática
- [ ] Hyperlinks em PDF gerado

**Tempo estimado:** 12 horas

---

## 🤖 Fase 3: Integração com IA

### Tarefa 3.1: Validação de Conteúdo com Claude API 🚧

**Objetivo:** Implementar validação inteligente baseada em Policy Manual

**Baseado em:**
- Estratégias de validação extraídas
- Padrões de aprovação vs. rejeição identificados

**Funcionalidades:**
- Análise de completude (4 subseções presentes?)
- Verificação de alinhamento com Policy Manual
- Detecção de texto gerado por IA
- Score de qualidade (0-100)
- Feedback acionável específico

**Prompts base:**
```typescript
// Baseado em Policy Manual + RFE Template
const validationPrompt = `
Analyze this EB-1A criterion submission:
1. Does it have all 4 required subsections?
2. Does each subsection address Policy Manual requirements?
3. Is the evidence sufficient and verifiable?
4. Are there any red flags that could trigger RFE?
5. Provide quality score (0-100) and specific feedback.
`;
```

**Entregáveis:**
- [ ] Integração com Claude API
- [ ] Prompts de validação por critério
- [ ] Sistema de scoring
- [ ] Feedback estruturado

**Tempo estimado:** 24 horas

---

### Tarefa 3.2: Detecção de Práticas Suspeitas 🚧

**Objetivo:** Alertar sobre práticas que podem gerar RFE ou rejeição

**Baseado em:**
- `/2-petition/README.md` (seção "The Criteria I Did Not Use")
- Conhecimento sobre mercado de cobertura paga

**Práticas de alto risco:**
- ❌ Cobertura paga não marcada (Globee, Stevie, etc.)
- ❌ Artigos em journals lixo (trash publishing)
- ❌ Ghost-writing de artigos científicos
- ❌ Prêmios locais/regionais apresentados como nacionais
- ❌ Evidências falsificadas ou manipuladas

**Entregáveis:**
- [ ] Base de conhecimento de práticas suspeitas
- [ ] Detecção automática em evidências
- [ ] Alertas contextuais
- [ ] Guia de construção ética

**Tempo estimado:** 16 horas

---

### Tarefa 3.3: Análise Comparativa de Casos 🚧

**Objetivo:** Comparar caso atual com casos aprovados/rejeitados

**Baseado em:**
- Caso de referência (aprovado)
- Padrões identificados de aprovação vs. rejeição

**Funcionalidades:**
- Comparação com estrutura de petição aprovada
- Identificação de gaps
- Sugestões de melhorias
- Estimativa de probabilidade de aprovação

**Entregáveis:**
- [ ] Sistema de comparação estrutural
- [ ] Análise de gaps
- [ ] Sugestões automáticas
- [ ] Score de probabilidade

**Tempo estimado:** 20 horas

---

## 📊 Fase 4: Dashboard e Visualização

### Tarefa 4.1: Timeline Interativa 🚧

**Objetivo:** Criar timeline baseada no processo real

**Baseado em:**
- `/1-process/README.md` (timeline completo)
- `/1-process/media/` (screenshots de status)

**Funcionalidades:**
- Timeline visual com fases clicáveis
- Progresso em tempo real
- Estimativas baseadas em dados reais
- Alertas de prazos

**Fases:**
1. ELIGIBILITY - Elegibilidade e Estratégia
2. EVIDENCE - Coleta de Evidências
3. LETTERS - Cartas de Recomendação
4. PETITION - Dossiê Final (I-140)
5. FILING - Protocolo e Acompanhamento

**Entregáveis:**
- [ ] Componente de timeline interativa
- [ ] Integração com dados do processo
- [ ] Estimativas de tempo por fase
- [ ] Alertas e notificações

**Tempo estimado:** 16 horas

---

### Tarefa 4.2: Visualização de Critérios 🚧

**Objetivo:** Dashboard visual de status dos critérios

**Baseado em:**
- Estrutura de critérios da petição
- Padrões de evidências identificados

**Componentes:**
- Cards de critérios com status
- Lista de evidências anexadas
- Score de validação visual
- Indicadores de completude
- Progresso por subseção

**Entregáveis:**
- [ ] Componente de cards de critérios
- [ ] Visualização de evidências
- [ ] Indicadores de progresso
- [ ] Integração com validação

**Tempo estimado:** 12 horas

---

### Tarefa 4.3: Gerador de PDF Profissional 🚧

**Objetivo:** Gerar PDF da petição com formatação profissional

**Baseado em:**
- `/latex_public/` (templates LaTeX)
- Estrutura de formatação identificada

**Funcionalidades:**
- Geração de PDF a partir de dados estruturados
- Formatação profissional (como LaTeX)
- Referências cruzadas automáticas
- Table of Contents gerado automaticamente
- Numeração de páginas e seções

**Entregáveis:**
- [ ] Sistema de geração de PDF
- [ ] Templates de formatação
- [ ] Referências automáticas
- [ ] Exportação final

**Tempo estimado:** 24 horas

---

## 🔄 Fase 5: Otimizações e Melhorias

### Tarefa 5.1: Sistema de Gantt Chart 🚧

**Objetivo:** Visualizar dependências e timeline de tarefas

**Baseado em:**
- `/2-petition/README.md` (seção "Prioritizing the Work")
- `/2-petition/media/gantt_public.png`

**Funcionalidades:**
- Visualização de dependências entre tarefas
- Timeline estimado baseado em dados reais
- Identificação de bloqueios
- Otimização de ordem de execução

**Entregáveis:**
- [ ] Componente de Gantt Chart
- [ ] Sistema de dependências
- [ ] Estimativas de tempo
- [ ] Otimização automática

**Tempo estimado:** 16 horas

---

### Tarefa 5.2: Sistema de Tradução Integrado 🚧

**Objetivo:** Facilitar tradução de documentos

**Baseado em:**
- `/2-petition/README.md` (seção "Translations")
- `/3-improvements/README.md` (seção "In-House Translation")

**Funcionalidades:**
- Upload de documentos em qualquer idioma
- Tradução automática com IA
- Certificação de tradução
- Posicionamento correto (tradução antes do original)

**Entregáveis:**
- [ ] Sistema de upload multi-idioma
- [ ] Integração com tradução automática
- [ ] Geração de certificação
- [ ] Formatação correta

**Tempo estimado:** 12 horas

---

## 📈 Métricas de Sucesso

### KPIs por Fase:

**Fase 1 (Análise):**
- ✅ 100% dos critérios mapeados
- ✅ 100% dos padrões de evidências documentados
- ✅ Templates estruturados criados

**Fase 2 (Implementação):**
- ✅ Sistema de templates funcional
- ✅ Validação de evidências operacional
- ✅ Gerador de Final Merits funcionando

**Fase 3 (IA):**
- ✅ Score de qualidade >80% de precisão
- ✅ Detecção de práticas suspeitas >90%
- ✅ Feedback acionável gerado

**Fase 4 (Dashboard):**
- ✅ Timeline interativa funcional
- ✅ Visualização de critérios completa
- ✅ PDF gerado com qualidade profissional

---

## 🎯 Priorização

### Alta Prioridade (MVP):
1. ✅ Tarefa 1.2: Templates de Critérios
2. ✅ Tarefa 2.1: Sistema de Templates
3. ✅ Tarefa 2.3: Validação de Evidências
4. ✅ Tarefa 3.1: Validação com IA
5. ✅ Tarefa 4.1: Timeline Interativa

### Média Prioridade:
1. ✅ Tarefa 2.2: Gerador de Final Merits
2. ✅ Tarefa 2.4: Sistema de Referências
3. ✅ Tarefa 3.2: Detecção de Práticas Suspeitas
4. ✅ Tarefa 4.2: Visualização de Critérios

### Baixa Prioridade (Nice to Have):
1. ✅ Tarefa 3.3: Análise Comparativa
2. ✅ Tarefa 4.3: Gerador de PDF
3. ✅ Tarefa 5.1: Gantt Chart
4. ✅ Tarefa 5.2: Sistema de Tradução

---

## 📝 Notas de Implementação

### Arquitetura Sugerida:

```typescript
// Estrutura de dados baseada em referências
interface Process {
  id: string;
  userId: string;
  currentPhase: ProcessPhase;
  criteria: CriteriaEvidence[];
  finalMerits?: FinalMeritsStatement;
  // ...
}

interface CriteriaEvidence {
  id: string;
  criteria: EB1Criteria;
  subsections: {
    id: string;
    title: string;
    content: string;
    evidence: Evidence[];
  }[];
  validationScore?: number;
  // ...
}
```

### Integrações Necessárias:

1. **Claude API** - Validação inteligente
2. **Supabase Storage** - Armazenamento de evidências
3. **PDF Generation** - Geração de petição final
4. **Translation API** - Tradução automática (opcional)

---

**Última atualização:** Janeiro 2025  
**Status:** 🚧 Em Planejamento




