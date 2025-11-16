'use client';

import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateCriteriaSchema, type UpdateCriteriaInput } from '@/lib/validators/criteria.schema';
import { getCriteriaTemplate, getCriteriaGuidelines } from '@/lib/templates/criteria';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { useToast } from '@/lib/hooks/useToast';
import { AlertCircle, CheckCircle2, Info, HelpCircle } from 'lucide-react';
import type { CriteriaTemplate } from '@/lib/templates/criteria';
import { CriteriaGuidelines } from './CriteriaGuidelines';
import { SubsectionProgress, calculateSubsectionProgress } from './SubsectionProgress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SuspiciousAlerts } from '@/components/validation/SuspiciousAlerts';

interface CriteriaFormProps {
  criteriaId: string;
  processId: string;
  initialData?: {
    overview?: string | null;
    context?: string | null;
    impact?: string | null;
    evidence?: string | null;
  };
  onSave?: () => void;
}

export function CriteriaForm({
  criteriaId,
  processId,
  initialData,
  onSave,
}: CriteriaFormProps) {
  const [template, setTemplate] = useState<CriteriaTemplate | undefined>();
  const [saving, setSaving] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [subsectionValidation, setSubsectionValidation] = useState<Record<string, any>>({});
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UpdateCriteriaInput>({
    resolver: zodResolver(updateCriteriaSchema),
    defaultValues: {
      overview: initialData?.overview || '',
      context: initialData?.context || '',
      impact: initialData?.impact || '',
      evidence: initialData?.evidence || '',
    },
  });

  const formData = watch();

  useEffect(() => {
    const tmpl = getCriteriaTemplate(criteriaId);
    setTemplate(tmpl);
  }, [criteriaId]);

  // Watch for changes and validate subsections with debounce
  useEffect(() => {
    if (!template) return;

    const timeouts: NodeJS.Timeout[] = [];

    template.subsections.forEach((subsection) => {
      const fieldName =
        subsection.id === 'recipient' ? 'overview' :
        subsection.id === 'excellence' ? 'context' :
        subsection.id === 'requirements' ? 'impact' :
        'evidence';
      
      const content = formData[fieldName as keyof UpdateCriteriaInput] as string;
      
      if (!content || content.trim().length < 50) {
        setSubsectionValidation((prev) => ({
          ...prev,
          [subsection.id]: null,
        }));
        return;
      }

      // Debounce: wait 1.5 seconds after user stops typing
      const timeoutId = setTimeout(async () => {
        try {
          const response = await fetch('/api/ai/validate-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              criteria: criteriaId,
              [fieldName]: content,
            }),
          });

          if (response.ok) {
            const result = await response.json();
            setSubsectionValidation((prev) => ({
              ...prev,
              [subsection.id]: result,
            }));
          }
        } catch (error) {
          console.error('Failed to validate subsection:', error);
        }
      }, 1500);

      timeouts.push(timeoutId);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [formData, template, criteriaId]);

  const guidelines = useMemo(() => {
    if (!template) return undefined;
    return template.guidelines || getCriteriaGuidelines(criteriaId);
  }, [template, criteriaId]);

  const onSubmit = async (data: UpdateCriteriaInput) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/criteria/${criteriaId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save criteria');
      }

      addToast({
        type: 'success',
        title: 'Critério salvo',
        description: 'As alterações foram salvas com sucesso.',
      });

      onSave?.();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao salvar critério',
        description: err instanceof Error ? err.message : 'Ocorreu um erro ao salvar o critério',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleValidate = async () => {
    setValidating(true);
    try {
      const formData = watch();
      const response = await fetch('/api/ai/validate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          criteria: criteriaId,
          ...formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to validate');
      }

      const result = await response.json();
      setValidationResult(result);

      addToast({
        type: result.isValid ? 'success' : 'warning',
        title: result.isValid ? 'Validação bem-sucedida' : 'Validação com problemas',
        description: result.isValid 
          ? `Score: ${result.score}/100 - Critério aprovado!`
          : `Score: ${result.score}/100 - Revise as sugestões.`,
      });

      // Atualizar score no banco
      await fetch(`/api/criteria/${criteriaId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isValidated: result.isValid,
          validationScore: result.score,
          validationIssues: result.issues,
        }),
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to validate');
    } finally {
      setValidating(false);
    }
  };

  if (!template) {
    return <div>Loading template...</div>;
  }

  const hasAllSubsections = 
    formData.overview && 
    formData.context && 
    formData.impact && 
    formData.evidence;

  const getFieldName = (subsectionId: string): keyof UpdateCriteriaInput => {
    return subsectionId === 'recipient' ? 'overview' :
           subsectionId === 'excellence' ? 'context' :
           subsectionId === 'requirements' ? 'impact' :
           'evidence';
  };

  const getFieldValue = (subsectionId: string): string => {
    const fieldName = getFieldName(subsectionId);
    return (formData[fieldName] as string) || '';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {guidelines && <CriteriaGuidelines guidelines={guidelines} />}

      {template.subsections.map((subsection, index) => {
        const fieldName = getFieldName(subsection.id);
        const fieldValue = getFieldValue(subsection.id);
        const fieldError = errors[fieldName];
        const progress = calculateSubsectionProgress(fieldValue);
        const subsectionValidationResult = subsectionValidation[subsection.id];

        return (
          <Card key={subsection.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">
                      {index + 1}. {subsection.title}
                    </CardTitle>
                    {subsection.example && (
                      <div className="relative">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="cursor-help">
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-md" side="right">
                              <p className="text-sm font-semibold mb-2">Exemplo:</p>
                              <p className="text-xs whitespace-pre-wrap">{subsection.example}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </div>
                  <CardDescription className="mt-1">
                    {subsection.description}
                  </CardDescription>
                  {subsection.guidelines && subsection.guidelines.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {subsection.guidelines.map((guideline, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span>•</span>
                          <span>{guideline}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  {subsection.required && (
                    <Badge variant="outline">Obrigatório</Badge>
                  )}
                  {subsectionValidationResult && (
                    <Badge
                      variant={subsectionValidationResult.score >= 70 ? 'default' : 'secondary'}
                      className={
                        subsectionValidationResult.score >= 70
                          ? 'bg-green-500'
                          : subsectionValidationResult.score >= 50
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }
                    >
                      {subsectionValidationResult.score}/100
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Textarea
                    {...register(fieldName)}
                    placeholder={subsection.placeholder}
                    rows={8}
                    className="font-mono text-sm pr-10"
                  />
                  {fieldValue && (
                    <div className="absolute top-2 right-2">
                      <span className="text-xs text-muted-foreground">
                        {fieldValue.length} caracteres
                      </span>
                    </div>
                  )}
                </div>
                
                {fieldError && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {fieldError.message}
                  </p>
                )}

                {fieldValue && (
                  <SuspiciousAlerts content={fieldValue} />
                )}

                {subsectionValidationResult && subsectionValidationResult.issues?.length > 0 && (
                  <div className="space-y-1 rounded-md border border-yellow-200 bg-yellow-50 p-2">
                    {subsectionValidationResult.issues
                      .slice(0, 3)
                      .map((issue: any, idx: number) => (
                        <div key={idx} className="text-xs text-yellow-900">
                          <span className="font-medium">⚠ {issue.message}</span>
                          {issue.suggestion && (
                            <span className="text-yellow-700"> — {issue.suggestion}</span>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {fieldValue && (
                <SubsectionProgress value={progress} />
              )}
            </CardContent>
          </Card>
        );
      })}

      {validationResult && (
        <Card className={validationResult.isValid ? 'border-green-500' : 'border-yellow-500'}>
          <CardHeader>
            <div className="flex items-center gap-2">
              {validationResult.isValid ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              )}
              <CardTitle>
                Validação: Score {validationResult.score}/100
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {validationResult.issues.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Problemas Encontrados:</h4>
                {validationResult.issues.map((issue: any, idx: number) => (
                  <div
                    key={idx}
                    className={`rounded-md p-3 text-sm ${
                      issue.type === 'error'
                        ? 'bg-red-50 text-red-900'
                        : issue.type === 'warning'
                        ? 'bg-yellow-50 text-yellow-900'
                        : 'bg-blue-50 text-blue-900'
                    }`}
                  >
                    <div className="font-medium">{issue.section}: {issue.message}</div>
                    {issue.suggestion && (
                      <div className="mt-1 text-xs opacity-75">
                        Sugestão: {issue.suggestion}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="rounded-md bg-muted p-3">
              <p className="text-sm">{validationResult.feedback}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleValidate}
          disabled={validating || !hasAllSubsections}
        >
          {validating ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Validando...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Validar com IA
            </>
          )}
        </Button>
        <Button type="submit" disabled={saving} className="flex-1">
          {saving ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Salvando...
            </>
          ) : (
            'Salvar Critério'
          )}
        </Button>
      </div>
    </form>
  );
}

