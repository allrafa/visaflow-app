'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { LoadingButton } from '@/components/ui/loading-button';
import { Bell } from 'lucide-react';
import { useToast } from '@/lib/hooks/useToast';

interface NotificationSettingsProps {
  user: any;
}

interface NotificationPreferences {
  emailNotifications: boolean;
  taskReminders: boolean;
  processUpdates: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
}

export function NotificationSettings({ user }: NotificationSettingsProps) {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    emailNotifications: true,
    taskReminders: true,
    processUpdates: true,
    weeklyDigest: false,
    marketingEmails: false,
  });

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addToast({
        type: 'success',
        title: 'Preferences saved',
        description: 'Your notification preferences have been updated.',
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Failed to save preferences. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Choose how you want to be notified about activity
        </p>
      </div>

      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b">
            <div className="flex-1">
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600 mt-1">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={() => handleToggle('emailNotifications')}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Task Reminders</p>
                <p className="text-sm text-gray-600">
                  Get reminders about upcoming task deadlines
                </p>
              </div>
              <Switch
                checked={preferences.taskReminders}
                onCheckedChange={() => handleToggle('taskReminders')}
                disabled={!preferences.emailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Process Updates</p>
                <p className="text-sm text-gray-600">
                  Notifications about process status changes
                </p>
              </div>
              <Switch
                checked={preferences.processUpdates}
                onCheckedChange={() => handleToggle('processUpdates')}
                disabled={!preferences.emailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Weekly Digest</p>
                <p className="text-sm text-gray-600">
                  Receive a weekly summary of your activity
                </p>
              </div>
              <Switch
                checked={preferences.weeklyDigest}
                onCheckedChange={() => handleToggle('weeklyDigest')}
                disabled={!preferences.emailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Marketing Emails</p>
                <p className="text-sm text-gray-600">
                  Tips, news, and updates about VisaFlow features
                </p>
              </div>
              <Switch
                checked={preferences.marketingEmails}
                onCheckedChange={() => handleToggle('marketingEmails')}
                disabled={!preferences.emailNotifications}
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="flex gap-4 border-t pt-6">
        <LoadingButton onClick={handleSave} isLoading={loading} loadingText="Saving...">
          Save Preferences
        </LoadingButton>
      </div>
    </div>
  );
}
