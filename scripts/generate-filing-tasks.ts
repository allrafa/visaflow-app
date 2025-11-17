/**
 * Script para gerar tarefas de FILING (33 tarefas)
 */

interface Task {
  title: string;
  description: string;
  phase: 'FILING';
  order: number;
  dependsOn?: number[];
}

const tasks: Task[] = [];
let currentOrder = 256; // Começa após PETITION (última tarefa é 255)

// Envio Inicial (5 tarefas)
tasks.push({
  title: 'Imprimir Petição Completa',
  description: 'Imprimir todas as páginas do dossiê em alta qualidade. Verificar que todas as páginas estão legíveis.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [255], // Última tarefa de PETITION
});

tasks.push({
  title: 'Organizar Documentos em Ordem',
  description: 'Organizar todos os documentos impressos na ordem correta: formulários, evidências, cartas.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Preparar Package de Envio',
  description: 'Colocar documentos organizados em envelope ou caixa apropriada. Adicionar etiquetas e informações de remetente.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Enviar Petição via Correio Certificado',
  description: 'Enviar pacote completo para o centro de serviços correto do USCIS via correio certificado com tracking.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Confirmar Recebimento pelo USCIS',
  description: 'Monitorar tracking e confirmar que o USCIS recebeu o pacote. Anotar data de recebimento.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

// Acompanhamento USCIS (8 tarefas)
const sendingLast = currentOrder - 1;

tasks.push({
  title: 'Registrar Case Number',
  description: 'Quando receber receipt notice, registrar case number (formato LIN-XX-XXX-XXXXX) no sistema de tracking.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [sendingLast],
});

tasks.push({
  title: 'Monitorar Status Online',
  description: 'Configurar monitoramento do status do caso no site do USCIS. Verificar regularmente por atualizações.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Anotar Priority Date',
  description: 'Registrar priority date (data de recebimento) do caso. Esta data é importante para futuros processos.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Aguardar Receipt Notice',
  description: 'Aguardar recebimento do I-797C (Receipt Notice) pelo correio. Normalmente chega em 2-4 semanas.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Aguardar Aprovação ou RFE',
  description: 'Aguardar decisão do USCIS. Com premium processing: 9-15 dias. Sem premium: 6-12 meses.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Se RFE: Preparar Resposta Completa',
  description: 'Se receber Request for Evidence (RFE), preparar resposta completa e detalhada dentro do prazo (87 dias).',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Se Aprovação: Comemorar! 🎉',
  description: 'Se caso for aprovado, comemorar a conquista! Você recebeu aprovação do I-140 para EB-1A.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Receber I-797 Approval Notice',
  description: 'Receber documento oficial I-797 (Approval Notice) pelo correio. Guardar em local seguro.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

// Processamento NVC (7 tarefas)
const uscisLast = currentOrder - 1;

tasks.push({
  title: 'Aguardar NVC Welcome Letter',
  description: 'Aguardar carta de boas-vindas do National Visa Center (NVC). Normalmente chega em 1-2 meses após aprovação.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [uscisLast],
});

tasks.push({
  title: 'Preencher Formulário DS-260',
  description: 'Preencher formulário DS-260 online no site do NVC com todas as informações pessoais e de histórico.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Coletar Civil Documents',
  description: 'Reunir todos os documentos civis necessários: passaporte, certidões, documentos de identidade.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Obter Certidões de Nascimento e Casamento',
  description: 'Obter certidões oficiais traduzidas e certificadas de nascimento e casamento (se aplicável).',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Obter Police Certificates',
  description: 'Obter certidões de antecedentes criminais de todos os países onde viveu por mais de 6 meses desde os 16 anos.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Enviar Documentos ao NVC',
  description: 'Enviar todos os documentos civis ao NVC via portal online ou correio conforme instruções.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Aguardar Data de Entrevista',
  description: 'Aguardar agendamento da entrevista no consulado. NVC notificará quando documentos forem aprovados.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

// Preparação para Entrevista (5 tarefas)
const nvcLast = currentOrder - 1;

tasks.push({
  title: 'Agendar Exame Médico',
  description: 'Agendar exame médico em clínica aprovada pelo consulado. Fazer antes da entrevista (normalmente 1-2 semanas antes).',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [nvcLast],
});

tasks.push({
  title: 'Fazer Exame Médico em Clínica Aprovada',
  description: 'Realizar exame médico completo incluindo vacinas necessárias. Receber envelope selado para entregar na entrevista.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Reunir Documentos Originais',
  description: 'Reunir todos os documentos originais que serão necessários na entrevista: passaporte, certidões, fotos, etc.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Estudar Possíveis Perguntas da Entrevista',
  description: 'Preparar-se para perguntas comuns sobre seu caso EB-1A, trabalho, planos nos EUA, etc.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Preparar Documentos de Suporte para Entrevista',
  description: 'Organizar documentos adicionais que podem ser úteis: cópias do dossiê, evidências atualizadas, etc.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

// Entrevista e Finalização (5 tarefas)
const interviewPrepLast = currentOrder - 1;

tasks.push({
  title: 'Comparecer à Entrevista no Consulado',
  description: 'Comparecer à entrevista no consulado na data e hora agendadas. Levar todos os documentos originais.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [interviewPrepLast],
});

tasks.push({
  title: 'Aguardar Decisão Após Entrevista',
  description: 'Aguardar decisão do oficial consular. Pode ser aprovação imediata, aprovação administrativa, ou solicitação de documentos adicionais.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Receber Passaporte com Visto',
  description: 'Receber passaporte com visto EB-1A colado. Visto é válido por 6 meses para entrada nos EUA.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Planejar Entrada nos EUA',
  description: 'Planejar viagem de entrada nos EUA dentro da validade do visto. Escolher porto de entrada apropriado.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Entrar nos EUA e Virar LPR! 🎉',
  description: 'Entrar nos EUA através do porto de entrada designado. Oficial de imigração carimbará passaporte e você se tornará Legal Permanent Resident (LPR)!',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

// Pós-Aprovação (3 tarefas)
const entryLast = currentOrder - 1;

tasks.push({
  title: 'Aguardar Recebimento do SSN Card',
  description: 'Aguardar recebimento do Social Security Number (SSN) card pelo correio. Normalmente chega em 2-3 semanas após entrada.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [entryLast],
});

tasks.push({
  title: 'Aguardar Recebimento do Green Card',
  description: 'Aguardar recebimento do Green Card físico pelo correio. Normalmente chega em 90-120 dias após entrada.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

tasks.push({
  title: 'Atualizar Documentos com Status de LPR',
  description: 'Atualizar documentos pessoais, contas bancárias, empregador, etc. com seu novo status de Legal Permanent Resident.',
  phase: 'FILING',
  order: currentOrder++,
  dependsOn: [currentOrder - 2],
});

// Output
console.log('// ============================================');
console.log(`// PHASE 5: FILING (Tasks 256-${currentOrder - 1}) - ${tasks.length} tarefas`);
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

console.log(`\n// Total: ${tasks.length} tarefas de FILING`);

