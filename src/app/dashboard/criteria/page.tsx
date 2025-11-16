import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { CriteriaSelector } from '@/components/criteria/CriteriaSelector';
import { Card } from '@/components/ui/card';
import { Info, BookOpen, CheckCircle2 } from 'lucide-react';

export default async function CriteriaPage() {
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
          <h1 className="text-4xl font-bold text-gray-900">EB-1A Criteria Guide</h1>
          <p className="mt-2 text-lg text-gray-600">
            Understanding the 10 criteria for extraordinary ability recognition
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-100 p-3">
                <Info className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Minimum Required</h3>
                <p className="mt-1 text-sm text-gray-600">
                  You need to meet at least 3 out of 10 criteria to qualify for EB-1A
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-green-100 p-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Quality Matters</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Strong evidence for 3 criteria is better than weak evidence for many
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-purple-100 p-3">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Documentation</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Each criterion requires specific types of evidence and documentation
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Criteria Selector */}
        <CriteriaSelector />

        {/* Additional Help */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 flex-shrink-0 text-blue-600 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Need Help Selecting Criteria?
              </h3>
              <p className="text-gray-700 mb-4">
                Not sure which criteria apply to you? Here's how to decide:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    <strong>Review your achievements:</strong> Make a list of your awards,
                    publications, memberships, and recognition
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    <strong>Read examples carefully:</strong> Each criterion has specific
                    examples of what counts and what doesn't
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    <strong>Focus on quality:</strong> One strong criterion with excellent
                    documentation is worth more than several weak ones
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    <strong>Gather evidence first:</strong> Before selecting a criterion,
                    make sure you have the documentation to prove it
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
