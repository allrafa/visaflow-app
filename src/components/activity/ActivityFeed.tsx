'use client';

import { Activity } from '@/types/database';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  FileIcon,
  CheckCircle2,
  XCircle,
  Upload,
  Mail,
  Award,
  UserPlus,
  UserMinus,
  FolderPlus,
  Edit,
  Send,
  FileCheck,
} from 'lucide-react';

interface ActivityFeedProps {
  activities: Activity[];
  emptyMessage?: string;
}

function getActivityIcon(action: string) {
  const iconClass = 'h-5 w-5';

  switch (action) {
    case 'PROCESS_CREATED':
      return <FolderPlus className={iconClass} />;
    case 'PROCESS_UPDATED':
    case 'TASK_UPDATED':
    case 'CRITERIA_UPDATED':
    case 'LETTER_UPDATED':
      return <Edit className={iconClass} />;
    case 'TASK_CREATED':
      return <FileIcon className={iconClass} />;
    case 'TASK_COMPLETED':
      return <CheckCircle2 className={iconClass} />;
    case 'TASK_DELETED':
    case 'CRITERIA_DELETED':
    case 'LETTER_DELETED':
      return <XCircle className={iconClass} />;
    case 'FILE_UPLOADED':
      return <Upload className={iconClass} />;
    case 'FILE_DELETED':
      return <XCircle className={iconClass} />;
    case 'CRITERIA_CREATED':
      return <Award className={iconClass} />;
    case 'CRITERIA_VALIDATED':
      return <FileCheck className={iconClass} />;
    case 'LETTER_CREATED':
      return <Mail className={iconClass} />;
    case 'LETTER_SENT':
      return <Send className={iconClass} />;
    case 'LETTER_SIGNED':
      return <FileCheck className={iconClass} />;
    case 'COLLABORATOR_INVITED':
    case 'COLLABORATOR_ACCEPTED':
      return <UserPlus className={iconClass} />;
    case 'COLLABORATOR_REMOVED':
      return <UserMinus className={iconClass} />;
    default:
      return <FileIcon className={iconClass} />;
  }
}

function getActivityColor(action: string): string {
  if (action.includes('CREATED')) return 'bg-green-100 text-green-700';
  if (action.includes('COMPLETED') || action.includes('VALIDATED') || action.includes('SIGNED'))
    return 'bg-blue-100 text-blue-700';
  if (action.includes('DELETED')) return 'bg-red-100 text-red-700';
  if (action.includes('UPDATED')) return 'bg-amber-100 text-amber-700';
  if (action.includes('UPLOADED')) return 'bg-purple-100 text-purple-700';
  if (action.includes('COLLABORATOR')) return 'bg-indigo-100 text-indigo-700';
  return 'bg-gray-100 text-gray-700';
}

export function ActivityFeed({ activities, emptyMessage }: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
        <p className="text-gray-600">
          {emptyMessage || 'Nenhuma atividade recente.'}
        </p>
      </div>
    );
  }

  // Agrupar por dia
  const groupedByDay = activities.reduce((acc, activity) => {
    const date = new Date(activity.createdAt).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedByDay).map(([date, dayActivities]) => (
        <div key={date} className="space-y-4">
          {/* Data */}
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              {date}
            </h3>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Activities do dia */}
          <div className="space-y-3">
            {dayActivities.map((activity) => (
              <div
                key={activity.id}
                className="group flex gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-sm"
              >
                {/* Icon */}
                <div className={`flex-shrink-0 rounded-full p-2 ${getActivityColor(activity.action)}`}>
                  {getActivityIcon(activity.action)}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  {/* Description */}
                  <p className="text-sm font-medium text-gray-900">
                    {activity.description}
                  </p>

                  {/* Metadata */}
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    {/* Time */}
                    <span className="flex items-center gap-1">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {formatDistanceToNow(new Date(activity.createdAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </span>

                    {/* Entity Type */}
                    {activity.entityType && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium">
                        {activity.entityType}
                      </span>
                    )}

                    {/* Action Type */}
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium">
                      {activity.action.replace(/_/g, ' ').toLowerCase()}
                    </span>
                  </div>

                  {/* Extra metadata */}
                  {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                    <div className="mt-2 rounded bg-gray-50 p-2 text-xs text-gray-600">
                      {JSON.stringify(activity.metadata, null, 2)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
