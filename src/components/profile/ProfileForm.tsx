'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/lib/hooks/useToast';

interface ProfileFormProps {
  user: any;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const toastContext = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user.user_metadata?.name || '',
    email: user.email || '',
    phone: user.user_metadata?.phone || '',
    country: user.user_metadata?.country || '',
    profession: user.user_metadata?.profession || '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement API call to update user profile
      // await updateUserProfile(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toastContext.toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });

      router.refresh();
    } catch (error) {
      toastContext.toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.user_metadata?.name || '',
      email: user.email || '',
      phone: user.user_metadata?.phone || '',
      country: user.user_metadata?.country || '',
      profession: user.user_metadata?.profession || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="John Doe"
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john.doe@example.com"
            disabled={true} // Email cannot be changed
            className="bg-gray-50"
          />
          <p className="text-xs text-gray-500">Email cannot be changed</p>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            disabled={loading}
          />
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            type="text"
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            placeholder="United States"
            disabled={loading}
          />
        </div>

        {/* Profession */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="profession">Profession / Field of Expertise</Label>
          <Input
            id="profession"
            type="text"
            value={formData.profession}
            onChange={(e) => handleChange('profession', e.target.value)}
            placeholder="Software Engineer, Researcher, Artist, etc."
            disabled={loading}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 border-t pt-6">
        <LoadingButton type="submit" isLoading={loading} loadingText="Saving...">
          Save Changes
        </LoadingButton>
        <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
