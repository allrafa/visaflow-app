/**
 * Default tasks for each EB-1A process phase
 * Based on VISAFLOW CONTEXT.md workflow
 */

export interface DefaultTask {
  title: string;
  description: string;
  phase: 'ELIGIBILITY' | 'EVIDENCE' | 'LETTERS' | 'PETITION' | 'FILING';
  order: number;
  dependsOn?: number[]; // Indexes of tasks this depends on
}

export const DEFAULT_TASKS: DefaultTask[] = [
  // ============================================
  // PHASE 1: ELIGIBILITY (Tasks 0-4)
  // ============================================
  {
    title: 'Avaliar Elegibilidade Inicial',
    description: 'Revisar os 10 critérios EB-1A e identificar quais você pode comprovar. Você precisa de pelo menos 3 critérios sólidos.',
    phase: 'ELIGIBILITY',
    order: 0,
  },
  {
    title: 'Definir Estratégia de Critérios',
    description: 'Escolher os 3-5 critérios mais fortes com base nas suas evidências disponíveis. Focar em qualidade, não quantidade.',
    phase: 'ELIGIBILITY',
    order: 1,
    dependsOn: [0],
  },
  {
    title: 'Identificar Área de Expertise',
    description: 'Definir claramente sua área de habilidade extraordinária. Deve ser específica o suficiente para demonstrar expertise.',
    phase: 'ELIGIBILITY',
    order: 2,
    dependsOn: [0],
  },
  {
    title: 'Listar Evidências Disponíveis',
    description: 'Fazer inventário completo de todas as evidências que você possui: prêmios, publicações, cartas, mídia, etc.',
    phase: 'ELIGIBILITY',
    order: 3,
    dependsOn: [1],
  },
  {
    title: 'Planejar Timeline do Processo',
    description: 'Estimar tempo necessário para cada fase e definir datas alvo. Típico: 3-6 meses de preparação.',
    phase: 'ELIGIBILITY',
    order: 4,
    dependsOn: [1, 3],
  },

  // ============================================
  // PHASE 2: EVIDENCE (Tasks 5-14)
  // ============================================
  {
    title: 'Coletar Certificados de Prêmios',
    description: 'Reunir certificados, troféus, medalhas e qualquer documentação oficial de reconhecimentos recebidos.',
    phase: 'EVIDENCE',
    order: 5,
    dependsOn: [4],
  },
  {
    title: 'Documentar Memberships',
    description: 'Obter cartas de confirmação de associações profissionais que requerem achievement notável.',
    phase: 'EVIDENCE',
    order: 6,
    dependsOn: [4],
  },
  {
    title: 'Compilar Publicações Sobre Você',
    description: 'Coletar artigos de mídia, entrevistas, perfis e menções na imprensa profissional sobre seu trabalho.',
    phase: 'EVIDENCE',
    order: 7,
    dependsOn: [4],
  },
  {
    title: 'Evidenciar Atuação como Juiz',
    description: 'Documentar participação em painéis de revisão, comitês de seleção ou avaliação de trabalhos de outros.',
    phase: 'EVIDENCE',
    order: 8,
    dependsOn: [4],
  },
  {
    title: 'Documentar Contribuições Originais',
    description: 'Compilar evidências de inovações, patentes, metodologias ou contribuições significativas para o campo.',
    phase: 'EVIDENCE',
    order: 9,
    dependsOn: [4],
  },
  {
    title: 'Coletar Artigos Acadêmicos',
    description: 'Reunir publicações científicas, artigos em journals, apresentações em conferências e citações.',
    phase: 'EVIDENCE',
    order: 10,
    dependsOn: [4],
  },
  {
    title: 'Documentar Exibições/Showcases',
    description: 'Evidenciar participação em eventos, exposições, showcases ou demonstrações profissionais.',
    phase: 'EVIDENCE',
    order: 11,
    dependsOn: [4],
  },
  {
    title: 'Comprovar Papel de Liderança',
    description: 'Documentar posições de liderança em organizações ou projetos críticos com impacto demonstrável.',
    phase: 'EVIDENCE',
    order: 12,
    dependsOn: [4],
  },
  {
    title: 'Evidenciar Alta Remuneração',
    description: 'Preparar documentação de salário/renda comparando com médias do setor (W-2, contratos, salary surveys).',
    phase: 'EVIDENCE',
    order: 13,
    dependsOn: [4],
  },
  {
    title: 'Documentar Sucesso Comercial',
    description: 'Compilar métricas de impacto comercial: receita gerada, usuários atingidos, crescimento de negócios.',
    phase: 'EVIDENCE',
    order: 14,
    dependsOn: [4],
  },

  // ============================================
  // PHASE 3: LETTERS (Tasks 15-19)
  // ============================================
  {
    title: 'Identificar Potenciais Recomendadores',
    description: 'Listar 5-7 pessoas qualificadas que conheçam seu trabalho: experts reconhecidos, líderes da indústria, acadêmicos.',
    phase: 'LETTERS',
    order: 15,
    dependsOn: [14],
  },
  {
    title: 'Preparar Brief para Recomendadores',
    description: 'Criar documento com seus achievements, evidências e pontos-chave para facilitar a escrita das cartas.',
    phase: 'LETTERS',
    order: 16,
    dependsOn: [15],
  },
  {
    title: 'Solicitar Cartas de Recomendação',
    description: 'Contactar recomendadores com brief preparado. Ideal: 3-5 cartas de pessoas independentes e reconhecidas.',
    phase: 'LETTERS',
    order: 17,
    dependsOn: [16],
  },
  {
    title: 'Revisar e Editar Cartas',
    description: 'Verificar que cartas são específicas, detalhadas e livres de linguagem genérica ou gerada por IA.',
    phase: 'LETTERS',
    order: 18,
    dependsOn: [17],
  },
  {
    title: 'Obter Assinaturas e CVs',
    description: 'Coletar cartas assinadas e CVs dos recomendadores para demonstrar suas qualificações.',
    phase: 'LETTERS',
    order: 19,
    dependsOn: [18],
  },

  // ============================================
  // PHASE 4: PETITION (Tasks 20-24)
  // ============================================
  {
    title: 'Organizar Evidências por Critério',
    description: 'Estruturar todas as evidências em 4 subseções por critério: Overview, Context, Impact, Evidence.',
    phase: 'PETITION',
    order: 20,
    dependsOn: [14, 19],
  },
  {
    title: 'Escrever Final Merits Statement',
    description: 'Redigir argumento narrativo completo (20-30 páginas) demonstrando habilidade extraordinária.',
    phase: 'PETITION',
    order: 21,
    dependsOn: [20],
  },
  {
    title: 'Validar Qualidade com IA',
    description: 'Usar validador automático para detectar fraquezas, linguagem genérica ou práticas suspeitas.',
    phase: 'PETITION',
    order: 22,
    dependsOn: [21],
  },
  {
    title: 'Criar Índice e Tabelas',
    description: 'Organizar documentos em ordem lógica com índice detalhado e tabs para navegação fácil.',
    phase: 'PETITION',
    order: 23,
    dependsOn: [22],
  },
  {
    title: 'Revisar Dossiê Completo',
    description: 'Fazer revisão final de todo o pacote: consistência, clareza, força dos argumentos.',
    phase: 'PETITION',
    order: 24,
    dependsOn: [23],
  },

  // ============================================
  // PHASE 5: FILING (Tasks 25-29)
  // ============================================
  {
    title: 'Preencher Formulário I-140',
    description: 'Completar formulário oficial I-140 do USCIS com todas as informações requeridas.',
    phase: 'FILING',
    order: 25,
    dependsOn: [24],
  },
  {
    title: 'Preparar Pagamento de Taxas',
    description: 'Organizar pagamento de filing fee ($700) e premium processing se aplicável ($2,500).',
    phase: 'FILING',
    order: 26,
    dependsOn: [25],
  },
  {
    title: 'Fazer Cópias e Backup',
    description: 'Criar cópias completas do dossiê e armazenar digitalmente em local seguro.',
    phase: 'FILING',
    order: 27,
    dependsOn: [24],
  },
  {
    title: 'Enviar Petição ao USCIS',
    description: 'Enviar pacote completo para o centro de serviços correto do USCIS via correio certificado.',
    phase: 'FILING',
    order: 28,
    dependsOn: [25, 26, 27],
  },
  {
    title: 'Monitorar Status do Caso',
    description: 'Acompanhar receipt notice, processing times e responder a qualquer RFE (Request for Evidence).',
    phase: 'FILING',
    order: 29,
    dependsOn: [28],
  },
];

/**
 * Get default tasks for a specific phase
 */
export function getTasksByPhase(phase: 'ELIGIBILITY' | 'EVIDENCE' | 'LETTERS' | 'PETITION' | 'FILING'): DefaultTask[] {
  return DEFAULT_TASKS.filter(task => task.phase === phase);
}

/**
 * Get all default tasks
 */
export function getAllDefaultTasks(): DefaultTask[] {
  return DEFAULT_TASKS;
}
