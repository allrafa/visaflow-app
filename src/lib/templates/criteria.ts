/**
 * Templates de Critérios EB-1A
 * Baseado em estrutura de 4 subseções conforme Policy Manual
 * Expandido com exemplos reais e guias detalhados baseados em 13 casos estudados
 */

export interface CriteriaSubsection {
  id: string;
  title: string;
  description: string;
  required: boolean;
  placeholder: string;
  evidenceTypes: string[];
  example?: string;
  guidelines?: string[];
}

export interface CriteriaGuidelines {
  overview: string;
  commonMistakes: string[];
  bestPractices: string[];
  evidenceTips: string[];
}

export interface CriteriaTemplate {
  id: string;
  name: string;
  description: string;
  subsections: CriteriaSubsection[];
  comparableEvidence?: boolean;
  guidelines?: CriteriaGuidelines;
  examples?: string[];
}

export const CRITERIA_TEMPLATES: Record<string, CriteriaTemplate> = {
  AWARDS: {
    id: 'AWARDS',
    name: 'Prêmios Reconhecidos',
    description: 'Prêmios nacionais ou internacionais por excelência no campo',
    subsections: [
      {
        id: 'recipient',
        title: 'Proof of Recipient/Achievement',
        description: 'Provar que recebeu o prêmio',
        required: true,
        placeholder: 'Descreva o prêmio recebido, data, organização concedente...',
        evidenceTypes: ['certificate', 'announcement', 'screenshot'],
        example: 'Em 2023, recebi o [Nome do Prêmio] concedido pela [Organização] em reconhecimento ao trabalho excepcional em [campo específico]. O prêmio foi anunciado em [data] e entregue em cerimônia realizada em [local].',
        guidelines: [
          'Inclua data exata do prêmio',
          'Mencione a organização concedente completa',
          'Descreva a cerimônia ou evento de entrega',
          'Mencione outros premiados (se relevante para mostrar prestígio)',
        ],
      },
      {
        id: 'excellence',
        title: 'Proof of Excellence in Field',
        description: 'Provar que o prêmio representa excelência no campo',
        required: true,
        placeholder: 'Explique por que este prêmio é reconhecido como excelência...',
        evidenceTypes: ['criteria', 'prestige', 'comparison'],
        example: 'O [Nome do Prêmio] é reconhecido internacionalmente como um dos mais prestigiosos prêmios em [campo]. É concedido apenas a profissionais que demonstraram contribuições excepcionais e impacto significativo. Anteriormente foi concedido a [exemplos de premiados renomados].',
        guidelines: [
          'Pesquise e cite o histórico do prêmio',
          'Mencione outros premiados famosos',
          'Explique os critérios de seleção',
          'Demonstre o prestígio através de comparações',
        ],
      },
      {
        id: 'requirements',
        title: 'Proof of Requirements',
        description: 'Provar requisitos específicos (ex: sem limitações, critérios rigorosos)',
        required: true,
        placeholder: 'Descreva os critérios de elegibilidade, processo de seleção...',
        evidenceTypes: ['criteria', 'rules', 'process'],
        example: 'O processo de seleção envolve [descrição detalhada]: (1) nomeação por pares reconhecidos, (2) revisão por comitê de especialistas, (3) avaliação de impacto e contribuições. Não há limitações geográficas ou de nacionalidade. Apenas [número] prêmios são concedidos anualmente entre [número] candidatos.',
        guidelines: [
          'Descreva o processo de seleção em detalhes',
          'Mencione se há limitações (geográficas, de nacionalidade, etc)',
          'Cite estatísticas (número de candidatos vs premiados)',
          'Explique a rigorosidade dos critérios',
        ],
      },
      {
        id: 'recognition',
        title: 'Proof of Recognition',
        description: 'Provar reconhecimento nacional/internacional do prêmio',
        required: true,
        placeholder: 'Demonstre o prestígio e reconhecimento do prêmio...',
        evidenceTypes: ['media', 'prestige', 'history'],
        example: 'O [Nome do Prêmio] tem sido amplamente coberto pela mídia internacional, incluindo [exemplos de mídia]. Foi estabelecido em [ano] e desde então tem reconhecido líderes em [campo]. A cerimônia de entrega é transmitida [onde] e atrai [número] de espectadores.',
        guidelines: [
          'Cite cobertura de mídia respeitável',
          'Mencione a história e tradição do prêmio',
          'Demonstre alcance internacional',
          'Inclua estatísticas de visibilidade',
        ],
      },
    ],
    comparableEvidence: true,
    guidelines: {
      overview: 'Prêmios devem ser concedidos por organizações reconhecidas, com critérios rigorosos e processo de seleção competitivo. Evite prêmios pagos ou de baixo prestígio.',
      commonMistakes: [
        'Incluir prêmios pagos (Globee Awards, Stevie Awards sem disclaimer)',
        'Não demonstrar o prestígio do prêmio',
        'Faltar evidências do processo de seleção',
        'Não mencionar limitações ou critérios rigorosos',
      ],
      bestPractices: [
        'Pesquise profundamente o histórico do prêmio',
        'Inclua estatísticas de competitividade',
        'Cite outros premiados renomados',
        'Demonstre cobertura de mídia respeitável',
        'Se o prêmio for pago, inclua disclaimer completo',
      ],
      evidenceTips: [
        'Certificado oficial do prêmio',
        'Anúncio público da organização',
        'Cobertura de mídia do prêmio',
        'Screenshots de website oficial',
        'Cartas de congratulação',
      ],
    },
    examples: [
      'Prêmio Turing (ciência da computação)',
      'Prêmio Nobel (várias áreas)',
      'Prêmios de associações profissionais reconhecidas',
      'Prêmios de conferências acadêmicas de prestígio',
    ],
  },
  MEMBERSHIP: {
    id: 'MEMBERSHIP',
    name: 'Membership em Associações',
    description: 'Membro de associações que exigem realizações excepcionais',
    subsections: [
      {
        id: 'recipient',
        title: 'Proof of Membership',
        description: 'Provar que é membro da associação',
        required: true,
        placeholder: 'Descreva sua filiação, data de admissão, tipo de membership...',
        evidenceTypes: ['certificate', 'letter', 'screenshot'],
        example: 'Sou membro da [Nome da Associação] desde [data]. Fui admitido como [tipo de membership] após processo rigoroso de avaliação. Minha filiação é ativa e inclui [benefícios/privilegios].',
        guidelines: [
          'Inclua data exata de admissão',
          'Especifique o tipo de membership',
          'Mencione se é membership vitalício ou renovável',
          'Descreva benefícios e privilégios do membership',
        ],
      },
      {
        id: 'excellence',
        title: 'Proof of Excellence Requirement',
        description: 'Provar que a associação exige excelência para membership',
        required: true,
        placeholder: 'Explique os critérios de elegibilidade da associação...',
        evidenceTypes: ['criteria', 'requirements', 'standards'],
        example: 'A [Nome da Associação] exige que membros demonstrem [critérios específicos]. Apenas profissionais com [requisitos] são elegíveis. A associação rejeita [percentual]% dos candidatos anualmente.',
        guidelines: [
          'Descreva critérios de elegibilidade em detalhes',
          'Mencione requisitos específicos (publicações, prêmios, etc)',
          'Cite estatísticas de rejeição/aceitação',
          'Explique por que os critérios demonstram excelência',
        ],
      },
      {
        id: 'requirements',
        title: 'Proof of Requirements',
        description: 'Provar requisitos específicos (ex: avaliação por pares)',
        required: true,
        placeholder: 'Descreva o processo de seleção e avaliação...',
        evidenceTypes: ['process', 'evaluation', 'peer-review'],
        example: 'O processo de admissão envolve: (1) nomeação por [número] membros existentes, (2) revisão de portfólio por comitê, (3) avaliação por pares, (4) votação secreta. Apenas candidatos com [critério] são considerados.',
        guidelines: [
          'Descreva o processo completo de seleção',
          'Mencione avaliação por pares se aplicável',
          'Cite requisitos de nomeação',
          'Explique a rigorosidade do processo',
        ],
      },
      {
        id: 'recognition',
        title: 'Proof of Recognition',
        description: 'Provar reconhecimento da associação no campo',
        required: true,
        placeholder: 'Demonstre o prestígio e reconhecimento da associação...',
        evidenceTypes: ['prestige', 'history', 'members'],
        example: 'A [Nome da Associação] foi fundada em [ano] e é reconhecida como [descrição de prestígio]. Membros incluem [exemplos de membros renomados]. A associação publica [publicações] e organiza [eventos] de prestígio.',
        guidelines: [
          'Cite história e tradição da associação',
          'Mencione membros renomados',
          'Descreva publicações e eventos da associação',
          'Demonstre reconhecimento internacional',
        ],
      },
    ],
    guidelines: {
      overview: 'Membership deve ser em associações que exigem realizações excepcionais, não apenas pagamento de taxas. A associação deve ter critérios rigorosos e processo de seleção competitivo.',
      commonMistakes: [
        'Incluir associações que aceitam qualquer um que pague',
        'Não demonstrar critérios de elegibilidade',
        'Faltar evidências do processo de seleção',
        'Não mencionar avaliação por pares quando aplicável',
      ],
      bestPractices: [
        'Pesquise critérios de elegibilidade da associação',
        'Demonstre processo competitivo de seleção',
        'Cite outros membros renomados',
        'Mencione publicações e eventos da associação',
        'Explique por que o membership demonstra excelência',
      ],
      evidenceTips: [
        'Certificado de membership',
        'Carta de admissão',
        'Screenshot de website mostrando membership',
        'Documentação do processo de seleção',
        'Lista de outros membros renomados',
      ],
    },
    examples: [
      'IEEE Fellow (engenharia)',
      'ACM Distinguished Member (computação)',
      'Associações profissionais que exigem nomeação',
      'Sociedades acadêmicas com critérios rigorosos',
    ],
  },
  PRESS: {
    id: 'PRESS',
    name: 'Cobertura de Imprensa',
    description: 'Matérias sobre o trabalho em mídia profissional',
    subsections: [
      {
        id: 'recipient',
        title: 'Proof of Coverage',
        description: 'Provar que houve cobertura de imprensa',
        required: true,
        placeholder: 'Descreva as matérias, publicações, datas...',
        evidenceTypes: ['article', 'screenshot', 'link'],
        example: 'Meu trabalho foi coberto em [Nome da Publicação] em [data]. O artigo "[Título]" foi publicado na seção [seção] e abordou [tema específico]. A publicação tem circulação de [número] e audiência de [número] leitores.',
        guidelines: [
          'Inclua data exata da publicação',
          'Mencione título completo do artigo',
          'Descreva o conteúdo da matéria',
          'Cite circulação e audiência da publicação',
        ],
      },
      {
        id: 'excellence',
        title: 'Proof of Excellence in Field',
        description: 'Provar que a cobertura demonstra excelência',
        required: true,
        placeholder: 'Explique como a cobertura demonstra sua excelência...',
        evidenceTypes: ['content', 'quotes', 'context'],
        example: 'A matéria destacou [citações específicas sobre excelência]. O jornalista descreveu meu trabalho como [descrição positiva] e mencionou [conquistas específicas]. A cobertura demonstra reconhecimento de pares e impacto no campo.',
        guidelines: [
          'Cite citações específicas da matéria',
          'Explique como a cobertura demonstra excelência',
          'Mencione reconhecimento de pares',
          'Descreva impacto mencionado na matéria',
        ],
      },
      {
        id: 'requirements',
        title: 'Proof of Requirements',
        description: 'Provar que são mídias profissionais (não pagas)',
        required: true,
        placeholder: 'Demonstre que são mídias profissionais e independentes...',
        evidenceTypes: ['publication', 'editorial', 'independence'],
        example: '[Nome da Publicação] é uma publicação profissional estabelecida em [ano] com [história]. Tem política editorial independente e não aceita pagamento por cobertura. Outras matérias sobre [campo] incluem [exemplos], demonstrando padrão editorial profissional.',
        guidelines: [
          'Demonstre independência editorial',
          'Cite política editorial da publicação',
          'Mencione outras matérias sobre o campo',
          'Explique por que é mídia profissional',
          'Se houver pagamento, inclua disclaimer completo',
        ],
      },
      {
        id: 'recognition',
        title: 'Proof of Recognition',
        description: 'Provar reconhecimento através da cobertura',
        required: true,
        placeholder: 'Demonstre como a cobertura mostra reconhecimento...',
        evidenceTypes: ['impact', 'reach', 'significance'],
        example: 'A cobertura alcançou [número] leitores e gerou [número] compartilhamentos. Foi mencionada em [outras publicações] e resultou em [impactos específicos]. A publicação é reconhecida por [descrição de prestígio] e tem prêmios de jornalismo.',
        guidelines: [
          'Quantifique alcance e impacto',
          'Mencione repercussão da matéria',
          'Cite reconhecimento da publicação',
          'Descreva resultados da cobertura',
        ],
      },
    ],
    guidelines: {
      overview: 'Cobertura de imprensa deve ser em mídias profissionais e independentes, não pagas. A cobertura deve demonstrar reconhecimento do trabalho e impacto no campo.',
      commonMistakes: [
        'Incluir cobertura paga sem disclaimer',
        'Não demonstrar que a mídia é profissional',
        'Faltar evidências de independência editorial',
        'Não mostrar como a cobertura demonstra excelência',
      ],
      bestPractices: [
        'Pesquise a reputação da publicação',
        'Demonstre independência editorial',
        'Cite outras matérias da publicação sobre temas similares',
        'Mostre alcance e audiência da publicação',
        'Se houver pagamento, inclua disclaimer completo',
      ],
      evidenceTips: [
        'Screenshot completo do artigo',
        'Link para artigo online',
        'Informações sobre circulação/audiência',
        'Evidências de independência editorial',
        'Outras matérias da publicação sobre o campo',
      ],
    },
    examples: [
      'TechCrunch, Wired, MIT Technology Review (tecnologia)',
      'Nature, Science, Cell (ciência)',
      'The New York Times, The Guardian (geral)',
      'Publicações especializadas do campo',
    ],
  },
  JUDGING: {
    id: 'JUDGING',
    name: 'Judging Work',
    description: 'Julgamento do trabalho de outros na área',
    subsections: [
      {
        id: 'recipient',
        title: 'Proof of Judging Activity',
        description: 'Provar que julgou trabalho de outros',
        required: true,
        placeholder: 'Descreva as atividades de julgamento, eventos, trabalhos avaliados...',
        evidenceTypes: ['invitation', 'certificate', 'screenshot'],
      },
      {
        id: 'excellence',
        title: 'Proof of Excellence in Field',
        description: 'Provar que o julgamento demonstra excelência',
        required: true,
        placeholder: 'Explique por que ser selecionado como juiz demonstra excelência...',
        evidenceTypes: ['selection', 'criteria', 'prestige'],
      },
      {
        id: 'requirements',
        title: 'Proof of Requirements',
        description: 'Provar requisitos específicos (ex: avaliação por pares)',
        required: true,
        placeholder: 'Descreva o processo de seleção como juiz...',
        evidenceTypes: ['process', 'standards', 'evaluation'],
      },
      {
        id: 'recognition',
        title: 'Proof of Recognition',
        description: 'Provar reconhecimento através do julgamento',
        required: true,
        placeholder: 'Demonstre o prestígio dos eventos/organizações...',
        evidenceTypes: ['prestige', 'significance', 'impact'],
      },
    ],
  },
  ORIGINAL: {
    id: 'ORIGINAL',
    name: 'Contribuições Originais',
    description: 'Contribuições originais de importância científica ou acadêmica',
    subsections: [
      {
        id: 'recipient',
        title: 'Proof of Contribution',
        description: 'Provar que fez contribuições originais',
        required: true,
        placeholder: 'Descreva suas contribuições originais, projetos, inovações...',
        evidenceTypes: ['project', 'code', 'documentation'],
      },
      {
        id: 'excellence',
        title: 'Proof of Excellence in Field',
        description: 'Provar que as contribuições demonstram excelência',
        required: true,
        placeholder: 'Explique o impacto e importância das contribuições...',
        evidenceTypes: ['impact', 'adoption', 'significance'],
      },
      {
        id: 'requirements',
        title: 'Proof of Requirements',
        description: 'Provar importância científica/acadêmica',
        required: true,
        placeholder: 'Demonstre a importância científica ou acadêmica...',
        evidenceTypes: ['citations', 'usage', 'recognition'],
      },
      {
        id: 'recognition',
        title: 'Proof of Recognition',
        description: 'Provar reconhecimento das contribuições',
        required: true,
        placeholder: 'Demonstre como as contribuições são reconhecidas...',
        evidenceTypes: ['adoption', 'citations', 'impact'],
      },
    ],
  },
  SCHOLARLY: {
    id: 'SCHOLARLY',
    name: 'Artigos Acadêmicos',
    description: 'Artigos acadêmicos em journals ou mídia profissional',
    subsections: [
      {
        id: 'recipient',
        title: 'Proof of Publication',
        description: 'Provar que publicou artigos',
        required: true,
        placeholder: 'Liste seus artigos, journals, datas de publicação...',
        evidenceTypes: ['article', 'journal', 'link'],
      },
      {
        id: 'excellence',
        title: 'Proof of Excellence in Field',
        description: 'Provar que os artigos demonstram excelência',
        required: true,
        placeholder: 'Explique a qualidade e importância dos artigos...',
        evidenceTypes: ['quality', 'peer-review', 'significance'],
      },
      {
        id: 'requirements',
        title: 'Proof of Requirements',
        description: 'Provar que são journals profissionais (não trash publishing)',
        required: true,
        placeholder: 'Demonstre a qualidade e reputação dos journals...',
        evidenceTypes: ['journal-quality', 'peer-review', 'reputation'],
      },
      {
        id: 'recognition',
        title: 'Proof of Recognition',
        description: 'Provar reconhecimento através de citações/impacto',
        required: true,
        placeholder: 'Demonstre citações, impacto, reconhecimento dos artigos...',
        evidenceTypes: ['citations', 'impact-factor', 'recognition'],
      },
    ],
  },
  CRITICAL: {
    id: 'CRITICAL',
    name: 'Papel Crítico/Liderança',
    description: 'Papel crítico ou de liderança em organizações de renome',
    subsections: [
      {
        id: 'recipient',
        title: 'Proof of Role',
        description: 'Provar que teve papel crítico/liderança',
        required: true,
        placeholder: 'Descreva seus papéis, responsabilidades, organizações...',
        evidenceTypes: ['contract', 'letter', 'screenshot'],
      },
      {
        id: 'excellence',
        title: 'Proof of Excellence in Field',
        description: 'Provar que o papel demonstra excelência',
        required: true,
        placeholder: 'Explique por que o papel é crítico e demonstra excelência...',
        evidenceTypes: ['responsibilities', 'impact', 'significance'],
      },
      {
        id: 'requirements',
        title: 'Proof of Requirements',
        description: 'Provar que a organização é de renome',
        required: true,
        placeholder: 'Demonstre o prestígio e renome da organização...',
        evidenceTypes: ['prestige', 'reputation', 'significance'],
      },
      {
        id: 'recognition',
        title: 'Proof of Recognition',
        description: 'Provar reconhecimento através do papel',
        required: true,
        placeholder: 'Demonstre como o papel mostra reconhecimento...',
        evidenceTypes: ['impact', 'results', 'recognition'],
      },
    ],
  },
  HIGH_SALARY: {
    id: 'HIGH_SALARY',
    name: 'Salário Alto',
    description: 'Remuneração alta em relação ao campo',
    subsections: [
      {
        id: 'recipient',
        title: 'Proof of Salary',
        description: 'Provar que recebe salário alto',
        required: true,
        placeholder: 'Descreva sua remuneração, posição, empresa...',
        evidenceTypes: ['contract', 'letter', 'documentation'],
      },
      {
        id: 'excellence',
        title: 'Proof of Excellence in Field',
        description: 'Provar que o salário demonstra excelência',
        required: true,
        placeholder: 'Explique por que o salário reflete excelência...',
        evidenceTypes: ['comparison', 'market', 'significance'],
      },
      {
        id: 'requirements',
        title: 'Proof of Requirements',
        description: 'Provar comparação com mercado',
        required: true,
        placeholder: 'Demonstre comparação com salários do mercado...',
        evidenceTypes: ['market-data', 'comparison', 'statistics'],
      },
      {
        id: 'recognition',
        title: 'Proof of Recognition',
        description: 'Provar reconhecimento através da remuneração',
        required: true,
        placeholder: 'Demonstre como o salário mostra reconhecimento...',
        evidenceTypes: ['recognition', 'value', 'significance'],
      },
    ],
  },
  EXHIBITIONS: {
    id: 'EXHIBITIONS',
    name: 'Exibições Artísticas',
    description: 'Exibições de trabalho artístico em galerias ou locais de prestígio',
    subsections: [
      {
        id: 'recipient',
        title: 'Proof of Exhibition',
        description: 'Provar que teve trabalhos exibidos',
        required: true,
        placeholder: 'Descreva as exibições, galerias, datas, trabalhos...',
        evidenceTypes: ['catalog', 'invitation', 'screenshot'],
      },
      {
        id: 'excellence',
        title: 'Proof of Excellence in Field',
        description: 'Provar que as exibições demonstram excelência',
        required: true,
        placeholder: 'Explique a qualidade e importância das exibições...',
        evidenceTypes: ['quality', 'selection', 'significance'],
      },
      {
        id: 'requirements',
        title: 'Proof of Requirements',
        description: 'Provar que são locais de prestígio',
        required: true,
        placeholder: 'Demonstre o prestígio das galerias/locais...',
        evidenceTypes: ['prestige', 'reputation', 'significance'],
      },
      {
        id: 'recognition',
        title: 'Proof of Recognition',
        description: 'Provar reconhecimento através das exibições',
        required: true,
        placeholder: 'Demonstre como as exibições mostram reconhecimento...',
        evidenceTypes: ['recognition', 'impact', 'significance'],
      },
    ],
  },
  COMMERCIAL_SUCCESS: {
    id: 'COMMERCIAL_SUCCESS',
    name: 'Sucesso Comercial',
    description: 'Sucesso comercial nas artes',
    subsections: [
      {
        id: 'recipient',
        title: 'Proof of Commercial Success',
        description: 'Provar sucesso comercial',
        required: true,
        placeholder: 'Descreva vendas, receita, sucesso comercial...',
        evidenceTypes: ['sales', 'revenue', 'documentation'],
      },
      {
        id: 'excellence',
        title: 'Proof of Excellence in Field',
        description: 'Provar que o sucesso demonstra excelência',
        required: true,
        placeholder: 'Explique por que o sucesso comercial demonstra excelência...',
        evidenceTypes: ['significance', 'impact', 'quality'],
      },
      {
        id: 'requirements',
        title: 'Proof of Requirements',
        description: 'Provar requisitos específicos',
        required: true,
        placeholder: 'Demonstre os requisitos de sucesso comercial...',
        evidenceTypes: ['metrics', 'comparison', 'standards'],
      },
      {
        id: 'recognition',
        title: 'Proof of Recognition',
        description: 'Provar reconhecimento através do sucesso',
        required: true,
        placeholder: 'Demonstre como o sucesso mostra reconhecimento...',
        evidenceTypes: ['recognition', 'impact', 'significance'],
      },
    ],
  },
};

/**
 * Get template for a specific criterion
 */
export function getCriteriaTemplate(criteriaId: string): CriteriaTemplate | undefined {
  return CRITERIA_TEMPLATES[criteriaId];
}

/**
 * Get all criteria templates
 */
export function getAllCriteriaTemplates(): CriteriaTemplate[] {
  return Object.values(CRITERIA_TEMPLATES);
}

/**
 * Get guidelines for a specific criterion
 * Falls back to criteriaGuidelines.ts if not in template
 */
export function getCriteriaGuidelines(criteriaId: string) {
  const template = CRITERIA_TEMPLATES[criteriaId];
  if (template?.guidelines) {
    return template.guidelines;
  }
  
  // Guidelines for other criteria are in criteriaGuidelines.ts
  // Import dynamically to avoid circular dependencies
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getCriteriaGuidelines: getGuidelines } = require('./criteriaGuidelines');
    return getGuidelines(criteriaId);
  } catch {
    return undefined;
  }
}

