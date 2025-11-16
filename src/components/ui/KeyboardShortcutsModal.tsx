'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Keyboard } from 'lucide-react';

interface KeyboardShortcut {
  keys: string[];
  description: string;
  category: string;
}

const shortcuts: KeyboardShortcut[] = [
  // Navigation
  { keys: ['⌘', 'D'], description: 'Go to Dashboard', category: 'Navigation' },
  { keys: ['⌘', 'N'], description: 'Create New Process', category: 'Navigation' },
  { keys: ['⌘', 'K'], description: 'Quick Search', category: 'Navigation' },

  // Actions
  { keys: ['⌘', 'S'], description: 'Save (when editing)', category: 'Actions' },
  { keys: ['⌘', 'Enter'], description: 'Submit Form', category: 'Actions' },
  { keys: ['Esc'], description: 'Close Modal/Dialog', category: 'Actions' },

  // Help
  { keys: ['?'], description: 'Show Keyboard Shortcuts', category: 'Help' },
  { keys: ['⌘', '/'], description: 'Toggle This Help', category: 'Help' },
];

export function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle with '?' key or Cmd+/
      if (e.key === '?' || (e.metaKey && e.key === '/')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = Array.from(new Set(shortcuts.map((s) => s.category)));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Use these keyboard shortcuts to navigate faster
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground">
                {category}
              </h3>
              <div className="space-y-2">
                {shortcuts
                  .filter((s) => s.category === category)
                  .map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <Badge
                              variant="secondary"
                              className="px-2 py-1 text-xs font-mono"
                            >
                              {key}
                            </Badge>
                            {i < shortcut.keys.length - 1 && (
                              <span className="text-xs text-muted-foreground">+</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3 text-sm">
          <span className="text-muted-foreground">
            Pro tip: Press <Badge variant="outline" className="mx-1 font-mono">?</Badge> to toggle this help
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
