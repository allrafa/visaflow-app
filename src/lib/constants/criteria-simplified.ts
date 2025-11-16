// Simplified EB-1A Criteria with plain Portuguese and practical examples

export interface SimplifiedCriteria {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  examples: string[];
  whatToInclude: string;
  commonMistakes: string[];
}

export const CRITERIA_SIMPLIFIED: Record<number, SimplifiedCriteria> = {
  1: {
    id: 1,
    shortTitle: "Prêmios e Reconhecimentos",
    title: "🏆 Prêmios e Reconhecimentos de Excelência",
    description: "Você ganhou prêmios importantes na sua área de atuação?",
    examples: [
      "Prêmio nacional de pesquisa científica",
      "Reconhecimento de sociedade profissional importante",
      "Medalha ou honraria governamental",
      "Prêmio de melhor trabalho em conferência internacional",
    ],
    whatToInclude: "Liste os prêmios, quando recebeu, por que é importante na sua área, e quem concedeu",
    commonMistakes: [
      "Incluir certificados de participação (não contam como prêmios)",
      "Não explicar a importância do prêmio",
      "Não mencionar o critério de seleção",
    ],
  },
  2: {
    id: 2,
    shortTitle: "Associações Profissionais",
    title: "👥 Membros de Associações de Elite",
    description: "Você é membro de associações que exigem conquistas destacadas para entrar?",
    examples: [
      "Academia Nacional de Ciências",
      "Sociedade científica que exige indicação por pares",
      "Associação que aceita apenas os top 5% da área",
      "Ordem profissional de excelência",
    ],
    whatToInclude: "Nome da associação, critérios rigorosos de admissão, e por que poucos conseguem entrar",
    commonMistakes: [
      "Listar associações abertas a qualquer um (não contam)",
      "Não provar que a admissão foi seletiva",
      "Confundir membros regulares com membros de elite",
    ],
  },
  3: {
    id: 3,
    shortTitle: "Cobertura de Mídia",
    title: "📰 Cobertura de Mídia Profissional",
    description: "Seu trabalho foi destaque em jornais, revistas, TV ou mídia especializada?",
    examples: [
      "Entrevista em jornal nacional sobre sua pesquisa",
      "Artigo de revista especializada destacando seu trabalho",
      "Reportagem de TV sobre sua descoberta",
      "Matéria em publicação comercial importante da área",
    ],
    whatToInclude: "Links, capturas de tela, tradução se for em inglês, e explicação do alcance da publicação",
    commonMistakes: [
      "Incluir posts de redes sociais pessoais",
      "Não provar a circulação/audiência da mídia",
      "Incluir autopromoção (deve ser cobertura por terceiros)",
    ],
  },
  4: {
    id: 4,
    shortTitle: "Avaliação de Trabalhos",
    title: "⚖️ Avaliação do Trabalho de Outros",
    description: "Você foi convidado para revisar trabalhos de outros profissionais da sua área?",
    examples: [
      "Revisor de artigos para revista científica",
      "Jurado de prêmio profissional importante",
      "Membro de comitê de avaliação de grants",
      "Revisor de propostas de conferência internacional",
    ],
    whatToInclude: "Cartas dos editores/organizadores, número de trabalhos revisados, e reputação da publicação/evento",
    commonMistakes: [
      "Não comprovar que foi convidado (vs. voluntário)",
      "Revisões de trabalhos de alunos (não conta)",
      "Não explicar a seletividade do convite",
    ],
  },
  5: {
    id: 5,
    shortTitle: "Contribuições Originais",
    title: "💡 Contribuições Científicas ou Artísticas Originais",
    description: "Você fez contribuições importantes e originais na sua área?",
    examples: [
      "Descoberta científica citada por muitos pesquisadores",
      "Técnica ou metodologia nova amplamente adotada",
      "Obra artística que influenciou outros artistas",
      "Invenção patenteada com impacto comercial",
    ],
    whatToInclude: "Descrição clara da inovação, evidência de adoção/impacto, e cartas de especialistas confirmando importância",
    commonMistakes: [
      "Descrever apenas suas responsabilidades de trabalho",
      "Não provar que foi original e significativo",
      "Falta de evidências objetivas de impacto",
    ],
  },
  6: {
    id: 6,
    shortTitle: "Artigos Acadêmicos",
    title: "📚 Artigos Acadêmicos ou Profissionais",
    description: "Você publicou artigos em periódicos ou veículos importantes da área?",
    examples: [
      "Artigos em revistas científicas com peer-review",
      "Capítulos de livros acadêmicos",
      "Artigos em publicações profissionais reconhecidas",
      "Papers em anais de conferências seletivas",
    ],
    whatToInclude: "Lista completa, citações que recebeu, fator de impacto das revistas, e evidências de peer-review",
    commonMistakes: [
      "Incluir trabalhos não publicados",
      "Contar várias versões do mesmo trabalho",
      "Não demonstrar o prestígio da publicação",
    ],
  },
  7: {
    id: 7,
    shortTitle: "Exposições Artísticas",
    title: "🎨 Exibições ou Apresentações Artísticas",
    description: "Seu trabalho artístico foi exibido em locais de prestígio?",
    examples: [
      "Exposição em museu reconhecido",
      "Apresentação em teatro ou sala de concerto importante",
      "Mostra em galeria de prestígio nacional/internacional",
      "Exibição curada em evento artístico relevante",
    ],
    whatToInclude: "Nome e reputação do local, críticas recebidas, catálogos, e evidências de seleção competitiva",
    commonMistakes: [
      "Incluir exposições em locais não reconhecidos",
      "Não provar a importância do venue",
      "Falta de evidências de curadoria seletiva",
    ],
  },
  8: {
    id: 8,
    shortTitle: "Papel de Liderança",
    title: "🎯 Papel de Liderança ou Crítico",
    description: "Você teve papel de liderança em organizações ou projetos de destaque?",
    examples: [
      "Diretor de departamento em instituição renomada",
      "Líder de projeto de pesquisa de grande porte",
      "Fundador de organização profissional importante",
      "Membro de conselho de instituição de prestígio",
    ],
    whatToInclude: "Descrição da organização, seu papel específico, impacto que gerou, e evidências de reputação da entidade",
    commonMistakes: [
      "Listar apenas títulos sem evidências de impacto",
      "Incluir organizações pequenas ou locais",
      "Não demonstrar que o papel foi crítico",
    ],
  },
  9: {
    id: 9,
    shortTitle: "Salário Alto",
    title: "💰 Salário Alto em Relação a Outros",
    description: "Você ganha significativamente mais que outros profissionais da sua área?",
    examples: [
      "Salário no top 10% da profissão (com dados oficiais)",
      "Compensação acima da média para sua posição (comparada com estatísticas governamentais)",
      "Pacote de benefícios diferenciado devido à expertise",
    ],
    whatToInclude: "Comprovantes de renda, comparação com estatísticas oficiais (ex: Bureau of Labor Statistics), e explicação do diferencial",
    commonMistakes: [
      "Não incluir provas documentais",
      "Comparar com dados errados ou desatualizados",
      "Não considerar localização geográfica nas comparações",
    ],
  },
  10: {
    id: 10,
    shortTitle: "Sucesso Comercial",
    title: "💼 Sucesso Comercial nas Artes Performáticas",
    description: "Você teve sucesso comercial significativo nas artes (bilheteria, vendas, etc.)?",
    examples: [
      "Vendas de álbuns musicais excepcionais",
      "Bilheteria de shows/espetáculos acima da média",
      "Venda de obras de arte por valores elevados",
      "Contratos comerciais de alto valor",
    ],
    whatToInclude: "Números de vendas/bilheteria, comparações com outros artistas, e evidências documentais",
    commonMistakes: [
      "Falta de documentação oficial",
      "Não contextualizar os números",
      "Incluir dados de projetos em colaboração sem explicar sua contribuição",
    ],
  },
};

// Helper function to get criteria by ID
export function getCriteriaById(id: number): SimplifiedCriteria | undefined {
  return CRITERIA_SIMPLIFIED[id];
}

// Helper function to get all criteria as array
export function getAllCriteria(): SimplifiedCriteria[] {
  return Object.values(CRITERIA_SIMPLIFIED);
}

// Helper to check minimum criteria met (need 3 of 10)
export function hasMinimumCriteria(criteriaIds: number[]): boolean {
  return criteriaIds.length >= 3;
}
