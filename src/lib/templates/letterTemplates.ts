/**
 * Templates de Cartas de Recomendação EB-1A
 * Baseado em análise de petições aprovadas e melhores práticas
 * Estrutura profissional para diferentes tipos de recomendadores
 */

export interface LetterSection {
  id: string;
  title: string;
  description: string;
  required: boolean;
  placeholder: string;
  guidelines: string[];
  example?: string;
}

export interface LetterTemplate {
  id: string;
  name: string;
  description: string;
  sections: LetterSection[];
  bestPractices: string[];
  commonMistakes: string[];
}

export const LETTER_TEMPLATES: Record<string, LetterTemplate> = {
  ACADEMIC: {
    id: 'ACADEMIC',
    name: 'Carta Acadêmica',
    description: 'Para recomendadores de universidades, institutos de pesquisa, ou acadêmicos',
    sections: [
      {
        id: 'opening',
        title: 'Abertura e Credenciais',
        description: 'Apresentação do recomendador e contexto do relacionamento',
        required: true,
        placeholder: 'Sou [Título], [Cargo] na [Instituição]. Conheço o candidato desde [ano]...',
        guidelines: [
          'Incluir título completo e afiliação institucional',
          'Mencionar anos de experiência no campo',
          'Descrever como conhece o candidato',
          'Mencionar credenciais que qualificam o recomendador',
        ],
        example: 'Sou Professor Doutor [Nome], Diretor do Departamento de [Área] na [Universidade], com mais de [X] anos de experiência em [campo]. Conheço [Nome do Candidato] desde [ano], quando [contexto do relacionamento].',
      },
      {
        id: 'expertise',
        title: 'Expertise e Contribuições',
        description: 'Descrição detalhada das contribuições e expertise do candidato',
        required: true,
        placeholder: 'O candidato demonstrou expertise excepcional em [área específica]...',
        guidelines: [
          'Ser específico sobre áreas de expertise',
          'Mencionar contribuições concretas',
          'Usar linguagem técnica apropriada',
          'Incluir exemplos específicos de trabalhos',
        ],
        example: '[Nome] demonstrou expertise excepcional em [área específica], particularmente em [subárea]. Suas contribuições incluem [exemplo 1], [exemplo 2], e [exemplo 3]. Seu trabalho em [projeto específico] resultou em [impacto mensurável].',
      },
      {
        id: 'impact',
        title: 'Impacto e Reconhecimento',
        description: 'Impacto das contribuições e reconhecimento recebido',
        required: true,
        placeholder: 'As contribuições do candidato tiveram impacto significativo em...',
        guidelines: [
          'Quantificar impacto quando possível',
          'Mencionar citações, downloads, ou uso de trabalhos',
          'Descrever influência em outros pesquisadores',
          'Mencionar reconhecimento de pares',
        ],
        example: 'As contribuições de [Nome] tiveram impacto significativo em [campo]. Seu trabalho foi citado [número] vezes e influenciou pesquisas em [áreas]. Recebeu reconhecimento de [exemplos de reconhecimento].',
      },
      {
        id: 'comparison',
        title: 'Comparação com Pares',
        description: 'Comparação com outros profissionais no campo',
        required: true,
        placeholder: 'Em comparação com outros profissionais no campo...',
        guidelines: [
          'Comparar com profissionais estabelecidos',
          'Usar métricas objetivas quando possível',
          'Mencionar posição relativa no campo',
          'Evitar superlativos sem fundamento',
        ],
        example: 'Em minha experiência de [X] anos no campo, [Nome] está entre os [top X%] profissionais que conheci. Suas contribuições são comparáveis ou superiores às de [exemplos de profissionais reconhecidos].',
      },
      {
        id: 'recommendation',
        title: 'Recomendação Final',
        description: 'Recomendação forte e conclusão',
        required: true,
        placeholder: 'Recomendo fortemente a aprovação desta petição...',
        guidelines: [
          'Usar linguagem forte mas profissional',
          'Reafirmar capacidade extraordinária',
          'Mencionar benefício para os EUA',
          'Oferecer disponibilidade para esclarecimentos',
        ],
        example: 'Recomendo fortemente a aprovação desta petição. [Nome] possui capacidade extraordinária em [campo] e suas contribuições beneficiarão significativamente os Estados Unidos. Estou disponível para fornecer informações adicionais se necessário.',
      },
    ],
    bestPractices: [
      'Usar papel timbrado da instituição',
      'Incluir assinatura original',
      'Mencionar credenciais do recomendador',
      'Ser específico e quantitativo',
      'Evitar linguagem genérica',
    ],
    commonMistakes: [
      'Linguagem muito genérica ou vaga',
      'Falta de exemplos específicos',
      'Não mencionar credenciais do recomendador',
      'Superlativos sem fundamento',
      'Não incluir informações de contato',
    ],
  },
  INDUSTRY: {
    id: 'INDUSTRY',
    name: 'Carta da Indústria',
    description: 'Para recomendadores de empresas, organizações privadas, ou líderes da indústria',
    sections: [
      {
        id: 'opening',
        title: 'Abertura e Credenciais',
        description: 'Apresentação do recomendador e contexto profissional',
        required: true,
        placeholder: 'Sou [Título], [Cargo] na [Empresa]. Trabalhei com o candidato...',
        guidelines: [
          'Incluir cargo e empresa',
          'Mencionar tamanho e relevância da empresa',
          'Descrever relacionamento profissional',
          'Mencionar anos de experiência na indústria',
        ],
        example: 'Sou [Nome], [Cargo] na [Empresa], uma empresa líder em [setor] com [tamanho/alcance]. Trabalhei diretamente com [Nome do Candidato] de [ano] a [ano] em [contexto].',
      },
      {
        id: 'achievements',
        title: 'Conquistas e Resultados',
        description: 'Conquistas específicas e resultados mensuráveis',
        required: true,
        placeholder: 'O candidato alcançou resultados excepcionais incluindo...',
        guidelines: [
          'Focar em resultados mensuráveis',
          'Mencionar projetos específicos',
          'Incluir métricas de negócio',
          'Descrever impacto na organização',
        ],
        example: '[Nome] alcançou resultados excepcionais em [área]. Seu trabalho em [projeto] resultou em [métrica específica]. Liderou [iniciativa] que gerou [impacto mensurável].',
      },
      {
        id: 'leadership',
        title: 'Liderança e Inovação',
        description: 'Demonstração de liderança e capacidade de inovação',
        required: true,
        placeholder: 'O candidato demonstrou liderança excepcional...',
        guidelines: [
          'Descrever estilo de liderança',
          'Mencionar inovações introduzidas',
          'Incluir exemplos de tomada de decisão',
          'Descrever influência em equipes',
        ],
        example: '[Nome] demonstrou liderança excepcional ao [exemplo]. Introduziu inovações que [impacto]. Sua capacidade de [habilidade] resultou em [resultado].',
      },
      {
        id: 'market_impact',
        title: 'Impacto no Mercado',
        description: 'Impacto das contribuições no mercado ou indústria',
        required: true,
        placeholder: 'As contribuições do candidato tiveram impacto significativo no mercado...',
        guidelines: [
          'Descrever impacto no mercado',
          'Mencionar reconhecimento da indústria',
          'Incluir comparações com concorrentes',
          'Mencionar prêmios ou reconhecimentos',
        ],
        example: 'As contribuições de [Nome] tiveram impacto significativo em [mercado/indústria]. [Produto/Serviço] foi reconhecido por [exemplos] e resultou em [impacto mensurável].',
      },
      {
        id: 'recommendation',
        title: 'Recomendação Final',
        description: 'Recomendação forte e conclusão',
        required: true,
        placeholder: 'Recomendo fortemente a aprovação desta petição...',
        guidelines: [
          'Reafirmar valor para a indústria',
          'Mencionar benefício para os EUA',
          'Usar linguagem profissional e forte',
          'Oferecer disponibilidade para esclarecimentos',
        ],
        example: 'Recomendo fortemente a aprovação desta petição. [Nome] possui capacidade extraordinária e suas contribuições beneficiarão significativamente a indústria e os Estados Unidos.',
      },
    ],
    bestPractices: [
      'Usar papel timbrado da empresa',
      'Incluir assinatura original',
      'Mencionar posição da empresa no mercado',
      'Focar em resultados mensuráveis',
      'Incluir informações de contato',
    ],
    commonMistakes: [
      'Falta de métricas específicas',
      'Não mencionar tamanho/relevância da empresa',
      'Linguagem muito genérica',
      'Não incluir exemplos concretos',
      'Falta de informações de contato',
    ],
  },
  PEER: {
    id: 'PEER',
    name: 'Carta de Par',
    description: 'Para recomendadores que são pares no campo (outros profissionais reconhecidos)',
    sections: [
      {
        id: 'opening',
        title: 'Abertura e Credenciais',
        description: 'Apresentação do recomendador como par no campo',
        required: true,
        placeholder: 'Sou [Título], [Cargo] com [X] anos de experiência em [campo]...',
        guidelines: [
          'Estabelecer credenciais como par',
          'Mencionar anos de experiência',
          'Descrever como conhece o candidato',
          'Mencionar reconhecimentos próprios',
        ],
        example: 'Sou [Nome], [Título/Cargo] com mais de [X] anos de experiência em [campo]. Conheço [Nome do Candidato] há [anos] através de [contexto].',
      },
      {
        id: 'expertise',
        title: 'Expertise e Conhecimento',
        description: 'Avaliação da expertise do candidato do ponto de vista de um par',
        required: true,
        placeholder: 'Como alguém com experiência similar, posso avaliar que...',
        guidelines: [
          'Usar perspectiva de par',
          'Comparar conhecimento técnico',
          'Mencionar profundidade de expertise',
          'Incluir exemplos de trabalhos',
        ],
        example: 'Como alguém com experiência similar em [campo], posso avaliar que [Nome] possui conhecimento técnico excepcional em [áreas específicas]. Seu trabalho em [exemplo] demonstra [qualidade].',
      },
      {
        id: 'contributions',
        title: 'Contribuições ao Campo',
        description: 'Contribuições específicas do candidato ao campo',
        required: true,
        placeholder: 'As contribuições do candidato ao campo incluem...',
        guidelines: [
          'Mencionar contribuições específicas',
          'Descrever impacto no campo',
          'Incluir reconhecimento de outros pares',
          'Mencionar influência em outros profissionais',
        ],
        example: 'As contribuições de [Nome] ao campo incluem [exemplos específicos]. Seu trabalho influenciou [áreas] e foi reconhecido por [exemplos de reconhecimento].',
      },
      {
        id: 'standing',
        title: 'Posição no Campo',
        description: 'Avaliação da posição do candidato em relação a outros profissionais',
        required: true,
        placeholder: 'Em minha avaliação, o candidato está entre...',
        guidelines: [
          'Avaliar posição relativa',
          'Comparar com outros profissionais',
          'Usar métricas quando possível',
          'Mencionar reconhecimento de pares',
        ],
        example: 'Em minha avaliação, [Nome] está entre os [top X%] profissionais em [campo]. Suas contribuições são comparáveis às de [exemplos de profissionais reconhecidos].',
      },
      {
        id: 'recommendation',
        title: 'Recomendação Final',
        description: 'Recomendação forte de um par',
        required: true,
        placeholder: 'Como par no campo, recomendo fortemente...',
        guidelines: [
          'Reafirmar perspectiva de par',
          'Usar linguagem forte mas profissional',
          'Mencionar benefício para o campo',
          'Oferecer disponibilidade para esclarecimentos',
        ],
        example: 'Como par no campo, recomendo fortemente a aprovação desta petição. [Nome] possui capacidade extraordinária e suas contribuições beneficiarão significativamente o campo e os Estados Unidos.',
      },
    ],
    bestPractices: [
      'Estabelecer credenciais como par',
      'Usar perspectiva comparativa',
      'Mencionar reconhecimentos próprios',
      'Ser específico sobre contribuições',
      'Incluir informações de contato',
    ],
    commonMistakes: [
      'Não estabelecer credenciais adequadas',
      'Falta de perspectiva comparativa',
      'Linguagem muito genérica',
      'Não mencionar como conhece o candidato',
      'Falta de exemplos específicos',
    ],
  },
};

/**
 * Get letter template by type
 */
export function getLetterTemplate(type: string): LetterTemplate | undefined {
  return LETTER_TEMPLATES[type];
}

/**
 * Get all available letter templates
 */
export function getAllLetterTemplates(): LetterTemplate[] {
  return Object.values(LETTER_TEMPLATES);
}

/**
 * Generate letter content from template and data
 */
export function generateLetterFromTemplate(
  template: LetterTemplate,
  data: {
    recommenderName: string;
    recommenderTitle: string;
    recommenderOrg?: string;
    candidateName: string;
    sections: Record<string, string>;
  }
): string {
  let letter = '';

  // Header
  if (data.recommenderOrg) {
    letter += `${data.recommenderOrg}\n`;
  }
  letter += `${data.recommenderName}\n`;
  letter += `${data.recommenderTitle}\n`;
  if (data.recommenderOrg) {
    letter += `${data.recommenderOrg}\n`;
  }
  letter += '\n';

  // Date
  letter += `${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}\n\n`;

  // Salutation
  letter += 'To Whom It May Concern,\n\n';

  // Sections
  template.sections.forEach((section) => {
    const content = data.sections[section.id];
    if (content) {
      letter += `${section.title}\n\n`;
      letter += `${content}\n\n`;
    }
  });

  // Closing
  letter += 'Sincerely,\n\n';
  letter += `${data.recommenderName}\n`;
  if (data.recommenderTitle) {
    letter += `${data.recommenderTitle}\n`;
  }
  if (data.recommenderOrg) {
    letter += `${data.recommenderOrg}\n`;
  }

  return letter;
}



