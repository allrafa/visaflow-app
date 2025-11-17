/**
 * Script para gerar tarefas de PETITION (45 tarefas)
 */

interface Task {
  title: string;
  description: string;
  phase: 'PETITION';
  order: number;
  dependsOn?: number[];
}

const tasks: Task[] = [];
let currentOrder = 211; // Começa após LETTERS (última tarefa é 210)

// Estruturação do Documento (10 tarefas)
tasks.push({
  title: 'Criar Table of Contents',
  description: 'Criar índice completo do dossiê com todas as seções, critérios, evidências e páginas correspondentes.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [210], // Última tarefa de LETTERS
});

tasks.push({
  title: 'Organizar Evidências por Critério',
  description: 'Estruturar todas as evidências agrupadas por critério. Garantir ordem lógica e fácil navegação.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Numerar Todas as Evidências (Exhibit 1-200)',
  description: 'Atribuir números sequenciais a todas as evidências (Exhibit 1, Exhibit 2, etc.). Criar lista numerada completa.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Criar Lista de Evidências Detalhada',
  description: 'Criar lista completa de todas as evidências com números, títulos, datas e localização no dossiê.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Configurar Referências Cruzadas',
  description: 'Garantir que todas as referências a evidências no texto correspondem aos números corretos. Verificar consistência.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Criar Índice de Nomes e Locais',
  description: 'Criar índice alfabético de todos os nomes próprios, organizações e locais mencionados no dossiê.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Configurar Numeração de Páginas',
  description: 'Garantir numeração consistente de páginas em todo o documento. Verificar que números estão corretos.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Adicionar Headers e Footers',
  description: 'Configurar headers e footers profissionais em todas as páginas. Incluir nome do processo e número de página.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Criar Tabs Físicos (se impressão)',
  description: 'Se imprimindo o dossiê, criar tabs físicos para facilitar navegação do oficial do USCIS entre seções.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Fazer Backup Completo do Dossiê',
  description: 'Criar backup completo de todo o dossiê em múltiplos locais (cloud, HD externo, etc.). Garantir segurança dos dados.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

// Escrita de Seções Narrativas (15 tarefas)
const structuringLast = currentOrder - 1;

tasks.push({
  title: 'Escrever Cover Letter (1 página)',
  description: 'Redigir carta de apresentação profissional resumindo o caso e solicitando aprovação. Máximo 1 página.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [structuringLast],
});

tasks.push({
  title: 'Escrever Summary (2 páginas)',
  description: 'Criar resumo executivo de 2 páginas destacando os principais achievements e argumentos do caso.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Escrever Final Merits Statement - Biografia (5-10 páginas)',
  description: 'Redigir seção biográfica detalhada focada em achievements e trajetória profissional. Demonstrar evolução da carreira.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Escrever Final Merits Statement - Achievements (5-10 páginas)',
  description: 'Documentar todas as realizações principais: prêmios, publicações, contribuições, liderança, impacto.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Escrever Final Merits Statement - Impact (3-5 páginas)',
  description: 'Demonstrar impacto significativo no campo: influência, mudanças causadas, reconhecimento pela comunidade.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Escrever Benefits for US - Economic (2 páginas)',
  description: 'Explicar benefícios econômicos que você trará aos EUA: criação de empregos, receita, crescimento econômico.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Escrever Benefits for US - Innovation (2 páginas)',
  description: 'Demonstrar como sua expertise promoverá inovação nos EUA: novas tecnologias, metodologias, avanços científicos.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Escrever Benefits for US - Education (1 página)',
  description: 'Explicar contribuições educacionais: ensino, mentoria, treinamento de profissionais, disseminação de conhecimento.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Escrever Work Plan - Short term (1 página)',
  description: 'Descrever planos de trabalho para os próximos 1-2 anos nos EUA: projetos, colaborações, objetivos específicos.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Escrever Work Plan - Long term (1 página)',
  description: 'Descrever visão de longo prazo (5-10 anos): impacto esperado, legado, contribuições futuras ao campo.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Escrever Conclusion (1 página)',
  description: 'Criar conclusão forte resumindo argumentos principais e reforçando elegibilidade para EB-1A.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Revisar Todas as Seções Narrativas',
  description: 'Fazer revisão completa de todas as seções escritas: consistência, clareza, força dos argumentos.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Validar Conteúdo com IA (Claude)',
  description: 'Usar validador automático do VisaFlow para detectar fraquezas, linguagem genérica, ou práticas suspeitas.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Fazer Revisão Gramatical Completa',
  description: 'Revisar gramática, ortografia, pontuação e estilo em todo o documento. Garantir inglês perfeito.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Obter Revisão Final de Advogado (opcional)',
  description: 'Se tiver advogado, solicitar revisão final profissional antes de finalizar o dossiê.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

// Validação de Qualidade (10 tarefas)
const writingLast = currentOrder - 1;

tasks.push({
  title: 'Validar Completude de Cada Critério',
  description: 'Verificar que cada critério escolhido tem todas as evidências necessárias e 4 subseções completas.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [writingLast],
});

tasks.push({
  title: 'Verificar 4 Subseções Presentes em Cada Critério',
  description: 'Confirmar que cada critério tem as 4 subseções obrigatórias: Recipient, Excellence, Requirements, Recognition.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Verificar Evidências Numeradas Corretamente',
  description: 'Confirmar que todas as evidências têm números (Exhibit X) e estão referenciadas corretamente no texto.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Verificar Referências Cruzadas Funcionam',
  description: 'Testar todas as referências cruzadas: clicar em cada referência e confirmar que leva ao lugar correto.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Detectar Texto Gerado por IA',
  description: 'Usar detector de IA para identificar texto que parece gerado. Substituir por escrita mais natural e específica.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Verificar Práticas Suspeitas',
  description: 'Revisar contra lista de práticas suspeitas (Globee, Stevie, matérias pagas, etc.). Remover ou explicar adequadamente.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Calcular Score de Qualidade Geral',
  description: 'Usar calculadora de score do VisaFlow para obter pontuação geral (0-100) da petição completa.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Comparar com Petição de Referência Aprovada',
  description: 'Comparar estrutura, profundidade e qualidade com petição aprovada de referência. Identificar gaps.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Fazer Checklist Final Completo',
  description: 'Revisar checklist completo de qualidade: todos os itens devem estar marcados antes de aprovar.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Obter Aprovação Final do Dossiê',
  description: 'Fazer revisão final completa e obter aprovação (própria ou de advogado) antes de avançar para filing.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

// Preparação para Filing (10 tarefas)
const validationLast = currentOrder - 1;

tasks.push({
  title: 'Preencher Formulário I-140',
  description: 'Completar formulário oficial I-140 do USCIS com todas as informações requeridas. Verificar precisão.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [validationLast],
});

tasks.push({
  title: 'Preencher Formulário I-907 (Premium Processing)',
  description: 'Se usando premium processing, preencher formulário I-907 e anexar ao pacote.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Preencher Formulário G-1145 (Notificações Eletrônicas)',
  description: 'Preencher formulário G-1145 para receber notificações eletrônicas sobre o status do caso.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Preparar Cheques e Pagamentos',
  description: 'Preparar cheques ou formas de pagamento para filing fee ($700) e premium processing ($2,500 se aplicável).',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Fazer Cópias Completas do Dossiê',
  description: 'Criar cópias completas de todo o pacote para seus registros. Manter cópias em local seguro.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [validationLast],
});

tasks.push({
  title: 'Organizar Ordem de Documentos',
  description: 'Organizar documentos na ordem correta: formulários primeiro, depois evidências por critério, cartas por último.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Criar Package para Envio',
  description: 'Preparar pacote físico completo: documentos organizados, formulários, pagamentos, tudo em ordem.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Verificar Endereço USCIS Correto',
  description: 'Confirmar endereço correto do centro de serviços do USCIS para envio. Verificar se mudou recentemente.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Criar Tracking Sheet',
  description: 'Criar planilha ou documento para rastrear envio, recebimento, e status do caso.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Fazer Backup Digital Final',
  description: 'Criar backup digital final completo de todo o dossiê antes do envio. Armazenar em múltiplos locais.',
  phase: 'PETITION',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

// Output
console.log('// ============================================');
console.log(`// PHASE 4: PETITION (Tasks 211-${currentOrder - 1}) - ${tasks.length} tarefas`);
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

console.log(`\n// Total: ${tasks.length} tarefas de PETITION`);

