'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

interface ValidationResult {
  isValid: boolean;
  score: number;
  issues: Array<{
    type: 'error' | 'warning' | 'info';
    section: string;
    message: string;
    suggestion?: string;
  }>;
  feedback: string;
}

interface CriteriaValidatorProps {
  criteriaId: string;
  content: {
    overview?: string;
    context?: string;
    impact?: string;
    evidence?: string;
  };
  onValidationComplete?: (result: ValidationResult) => void;
}

export function CriteriaValidator({
  criteriaId,
  content,
  onValidationComplete,
}: CriteriaValidatorProps) {
  const [validating, setValidating] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);

  const handleValidate = async () => {
    setValidating(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai/validate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          criteria: criteriaId,
          ...content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to validate');
      }

      const validationResult = await response.json();
      setResult(validationResult);
      onValidationComplete?.(validationResult);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to validate');
    } finally {
      setValidating(false);
    }
  };

  const hasContent = 
    content.overview || 
    content.context || 
    content.impact || 
    content.evidence;

  if (!hasContent) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            Preencha pelo menos uma subseção para validar
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Validação com IA</CardTitle>
        <CardDescription>
          Valide seu critério usando análise inteligente baseada no Policy Manual
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!result && !validating && (
          <Button onClick={handleValidate} className="w-full">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Validar Critério
          </Button>
        )}

        {validating && (
          <div className="flex items-center justify-center p-8">
            <LoadingSpinner size="lg" />
            <span className="ml-3 text-sm text-muted-foreground">
              Analisando conteúdo...
            </span>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Score de Qualidade</span>
                <span className="text-sm font-bold">{result.score}/100</span>
              </div>
              <Progress value={result.score} className="h-2" />
            </div>

            <div className="flex items-center gap-2">
              {result.isValid ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-700">
                    Critério válido
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-700">
                    Requer melhorias
                  </span>
                </>
              )}
            </div>

            {result.issues.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Problemas Encontrados:</h4>
                {result.issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`rounded-md p-3 text-sm ${
                      issue.type === 'error'
                        ? 'bg-red-50 text-red-900 border border-red-200'
                        : issue.type === 'warning'
                        ? 'bg-yellow-50 text-yellow-900 border border-yellow-200'
                        : 'bg-blue-50 text-blue-900 border border-blue-200'
                    }`}
                  >
                    <div className="font-medium">
                      {issue.section}: {issue.message}
                    </div>
                    {issue.suggestion && (
                      <div className="mt-1 text-xs opacity-75">
                        💡 {issue.suggestion}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-md bg-muted p-3">
              <p className="text-sm whitespace-pre-wrap">{result.feedback}</p>
            </div>

            <Button onClick={handleValidate} variant="outline" className="w-full">
              Revalidar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}



