# 🎯 Plano de Teste de Usabilidade - VisaFlow

**Objetivo:** Avaliar a experiência de usuários não-técnicos ao usar o VisaFlow pela primeira vez

**Público-alvo:** Profissionais qualificados para EB-1A, com conhecimento limitado de tecnologia

**Duração:** 45-60 minutos por sessão

---

## 📋 Perfil do Usuário de Teste

### Características Ideais:

**Demográfico:**
- Idade: 30-55 anos
- Profissão: Pesquisador, professor, artista, executivo, etc.
- Experiência com EB-1A: Considerando aplicar ou no início do processo

**Nível Tecnológico:**
- ⭐ **Básico:** Usa email e redes sociais, mas tem dificuldade com sistemas complexos
- ⭐⭐ **Intermediário:** Confortável com tecnologia, mas não é desenvolvedor
- ⭐⭐⭐ **Avançado:** Usa múltiplas ferramentas digitais diariamente

**Objetivo:** 70% dos testadores devem ser nível Básico ou Intermediário

---

## 🎭 Persona: "Dr. Maria Santos"

**Perfil:**
- 42 anos, Pesquisadora em Biologia
- PhD com 15 anos de experiência
- Publicou 30 artigos científicos
- Recebeu prêmios na área
- **Nível tecnológico:** ⭐ Básico
- **Dor principal:** "Não sei por onde começar o processo EB-1A"

**Quote:**
> "Eu entendo de ciência, não de tecnologia. Preciso de algo simples que me guie passo a passo."

---

## 📝 Estrutura do Teste

### Parte 1: Boas-vindas e Contexto (5 minutos)

**Script do Facilitador:**

```
Olá [Nome], muito obrigado por participar deste teste!

Hoje você vai testar o VisaFlow, um sistema para gerenciar petições EB-1A.
Não estamos testando você - estamos testando o sistema. Não existem
respostas certas ou erradas.

Por favor, pense em voz alta enquanto usa o sistema. Me conte:
- O que você está vendo
- O que você está pensando
- O que está confuso ou claro
- O que você esperava que acontecesse

Pode ser totalmente honesto. Quanto mais críticas, melhor!

Alguma dúvida antes de começarmos?
```

### Parte 2: Questionário Pré-Teste (5 minutos)

**Perguntas:**

1. Você já iniciou ou está considerando o processo EB-1A?
   - [ ] Sim, já iniciei
   - [ ] Sim, estou considerando
   - [ ] Não

2. Como você descreveria seu nível de conforto com tecnologia?
   - [ ] Básico - Uso só o essencial
   - [ ] Intermediário - Confortável com apps
   - [ ] Avançado - Uso muitas ferramentas digitais

3. Já usou algum sistema similar antes?
   - [ ] Sim, qual? __________
   - [ ] Não

4. Qual sua maior dificuldade no processo EB-1A?
   - [ ] Organizar evidências
   - [ ] Entender os critérios
   - [ ] Saber por onde começar
   - [ ] Escrever o petition
   - [ ] Outro: __________

---

## 🎯 Cenários de Teste

### Cenário 1: Primeira Impressão (3 minutos)

**Objetivo:** Avaliar clareza da proposta de valor

**Tarefa:**
```
Você acabou de ouvir falar do VisaFlow de um amigo.
Acesse o site: [URL]

Sem clicar em nada ainda, me conte:
- O que este site faz?
- Para quem ele é?
- Você se sente confiante para usar?
```

**Observar:**
- [ ] Entendeu a proposta em <10 segundos?
- [ ] Conseguiu identificar os benefícios?
- [ ] Sentiu confiança no design?

**Perguntas pós-tarefa:**
- O que mais chamou sua atenção?
- Algo te confundiu?
- Você usaria este sistema? Por quê?

---

### Cenário 2: Criação de Conta (5 minutos)

**Objetivo:** Avaliar facilidade de signup

**Tarefa:**
```
Imagine que você decidiu experimentar o VisaFlow.
Crie uma conta para começar a usar.
```

**Observar:**
- [ ] Encontrou o botão de signup facilmente?
- [ ] Formulário foi claro?
- [ ] Teve dúvidas sobre senha/email?
- [ ] Processo foi rápido (<2 min)?

**Perguntas pós-tarefa:**
- Foi fácil ou difícil criar a conta? (escala 1-5)
- Alguma informação estava confusa?
- Você se sentiu seguro fornecendo seus dados?

---

### Cenário 3: Primeiro Acesso ao Dashboard (5 minutos)

**Objetivo:** Avaliar clareza do dashboard inicial

**Tarefa:**
```
Você acabou de fazer login pela primeira vez.
Explore o dashboard por 2 minutos e me diga:
- O que você pode fazer aqui?
- Por onde você começaria?
```

**Observar:**
- [ ] Entendeu o propósito do dashboard?
- [ ] Identificou as ações principais?
- [ ] Sentiu-se perdido ou orientado?
- [ ] Notou as estatísticas?

**Perguntas pós-tarefa:**
- O que você esperava ver aqui?
- Falta alguma informação importante?
- Os números/estatísticas fazem sentido?

---

### Cenário 4: Criar Primeiro Processo (10 minutos)

**Objetivo:** Avaliar facilidade de criar processo EB-1A

**Contexto:**
```
Você é um pesquisador de Biologia com PhD,
30 publicações científicas, e recebeu 2 prêmios nacionais.
Você quer começar seu processo EB-1A.

Crie um novo processo no sistema.
```

**Observar:**
- [ ] Encontrou o botão "Novo Processo"?
- [ ] Formulário foi intuitivo?
- [ ] Entendeu todos os campos?
- [ ] Completou sem ajuda?

**Perguntas pós-tarefa:**
- Como foi a experiência? (escala 1-5)
- Algum campo estava confuso?
- Você sabe o que fazer agora?

---

### Cenário 5: Adicionar Tarefa ao Processo (8 minutos)

**Objetivo:** Avaliar sistema de tarefas

**Tarefa:**
```
Você precisa coletar suas publicações científicas.
Crie uma tarefa no seu processo para isso.
```

**Observar:**
- [ ] Encontrou onde criar tarefa?
- [ ] Entendeu as categorias de tarefa?
- [ ] Conseguiu definir prioridade/prazo?
- [ ] Fluxo foi lógico?

**Perguntas pós-tarefa:**
- As categorias de tarefa fazem sentido?
- Você entendeu como organizar suas tarefas?
- Falta alguma opção importante?

---

### Cenário 6: Upload de Arquivo (5 minutos)

**Objetivo:** Avaliar sistema de upload

**Contexto:**
```
Você tem um PDF com sua lista de publicações.
Anexe este arquivo à tarefa que você criou.

[Fornecer arquivo de teste: publicacoes-exemplo.pdf]
```

**Observar:**
- [ ] Encontrou o botão de upload?
- [ ] Drag-and-drop funcionou?
- [ ] Feedback foi claro?
- [ ] Conseguiu ver o arquivo depois?

**Perguntas pós-tarefa:**
- Foi fácil fazer upload? (escala 1-5)
- Você sabe onde encontrar o arquivo depois?
- Confia que o arquivo está seguro?

---

### Cenário 7: Entender Critérios EB-1A (10 minutos)

**Objetivo:** Avaliar explicação dos critérios

**Tarefa:**
```
Você precisa entender quais critérios EB-1A você atende.
Explore a seção de critérios e me diga:
- Quais critérios você entende?
- Qual você acha que se aplica a você?
```

**Observar:**
- [ ] Encontrou a seção de critérios?
- [ ] Entendeu os 10 critérios?
- [ ] Conseguiu identificar qual se aplica?
- [ ] Explicações foram claras?

**Perguntas pós-tarefa:**
- Os critérios estão explicados de forma clara?
- Você conseguiria preencher sozinho?
- O que poderia ser melhor explicado?

---

### Cenário 8: Usar Validação AI (se tempo permitir) (5 minutos)

**Objetivo:** Avaliar utilidade da AI

**Contexto:**
```
O sistema tem uma AI que valida suas evidências.
Escreva uma breve descrição de suas conquistas e
veja o que a AI sugere.
```

**Observar:**
- [ ] Entendeu o propósito da AI?
- [ ] Conseguiu usar a funcionalidade?
- [ ] Feedback da AI foi útil?
- [ ] Confia nas sugestões?

**Perguntas pós-tarefa:**
- A AI ajudou ou confundiu?
- Você usaria essa funcionalidade?
- O que poderia ser melhor?

---

## 📊 Métricas de Sucesso

### Métricas Quantitativas:

1. **Taxa de Conclusão:**
   - ✅ Meta: >80% dos usuários completam cada tarefa
   - ⚠️ Alerta: <60% indicam problema grave

2. **Tempo de Conclusão:**
   - Criar conta: <3 min
   - Criar processo: <5 min
   - Criar tarefa: <2 min
   - Upload arquivo: <1 min

3. **Número de Cliques:**
   - Criar processo: <10 cliques
   - Criar tarefa: <5 cliques

4. **Taxa de Erro:**
   - ✅ Meta: <10% de erros por tarefa
   - ⚠️ Alerta: >20% indica confusão

### Métricas Qualitativas:

**Escala de Satisfação (1-5):**
- 5: Muito Fácil
- 4: Fácil
- 3: Neutro
- 2: Difícil
- 1: Muito Difícil

**Metas:**
- Média geral: >4.0
- Nenhuma tarefa <3.0

---

## 🎤 Questionário Pós-Teste

### Experiência Geral:

1. **De 1 a 5, quão fácil foi usar o VisaFlow?**
   - [ ] 1 - Muito difícil
   - [ ] 2 - Difícil
   - [ ] 3 - Neutro
   - [ ] 4 - Fácil
   - [ ] 5 - Muito fácil

2. **Você se sentiu confiante usando o sistema?**
   - [ ] Sim, completamente
   - [ ] Na maior parte do tempo
   - [ ] Às vezes
   - [ ] Raramente
   - [ ] Não

3. **Você usaria este sistema para seu processo EB-1A?**
   - [ ] Sim, definitivamente
   - [ ] Provavelmente sim
   - [ ] Talvez
   - [ ] Provavelmente não
   - [ ] Não

4. **Você recomendaria o VisaFlow para um colega?**
   - [ ] Sim, sem dúvida
   - [ ] Provavelmente sim
   - [ ] Talvez
   - [ ] Provavelmente não
   - [ ] Não

### Feedback Específico:

5. **O que você mais gostou no sistema?**

   _______________________________________________________

6. **O que mais te frustrou ou confundiu?**

   _______________________________________________________

7. **O que você mudaria/melhoraria?**

   _______________________________________________________

8. **Faltou alguma funcionalidade importante?**

   _______________________________________________________

9. **Como você descreveria este sistema para um amigo?**

   _______________________________________________________

10. **Algum comentário adicional?**

    _______________________________________________________

---

## 📸 Checklist do Facilitador

### Antes da Sessão:
- [ ] Computador/tablet configurado com VisaFlow
- [ ] Arquivos de teste preparados (PDFs, imagens)
- [ ] Gravador de tela configurado (se aplicável)
- [ ] Formulários impressos/digitais prontos
- [ ] Sala silenciosa reservada
- [ ] Água/café disponível
- [ ] Termo de consentimento assinado

### Durante a Sessão:
- [ ] Gravação iniciada (áudio/vídeo)
- [ ] Observações sendo anotadas
- [ ] Linguagem corporal observada
- [ ] Momentos de frustração marcados
- [ ] Comentários espontâneos registrados
- [ ] Tempo de cada tarefa cronometrado

### Após a Sessão:
- [ ] Questionário pós-teste preenchido
- [ ] Observações consolidadas
- [ ] Gravações salvas e organizadas
- [ ] Agradecimento enviado ao participante
- [ ] Dados anonimizados

---

## 🎁 Incentivos para Participantes

**Sugestões:**
- $50-100 Amazon gift card
- 1 mês grátis do VisaFlow Premium (quando lançar)
- Consultoria gratuita de 30min sobre EB-1A
- Certificado de participação

---

## 📈 Análise e Próximos Passos

### Após 5 Testes:

1. **Compilar Dados:**
   - Taxa de sucesso por tarefa
   - Tempo médio por tarefa
   - Satisfação média
   - Problemas recorrentes

2. **Identificar Padrões:**
   - 3+ usuários tiveram o mesmo problema? → **Crítico**
   - 2 usuários comentaram a mesma coisa? → **Importante**
   - 1 usuário teve problema único? → **Observar**

3. **Priorizar Melhorias:**
   - 🔴 **Crítico:** Bloqueadores de uso (corrigir imediatamente)
   - 🟡 **Alto:** Frustração significativa (corrigir em 1-2 semanas)
   - 🟢 **Médio:** Melhorias de UX (backlog)
   - 🔵 **Baixo:** Nice-to-have (considerar futuro)

4. **Iterar:**
   - Implementar correções críticas
   - Testar novamente com 2-3 usuários
   - Validar melhorias

---

## 📋 Template de Relatório

```markdown
# Teste de Usabilidade - Sessão #[N]

**Data:** [Data]
**Participante:** [ID anônimo - ex: P001]
**Perfil:** [Nível tecnológico + contexto]
**Duração:** [Tempo total]

## Resumo Executivo
- Taxa de conclusão: X%
- Satisfação geral: X/5
- Principais problemas: [3 bullets]
- Principais elogios: [3 bullets]

## Resultados por Tarefa

### Tarefa 1: Primeira Impressão
- ✅ Concluída
- Tempo: Xmin
- Observações: [...]
- Quotes: "[...]"

### Tarefa 2: Criar Conta
- ✅ Concluída / ⚠️ Parcial / ❌ Falhou
- Tempo: Xmin
- Erros: X
- Observações: [...]

[...repetir para todas as tarefas...]

## Feedback Qualitativo

**Positivos:**
1. [...]
2. [...]

**Negativos:**
1. [...]
2. [...]

**Sugestões:**
1. [...]
2. [...]

## Recomendações

**Crítico (fazer agora):**
- [ ] [Problema]

**Alto (fazer esta semana):**
- [ ] [Problema]

**Médio (fazer este mês):**
- [ ] [Melhoria]

## Anexos
- Gravação: [link]
- Screenshots: [link]
- Questionários: [link]
```

---

## 🎯 Checklist de Melhorias Baseadas em Testes

### Onboarding:
- [ ] Tutorial interativo para primeira vez
- [ ] Tooltips explicativos
- [ ] Vídeo de introdução
- [ ] Processo exemplo pré-carregado

### Dashboard:
- [ ] Call-to-action mais claro
- [ ] Explicação das estatísticas
- [ ] Tour guiado opcional
- [ ] Estado vazio melhor desenhado

### Processo:
- [ ] Labels mais claros nos campos
- [ ] Validação em tempo real
- [ ] Mensagens de erro úteis
- [ ] Progresso visual

### Ajuda:
- [ ] Botão de ajuda sempre visível
- [ ] FAQ contextual
- [ ] Chat de suporte
- [ ] Base de conhecimento

---

## 📞 Recrutamento de Testadores

### Onde Encontrar:

1. **LinkedIn:**
   - Grupos de imigrantes
   - Grupos de pesquisadores
   - Mensagens diretas

2. **Universidades:**
   - Departamentos internacionais
   - Professores visitantes
   - Pós-doutorandos

3. **Comunidades:**
   - Reddit: r/immigration, r/ImmigrationCanada
   - Facebook: Grupos de brasileiros nos EUA
   - Discord: Comunidades tech

4. **User Testing:**
   - UserTesting.com
   - UsabilityHub
   - Maze

### Script de Recrutamento:

```
Assunto: Teste de Usabilidade - $50 gift card 🎁

Olá!

Estamos desenvolvendo o VisaFlow, um sistema para gerenciar
petições EB-1A, e precisamos da sua ajuda!

Buscamos profissionais qualificados que estão considerando
ou iniciando o processo EB-1A para testar nosso sistema.

Sessão de 45-60 minutos
Remoto (Zoom)
$50 Amazon gift card

Interessado? Responda este email ou agende aqui: [link]

Obrigado!
```

---

**Versão:** 1.0
**Última atualização:** Novembro 16, 2025
**Próxima revisão:** Após primeiros 5 testes
