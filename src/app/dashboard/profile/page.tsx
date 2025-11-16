import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { Calendar, Mail, MapPin } from 'lucide-react';

export default async function ProfilePage() {
  let user;
  try {
    user = await getAuthUser();
  } catch {
    redirect('/auth/login');
  }

  const userName = user.user_metadata?.name || 'User';
  const userEmail = user.email || '';
  const userInitials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Calculate member since date
  const createdAt = user.created_at ? new Date(user.created_at) : new Date();
  const memberSince = createdAt.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto space-y-8 p-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>

                <h2 className="text-2xl font-bold text-gray-900">{userName}</h2>
                <p className="text-gray-600">{userEmail}</p>

                <Badge className="mt-4" variant="secondary">
                  Active Member
                </Badge>

                <div className="mt-6 w-full space-y-3 border-t pt-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {memberSince}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{userEmail}</span>
                  </div>
                  {user.user_metadata?.country && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{user.user_metadata.country}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Personal Information
              </h3>
              <ProfileForm user={user} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
