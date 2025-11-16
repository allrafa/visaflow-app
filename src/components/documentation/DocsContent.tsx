'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export function DocsContent() {
  return (
    <div className="prose prose-gray max-w-none">
      {/* Introduction */}
      <section id="introduction" className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to VisaFlow</h1>
        <p className="text-lg text-gray-600 mb-6">
          VisaFlow is an intelligent platform designed to help you organize and manage your
          EB-1A petition process. Whether you're a researcher, artist, entrepreneur, or athlete,
          this guide will help you navigate the extraordinary ability green card process.
        </p>
        <Card className="bg-blue-50 border-blue-200 p-6">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">What You'll Learn</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• How to create and manage your EB-1A process</li>
                <li>• Understanding the 10 criteria for extraordinary ability</li>
                <li>• Organizing evidence and documentation</li>
                <li>• Generating recommendation letters</li>
                <li>• Creating your final merits letter</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Quick Start */}
      <section id="quick-start" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Create Your First Process</h4>
              <p className="text-sm text-gray-600 mt-1">
                Click "New Process" from the dashboard to start your EB-1A petition. Enter the
                candidate's basic information.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Select Your Criteria</h4>
              <p className="text-sm text-gray-600 mt-1">
                Review the 10 EB-1A criteria and select the ones that apply to you. You need at
                least 3.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Gather Evidence</h4>
              <p className="text-sm text-gray-600 mt-1">
                Upload documentation for each criterion: awards, publications, memberships, etc.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
              4
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Request Letters</h4>
              <p className="text-sm text-gray-600 mt-1">
                Use our templates to request recommendation letters from experts in your field.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold flex-shrink-0">
              5
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Generate Final Merits</h4>
              <p className="text-sm text-gray-600 mt-1">
                Our AI will help you create a comprehensive merits letter for your I-140 petition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is EB-1A */}
      <section id="what-is-eb1a" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is EB-1A?</h2>
        <p className="text-gray-600 mb-4">
          The EB-1A visa category is for individuals who have extraordinary ability in the
          sciences, arts, education, business, or athletics. This classification allows you to
          self-petition for permanent residence (green card) without employer sponsorship.
        </p>

        <div className="grid gap-4 md:grid-cols-2 my-6">
          <Card className="p-6 bg-green-50 border-green-200">
            <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Key Advantages
            </h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• No employer sponsorship required</li>
              <li>• Self-petition allowed</li>
              <li>• Fast processing (15-45 days with premium)</li>
              <li>• Direct path to green card</li>
              <li>• Can change employers freely</li>
            </ul>
          </Card>

          <Card className="p-6 bg-amber-50 border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Requirements
            </h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Meet 3 of 10 criteria minimum</li>
              <li>• Demonstrate sustained acclaim</li>
              <li>• Prove national/international recognition</li>
              <li>• Show continued work in field</li>
              <li>• Strong evidence required</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Eligibility */}
      <section id="eligibility" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility Requirements</h2>
        <p className="text-gray-600 mb-4">
          To qualify for EB-1A, you must demonstrate extraordinary ability by providing evidence
          that meets at least 3 of the 10 criteria:
        </p>

        <ol className="space-y-3 mb-6">
          <li className="flex items-start gap-3">
            <Badge className="mt-1">1</Badge>
            <div>
              <strong>Awards:</strong> National or international prizes or awards for excellence
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Badge className="mt-1">2</Badge>
            <div>
              <strong>Memberships:</strong> Membership in associations requiring outstanding
              achievements
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Badge className="mt-1">3</Badge>
            <div>
              <strong>Published Material:</strong> Published material about you in professional or
              major trade publications
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Badge className="mt-1">4</Badge>
            <div>
              <strong>Judging:</strong> Participation as a judge of the work of others in your field
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Badge className="mt-1">5</Badge>
            <div>
              <strong>Original Contributions:</strong> Original scientific, scholarly, artistic, or
              business-related contributions
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Badge className="mt-1">6</Badge>
            <div>
              <strong>Scholarly Articles:</strong> Authorship of scholarly articles in professional
              journals
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Badge className="mt-1">7</Badge>
            <div>
              <strong>Artistic Exhibitions:</strong> Display of work at artistic exhibitions or
              showcases
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Badge className="mt-1">8</Badge>
            <div>
              <strong>Leading Role:</strong> Leading or critical role for distinguished
              organizations
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Badge className="mt-1">9</Badge>
            <div>
              <strong>High Salary:</strong> High salary or remuneration compared to others in the
              field
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Badge className="mt-1">10</Badge>
            <div>
              <strong>Commercial Success:</strong> Commercial successes in the performing arts
            </div>
          </li>
        </ol>

        <Card className="bg-blue-50 border-blue-200 p-6">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> Meeting 3 criteria is the minimum, but quality matters more than
            quantity. Strong evidence for 3-4 criteria is better than weak evidence for many.
          </p>
        </Card>
      </section>

      {/* Additional sections would continue here */}
      <section id="processes" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Processes</h2>
        <p className="text-gray-600">
          Comprehensive process management documentation coming soon. For now, use the intuitive
          dashboard to create and manage your EB-1A petitions.
        </p>
      </section>
    </div>
  );
}
