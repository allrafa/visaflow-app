/**
 * Route Constants
 * Centraliza todas as rotas da aplicação
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/auth/signup',

  // Dashboard routes
  DASHBOARD: '/dashboard',
  DASHBOARD_PROCESS: {
    NEW: '/dashboard/process/new',
    DETAIL: (id: string) => `/dashboard/process/${id}`,
    CRITERIA: (id: string) => `/dashboard/process/${id}/criteria`,
    CRITERIA_DETAIL: (id: string, criteria: string) =>
      `/dashboard/process/${id}/criteria/${criteria}`,
    CRITERIA_CREATE: (id: string, criteria: string) =>
      `/dashboard/process/${id}/criteria/${criteria}/create`,
  },
  DASHBOARD_LETTERS: (processId: string) =>
    `/dashboard/letters/${processId}`,
  DASHBOARD_FINAL_MERITS: (processId: string) =>
    `/dashboard/final-merits/${processId}`,

  // API routes
  API: {
    PROCESSES: '/api/processes',
    PROCESSES_DETAIL: (id: string) => `/api/processes/${id}`,
    TASKS: '/api/tasks',
    TASKS_DETAIL: (id: string) => `/api/tasks/${id}`,
    UPLOADS: '/api/uploads',
    UPLOADS_DETAIL: (id: string) => `/api/uploads/${id}`,
    UPLOADS_DOWNLOAD: (id: string) => `/api/uploads/${id}/download`,
    CRITERIA: '/api/criteria',
    CRITERIA_DETAIL: (id: string) => `/api/criteria/${id}`,
    LETTERS: '/api/letters',
    LETTERS_DETAIL: (id: string) => `/api/letters/${id}`,
    AI_VALIDATE: '/api/ai/validate-content',
    AI_GENERATE_MERITS: '/api/ai/generate-merits',
    AI_DETECT_SUSPICIOUS: '/api/ai/detect-suspicious',
  },
} as const;



