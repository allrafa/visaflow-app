/**
 * Activity Service
 * Gerencia o registro e consulta de atividades do processo
 */

import { prisma } from '@/lib/db/client';
import { ActivityAction } from '@prisma/client';

// ============================================
// TYPES
// ============================================

export interface CreateActivityInput {
  processId: string;
  userId: string;
  userName?: string;
  action: ActivityAction;
  entityType: string;
  entityId?: string;
  entityName?: string;
  description: string;
  metadata?: Record<string, any>;
}

export interface ActivityFilter {
  processId?: string;
  userId?: string;
  action?: ActivityAction;
  entityType?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Gera descrição legível a partir da ação
 */
export function generateActivityDescription(
  userName: string | undefined,
  action: ActivityAction,
  entityName?: string
): string {
  const name = userName || 'Usuário';

  const descriptions: Record<ActivityAction, string> = {
    // Process
    PROCESS_CREATED: `${name} criou o processo${entityName ? `: ${entityName}` : ''}`,
    PROCESS_UPDATED: `${name} atualizou o processo${entityName ? `: ${entityName}` : ''}`,
    PROCESS_DELETED: `${name} deletou o processo${entityName ? `: ${entityName}` : ''}`,

    // Tasks
    TASK_CREATED: `${name} criou a tarefa${entityName ? `: ${entityName}` : ''}`,
    TASK_UPDATED: `${name} atualizou a tarefa${entityName ? `: ${entityName}` : ''}`,
    TASK_COMPLETED: `${name} completou a tarefa${entityName ? `: ${entityName}` : ''}`,
    TASK_DELETED: `${name} deletou a tarefa${entityName ? `: ${entityName}` : ''}`,

    // Criteria
    CRITERIA_CREATED: `${name} adicionou o critério${entityName ? `: ${entityName}` : ''}`,
    CRITERIA_UPDATED: `${name} atualizou o critério${entityName ? `: ${entityName}` : ''}`,
    CRITERIA_VALIDATED: `${name} validou o critério${entityName ? `: ${entityName}` : ''}`,
    CRITERIA_DELETED: `${name} removeu o critério${entityName ? `: ${entityName}` : ''}`,

    // Letters
    LETTER_CREATED: `${name} criou a carta de recomendação${entityName ? ` de ${entityName}` : ''}`,
    LETTER_UPDATED: `${name} atualizou a carta de recomendação${entityName ? ` de ${entityName}` : ''}`,
    LETTER_SENT: `${name} enviou a carta de recomendação${entityName ? ` de ${entityName}` : ''}`,
    LETTER_SIGNED: `${name} recebeu a carta assinada${entityName ? ` de ${entityName}` : ''}`,
    LETTER_DELETED: `${name} removeu a carta de recomendação${entityName ? ` de ${entityName}` : ''}`,

    // Files
    FILE_UPLOADED: `${name} fez upload do arquivo${entityName ? `: ${entityName}` : ''}`,
    FILE_DELETED: `${name} removeu o arquivo${entityName ? `: ${entityName}` : ''}`,

    // Collaborators
    COLLABORATOR_INVITED: `${name} convidou ${entityName || 'um colaborador'} para o processo`,
    COLLABORATOR_ACCEPTED: `${entityName || name} aceitou o convite para colaborar`,
    COLLABORATOR_REMOVED: `${name} removeu ${entityName || 'um colaborador'} do processo`,
  };

  return descriptions[action] || `${name} executou a ação: ${action}`;
}

// ============================================
// ACTIVITY SERVICE
// ============================================

/**
 * Registra uma nova atividade
 */
export async function logActivity(input: CreateActivityInput) {
  try {
    // Gera descrição se não fornecida
    const description = input.description || generateActivityDescription(
      input.userName,
      input.action,
      input.entityName
    );

    const activity = await prisma.activity.create({
      data: {
        processId: input.processId,
        userId: input.userId,
        userName: input.userName,
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId,
        entityName: input.entityName,
        description,
        metadata: input.metadata || {},
      },
    });

    return activity;
  } catch (error) {
    console.error('Error logging activity:', error);
    // Não lançar erro para não quebrar operação principal
    // Activity log é secondary, não deve falhar operação
    return null;
  }
}

/**
 * Busca atividades com filtros
 */
export async function getActivities(filter: ActivityFilter = {}) {
  const {
    processId,
    userId,
    action,
    entityType,
    startDate,
    endDate,
    limit = 50,
    offset = 0,
  } = filter;

  const where: any = {};

  if (processId) where.processId = processId;
  if (userId) where.userId = userId;
  if (action) where.action = action;
  if (entityType) where.entityType = entityType;

  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt.gte = startDate;
    if (endDate) where.createdAt.lte = endDate;
  }

  const [activities, total] = await Promise.all([
    prisma.activity.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.activity.count({ where }),
  ]);

  return {
    activities,
    total,
    hasMore: offset + activities.length < total,
  };
}

/**
 * Busca atividades recentes de um processo
 */
export async function getRecentActivities(processId: string, limit = 10) {
  return prisma.activity.findMany({
    where: { processId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Busca atividades agrupadas por dia
 */
export async function getActivitiesByDay(processId: string, days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const activities = await prisma.activity.findMany({
    where: {
      processId,
      createdAt: {
        gte: startDate,
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Agrupar por dia
  const grouped = activities.reduce((acc, activity) => {
    const date = activity.createdAt.toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activity);
    return acc;
  }, {} as Record<string, typeof activities>);

  return grouped;
}

/**
 * Estatísticas de atividades
 */
export async function getActivityStats(processId: string) {
  const [total, byAction, byUser, recent24h] = await Promise.all([
    // Total de atividades
    prisma.activity.count({
      where: { processId },
    }),

    // Atividades por tipo de ação
    prisma.activity.groupBy({
      by: ['action'],
      where: { processId },
      _count: { action: true },
    }),

    // Atividades por usuário
    prisma.activity.groupBy({
      by: ['userId', 'userName'],
      where: { processId },
      _count: { userId: true },
    }),

    // Atividades nas últimas 24h
    prisma.activity.count({
      where: {
        processId,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    }),
  ]);

  return {
    total,
    recent24h,
    byAction: byAction.map((item) => ({
      action: item.action,
      count: item._count.action,
    })),
    byUser: byUser.map((item) => ({
      userId: item.userId,
      userName: item.userName,
      count: item._count.userId,
    })),
  };
}

/**
 * Limpa atividades antigas (manutenção)
 */
export async function cleanupOldActivities(daysToKeep = 90) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

  const result = await prisma.activity.deleteMany({
    where: {
      createdAt: {
        lt: cutoffDate,
      },
    },
  });

  return result.count;
}

// ============================================
// CONVENIENCE FUNCTIONS (Atalhos para ações comuns)
// ============================================

export async function logTaskCreated(
  processId: string,
  userId: string,
  userName: string | undefined,
  taskId: string,
  taskTitle: string
) {
  return logActivity({
    processId,
    userId,
    userName,
    action: 'TASK_CREATED',
    entityType: 'task',
    entityId: taskId,
    entityName: taskTitle,
    description: generateActivityDescription(userName, 'TASK_CREATED', taskTitle),
  });
}

export async function logTaskCompleted(
  processId: string,
  userId: string,
  userName: string | undefined,
  taskId: string,
  taskTitle: string
) {
  return logActivity({
    processId,
    userId,
    userName,
    action: 'TASK_COMPLETED',
    entityType: 'task',
    entityId: taskId,
    entityName: taskTitle,
    description: generateActivityDescription(userName, 'TASK_COMPLETED', taskTitle),
  });
}

export async function logFileUploaded(
  processId: string,
  userId: string,
  userName: string | undefined,
  fileId: string,
  fileName: string
) {
  return logActivity({
    processId,
    userId,
    userName,
    action: 'FILE_UPLOADED',
    entityType: 'file',
    entityId: fileId,
    entityName: fileName,
    description: generateActivityDescription(userName, 'FILE_UPLOADED', fileName),
  });
}

export async function logCriteriaValidated(
  processId: string,
  userId: string,
  userName: string | undefined,
  criteriaId: string,
  criteriaName: string,
  score?: number
) {
  return logActivity({
    processId,
    userId,
    userName,
    action: 'CRITERIA_VALIDATED',
    entityType: 'criteria',
    entityId: criteriaId,
    entityName: criteriaName,
    description: generateActivityDescription(userName, 'CRITERIA_VALIDATED', criteriaName),
    metadata: score ? { validationScore: score } : undefined,
  });
}
