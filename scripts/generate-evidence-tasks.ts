/**
 * Script para gerar tarefas de EVIDENCE (150 tarefas)
 * 15 tarefas por critério × 10 critérios
 */

interface Task {
  title: string;
  description: string;
  phase: 'EVIDENCE';
  order: number;
  dependsOn?: number[];
}

const CRITERIA = [
  { id: 'AWARDS', name: 'Prêmios', short: 'Awards' },
  { id: 'MEMBERSHIP', name: 'Associações', short: 'Membership' },
  { id: 'PRESS', name: 'Cobertura de Imprensa', short: 'Press' },
  { id: 'JUDGING', name: 'Judging Work', short: 'Judging' },
  { id: 'ORIGINAL', name: 'Contribuições Originais', short: 'Original Contributions' },
  { id: 'SCHOLARLY', name: 'Artigos Acadêmicos', short: 'Scholarly Articles' },
  { id: 'CRITICAL', name: 'Papel de Liderança', short: 'Critical Role' },
  { id: 'HIGH_SALARY', name: 'Alta Remuneração', short: 'High Salary' },
  { id: 'EXHIBITIONS', name: 'Exibições Artísticas', short: 'Exhibitions' },
  { id: 'COMMERCIAL_SUCCESS', name: 'Sucesso Comercial', short: 'Commercial Success' },
] as const;

function generateTasksForCriterion(
  criterion: typeof CRITERIA[number],
  startOrder: number,
  dependsOnBase: number[]
): Task[] {
  const tasks: Task[] = [];
  let currentOrder = startOrder;
  
  // Identificação (2 tarefas)
  tasks.push({
    title: `Listar Todos os ${criterion.name} Relevantes`,
    description: `Fazer lista completa de todos os ${criterion.name.toLowerCase()} que você possui. Incluir datas, organizações, e contexto.`,
    phase: 'EVIDENCE',
    order: currentOrder++,
    dependsOn: dependsOnBase,
  });
  
  tasks.push({
    title: `Verificar e Filtrar ${criterion.short} por Requisitos`,
    description: `Verificar se seus ${criterion.name.toLowerCase()} atendem requisitos (nacional/internacional) e eliminar locais/regionais.`,
    phase: 'EVIDENCE',
    order: currentOrder++,
    dependsOn: [currentOrder - 2],
  });
  
  // Coleta de Documentos (4 tarefas)
  const identificationLast = currentOrder - 1;
  
  tasks.push({
    title: `Obter Documentos Oficiais de ${criterion.short}`,
    description: `Coletar certificados, cartas, documentos oficiais que comprovem seus ${criterion.name.toLowerCase()}.`,
    phase: 'EVIDENCE',
    order: currentOrder++,
    dependsOn: [identificationLast],
  });
  
  tasks.push({
    title: `Coletar Estatísticas e Critérios de Seleção - ${criterion.short}`,
    description: `Obter dados estatísticos e documentar critérios de seleção: participantes, taxa de seleção, quem avaliou, etc.`,
    phase: 'EVIDENCE',
    order: currentOrder++,
    dependsOn: [identificationLast],
  });
  
  tasks.push({
    title: `Provar Reconhecimento Internacional de ${criterion.short}`,
    description: `Documentar que seus ${criterion.name.toLowerCase()} têm reconhecimento além das fronteiras nacionais.`,
    phase: 'EVIDENCE',
    order: currentOrder++,
    dependsOn: [identificationLast],
  });
  
  tasks.push({
    title: `Coletar Screenshots de Páginas Oficiais - ${criterion.short}`,
    description: `Fazer screenshots de páginas web oficiais mencionando seus ${criterion.name.toLowerCase()}. Incluir URLs visíveis.`,
    phase: 'EVIDENCE',
    order: currentOrder++,
    dependsOn: [identificationLast],
  });
  
  // Preparação de Evidências (2 tarefas)
  const collectionLast = currentOrder - 1;
  
  tasks.push({
    title: `Formatar e Traduzir Evidências de ${criterion.short}`,
    description: `Formatar screenshots com URLs visíveis e traduzir documentos se necessário. Certificar traduções.`,
    phase: 'EVIDENCE',
    order: currentOrder++,
    dependsOn: [collectionLast],
  });
  
  tasks.push({
    title: `Criar Tabela Comparativa para ${criterion.short} (se aplicável)`,
    description: `Se aplicável, criar tabela comparando seus ${criterion.name.toLowerCase()} com outros no campo.`,
    phase: 'EVIDENCE',
    order: currentOrder++,
    dependsOn: [collectionLast],
  });
  
  // Escrita de Subseções (4 tarefas)
  const preparationLast = currentOrder - 1;
  
  tasks.push({
    title: `Escrever Subseção 1: Proof of Recipient - ${criterion.short}`,
    description: `Demonstrar que você recebeu o ${criterion.name.toLowerCase()}. Incluir evidências específicas.`,
    phase: 'EVIDENCE',
    order: currentOrder++,
    dependsOn: [preparationLast],
  });
  
  tasks.push({
    title: `Escrever Subseção 2: Proof of Excellence - ${criterion.short}`,
    description: `Demonstrar que o ${criterion.name.toLowerCase()} reconhece excelência. Explicar critérios e padrões.`,
    phase: 'EVIDENCE',
    order: currentOrder++,
    dependsOn: [currentOrder - 1],
  });
  
  tasks.push({
    title: `Escrever Subseção 3: Proof of Requirements - ${criterion.short}`,
    description: `Demonstrar que o ${criterion.name.toLowerCase()} não tem limitações geográficas ou temporais.`,
    phase: 'EVIDENCE',
    order: currentOrder++,
    dependsOn: [currentOrder - 1],
  });
  
  tasks.push({
    title: `Escrever Subseção 4: Proof of Recognition - ${criterion.short}`,
    description: `Demonstrar reconhecimento amplo do ${criterion.name.toLowerCase()} pela comunidade.`,
    phase: 'EVIDENCE',
    order: currentOrder++,
    dependsOn: [currentOrder - 1],
  });
  
  // Validação (3 tarefas)
  const writingLast = currentOrder - 1;
  
  tasks.push({
    title: `Validar ${criterion.short} com IA (Claude)`,
    description: `Usar validador automático do VisaFlow para analisar qualidade das subseções e evidências.`,
    phase: 'EVIDENCE',
    order: currentOrder++,
    dependsOn: [writingLast],
  });
  
  tasks.push({
    title: `Revisar ${criterion.short} com Checklist`,
    description: `Revisar todas as 4 subseções usando checklist de qualidade. Verificar completude e força.`,
    phase: 'EVIDENCE',
    order: currentOrder++,
    dependsOn: [currentOrder - 2],
  });
  
  tasks.push({
    title: `Obter Feedback Final para ${criterion.short}`,
    description: `Se tiver colaborador revisor, solicitar feedback. Incorporar sugestões e finalizar critério.`,
    phase: 'EVIDENCE',
    order: currentOrder++,
    dependsOn: [currentOrder - 2],
  });
  
  console.error(`[DEBUG] ${criterion.short}: ${tasks.length} tarefas geradas`);
  return tasks;
}

// Gerar todas as tarefas
let orderCounter = 20; // Começa após ELIGIBILITY (0-19)
const allEvidenceTasks: Task[] = [];

CRITERIA.forEach((criterion, index) => {
  const dependsOnBase = index === 0 ? [19] : [orderCounter - 1]; // Primeiro depende de última tarefa ELIGIBILITY, outros dependem da última tarefa do critério anterior
  const tasks = generateTasksForCriterion(criterion, orderCounter, dependsOnBase);
  allEvidenceTasks.push(...tasks);
  orderCounter += tasks.length;
});

// Output para copiar e colar
console.log('// ============================================');
console.log('// PHASE 2: EVIDENCE (Tasks 20-169) - 150 tarefas');
console.log('// ============================================\n');

allEvidenceTasks.forEach((task, index) => {
  const dependsOnStr = task.dependsOn ? `dependsOn: [${task.dependsOn.join(', ')}],` : '';
  console.log(`  {`);
  console.log(`    title: '${task.title}',`);
  console.log(`    description: '${task.description}',`);
  console.log(`    phase: '${task.phase}',`);
  console.log(`    order: ${task.order},`);
  if (dependsOnStr) console.log(`    ${dependsOnStr}`);
  console.log(`  },`);
  if ((index + 1) % 15 === 0 && Math.floor((index + 1) / 15) - 1 < CRITERIA.length) {
    const criterionIndex = Math.floor((index + 1) / 15) - 1;
    console.log(`\n  // --- ${CRITERIA[criterionIndex].short} Complete ---\n`);
  }
});

console.log(`\n// Total: ${allEvidenceTasks.length} tarefas de EVIDENCE`);

