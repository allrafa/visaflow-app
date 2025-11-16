export const PROCESS_PHASES = [
  {
    id: 'ELIGIBILITY',
    label: 'Elegibilidade e Estratégia',
    description: 'Fase 1: Definir estratégia e elegibilidade',
    order: 1,
  },
  {
    id: 'EVIDENCE',
    label: 'Evidências',
    description: 'Fase 2: Coletar e organizar evidências',
    order: 2,
  },
  {
    id: 'LETTERS',
    label: 'Cartas de Recomendação',
    description: 'Fase 3: Obter cartas de recomendação',
    order: 3,
  },
  {
    id: 'PETITION',
    label: 'Dossiê Final (I-140)',
    description: 'Fase 4: Preparar petição completa',
    order: 4,
  },
  {
    id: 'FILING',
    label: 'Protocolo e Acompanhamento',
    description: 'Fase 5: Protocolo e acompanhamento',
    order: 5,
  },
] as const;

export type ProcessPhaseId = (typeof PROCESS_PHASES)[number]['id'];



