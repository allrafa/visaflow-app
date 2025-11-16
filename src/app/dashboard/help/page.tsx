import { Card } from '@/components/ui/card';
import { FAQAccordion } from '@/components/help/FAQAccordion';
import { Search, BookOpen, Video, MessageCircle, FileText, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto space-y-8 p-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Help Center</h1>
          <p className="mt-2 text-lg text-gray-600">
            Find answers and learn how to use VisaFlow
          </p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              className="h-14 pl-12 text-lg"
            />
          </div>
        </div>

        {/* Popular Topics */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Popular Topics</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/help/getting-started">
              <Card className="group cursor-pointer p-6 transition-all hover:shadow-lg hover:border-blue-300">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-blue-100 p-3 group-hover:bg-blue-200 transition-colors">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Getting Started</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Learn the basics of creating your first EB-1A process
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/dashboard/help/creating-process">
              <Card className="group cursor-pointer p-6 transition-all hover:shadow-lg hover:border-blue-300">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-green-100 p-3 group-hover:bg-green-200 transition-colors">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Creating a Process</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Step-by-step guide to setting up your petition
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/dashboard/criteria">
              <Card className="group cursor-pointer p-6 transition-all hover:shadow-lg hover:border-blue-300">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-purple-100 p-3 group-hover:bg-purple-200 transition-colors">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">EB-1A Criteria</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Understand the 10 criteria and which ones apply to you
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/dashboard/help/letters-guide">
              <Card className="group cursor-pointer p-6 transition-all hover:shadow-lg hover:border-blue-300">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-amber-100 p-3 group-hover:bg-amber-200 transition-colors">
                    <MessageCircle className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Letters Guide</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      How to request and format recommendation letters
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/dashboard/help/document-upload">
              <Card className="group cursor-pointer p-6 transition-all hover:shadow-lg hover:border-blue-300">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-indigo-100 p-3 group-hover:bg-indigo-200 transition-colors">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Document Upload</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Tips for organizing and uploading your evidence
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/dashboard/help/final-merits">
              <Card className="group cursor-pointer p-6 transition-all hover:shadow-lg hover:border-blue-300">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-rose-100 p-3 group-hover:bg-rose-200 transition-colors">
                    <FileText className="h-6 w-6 text-rose-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Final Merits</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Generate your I-140 petition letter
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Video Tutorials */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Video Tutorials</h2>
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-red-100 p-3">
                <Video className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-600">
                  Video tutorials coming soon! In the meantime, check out our written guides above.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <Card className="p-6">
            <FAQAccordion />
          </Card>
        </div>

        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Still Need Help?
          </h2>
          <p className="text-gray-700 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="mailto:support@visaflow.com"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Contact Support
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
