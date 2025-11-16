/**
 * Guidelines e exemplos para templates de critérios EB-1A
 * Baseado em conhecimento de casos reais aprovados
 */

import type { CriteriaGuidelines } from './criteria';

/**
 * Get guidelines for a specific criterion
 */
export function getCriteriaGuidelines(criteriaId: string): CriteriaGuidelines | undefined {
  return CRITERIA_GUIDELINES[criteriaId];
}

const CRITERIA_GUIDELINES: Record<string, CriteriaGuidelines> = {
  PRESS: {
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
  SCHOLARLY: {
    overview: 'Artigos devem ser publicados em journals profissionais com peer-review rigoroso. Evite predatory journals ou trash publishing. Demonstre impacto através de citações.',
    commonMistakes: [
      'Incluir predatory journals ou trash publishing',
      'Não demonstrar peer-review rigoroso',
      'Faltar evidências de impacto (citações)',
      'Não mostrar qualidade do journal',
    ],
    bestPractices: [
      'Verifique se o journal está em índices respeitáveis (SCI, SSCI, etc)',
      'Demonstre processo de peer-review',
      'Cite impact factor e rankings',
      'Mostre citações e impacto',
      'Evite journals com pay-to-publish',
    ],
    evidenceTips: [
      'PDF do artigo publicado',
      'Link para artigo online',
      'Informações sobre impact factor',
      'Lista de citações',
      'Evidências de peer-review',
    ],
  },
  ORIGINAL: {
    overview: 'Contribuições originais devem ter impacto científico ou acadêmico significativo. Demonstre adoção, uso, citações, ou impacto comercial.',
    commonMistakes: [
      'Não demonstrar originalidade',
      'Faltar evidências de impacto',
      'Não mostrar adoção ou uso',
      'Não quantificar métricas de impacto',
    ],
    bestPractices: [
      'Quantifique métricas de impacto (downloads, stars, users)',
      'Demonstre adoção por outros',
      'Cite uso em projetos ou empresas',
      'Mostre citações ou referências',
      'Explique a originalidade da contribuição',
    ],
    evidenceTips: [
      'Screenshots de métricas (GitHub stars, downloads)',
      'Testemunhos de usuários',
      'Citações em outros projetos',
      'Documentação da contribuição',
      'Evidências de impacto comercial',
    ],
  },
  JUDGING: {
    overview: 'Atividades de julgamento devem ser em eventos ou organizações de prestígio. Demonstre processo de seleção rigoroso e prestígio do evento.',
    commonMistakes: [
      'Não demonstrar prestígio do evento',
      'Faltar evidências do processo de seleção',
      'Não mostrar critérios rigorosos',
      'Incluir eventos de baixo prestígio',
    ],
    bestPractices: [
      'Pesquise o prestígio do evento/organização',
      'Demonstre processo de seleção como juiz',
      'Cite outros juízes renomados',
      'Mostre histórico e tradição do evento',
      'Explique por que ser selecionado demonstra excelência',
    ],
    evidenceTips: [
      'Convite oficial para ser juiz',
      'Certificado de participação',
      'Informações sobre o evento',
      'Lista de outros juízes',
      'Estatísticas de trabalhos avaliados',
    ],
  },
  CRITICAL: {
    overview: 'Papel crítico deve ser em organizações de renome, com responsabilidades significativas e impacto demonstrado. Não apenas título, mas função crítica.',
    commonMistakes: [
      'Não demonstrar que o papel é crítico',
      'Faltar evidências de impacto',
      'Não mostrar prestígio da organização',
      'Confundir título com função crítica',
    ],
    bestPractices: [
      'Descreva responsabilidades específicas',
      'Demonstre impacto dos resultados',
      'Mostre prestígio da organização',
      'Cite outros líderes da organização',
      'Explique por que o papel é crítico',
    ],
    evidenceTips: [
      'Contrato ou carta de oferta',
      'Descrição de responsabilidades',
      'Evidências de resultados/impacto',
      'Informações sobre a organização',
      'Testemunhos de colegas/superiores',
    ],
  },
  HIGH_SALARY: {
    overview: 'Salário deve ser significativamente acima da média do campo. Demonstre comparação com dados de mercado e explique por que reflete excelência.',
    commonMistakes: [
      'Não demonstrar comparação com mercado',
      'Faltar dados de mercado',
      'Não explicar por que o salário reflete excelência',
      'Incluir apenas salário sem contexto',
    ],
    bestPractices: [
      'Use dados de mercado confiáveis (BLS, Glassdoor, etc)',
      'Demonstre percentil do salário',
      'Compare com média do campo',
      'Explique fatores que justificam o salário',
      'Mostre evolução do salário ao longo do tempo',
    ],
    evidenceTips: [
      'Contrato ou carta de oferta',
      'W-2 ou comprovantes de renda',
      'Dados de mercado comparativos',
      'Descrição de responsabilidades',
      'Histórico salarial',
    ],
  },
  EXHIBITIONS: {
    overview: 'Exibições devem ser em galerias ou locais de prestígio, não apenas qualquer espaço. Demonstre seleção rigorosa e prestígio do local.',
    commonMistakes: [
      'Não demonstrar prestígio da galeria',
      'Faltar evidências de seleção',
      'Incluir exibições em locais de baixo prestígio',
      'Não mostrar impacto ou reconhecimento',
    ],
    bestPractices: [
      'Pesquise o prestígio da galeria/local',
      'Demonstre processo de seleção',
      'Cite outros artistas que exibiram lá',
      'Mostre cobertura de mídia',
      'Explique por que a exibição demonstra excelência',
    ],
    evidenceTips: [
      'Catálogo da exibição',
      'Convite ou anúncio',
      'Fotos da exibição',
      'Cobertura de mídia',
      'Informações sobre a galeria',
    ],
  },
  COMMERCIAL_SUCCESS: {
    overview: 'Sucesso comercial deve ser significativo e demonstrado através de vendas, receita, ou impacto comercial. Não apenas vendas, mas reconhecimento.',
    commonMistakes: [
      'Não quantificar sucesso comercial',
      'Faltar evidências de vendas/receita',
      'Não demonstrar reconhecimento',
      'Incluir apenas números sem contexto',
    ],
    bestPractices: [
      'Quantifique vendas e receita',
      'Demonstre crescimento ao longo do tempo',
      'Mostre reconhecimento crítico',
      'Cite prêmios ou reconhecimentos comerciais',
      'Explique por que o sucesso demonstra excelência',
    ],
    evidenceTips: [
      'Comprovantes de vendas',
      'Relatórios financeiros',
      'Reconhecimentos ou prêmios',
      'Cobertura de mídia',
      'Testemunhos de compradores/colecionadores',
    ],
  },
};



