'use client';

import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Info, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSuspiciousPractice } from '@/lib/constants/suspiciousPractices';

interface SuspiciousIssue {
  type: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  recommendation?: string;
}

interface SuspiciousAlertsProps {
  content: string;
  onDismiss?: () => void;
}

export function SuspiciousAlerts({ content, onDismiss }: SuspiciousAlertsProps) {
  const [issues, setIssues] = useState<SuspiciousIssue[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!content || content.length < 50) {
      setIssues([]);
      return;
    }

    const detectIssues = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/ai/detect-suspicious', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        });

        if (response.ok) {
          const data = await response.json();
          const enrichedIssues = (data.issues || []).map((issue: SuspiciousIssue) => {
            // Enrich with practice details if available
            const practice = getSuspiciousPractice(issue.type);
            return {
              ...issue,
              recommendation: practice?.recommendation || issue.recommendation,
            };
          });
          setIssues(enrichedIssues);
        }
      } catch (error) {
        console.error('Failed to detect suspicious practices:', error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce
    const timeoutId = setTimeout(detectIssues, 1500);
    return () => clearTimeout(timeoutId);
  }, [content]);

  const toggleIssue = (issueType: string) => {
    setExpandedIssues((prev) => {
      const next = new Set(prev);
      if (next.has(issueType)) {
        next.delete(issueType);
      } else {
        next.add(issueType);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        Analisando práticas suspeitas...
      </div>
    );
  }

  if (issues.length === 0) {
    return null;
  }

  const highSeverityIssues = issues.filter((i) => i.severity === 'high');
  const mediumSeverityIssues = issues.filter((i) => i.severity === 'medium');
  const lowSeverityIssues = issues.filter((i) => i.severity === 'low');

  const renderIssue = (issue: SuspiciousIssue, idx: number) => {
    const practice = getSuspiciousPractice(issue.type);
    const isExpanded = expandedIssues.has(issue.type);
    const hasRecommendation = issue.recommendation || practice?.recommendation;

    if (issue.severity === 'high') {
      return (
        <Alert key={idx} variant="destructive" className="relative">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="flex items-center justify-between">
            <span>Alerta de Alto Risco - RFE Provável</span>
            {hasRecommendation && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleIssue(issue.type)}
                className="h-6 px-2 text-xs"
              >
                {isExpanded ? 'Ocultar' : 'Ver Solução'}
              </Button>
            )}
          </AlertTitle>
          <AlertDescription className="space-y-2">
            <p>{issue.message}</p>
            {practice?.uscis2025Relevance && (
              <div className="flex items-start gap-2 rounded-md bg-red-100 p-2 text-xs">
                <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span className="font-medium">Relevante para endurecimento USCIS 2025</span>
              </div>
            )}
            {isExpanded && hasRecommendation && (
              <div className="mt-3 space-y-2 rounded-md border border-red-300 bg-red-50 p-3">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold text-red-900">Ação Recomendada:</p>
                    <p className="text-sm text-red-800">{issue.recommendation || practice?.recommendation}</p>
                    {practice?.fixExample && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs font-medium text-red-900">Exemplo de correção:</p>
                        <div className="rounded bg-white p-2 text-xs font-mono text-red-900 border border-red-200">
                          {practice.fixExample}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </AlertDescription>
        </Alert>
      );
    }

    if (issue.severity === 'medium') {
      return (
        <Alert key={idx} className="border-yellow-500 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="flex items-center justify-between text-yellow-900">
            <span>Atenção</span>
            {hasRecommendation && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleIssue(issue.type)}
                className="h-6 px-2 text-xs text-yellow-800 hover:text-yellow-900"
              >
                {isExpanded ? 'Ocultar' : 'Ver Solução'}
              </Button>
            )}
          </AlertTitle>
          <AlertDescription className="space-y-2 text-yellow-800">
            <p>{issue.message}</p>
            {isExpanded && hasRecommendation && (
              <div className="mt-2 rounded-md border border-yellow-300 bg-yellow-100 p-2">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-3 w-3 text-yellow-700 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-yellow-900">{issue.recommendation || practice?.recommendation}</p>
                </div>
              </div>
            )}
          </AlertDescription>
        </Alert>
      );
    }

    // Low severity
    return (
      <Alert key={idx} className="border-blue-500 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-900">Informação</AlertTitle>
        <AlertDescription className="text-blue-800">
          {issue.message}
        </AlertDescription>
      </Alert>
    );
  };

  return (
    <div className="space-y-2">
      {highSeverityIssues.map(renderIssue)}
      {mediumSeverityIssues.map(renderIssue)}
      {lowSeverityIssues.map(renderIssue)}
    </div>
  );
}

