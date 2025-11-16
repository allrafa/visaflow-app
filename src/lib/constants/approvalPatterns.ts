/**
 * Padrões de Aprovação vs Rejeição para EB-1A
 * Baseado em análise de 13 casos reais (9 aprovações + 4 RFEs/rejeições)
 * e 7 estratégias de profissionais experientes
 */

export interface ApprovalPattern {
  id: string;
  description: string;
  indicators: string[];
  examples: string[];
}

export interface RejectionPattern {
  id: string;
  description: string;
  redFlags: string[];
  examples: string[];
  mitigation: string[];
}

export const APPROVAL_PATTERNS: ApprovalPattern[] = [
  {
    id: 'specific_evidence',
    description: 'Evidências específicas e verificáveis com datas, números e nomes',
    indicators: [
      'Datas exatas mencionadas',
      'Números específicos (percentuais, quantidades)',
      'Nomes de organizações completos',
      'Citações diretas de fontes',
      'Links ou referências verificáveis',
    ],
    examples: [
      'Recebi o Prêmio X em 15 de março de 2023, concedido pela Organização Y',
      'O artigo foi publicado no Journal Z (Impact Factor 5.2) em janeiro de 2024',
      'Minha contribuição tem 1.2M de downloads e 15k GitHub stars',
    ],
  },
  {
    id: 'comparative_context',
    description: 'Contexto comparativo demonstrando excelência relativa',
    indicators: [
      'Comparação com padrões do campo',
      'Percentis ou rankings mencionados',
      'Comparação com outros profissionais',
      'Estatísticas de competitividade',
    ],
    examples: [
      'Apenas 0.1% dos profissionais recebem este prêmio anualmente',
      'Meu trabalho está no top 1% em citações no campo',
      'Fui selecionado entre 500 candidatos para ser juiz',
    ],
  },
  {
    id: 'independent_verification',
    description: 'Evidências que podem ser verificadas independentemente',
    indicators: [
      'Cobertura de mídia independente',
      'Publicações em journals indexados',
      'Prêmios de organizações reconhecidas',
      'Testemunhos de terceiros',
    ],
    examples: [
      'Artigo publicado no TechCrunch sobre meu trabalho',
      'Prêmio concedido pela IEEE (organização reconhecida internacionalmente)',
      'Carta de recomendação de professor da Universidade X',
    ],
  },
  {
    id: 'sustained_excellence',
    description: 'Demonstração de excelência sustentada ao longo do tempo',
    indicators: [
      'Múltiplas realizações ao longo de anos',
      'Evolução e crescimento demonstrados',
      'Impacto crescente ao longo do tempo',
    ],
    examples: [
      'Publicações consistentes desde 2020, com aumento de citações',
      'Prêmios recebidos em 2021, 2022 e 2023',
      'Crescimento de 10k para 1M de usuários em 3 anos',
    ],
  },
  {
    id: 'policy_manual_alignment',
    description: 'Alinhamento explícito com requisitos do Policy Manual',
    indicators: [
      'Menciona requisitos específicos do Policy Manual',
      'Demonstra cada um dos 4 elementos necessários',
      'Explica por que atende aos critérios',
    ],
    examples: [
      'O prêmio não tem limitações geográficas conforme requerido',
      'A associação exige avaliação por pares, demonstrando excelência',
      'A cobertura é de mídia profissional independente, não paga',
    ],
  },
];

export const REJECTION_PATTERNS: RejectionPattern[] = [
  {
    id: 'vague_claims',
    description: 'Alegações vagas sem evidências específicas',
    redFlags: [
      'Uso excessivo de superlativos sem dados',
      'Falta de datas, números ou nomes específicos',
      'Alegações que não podem ser verificadas',
      'Linguagem genérica e imprecisa',
    ],
    examples: [
      'Recebi muitos prêmios importantes',
      'Meu trabalho é muito reconhecido',
      'Publicações em journals de prestígio',
    ],
    mitigation: [
      'Incluir datas exatas de cada realização',
      'Mencionar nomes completos de organizações',
      'Fornecer números específicos e verificáveis',
      'Adicionar links ou referências para verificação',
    ],
  },
  {
    id: 'paid_awards_coverage',
    description: 'Prêmios pagos ou cobertura paga sem disclaimer adequado',
    redFlags: [
      'Menciona Globee Awards ou Stevie Awards sem contexto',
      'Cobertura paga não identificada como tal',
      'Falta de disclaimer sobre pagamento',
      'Prêmios de baixo prestígio apresentados como prestigiosos',
    ],
    examples: [
      'Recebi o Globee Award em 2023',
      'Artigo publicado sobre meu trabalho',
      'Prêmio de excelência em tecnologia',
    ],
    mitigation: [
      'Se prêmio for pago, incluir disclaimer completo explicando o processo',
      'Demonstrar que mesmo sendo pago, há critérios rigorosos',
      'Identificar claramente cobertura paga vs. independente',
      'Focar em prêmios e coberturas de organizações reconhecidas',
    ],
  },
  {
    id: 'ai_generated_text',
    description: 'Texto que parece gerado por IA, sem autenticidade',
    redFlags: [
      'Linguagem excessivamente formal e genérica',
      'Falta de voz pessoal ou autenticidade',
      'Padrões repetitivos de linguagem',
      'Falta de detalhes pessoais ou específicos',
    ],
    examples: [
      'É com grande satisfação que apresento...',
      'Minhas contribuições têm sido significativas...',
      'Tenho o prazer de demonstrar minha excelência...',
    ],
    mitigation: [
      'Usar voz pessoal e autêntica',
      'Incluir detalhes específicos e pessoais',
      'Evitar linguagem excessivamente formal',
      'Revisar para garantir que não soe como IA',
    ],
  },
  {
    id: 'insufficient_evidence',
    description: 'Evidências insuficientes ou não verificáveis',
    redFlags: [
      'Falta de documentos de apoio',
      'Evidências que não podem ser verificadas',
      'Alegações sem suporte documental',
      'Falta de contexto ou background',
    ],
    examples: [
      'Recebi um prêmio importante',
      'Meu trabalho foi publicado',
      'Sou membro de uma associação prestigiosa',
    ],
    mitigation: [
      'Incluir certificados, cartas, screenshots',
      'Fornecer links para verificação online',
      'Adicionar contexto completo sobre cada evidência',
      'Demonstrar como cada evidência pode ser verificada',
    ],
  },
  {
    id: 'missing_comparative_context',
    description: 'Falta de contexto comparativo demonstrando excelência',
    redFlags: [
      'Não demonstra como se compara com outros',
      'Falta de estatísticas de competitividade',
      'Não explica por que é excepcional',
      'Falta de benchmarks ou padrões do campo',
    ],
    examples: [
      'Recebi um prêmio',
      'Publicações em journals',
      'Membro de associação',
    ],
    mitigation: [
      'Incluir estatísticas de competitividade',
      'Comparar com padrões do campo',
      'Demonstrar percentis ou rankings',
      'Explicar por que a realização é excepcional',
    ],
  },
];

/**
 * Get approval patterns for a specific criterion
 */
export function getApprovalPatternsForCriteria(criteriaId: string): ApprovalPattern[] {
  // All patterns apply to all criteria, but some are more relevant
  return APPROVAL_PATTERNS;
}

/**
 * Get rejection patterns for a specific criterion
 */
export function getRejectionPatternsForCriteria(criteriaId: string): RejectionPattern[] {
  // All patterns apply to all criteria
  return REJECTION_PATTERNS;
}



