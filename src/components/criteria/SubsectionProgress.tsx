'use client';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils/cn';

interface SubsectionProgressProps {
  value: number; // 0-100
  minLength?: number;
  className?: string;
}

/**
 * Calculate progress based on text length and quality indicators
 */
export function calculateSubsectionProgress(
  text: string | undefined | null,
  minLength: number = 200
): number {
  if (!text || text.trim().length === 0) {
    return 0;
  }

  const length = text.trim().length;
  const lengthScore = Math.min((length / minLength) * 70, 70); // Max 70% for length
  
  // Additional quality indicators (simple heuristics)
  let qualityScore = 0;
  
  // Check for structure (sentences, paragraphs)
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 10);
  if (sentences.length >= 3) qualityScore += 10;
  
  // Check for specific details (dates, numbers, names)
  const hasDetails = /\d{4}|\d+%|([A-Z][a-z]+ [A-Z][a-z]+)/.test(text);
  if (hasDetails) qualityScore += 10;
  
  // Check for evidence mentions
  const hasEvidence = /(certificado|artigo|publicação|prêmio|organização)/i.test(text);
  if (hasEvidence) qualityScore += 10;

  return Math.min(lengthScore + qualityScore, 100);
}

export function SubsectionProgress({ value, minLength = 200, className }: SubsectionProgressProps) {
  const getProgressColor = (val: number): string => {
    if (val >= 80) return 'bg-green-500';
    if (val >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressLabel = (val: number): string => {
    if (val >= 80) return 'Bom';
    if (val >= 50) return 'Em progresso';
    if (val > 0) return 'Iniciado';
    return 'Não iniciado';
  };

  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Progresso</span>
        <span className={cn('font-medium', value >= 80 ? 'text-green-600' : value >= 50 ? 'text-yellow-600' : 'text-red-600')}>
          {getProgressLabel(value)}
        </span>
      </div>
      <Progress value={value} className="h-2" />
      <div className="text-xs text-muted-foreground">
        {value}% completo (mínimo recomendado: {minLength} caracteres)
      </div>
    </div>
  );
}



