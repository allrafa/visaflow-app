'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TourStep {
  target: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface OnboardingTourProps {
  steps: TourStep[];
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingTour({ steps, onComplete, onSkip }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  useEffect(() => {
    if (!step) return;

    // Find target element
    const element = document.querySelector(step.target) as HTMLElement;
    if (element) {
      setTargetElement(element);

      // Calculate tooltip position
      const rect = element.getBoundingClientRect();
      const position = step.position || 'bottom';

      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = rect.top - 180;
          left = rect.left + rect.width / 2 - 160;
          break;
        case 'bottom':
          top = rect.bottom + 20;
          left = rect.left + rect.width / 2 - 160;
          break;
        case 'left':
          top = rect.top + rect.height / 2 - 90;
          left = rect.left - 340;
          break;
        case 'right':
          top = rect.top + rect.height / 2 - 90;
          left = rect.right + 20;
          break;
      }

      setTooltipPosition({ top, left });

      // Highlight target element
      element.style.position = 'relative';
      element.style.zIndex = '9999';
      element.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.5)';
      element.style.borderRadius = '8px';
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return () => {
      if (element) {
        element.style.position = '';
        element.style.zIndex = '';
        element.style.boxShadow = '';
        element.style.borderRadius = '';
      }
    };
  }, [currentStep, step]);

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  if (!step) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[9998]" />

      {/* Tooltip */}
      <div
        className="fixed z-[10000] w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 transition-all duration-300"
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">
              Passo {currentStep + 1} de {steps.length}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
          </div>
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <p className="text-gray-600 mb-6 leading-relaxed">{step.content}</p>

        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-200 rounded-full mb-4">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            disabled={isFirstStep}
            className="text-gray-600"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Pular Tour
            </Button>
            <Button size="sm" onClick={handleNext}>
              {isLastStep ? 'Concluir' : 'Próximo'}
              {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// Hook to manage onboarding state
export function useOnboarding(storageKey: string) {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem(storageKey);
    if (!hasCompletedOnboarding) {
      // Delay to ensure DOM elements are rendered
      setTimeout(() => setShowOnboarding(true), 500);
    }
  }, [storageKey]);

  const completeOnboarding = () => {
    localStorage.setItem(storageKey, 'true');
    setShowOnboarding(false);
  };

  const skipOnboarding = () => {
    localStorage.setItem(storageKey, 'true');
    setShowOnboarding(false);
  };

  return {
    showOnboarding,
    completeOnboarding,
    skipOnboarding,
  };
}
