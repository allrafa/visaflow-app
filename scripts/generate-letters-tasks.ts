/**
 * Script para gerar tarefas de LETTERS (41 tarefas)
 */

interface Task {
  title: string;
  description: string;
  phase: 'LETTERS';
  order: number;
  dependsOn?: number[];
}

const tasks: Task[] = [];
let currentOrder = 170; // Começa após EVIDENCE (última tarefa é 169)

// Identificação de Recomendadores (5 tarefas)
tasks.push({
  title: 'Listar Potenciais Recomendadores (15-20 pessoas)',
  description: 'Fazer lista completa de 15-20 pessoas qualificadas que conheçam seu trabalho: experts reconhecidos, líderes da indústria, acadêmicos.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [169],
});

tasks.push({
  title: 'Classificar Recomendadores por Relação, Credibilidade e Disponibilidade',
  description: 'Avaliar cada recomendador em três dimensões: relação com você, credibilidade no campo, e disponibilidade para ajudar.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Verificar Qualificações dos Recomendadores',
  description: 'Pesquisar qualificações de cada recomendador: títulos, posições, publicações, reconhecimentos. Confirmar que são experts reconhecidos.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Filtrar para 7-10 Recomendadores Finais',
  description: 'Selecionar os 7-10 melhores recomendadores baseado na análise anterior. Priorizar qualidade sobre quantidade.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Confirmar Disponibilidade Inicial dos Recomendadores',
  description: 'Contactar recomendadores selecionados para confirmar disponibilidade inicial. Explicar brevemente o processo EB-1A.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

// Preparação de Materials (5 tarefas)
const identificationLast = currentOrder - 1;

tasks.push({
  title: 'Criar Brief Detalhado para Recomendadores (3-5 páginas)',
  description: 'Preparar documento completo com seus achievements, evidências principais, pontos-chave do caso EB-1A, e contexto do processo.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [identificationLast],
});

tasks.push({
  title: 'Compilar Lista de Achievements para Recomendadores',
  description: 'Criar lista organizada de suas realizações mais relevantes, com datas, contexto e impacto. Facilitar escrita das cartas.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [identificationLast],
});

tasks.push({
  title: 'Preparar Exemplos de Cartas Modelo',
  description: 'Criar 2-3 exemplos de cartas de recomendação bem escritas (de casos aprovados) para orientar recomendadores.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [identificationLast],
});

tasks.push({
  title: 'Reunir Evidências de Colaboração com Recomendadores',
  description: 'Coletar documentos que demonstrem colaboração: emails, projetos conjuntos, publicações, eventos, etc.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [identificationLast],
});

tasks.push({
  title: 'Criar Timeline de Solicitação de Cartas',
  description: 'Planejar cronograma de solicitação: quando contactar cada recomendador, prazos esperados, follow-ups necessários.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [identificationLast],
});

// Solicitação (21 tarefas - 3 por recomendador × 7)
const preparationLast = currentOrder - 1;
const numRecommenders = 7;

for (let i = 1; i <= numRecommenders; i++) {
  const dependsOnBase = i === 1 ? [preparationLast] : [currentOrder - 1];
  
  tasks.push({
    title: `Contactar Recomendador ${i} e Enviar Materials`,
    description: `Enviar email profissional explicando processo EB-1A, marcar call para explicar detalhes, e enviar brief completo com achievements e exemplos.`,
    phase: 'LETTERS',
    order: currentOrder++,
    dependsOn: dependsOnBase,
  });
  
  tasks.push({
    title: `Acompanhar e Receber Carta do Recomendador ${i}`,
    description: `Fazer follow-up periódico para verificar progresso, receber draft da carta, e revisar qualidade antes de solicitar versão final.`,
    phase: 'LETTERS',
    order: currentOrder++,
    dependsOn: [currentOrder - 2],
  });
  
  tasks.push({
    title: `Finalizar Carta do Recomendador ${i}`,
    description: `Solicitar revisões se necessário, obter versão final, e confirmar que carta atende padrões de qualidade.`,
    phase: 'LETTERS',
    order: currentOrder++,
    dependsOn: [currentOrder - 2],
  });
}

// Revisão e Edição (5 tarefas)
const solicitationLast = currentOrder - 1;

tasks.push({
  title: 'Revisar Todas as Cartas Recebidas',
  description: 'Fazer revisão completa de todas as cartas. Verificar especificidade, detalhes, e força dos argumentos.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [solicitationLast],
});

tasks.push({
  title: 'Verificar Especificidade das Cartas (não genérico)',
  description: 'Garantir que cada carta menciona achievements específicos, projetos concretos, e impacto real. Evitar linguagem genérica.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Detectar Linguagem de IA nas Cartas',
  description: 'Usar detector de IA do VisaFlow para identificar texto que parece gerado por IA. Solicitar revisão se necessário.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Solicitar Revisões nas Cartas que Precisam Melhorias',
  description: 'Contactar recomendadores cujas cartas precisam melhorias. Fornecer feedback específico e construtivo.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Obter Versões Finais de Todas as Cartas',
  description: 'Receber versões finais revisadas de todas as cartas. Confirmar que atendem padrões de qualidade.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

// Coleta de Documentos (5 tarefas)
const reviewLast = currentOrder - 1;

tasks.push({
  title: 'Obter Assinaturas em Todas as Cartas',
  description: 'Coletar assinaturas físicas ou digitais de todos os recomendadores. Garantir que assinaturas são legíveis.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [reviewLast],
});

tasks.push({
  title: 'Coletar CVs de Todos os Recomendadores',
  description: 'Solicitar e receber CVs atualizados de todos os recomendadores para demonstrar suas qualificações.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [reviewLast],
});

tasks.push({
  title: 'Formatar Cartas Uniformemente',
  description: 'Padronizar formatação de todas as cartas: fonte, espaçamento, headers, footers. Criar aparência profissional.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Organizar Cartas por Ordem de Importância',
  description: 'Ordenar cartas por força e credibilidade do recomendador. Colocar as mais fortes primeiro no pacote.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Criar Índice de Cartas de Recomendação',
  description: 'Criar índice listando todas as cartas, recomendadores, e suas qualificações. Facilitar navegação do oficial do USCIS.',
  phase: 'LETTERS',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

// Output
console.log('// ============================================');
console.log(`// PHASE 3: LETTERS (Tasks 170-${currentOrder - 1}) - ${tasks.length} tarefas`);
console.log('// ============================================\n');

tasks.forEach((task) => {
  const dependsOnStr = task.dependsOn ? `dependsOn: [${task.dependsOn.join(', ')}],` : '';
  console.log(`  {`);
  console.log(`    title: '${task.title}',`);
  console.log(`    description: '${task.description}',`);
  console.log(`    phase: '${task.phase}',`);
  console.log(`    order: ${task.order},`);
  if (dependsOnStr) console.log(`    ${dependsOnStr}`);
  console.log(`  },`);
});

console.log(`\n// Total: ${tasks.length} tarefas de LETTERS`);

