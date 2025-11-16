/**
 * Práticas Suspeitas que Podem Trigger RFE em EB-1A
 * Baseado em endurecimento do USCIS em 2025 e casos reais de RFE
 */

export interface SuspiciousPractice {
  id: string;
  name: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  patterns: string[]; // Padrões de texto para detectar
  keywords: string[]; // Palavras-chave específicas
  uscis2025Relevance: boolean; // Relevante para endurecimento 2025
  recommendation: string; // Recomendação de ação corretiva
  example: string; // Exemplo do problema
  fixExample: string; // Exemplo de como corrigir
}

export const SUSPICIOUS_PRACTICES: SuspiciousPractice[] = [
  {
    id: 'globee_awards',
    name: 'Globee Awards sem Disclaimer',
    description: 'Globee Awards são prêmios pagos. USCIS 2025 está mais rigoroso com prêmios pagos sem contexto adequado.',
    severity: 'high',
    patterns: [
      'globee award',
      'globee awards',
      'golden bridge awards',
    ],
    keywords: ['globee', 'golden bridge'],
    uscis2025Relevance: true,
    recommendation: 'Se incluir Globee Awards, adicione disclaimer completo explicando: (1) que é um prêmio pago, (2) o processo de avaliação, (3) por que ainda demonstra excelência apesar de ser pago.',
    example: 'Recebi o Globee Award em 2023.',
    fixExample: 'Recebi o Globee Award em 2023. Embora este prêmio tenha taxa de inscrição, o processo de avaliação envolve revisão por juízes independentes e apenas projetos com qualidade excepcional são premiados. Apenas 15% dos inscritos recebem o prêmio.',
  },
  {
    id: 'stevie_awards',
    name: 'Stevie Awards sem Disclaimer',
    description: 'Stevie Awards são prêmios pagos. Requerem disclaimer adequado em 2025.',
    severity: 'high',
    patterns: [
      'stevie award',
      'stevie awards',
      'american business awards',
    ],
    keywords: ['stevie', 'american business awards'],
    uscis2025Relevance: true,
    recommendation: 'Adicione disclaimer explicando o processo de avaliação e por que ainda demonstra excelência.',
    example: 'Recebi o Stevie Award.',
    fixExample: 'Recebi o Stevie Award em 2023. Embora tenha taxa de inscrição, o processo envolve avaliação por mais de 200 executivos e apenas os melhores são premiados.',
  },
  {
    id: 'paid_coverage',
    name: 'Cobertura Paga não Identificada',
    description: 'Cobertura de imprensa paga deve ser claramente identificada. USCIS rejeita cobertura paga apresentada como independente.',
    severity: 'high',
    patterns: [
      'press release',
      'paid article',
      'sponsored content',
      'promoted post',
    ],
    keywords: ['press release', 'sponsored', 'promoted', 'paid coverage'],
    uscis2025Relevance: true,
    recommendation: 'Identifique claramente se a cobertura foi paga. Se foi, explique por que ainda demonstra reconhecimento (ex: publicação respeitável, processo editorial independente).',
    example: 'Meu trabalho foi coberto em TechCrunch.',
    fixExample: 'Meu trabalho foi coberto em TechCrunch através de um press release pago. No entanto, a publicação manteve controle editorial completo e a matéria foi escrita por jornalista profissional.',
  },
  {
    id: 'predatory_journals',
    name: 'Predatory Journals ou Trash Publishing',
    description: 'Journals predatórios ou trash publishing são rejeitados pelo USCIS. Detecta journals de baixa qualidade.',
    severity: 'high',
    patterns: [
      'predatory journal',
      'trash publishing',
      'pay to publish',
      'open access fee',
    ],
    keywords: ['predatory', 'trash', 'pay to publish', 'open access'],
    uscis2025Relevance: true,
    recommendation: 'Remova referências a journals predatórios. Use apenas journals indexados em SCI, SSCI, ou outros índices respeitáveis.',
    example: 'Publicado em Journal X (open access).',
    fixExample: 'Publicado em Nature (Impact Factor 64.8, indexado em SCI).',
  },
  {
    id: 'ai_generated_text',
    name: 'Texto Gerado por IA',
    description: 'USCIS 2025 está mais rigoroso com texto que parece gerado por IA. Linguagem excessivamente formal e genérica é suspeita.',
    severity: 'high',
    patterns: [
      'é com grande satisfação',
      'tenho o prazer de',
      'é de suma importância',
      'demonstrar minha excelência',
    ],
    keywords: ['grande satisfação', 'prazer de', 'suma importância'],
    uscis2025Relevance: true,
    recommendation: 'Reescreva com voz pessoal e autêntica. Inclua detalhes específicos, datas, números e experiências pessoais. Evite linguagem excessivamente formal.',
    example: 'É com grande satisfação que apresento minhas realizações excepcionais no campo.',
    fixExample: 'Em março de 2023, recebi o Prêmio X da Organização Y após processo de seleção que avaliou 500 candidatos.',
  },
  {
    id: 'vague_claims',
    name: 'Alegações Vagas sem Evidências',
    description: 'Alegações sem datas, números ou nomes específicos são rejeitadas.',
    severity: 'medium',
    patterns: [
      'muitos prêmios',
      'várias publicações',
      'reconhecimento significativo',
      'excelência demonstrada',
    ],
    keywords: ['muitos', 'vários', 'significativo', 'excelência'],
    uscis2025Relevance: false,
    recommendation: 'Substitua alegações vagas por fatos específicos: datas exatas, números, nomes completos de organizações.',
    example: 'Recebi muitos prêmios importantes.',
    fixExample: 'Recebi 3 prêmios: Prêmio X em 15/03/2023, Prêmio Y em 20/06/2023, Prêmio Z em 10/09/2023.',
  },
  {
    id: 'exaggerated_claims',
    name: 'Alegações Exageradas sem Suporte',
    description: 'Superlativos sem evidências são suspeitos.',
    severity: 'medium',
    patterns: [
      'único no mundo',
      'primeiro e único',
      'revolucionário',
      'sem precedentes',
    ],
    keywords: ['único', 'primeiro', 'revolucionário', 'sem precedentes'],
    uscis2025Relevance: false,
    recommendation: 'Substitua superlativos por fatos verificáveis. Use comparações com dados de mercado.',
    example: 'Minha contribuição é revolucionária e sem precedentes.',
    fixExample: 'Minha contribuição tem 1.2M de downloads, colocando-a no top 0.1% de projetos similares.',
  },
  {
    id: 'membership_fee_only',
    name: 'Membership Apenas por Taxa',
    description: 'Associações que aceitam qualquer um que pague não demonstram excelência.',
    severity: 'high',
    patterns: [
      'membro desde',
      'membership ativa',
      'filiação',
    ],
    keywords: ['membro', 'membership', 'filiação'],
    uscis2025Relevance: true,
    recommendation: 'Demonstre que a associação exige critérios rigorosos além de pagamento. Mencione processo de seleção, avaliação por pares, ou requisitos específicos.',
    example: 'Sou membro da Associação X desde 2022.',
    fixExample: 'Sou membro da IEEE desde 2022, após processo de avaliação que exigiu nomeação por 3 membros existentes e revisão de portfólio por comitê.',
  },
  {
    id: 'low_prestige_awards',
    name: 'Prêmios de Baixo Prestígio',
    description: 'Prêmios de organizações desconhecidas ou de baixo prestígio não ajudam.',
    severity: 'medium',
    patterns: [
      'prêmio de excelência',
      'award winner',
      'recognized by',
    ],
    keywords: ['prêmio', 'award', 'recognized'],
    uscis2025Relevance: false,
    recommendation: 'Pesquise o prestígio do prêmio. Se for de baixo prestígio, remova ou explique por que ainda demonstra excelência.',
    example: 'Recebi o Prêmio de Excelência da Organização X.',
    fixExample: 'Recebi o Prêmio Turing (equivalente ao Nobel em ciência da computação) concedido pela ACM.',
  },
  {
    id: 'missing_disclaimers',
    name: 'Falta de Disclaimers para Prêmios Pagos',
    description: 'Prêmios pagos precisam de disclaimer completo em 2025.',
    severity: 'high',
    patterns: [
      'award',
      'prêmio',
      'recognition',
    ],
    keywords: ['award', 'prêmio', 'recognition'],
    uscis2025Relevance: true,
    recommendation: 'Se mencionar prêmio pago, adicione disclaimer explicando processo de avaliação e por que ainda demonstra excelência.',
    example: 'Recebi o Prêmio X.',
    fixExample: 'Recebi o Prêmio X (prêmio pago com processo de avaliação rigoroso por juízes independentes).',
  },
  {
    id: 'self_published',
    name: 'Auto-publicação sem Contexto',
    description: 'Auto-publicação pode ser aceita, mas precisa de contexto demonstrando qualidade.',
    severity: 'low',
    patterns: [
      'self-published',
      'auto-publicado',
      'published independently',
    ],
    keywords: ['self-published', 'auto-publicado', 'independently'],
    uscis2025Relevance: false,
    recommendation: 'Se mencionar auto-publicação, demonstre qualidade através de vendas, reviews, ou reconhecimento.',
    example: 'Auto-publiquei meu livro.',
    fixExample: 'Auto-publiquei meu livro que vendeu 50k cópias e recebeu 4.8 estrelas em 500 reviews na Amazon.',
  },
  {
    id: 'social_media_metrics',
    name: 'Métricas de Redes Sociais como Evidência Principal',
    description: 'Métricas de redes sociais sozinhas não demonstram excelência acadêmica/profissional.',
    severity: 'low',
    patterns: [
      'followers',
      'likes',
      'views',
      'subscribers',
    ],
    keywords: ['followers', 'likes', 'views', 'subscribers'],
    uscis2025Relevance: false,
    recommendation: 'Use métricas de redes sociais apenas como suporte. Foque em evidências profissionais: publicações, prêmios, citações.',
    example: 'Tenho 100k seguidores no LinkedIn.',
    fixExample: 'Tenho 100k seguidores no LinkedIn, e meu trabalho foi citado em 50 artigos acadêmicos.',
  },
];

/**
 * Get suspicious practice by ID
 */
export function getSuspiciousPractice(id: string): SuspiciousPractice | undefined {
  return SUSPICIOUS_PRACTICES.find((p) => p.id === id);
}

/**
 * Get all high-severity practices relevant for USCIS 2025
 */
export function getHighSeverity2025Practices(): SuspiciousPractice[] {
  return SUSPICIOUS_PRACTICES.filter(
    (p) => p.severity === 'high' && p.uscis2025Relevance
  );
}

/**
 * Check if content matches any suspicious practice patterns
 */
export function checkSuspiciousPatterns(content: string): SuspiciousPractice[] {
  const contentLower = content.toLowerCase();
  return SUSPICIOUS_PRACTICES.filter((practice) => {
    // Check keywords
    const hasKeyword = practice.keywords.some((keyword) =>
      contentLower.includes(keyword.toLowerCase())
    );
    
    // Check patterns
    const hasPattern = practice.patterns.some((pattern) => {
      const regex = new RegExp(pattern.toLowerCase(), 'i');
      return regex.test(contentLower);
    });
    
    return hasKeyword || hasPattern;
  });
}



