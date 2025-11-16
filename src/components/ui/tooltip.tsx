'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TooltipContext = React.createContext<TooltipContextValue | undefined>(undefined);

const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      {children}
    </TooltipContext.Provider>
  );
};

const TooltipTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const context = React.useContext(TooltipContext);
  if (!context) return <>{children}</>;

  return (
    <div
      className={className}
      onMouseEnter={() => context.setOpen(true)}
      onMouseLeave={() => context.setOpen(false)}
    >
      {children}
    </div>
  );
};

const TooltipContent: React.FC<{
  children: React.ReactNode;
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
}> = ({ children, className, side = 'top' }) => {
  const context = React.useContext(TooltipContext);
  if (!context || !context.open) return null;

  const sideClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className={cn(
        'absolute z-50 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
        sideClasses[side],
        className
      )}
    >
      {children}
    </div>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

