/**
 * Tipos de Evidências Recomendadas por Critério EB-1A
 * Baseado em casos reais aprovados e Policy Manual
 */

export interface EvidenceType {
  id: string;
  name: string;
  description: string;
  required: boolean;
  examples: string[];
}

export const EVIDENCE_TYPES_BY_CRITERIA: Record<string, EvidenceType[]> = {
  AWARDS: [
    {
      id: 'certificate',
      name: 'Certificado Oficial',
      description: 'Certificado oficial do prêmio',
      required: true,
      examples: ['Certificado em PDF', 'Certificado físico escaneado'],
    },
    {
      id: 'announcement',
      name: 'Anúncio Público',
      description: 'Anúncio oficial da organização concedente',
      required: true,
      examples: ['Website da organização', 'Press release', 'Email oficial'],
    },
    {
      id: 'screenshot',
      name: 'Screenshot',
      description: 'Screenshot de website ou publicação',
      required: false,
      examples: ['Screenshot do website oficial', 'Screenshot de publicação'],
    },
    {
      id: 'media',
      name: 'Cobertura de Mídia',
      description: 'Cobertura de mídia sobre o prêmio',
      required: false,
      examples: ['Artigo sobre cerimônia', 'Vídeo da entrega'],
    },
  ],
  MEMBERSHIP: [
    {
      id: 'certificate',
      name: 'Certificado de Membership',
      description: 'Certificado oficial de membership',
      required: true,
      examples: ['Certificado em PDF', 'Carta de admissão'],
    },
    {
      id: 'letter',
      name: 'Carta de Admissão',
      description: 'Carta oficial de admissão',
      required: true,
      examples: ['Carta de admissão', 'Email de confirmação'],
    },
    {
      id: 'screenshot',
      name: 'Screenshot',
      description: 'Screenshot mostrando membership',
      required: false,
      examples: ['Screenshot de perfil de membro', 'Screenshot de diretório'],
    },
    {
      id: 'criteria',
      name: 'Documentação de Critérios',
      description: 'Documentação dos critérios de elegibilidade',
      required: false,
      examples: ['Website com critérios', 'Documento oficial'],
    },
  ],
  PRESS: [
    {
      id: 'article',
      name: 'Artigo Completo',
      description: 'Artigo completo publicado',
      required: true,
      examples: ['PDF do artigo', 'Link para artigo online'],
    },
    {
      id: 'screenshot',
      name: 'Screenshot',
      description: 'Screenshot do artigo',
      required: true,
      examples: ['Screenshot completo', 'Screenshot de seção relevante'],
    },
    {
      id: 'link',
      name: 'Link para Artigo',
      description: 'Link permanente para o artigo',
      required: true,
      examples: ['URL do artigo', 'Permalink'],
    },
    {
      id: 'publication',
      name: 'Informações da Publicação',
      description: 'Informações sobre circulação e audiência',
      required: false,
      examples: ['Estatísticas de circulação', 'Informações de audiência'],
    },
  ],
  SCHOLARLY: [
    {
      id: 'article',
      name: 'Artigo Publicado',
      description: 'PDF ou link do artigo publicado',
      required: true,
      examples: ['PDF do artigo', 'Link para journal'],
    },
    {
      id: 'journal',
      name: 'Informações do Journal',
      description: 'Informações sobre o journal',
      required: true,
      examples: ['Impact factor', 'Rankings', 'Índices'],
    },
    {
      id: 'citations',
      name: 'Citações',
      description: 'Evidências de citações',
      required: false,
      examples: ['Google Scholar', 'Web of Science', 'Scopus'],
    },
    {
      id: 'peer-review',
      name: 'Evidências de Peer Review',
      description: 'Documentação do processo de peer review',
      required: false,
      examples: ['Carta de aceitação', 'Comentários de revisores'],
    },
  ],
  ORIGINAL: [
    {
      id: 'project',
      name: 'Projeto ou Código',
      description: 'Link ou documentação do projeto',
      required: true,
      examples: ['GitHub repository', 'Website do projeto', 'Documentação'],
    },
    {
      id: 'metrics',
      name: 'Métricas de Impacto',
      description: 'Métricas quantificáveis',
      required: true,
      examples: ['Downloads', 'GitHub stars', 'Usuários', 'Citações'],
    },
    {
      id: 'testimonials',
      name: 'Testemunhos',
      description: 'Testemunhos de usuários ou adotantes',
      required: false,
      examples: ['Emails de usuários', 'Reviews', 'Case studies'],
    },
    {
      id: 'adoption',
      name: 'Evidências de Adoção',
      description: 'Evidências de uso por outros',
      required: false,
      examples: ['Fork no GitHub', 'Uso em projetos', 'Integrações'],
    },
  ],
  JUDGING: [
    {
      id: 'invitation',
      name: 'Convite Oficial',
      description: 'Convite para ser juiz',
      required: true,
      examples: ['Email de convite', 'Carta oficial'],
    },
    {
      id: 'certificate',
      name: 'Certificado',
      description: 'Certificado de participação',
      required: false,
      examples: ['Certificado de juiz', 'Certificado de participação'],
    },
    {
      id: 'screenshot',
      name: 'Screenshot',
      description: 'Screenshot de website ou programa',
      required: false,
      examples: ['Screenshot de programa', 'Screenshot de website'],
    },
    {
      id: 'program',
      name: 'Programa do Evento',
      description: 'Programa oficial listando juízes',
      required: false,
      examples: ['PDF do programa', 'Website do evento'],
    },
  ],
  CRITICAL: [
    {
      id: 'contract',
      name: 'Contrato ou Carta de Oferta',
      description: 'Documentação oficial do papel',
      required: true,
      examples: ['Contrato de trabalho', 'Carta de oferta', 'Job description'],
    },
    {
      id: 'letter',
      name: 'Carta de Recomendação',
      description: 'Carta descrevendo o papel',
      required: false,
      examples: ['Carta de supervisor', 'Carta de colega'],
    },
    {
      id: 'results',
      name: 'Evidências de Resultados',
      description: 'Resultados e impacto do trabalho',
      required: false,
      examples: ['Relatórios de resultados', 'Métricas de impacto'],
    },
    {
      id: 'organization',
      name: 'Informações da Organização',
      description: 'Informações sobre prestígio da organização',
      required: false,
      examples: ['Website da organização', 'Rankings', 'História'],
    },
  ],
  HIGH_SALARY: [
    {
      id: 'contract',
      name: 'Contrato ou Carta de Oferta',
      description: 'Documentação do salário',
      required: true,
      examples: ['Contrato de trabalho', 'Carta de oferta'],
    },
    {
      id: 'w2',
      name: 'W-2 ou Comprovantes',
      description: 'Comprovantes de renda',
      required: true,
      examples: ['W-2', 'Pay stubs', 'Tax returns'],
    },
    {
      id: 'market-data',
      name: 'Dados de Mercado',
      description: 'Dados comparativos de mercado',
      required: true,
      examples: ['BLS statistics', 'Glassdoor data', 'Salary surveys'],
    },
    {
      id: 'comparison',
      name: 'Análise Comparativa',
      description: 'Análise comparando com mercado',
      required: false,
      examples: ['Análise de percentil', 'Comparação detalhada'],
    },
  ],
  EXHIBITIONS: [
    {
      id: 'catalog',
      name: 'Catálogo da Exibição',
      description: 'Catálogo oficial da exibição',
      required: true,
      examples: ['PDF do catálogo', 'Catálogo físico'],
    },
    {
      id: 'invitation',
      name: 'Convite ou Anúncio',
      description: 'Convite para exibir ou anúncio',
      required: true,
      examples: ['Convite oficial', 'Anúncio da exibição'],
    },
    {
      id: 'photos',
      name: 'Fotos da Exibição',
      description: 'Fotos da exibição',
      required: false,
      examples: ['Fotos dos trabalhos', 'Fotos da abertura'],
    },
    {
      id: 'media',
      name: 'Cobertura de Mídia',
      description: 'Cobertura de mídia sobre a exibição',
      required: false,
      examples: ['Artigo sobre exibição', 'Review'],
    },
  ],
  COMMERCIAL_SUCCESS: [
    {
      id: 'sales',
      name: 'Comprovantes de Vendas',
      description: 'Documentação de vendas',
      required: true,
      examples: ['Invoices', 'Sales reports', 'Payment records'],
    },
    {
      id: 'revenue',
      name: 'Relatórios Financeiros',
      description: 'Relatórios de receita',
      required: true,
      examples: ['Tax returns', 'Financial statements', 'Revenue reports'],
    },
    {
      id: 'recognition',
      name: 'Reconhecimentos',
      description: 'Prêmios ou reconhecimentos comerciais',
      required: false,
      examples: ['Awards', 'Recognition letters', 'Testimonials'],
    },
    {
      id: 'media',
      name: 'Cobertura de Mídia',
      description: 'Cobertura sobre sucesso comercial',
      required: false,
      examples: ['Artigos sobre vendas', 'Reviews'],
    },
  ],
};

/**
 * Get recommended evidence types for a criterion
 */
export function getEvidenceTypesForCriteria(criteriaId: string): EvidenceType[] {
  return EVIDENCE_TYPES_BY_CRITERIA[criteriaId] || [];
}

/**
 * Get a specific evidence type
 */
export function getEvidenceType(
  criteriaId: string,
  evidenceTypeId: string
): EvidenceType | undefined {
  const types = getEvidenceTypesForCriteria(criteriaId);
  return types.find((type) => type.id === evidenceTypeId);
}



