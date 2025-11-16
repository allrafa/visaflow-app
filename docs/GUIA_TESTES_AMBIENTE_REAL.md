# 🧪 Guia Completo: Testes em Ambiente Real

**Data:** Janeiro 2025  
**Status:** ✅ **PRONTO PARA EXECUTAR**  
**Baseado em:** VISAFLOW CONTEXT.md + CHECKLIST_PRE_TESTES.md

---

## ✅ PRÉ-REQUISITOS VALIDADOS

### ✅ Validações Automáticas Concluídas

- ✅ **Variáveis de Ambiente:** Todas configuradas
- ✅ **TypeScript:** Zero erros
- ✅ **Build:** Compilando com sucesso
- ✅ **Migration 007:** Aplicada e validada (RLS + Policies)
- ✅ **Storage Bucket:** Criado e configurado

---

## 🚀 INICIAR SERVIDOR DE DESENVOLVIMENTO

### Passo 1: Iniciar Servidor

```bash
cd /Users/rafaraio/.cursor/projects/visaflow-app
npm run dev
```

**Verificar:**
- ✅ Servidor inicia sem erros
- ✅ Acessível em http://localhost:3000
- ✅ Sem erros no console do terminal
- ✅ Sem erros no console do navegador (F12)

**Tempo estimado:** 30 segundos

---

## 📋 CHECKLIST DE TESTES FUNCIONAIS

### Fase 1: Autenticação e Setup Inicial

#### 1.1 Criar Conta de Teste

- [ ] Acessar: http://localhost:3000/signup
- [ ] Preencher formulário:
  - Email: `teste1@visaflow.test`
  - Senha: `Teste123!@#`
  - Nome: `Usuário Teste 1`
- [ ] Clicar em "Criar Conta"
- [ ] Verificar redirecionamento para dashboard
- [ ] Verificar que usuário está logado

**Resultado esperado:** ✅ Conta criada e usuário autenticado

#### 1.2 Login

- [ ] Fazer logout (se necessário)
- [ ] Acessar: http://localhost:3000/login
- [ ] Preencher email e senha
- [ ] Clicar em "Entrar"
- [ ] Verificar redirecionamento para dashboard

**Resultado esperado:** ✅ Login funcionando

---

### Fase 2: Gestão de Processos

#### 2.1 Criar Processo

- [ ] No dashboard, clicar em "Novo Processo"
- [ ] Preencher formulário:
  - Título: `Processo Teste EB-1A`
  - Descrição: `Processo de teste para validação do sistema`
  - North Star Statement: `Demonstrar extraordinary ability através de...`
- [ ] Clicar em "Criar Processo"
- [ ] Verificar redirecionamento para página do processo
- [ ] Verificar que processo aparece no dashboard

**Resultado esperado:** ✅ Processo criado e visível

#### 2.2 Visualizar Processo

- [ ] No dashboard, clicar em um processo
- [ ] Verificar que página de detalhes carrega
- [ ] Verificar Timeline de Fases aparece
- [ ] Verificar TaskBoard aparece
- [ ] Verificar ProgressStats aparece

**Resultado esperado:** ✅ Página de processo carrega completamente

#### 2.3 Editar Processo

- [ ] Na página do processo, clicar em "Editar"
- [ ] Modificar título ou descrição
- [ ] Salvar alterações
- [ ] Verificar que mudanças foram salvas

**Resultado esperado:** ✅ Processo editado com sucesso

---

### Fase 3: Tasks CRUD Completo

#### 3.1 Criar Tasks em Cada Fase

**Fase ELIGIBILITY:**
- [ ] Criar task: "Definir estratégia de elegibilidade"
- [ ] Verificar que task aparece no TaskBoard na fase correta
- [ ] Verificar status inicial é PENDING

**Fase EVIDENCE:**
- [ ] Criar task: "Coletar evidências de prêmios"
- [ ] Verificar que task aparece na fase EVIDENCE

**Fase LETTERS:**
- [ ] Criar task: "Solicitar cartas de recomendação"
- [ ] Verificar que task aparece na fase LETTERS

**Fase PETITION:**
- [ ] Criar task: "Preparar petição I-140"
- [ ] Verificar que task aparece na fase PETITION

**Fase FILING:**
- [ ] Criar task: "Protocolizar petição"
- [ ] Verificar que task aparece na fase FILING

**Resultado esperado:** ✅ Tasks criadas em todas as fases

#### 3.2 Editar Task

- [ ] Clicar em uma task para editar
- [ ] Modificar título: "Task Editada"
- [ ] Modificar descrição: "Descrição editada"
- [ ] Alterar status para IN_PROGRESS
- [ ] Salvar alterações
- [ ] Verificar que mudanças foram salvas
- [ ] Verificar que status mudou no TaskBoard

**Resultado esperado:** ✅ Task editada com sucesso

#### 3.3 Dependências entre Tasks

- [ ] Criar task A: "Task Dependente"
- [ ] Criar task B: "Task Base"
- [ ] Editar task A e adicionar dependência de task B
- [ ] Verificar que task A aparece como BLOCKED
- [ ] Completar task B (status COMPLETED)
- [ ] Verificar que task A não está mais BLOCKED

**Resultado esperado:** ✅ Sistema de dependências funcionando

#### 3.4 Deletar Task

- [ ] Clicar em uma task para editar
- [ ] Clicar em "Deletar"
- [ ] Confirmar deleção
- [ ] Verificar que task desapareceu do TaskBoard

**Resultado esperado:** ✅ Task deletada com sucesso

---

### Fase 4: Upload System Completo

#### 4.1 Upload de Arquivos Válidos

**PDF (< 10MB):**
- [ ] Criar ou editar uma task
- [ ] Clicar em "Upload Arquivo"
- [ ] Selecionar arquivo PDF (< 10MB)
- [ ] Verificar que upload inicia
- [ ] Verificar que arquivo aparece na lista de uploads
- [ ] Verificar que status da task mudou para WITH_UPLOAD

**DOCX (< 10MB):**
- [ ] Fazer upload de arquivo DOCX
- [ ] Verificar que upload funciona

**PNG (< 10MB):**
- [ ] Fazer upload de imagem PNG
- [ ] Verificar que upload funciona

**JPG (< 10MB):**
- [ ] Fazer upload de imagem JPG
- [ ] Verificar que upload funciona

**Resultado esperado:** ✅ Todos os tipos permitidos funcionam

#### 4.2 Validação de Tamanho

- [ ] Tentar fazer upload de arquivo > 10MB
- [ ] Verificar que erro aparece: "Arquivo muito grande"
- [ ] Verificar que upload não é iniciado

**Resultado esperado:** ✅ Validação de tamanho funcionando

#### 4.3 Validação de Tipo

- [ ] Tentar fazer upload de arquivo .txt ou .exe
- [ ] Verificar que erro aparece: "Tipo de arquivo não permitido"
- [ ] Verificar que upload não é iniciado

**Resultado esperado:** ✅ Validação de tipo funcionando

#### 4.4 Download de Arquivo

- [ ] Na lista de uploads, clicar em um arquivo
- [ ] Verificar que download inicia
- [ ] Verificar que arquivo baixado está correto

**Resultado esperado:** ✅ Download funcionando

#### 4.5 Deletar Arquivo

- [ ] Na lista de uploads, clicar em "Deletar" em um arquivo
- [ ] Confirmar deleção
- [ ] Verificar que arquivo desapareceu da lista
- [ ] Verificar que arquivo foi deletado do Storage

**Resultado esperado:** ✅ Deleção funcionando

---

### Fase 5: Criteria Forms Completo

#### 5.1 Criar Critério AWARDS

- [ ] Na página do processo, navegar para "Critérios"
- [ ] Clicar em "Criar Critério" → AWARDS
- [ ] Preencher as 4 subseções:
  - **Overview:** Visão geral do prêmio
  - **Context:** Contexto e background
  - **Impact:** Impacto e resultados
  - **Evidence:** Evidências específicas
- [ ] Verificar que templates aparecem corretamente
- [ ] Salvar critério
- [ ] Verificar que critério aparece na lista

**Resultado esperado:** ✅ Critério criado com sucesso

#### 5.2 Criar Critério MEMBERSHIP

- [ ] Criar critério MEMBERSHIP
- [ ] Preencher todas as subseções
- [ ] Salvar critério

**Resultado esperado:** ✅ Múltiplos critérios funcionando

#### 5.3 Editar Critério

- [ ] Clicar em um critério existente
- [ ] Modificar conteúdo de uma subseção
- [ ] Salvar alterações
- [ ] Verificar que mudanças foram salvas

**Resultado esperado:** ✅ Edição funcionando

#### 5.4 Validação em Tempo Real

- [ ] Editar uma subseção
- [ ] Verificar que validação aparece após debounce
- [ ] Verificar que contador de caracteres atualiza

**Resultado esperado:** ✅ Validação em tempo real funcionando

---

### Fase 6: Validation com IA

#### 6.1 Validar Conteúdo de Critério

- [ ] Em um critério preenchido, clicar em "Validar com IA"
- [ ] Aguardar resposta da API
- [ ] Verificar que score de qualidade aparece (0-100)
- [ ] Verificar que feedback/sugestões aparecem
- [ ] Verificar que issues são destacadas

**Resultado esperado:** ✅ Validação com IA funcionando

#### 6.2 Detecção de Práticas Suspeitas

- [ ] Criar critério com conteúdo suspeito (ex: mencionar "Globee Awards")
- [ ] Validar com IA
- [ ] Verificar que alerta de prática suspeita aparece
- [ ] Verificar que explicação do risco aparece

**Resultado esperado:** ✅ Detecção de práticas suspeitas funcionando

#### 6.3 Score de Qualidade

- [ ] Validar critério bem escrito
- [ ] Verificar que score é alto (>70)
- [ ] Validar critério mal escrito
- [ ] Verificar que score é baixo (<50)

**Resultado esperado:** ✅ Score reflete qualidade do conteúdo

---

### Fase 7: Final Merits Generator

#### 7.1 Gerar Documento Final Merits

- [ ] Na página do processo, navegar para "Final Merits"
- [ ] Clicar em "Gerar Final Merits Statement"
- [ ] Aguardar geração (pode levar alguns minutos)
- [ ] Verificar que documento é gerado
- [ ] Verificar estrutura (20-30 páginas)
- [ ] Verificar que referências cruzadas estão corretas

**Resultado esperado:** ✅ Documento gerado com sucesso

#### 7.2 Exportar Documento

- [ ] Clicar em "Exportar PDF" ou "Exportar DOCX"
- [ ] Verificar que download inicia
- [ ] Verificar que arquivo está formatado corretamente

**Resultado esperado:** ✅ Export funcionando

---

### Fase 8: Letters Templates

#### 8.1 Criar Carta de Recomendação

- [ ] Na página do processo, navegar para "Cartas"
- [ ] Clicar em "Nova Carta"
- [ ] Preencher informações do recomendador:
  - Nome: `Dr. João Silva`
  - Título: `Professor de Ciência da Computação`
  - Organização: `Universidade XYZ`
  - Email: `joao.silva@university.edu`
- [ ] Preencher conteúdo da carta
- [ ] Salvar carta
- [ ] Verificar que carta aparece na lista

**Resultado esperado:** ✅ Carta criada com sucesso

#### 8.2 Editar Carta

- [ ] Clicar em uma carta existente
- [ ] Modificar conteúdo
- [ ] Salvar alterações
- [ ] Verificar que mudanças foram salvas

**Resultado esperado:** ✅ Edição funcionando

#### 8.3 Exportar Carta

- [ ] Clicar em "Exportar PDF" ou "Exportar DOCX"
- [ ] Verificar que download inicia
- [ ] Verificar que carta está formatada corretamente

**Resultado esperado:** ✅ Export funcionando

---

### Fase 9: Segurança RLS (Isolamento de Dados)

#### 9.1 Teste de Isolamento entre Usuários

**Setup:**
- [ ] Criar usuário A: `teste1@visaflow.test`
- [ ] Criar usuário B: `teste2@visaflow.test`
- [ ] Com usuário A, criar processo A
- [ ] Com usuário B, criar processo B

**Teste de Leitura:**
- [ ] Fazer login com usuário A
- [ ] Verificar que apenas processo A aparece no dashboard
- [ ] Tentar acessar processo B diretamente pela URL (deve falhar ou não mostrar dados)
- [ ] Fazer login com usuário B
- [ ] Verificar que apenas processo B aparece no dashboard

**Teste de Escrita:**
- [ ] Com usuário A, tentar criar task no processo B (deve falhar)
- [ ] Com usuário B, tentar editar processo A (deve falhar)

**Resultado esperado:** ✅ RLS funcionando - usuários isolados

#### 9.2 Teste de Storage Policies

**Setup:**
- [ ] Usuário A faz upload de arquivo
- [ ] Usuário B faz upload de arquivo

**Teste:**
- [ ] Com usuário A, verificar que apenas seus arquivos aparecem
- [ ] Tentar acessar URL do arquivo do usuário B (deve falhar)
- [ ] Com usuário B, verificar que apenas seus arquivos aparecem

**Resultado esperado:** ✅ Storage policies funcionando - arquivos isolados

---

## 📊 CRITÉRIOS DE SUCESSO

### ✅ Todos os Testes Devem Passar

- ✅ Autenticação funcionando
- ✅ CRUD de processos funcionando
- ✅ CRUD de tasks funcionando
- ✅ Upload system funcionando
- ✅ Criteria forms funcionando
- ✅ Validation com IA funcionando
- ✅ Final Merits Generator funcionando
- ✅ Letters Templates funcionando
- ✅ RLS funcionando (isolamento de dados)

### ⚠️ Se Algum Teste Falhar

1. **Documentar o problema:**
   - Qual teste falhou
   - O que aconteceu (erro, comportamento inesperado)
   - Screenshots se necessário

2. **Verificar logs:**
   - Console do navegador (F12)
   - Console do terminal (servidor)
   - Supabase Dashboard → Logs

3. **Criar issue ou corrigir:**
   - Se for bug, criar issue no GitHub
   - Se for problema de configuração, corrigir

---

## 🎯 PRÓXIMOS PASSOS APÓS TESTES

### Se Todos os Testes Passarem:

1. ✅ **Documentar resultados:** Criar `docs/RESULTADOS_TESTES_AMBIENTE_REAL.md`
2. ✅ **Atualizar status:** Marcar Semana 2 como 100% completa
3. ✅ **Prosseguir para Semana 3:** Polish UI/UX e Deploy

### Se Alguns Testes Falharem:

1. ⚠️ **Priorizar correções:** Corrigir bugs críticos primeiro
2. ⚠️ **Re-testar:** Executar testes novamente após correções
3. ⚠️ **Documentar:** Manter registro de problemas e soluções

---

## 📝 NOTAS IMPORTANTES

- ⏱️ **Tempo estimado total:** 2-3 horas
- 🔄 **Pode executar em múltiplas sessões:** Salvar progresso no checklist
- 🐛 **Documentar problemas:** Criar issues para bugs encontrados
- ✅ **Validar RLS é crítico:** Garantir isolamento de dados entre usuários

---

**Status:** ✅ **PRONTO PARA EXECUTAR**

**Última atualização:** Janeiro 2025




