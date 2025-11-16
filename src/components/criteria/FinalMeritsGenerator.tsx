'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { useToast } from '@/lib/hooks/useToast';
import { 
  FileText, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Info,
  ExternalLink
} from 'lucide-react';
import type { FinalMeritsResult } from '@/lib/services/aiService';

interface FinalMeritsGeneratorProps {
  processId: string;
  processTitle?: string;
  criteriaCount: number;
}

export function FinalMeritsGenerator({
  processId,
  processTitle,
  criteriaCount,
}: FinalMeritsGeneratorProps) {
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<FinalMeritsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const { addToast } = useToast();

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/ai/generate-merits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ processId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate Final Merits Statement');
      }

      const data = await response.json();
      setResult(data);
      addToast({
        type: 'success',
        title: 'Final Merits Statement gerado',
        description: `Documento de ${data.sections.length} seções gerado com sucesso.`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      addToast({
        type: 'error',
        title: 'Erro ao gerar documento',
        description: errorMessage,
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleExport = (format: 'txt' | 'md' = 'txt') => {
    if (!result) return;

    // Criar documento formatado
    const documentText = result.document || 
      result.sections
        .sort((a, b) => a.order - b.order)
        .map((s) => `# ${s.title}\n\n${s.content}`)
        .join('\n\n---\n\n');

    // Criar blob e download
    const mimeType = format === 'md' ? 'text/markdown' : 'text/plain';
    const extension = format === 'md' ? 'md' : 'txt';
    const blob = new Blob([documentText], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Final-Merits-Statement-${processId.slice(0, 8)}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast({
      type: 'success',
      title: 'Documento exportado',
      description: `Final Merits Statement baixado com sucesso.`,
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Strong';
    if (score >= 50) return 'Moderate';
    return 'Weak';
  };

  if (criteriaCount === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Final Merits Generator
          </CardTitle>
          <CardDescription>
            Generate comprehensive Final Merits Statement for your EB-1A petition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <p>Please add at least one criterion before generating the Final Merits Statement.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Final Merits Generator
          </CardTitle>
          <CardDescription>
            Generate a comprehensive 20-30 page Final Merits Statement based on your criteria evidence.
            This document follows the structure of successful EB-1A petitions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!result && (
            <div className="space-y-4">
              <div className="rounded-lg border bg-muted/50 p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  What will be generated:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Executive Summary (1-2 pages)</li>
                  <li>Introduction (2-3 pages)</li>
                  <li>Criteria Sections (15-20 pages, ~2-3 pages per criterion)</li>
                  <li>Comparative Analysis (2-3 pages)</li>
                  <li>Conclusion (1-2 pages)</li>
                  <li>Cross-references between criteria and evidence</li>
                  <li>Recommendations for strengthening the petition</li>
                </ul>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full"
                size="lg"
              >
                {generating ? (
                  <>
                    <LoadingSpinner className="mr-2 h-4 w-4" />
                    Generating Final Merits Statement...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Final Merits Statement
                  </>
                )}
              </Button>
            </div>
          )}

          {error && <ErrorMessage message={error} />}

          {result && (
            <div className="space-y-6">
              {/* Metrics Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">{result.metrics.totalCriteria}</div>
                    <div className="text-xs text-muted-foreground">Total Criteria</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">{result.metrics.averageScore}/100</div>
                    <div className="text-xs text-muted-foreground">Avg Score</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-green-600">
                      {result.metrics.strongCriteria}
                    </div>
                    <div className="text-xs text-muted-foreground">Strong</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-yellow-600">
                      {result.metrics.moderateCriteria}
                    </div>
                    <div className="text-xs text-muted-foreground">Moderate</div>
                  </CardContent>
                </Card>
              </div>

              {/* Cross References */}
              {result.crossReferences.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cross-References</CardTitle>
                    <CardDescription>
                      Connections between criteria and evidence throughout the document
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.crossReferences.map((ref, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm p-2 rounded bg-muted/50"
                        >
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{ref.from}</span>
                          <span className="text-muted-foreground">→</span>
                          <span>{ref.to}</span>
                          <Badge variant="outline" className="ml-auto">
                            {ref.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recommendations */}
              {result.recommendations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Recommendations
                    </CardTitle>
                    <CardDescription>
                      Suggestions to strengthen your petition
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.recommendations.map((rec, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-lg border"
                        >
                          <Badge
                            variant={
                              rec.type === 'strengthen'
                                ? 'destructive'
                                : rec.type === 'add'
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {rec.type}
                          </Badge>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{rec.section}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {rec.message}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Document Sections */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Document Sections</CardTitle>
                  <CardDescription>
                    Click on a section to view its content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.sections
                      .sort((a, b) => a.order - b.order)
                      .map((section, idx) => (
                        <div
                          key={idx}
                          className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() =>
                            setSelectedSection(selectedSection === idx ? null : idx)
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{section.order}</Badge>
                              <h4 className="font-semibold">{section.title}</h4>
                            </div>
                            <Button variant="ghost" size="sm">
                              {selectedSection === idx ? 'Hide' : 'Show'}
                            </Button>
                          </div>
                          {selectedSection === idx && (
                            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                              <pre className="whitespace-pre-wrap text-sm font-mono">
                                {section.content}
                              </pre>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-2">
                <Button onClick={() => handleExport('txt')} className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Export TXT
                </Button>
                <Button onClick={() => handleExport('md')} variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Export Markdown
                </Button>
                <Button onClick={handleGenerate} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

