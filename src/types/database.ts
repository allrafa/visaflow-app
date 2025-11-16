// Types temporários até Prisma Client ser gerado
// Estes tipos serão substituídos pelos tipos gerados do Prisma quando DATABASE_URL estiver configurado

export interface Process {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  northStar: string | null;
  currentPhase: string;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    tasks: number;
    criteria: number;
    letters: number;
  };
}

export interface Task {
  id: string;
  processId: string;
  phase: string;
  title: string;
  description: string | null;
  status: string;
  order: number;
  dependsOn: string[];
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
}

export interface CriteriaEvidence {
  id: string;
  processId: string;
  criteria: string;
  overview: string | null;
  context: string | null;
  impact: string | null;
  evidence: string | null;
  metricsData: unknown | null;
  isValidated: boolean;
  validationScore: number | null;
  validationIssues: unknown | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecommendationLetter {
  id: string;
  processId: string;
  recommenderName: string;
  recommenderTitle: string;
  recommenderOrg: string | null;
  recommenderEmail: string | null;
  content: string | null;
  status: 'draft' | 'review' | 'final' | 'signed';
  createdAt: Date;
  updatedAt: Date;
}



