'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Award, CheckCircle2, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CriteriaEvidence {
  id: string;
  criteria: string;
  overview: string | null;
  context: string | null;
  impact: string | null;
  evidence: string | null;
  isValidated: boolean;
  validationScore: number | null;
}

interface Process {
  id: string;
  title: string;
  currentPhase: string;
  progress: number;
  criteria: CriteriaEvidence[];
}

interface FinalMeritsPageClientProps {
  processes: Process[];
}

const EB1A_CRITERIA: Record<string, string> = {
  AWARDS: 'Awards & Recognition',
  MEMBERSHIP: 'Membership in Associations',
  PUBLISHED_MATERIAL: 'Published Material About You',
  JUDGING: 'Judging the Work of Others',
  ORIGINAL_CONTRIBUTION: 'Original Contributions',
  SCHOLARLY_ARTICLES: 'Scholarly Articles',
  EXHIBITIONS: 'Exhibitions or Showcases',
  LEADING_ROLE: 'Leading or Critical Role',
  HIGH_REMUNERATION: 'High Salary or Remuneration',
  COMMERCIAL_SUCCESS: 'Commercial Success',
};

export function FinalMeritsPageClient({ processes }: FinalMeritsPageClientProps) {
  const [selectedProcess, setSelectedProcess] = useState<string>(
    processes[0]?.id || ''
  );

  const currentProcess = processes.find((p) => p.id === selectedProcess);
  const criteriaCount = currentProcess?.criteria.length || 0;
  const validatedCount =
    currentProcess?.criteria.filter((c) => c.isValidated).length || 0;
  const averageScore =
    currentProcess && currentProcess.criteria.length > 0
      ? Math.round(
          currentProcess.criteria
            .filter((c) => c.validationScore !== null)
            .reduce((sum, c) => sum + (c.validationScore || 0), 0) /
            currentProcess.criteria.filter((c) => c.validationScore !== null)
              .length
        )
      : 0;

  const canGenerate = criteriaCount >= 3 && validatedCount >= 3;

  return (
    <div className="space-y-6">
      {/* Process Selector */}
      {processes.length === 0 ? (
        <Card className="p-16 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No processes found
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Create a process first to generate your Final Merits Statement
          </p>
        </Card>
      ) : (
        <>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">
                  Select Process:
                </label>
                <Select
                  value={selectedProcess}
                  onValueChange={setSelectedProcess}
                >
                  <SelectTrigger className="w-[300px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {processes.map((process) => (
                      <SelectItem key={process.id} value={process.id}>
                        {process.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Criteria Met
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {criteriaCount} / 10
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Validated
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {validatedCount}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg. Score
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {averageScore}%
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle
                  className={`h-8 w-8 ${
                    canGenerate ? 'text-green-600' : 'text-yellow-600'
                  }`}
                />
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {canGenerate ? 'Ready' : 'Need 3+ Criteria'}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Criteria List */}
          {currentProcess && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Criteria Evidence ({criteriaCount})
              </h3>

              {criteriaCount === 0 ? (
                <div className="text-center py-8">
                  <Award className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-600">
                    No criteria evidence added yet
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    You need at least 3 validated criteria to generate your
                    Final Merits Statement
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentProcess.criteria.map((criterion) => (
                    <div
                      key={criterion.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {EB1A_CRITERIA[criterion.criteria] ||
                              criterion.criteria}
                          </p>
                          {criterion.overview && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                              {criterion.overview}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {criterion.validationScore !== null && (
                          <span className="text-sm font-medium text-gray-600">
                            Score: {criterion.validationScore}%
                          </span>
                        )}
                        <Badge
                          className={
                            criterion.isValidated
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }
                        >
                          {criterion.isValidated ? 'Validated' : 'Draft'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* Generate Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Generate Final Merits Statement
            </h3>

            {!canGenerate && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-900">
                      Requirements not met
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      You need at least 3 validated criteria to generate your
                      Final Merits Statement. Currently you have{' '}
                      {validatedCount} validated criteria.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                disabled={!canGenerate}
                className="gap-2"
                size="lg"
              >
                <FileText className="h-5 w-5" />
                Generate Statement
              </Button>
              <Button
                disabled={!canGenerate}
                variant="outline"
                className="gap-2"
                size="lg"
              >
                <Eye className="h-5 w-5" />
                Preview
              </Button>
              <Button
                disabled={!canGenerate}
                variant="outline"
                className="gap-2"
                size="lg"
              >
                <Download className="h-5 w-5" />
                Download PDF
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
