import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneralSettings } from '@/components/settings/GeneralSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';

export default async function SettingsPage() {
  let user;
  try {
    user = await getAuthUser();
  } catch {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto space-y-8 p-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <Card className="p-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6">
              <GeneralSettings user={user} />
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <SecuritySettings user={user} />
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <NotificationSettings user={user} />
            </TabsContent>

            <TabsContent value="privacy" className="mt-6">
              <Card className="p-6 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Privacy Settings
                </h3>
                <p className="text-gray-600">
                  Privacy settings coming soon. Your data is always encrypted and secure.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
