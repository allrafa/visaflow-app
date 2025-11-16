'use client';

import { Card } from '@/components/ui/card';
import { CheckCircle2, FileText, Mail, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'task_completed' | 'letter_saved' | 'process_created' | 'document_uploaded';
  title: string;
  description: string;
  timestamp: Date;
}

interface RecentActivityProps {
  activities?: Activity[];
  maxItems?: number;
}

const ACTIVITY_ICONS: Record<Activity['type'], React.ElementType> = {
  task_completed: CheckCircle2,
  letter_saved: FileText,
  process_created: Plus,
  document_uploaded: Mail,
};

const ACTIVITY_COLORS: Record<Activity['type'], { icon: string; bg: string }> = {
  task_completed: { icon: 'text-green-600', bg: 'bg-green-100' },
  letter_saved: { icon: 'text-blue-600', bg: 'bg-blue-100' },
  process_created: { icon: 'text-purple-600', bg: 'bg-purple-100' },
  document_uploaded: { icon: 'text-amber-600', bg: 'bg-amber-100' },
};

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  }
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}

export function RecentActivity({ activities = [], maxItems = 5 }: RecentActivityProps) {
  const displayedActivities = activities.slice(0, maxItems);

  if (activities.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500">No recent activity</p>
        <p className="text-sm text-gray-400 mt-1">
          Start working on your processes to see activity here
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {displayedActivities.map((activity) => {
          const Icon = ACTIVITY_ICONS[activity.type];
          const colors = ACTIVITY_COLORS[activity.type];

          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={cn('rounded-lg p-2 flex-shrink-0', colors.bg)}>
                <Icon className={cn('h-4 w-4', colors.icon)} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTimestamp(activity.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {activities.length > maxItems && (
        <div className="mt-4 pt-4 border-t">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all activity →
          </button>
        </div>
      )}
    </Card>
  );
}
