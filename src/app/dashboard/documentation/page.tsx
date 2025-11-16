import { Card } from '@/components/ui/card';
import { DocsNavigation } from '@/components/documentation/DocsNavigation';
import { DocsContent } from '@/components/documentation/DocsContent';

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Documentation</h1>
          <p className="mt-2 text-lg text-gray-600">
            Complete guide to using VisaFlow for your EB-1A petition
          </p>
        </div>

        {/* Documentation Content */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-8">
              <DocsNavigation />
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-8">
              <DocsContent />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
