export const dashboardTourSteps = [
  {
    target: '[data-tour="welcome"]',
    title: 'Bem-vindo ao VisaFlow!',
    content: 'Este é seu painel principal onde você gerencia suas petições EB-1A. Vamos fazer um tour rápido para você começar.',
    position: 'bottom' as const,
  },
  {
    target: '[data-tour="new-process"]',
    title: 'Crie seu Primeiro Processo',
    content: 'Clique aqui para iniciar uma nova petição EB-1A. Você vai preencher informações básicas como nome do candidato e categoria.',
    position: 'left' as const,
  },
  {
    target: '[data-tour="process-list"]',
    title: 'Lista de Processos',
    content: 'Aqui você verá todos os seus processos. Você pode clicar em qualquer processo para ver os detalhes e adicionar tarefas.',
    position: 'top' as const,
  },
  {
    target: '[data-tour="user-menu"]',
    title: 'Menu do Usuário',
    content: 'Acesse suas configurações de conta e faça logout por aqui.',
    position: 'bottom' as const,
  },
];

export const processDetailsTourSteps = [
  {
    target: '[data-tour="add-task"]',
    title: 'Adicione Tarefas',
    content: 'Divida seu trabalho em tarefas menores. Por exemplo: "Reunir cartas de recomendação" ou "Preparar CV atualizado".',
    position: 'left' as const,
  },
  {
    target: '[data-tour="criteria"]',
    title: 'Critérios EB-1A',
    content: 'Aqui você acompanha os 10 critérios da petição EB-1A. Você precisa atender pelo menos 3 para se qualificar.',
    position: 'top' as const,
  },
  {
    target: '[data-tour="upload-file"]',
    title: 'Faça Upload de Documentos',
    content: 'Anexe documentos importantes como certificados, cartas, artigos publicados, etc.',
    position: 'right' as const,
  },
  {
    target: '[data-tour="ai-validation"]',
    title: 'Validação com IA',
    content: 'Nossa IA pode analisar seus documentos e critérios para dar feedback sobre a força da sua petição.',
    position: 'bottom' as const,
  },
];
