export const EB1_CRITERIA = [
  {
    id: 'AWARDS',
    label: 'Prêmios Reconhecidos',
    description: 'Prêmios nacionais ou internacionais por excelência',
  },
  {
    id: 'MEMBERSHIP',
    label: 'Membership em Associações',
    description: 'Membro de associações que exigem realizações excepcionais',
  },
  {
    id: 'PRESS',
    label: 'Cobertura de Imprensa',
    description: 'Matérias sobre o trabalho em mídia profissional',
  },
  {
    id: 'JUDGING',
    label: 'Judging Work',
    description: 'Julgamento do trabalho de outros na área',
  },
  {
    id: 'ORIGINAL',
    label: 'Contribuições Originais',
    description: 'Contribuições originais de importância científica ou acadêmica',
  },
  {
    id: 'SCHOLARLY',
    label: 'Artigos Acadêmicos',
    description: 'Artigos acadêmicos em journals ou mídia profissional',
  },
  {
    id: 'CRITICAL',
    label: 'Papel Crítico/Liderança',
    description: 'Papel crítico ou de liderança em organizações de renome',
  },
  {
    id: 'HIGH_SALARY',
    label: 'Salário Alto',
    description: 'Remuneração alta em relação ao campo',
  },
  {
    id: 'EXHIBITIONS',
    label: 'Exibições Artísticas',
    description: 'Exibições de trabalho artístico em galerias ou locais de prestígio',
  },
  {
    id: 'COMMERCIAL_SUCCESS',
    label: 'Sucesso Comercial',
    description: 'Sucesso comercial nas artes',
  },
] as const;

export type EB1CriteriaId = (typeof EB1_CRITERIA)[number]['id'];



