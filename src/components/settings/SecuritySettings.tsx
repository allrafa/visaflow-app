'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingButton } from '@/components/ui/loading-button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Shield, Key } from 'lucide-react';
import { useToast } from '@/lib/hooks/useToast';

interface SecuritySettingsProps {
  user: any;
}

export function SecuritySettings({ user }: SecuritySettingsProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Password changed',
        description: 'Your password has been updated successfully.',
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to change password. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Key className="h-5 w-5" />
            Change Password
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Update your password to keep your account secure
          </p>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              required
            />
            <p className="text-xs text-gray-500">
              Must be at least 8 characters with uppercase, lowercase, and number
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              required
            />
          </div>

          <LoadingButton
            type="submit"
            isLoading={loading}
            loadingText="Changing password..."
          >
            Change Password
          </LoadingButton>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="border-t pt-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Add an extra layer of security to your account
          </p>
        </div>

        <Card className="p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="font-medium text-gray-900">Enable 2FA</p>
              <p className="text-sm text-gray-600 mt-1">
                Require a verification code in addition to your password
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
