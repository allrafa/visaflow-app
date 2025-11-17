'use client';

import { CheckCircle2, FileText, Mail, Plus } from 'lucide-react';

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

// Priority-based purple shades (darker = more important)
const ACTIVITY_COLORS: Record<Activity['type'], { purpleShade: string }> = {
  task_completed: { purpleShade: 'text-purple-3' },      // Darkest - highest priority
  process_created: { purpleShade: 'text-purple-1' },     // Medium
  letter_saved: { purpleShade: 'text-purple-2' },        // Lighter
  document_uploaded: { purpleShade: 'text-purple-2' },   // Lighter
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
      <div className="card p-8 text-center">
        <p className="text-muted-foreground">No recent activity</p>
        <p className="text-body text-muted-foreground mt-1">
          Start working on your processes to see activity here
        </p>
      </div>
    );
  }

  return (
    <div className="card p-6 animate-fade-in">
      <h3 className="text-title mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {displayedActivities.map((activity) => {
          const Icon = ACTIVITY_ICONS[activity.type];
          const { purpleShade } = ACTIVITY_COLORS[activity.type];

          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="icon-container rounded-lg p-2 bg-purple-muted flex-shrink-0">
                <Icon className={`h-4 w-4 ${purpleShade}`} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-body font-medium">
                  {activity.title}
                </p>
                <p className="text-body text-muted-foreground truncate">
                  {activity.description}
                </p>
                <p className="text-small text-muted-foreground mt-1">
                  {formatTimestamp(activity.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {activities.length > maxItems && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="text-body text-purple-1 hover:text-purple-3 font-medium transition-colors">
            View all activity →
          </button>
        </div>
      )}
    </div>
  );
}
