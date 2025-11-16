'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { LoadingButton } from '@/components/ui/loading-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/lib/hooks/useToast';

interface GeneralSettingsProps {
  user: any;
}

export function GeneralSettings({ user }: GeneralSettingsProps) {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC-5');
  const [theme, setTheme] = useState('light');

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addToast({
        type: 'success',
        title: 'Settings saved',
        description: 'Your preferences have been updated successfully.',
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          General Settings
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Customize your VisaFlow experience
        </p>
      </div>

      <div className="space-y-4">
        {/* Language */}
        <div className="space-y-2">
          <Label>Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="es">Español</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Timezone */}
        <div className="space-y-2">
          <Label>Timezone</Label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
              <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
              <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
              <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
              <SelectItem value="UTC+0">UTC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Theme */}
        <div className="space-y-2">
          <Label>Theme</Label>
          <div className="flex gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`flex-1 rounded-lg border-2 p-4 text-center transition-all ${
                theme === 'light'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">Light</div>
              <div className="text-sm text-gray-500">Day mode</div>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex-1 rounded-lg border-2 p-4 text-center transition-all ${
                theme === 'dark'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">Dark</div>
              <div className="text-sm text-gray-500">Night mode</div>
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 border-t pt-6">
        <LoadingButton onClick={handleSave} isLoading={loading} loadingText="Saving...">
          Save Preferences
        </LoadingButton>
        <Button variant="outline" disabled={loading}>
          Reset to Default
        </Button>
      </div>
    </div>
  );
}
