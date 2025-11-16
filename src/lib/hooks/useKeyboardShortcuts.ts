'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export type KeyboardShortcut = {
  key: string;
  ctrl?: boolean;
  meta?: boolean; // Cmd on Mac, Win on Windows
  shift?: boolean;
  alt?: boolean;
  description: string;
  action: () => void;
};

/**
 * Hook for managing keyboard shortcuts
 *
 * Usage:
 * useKeyboardShortcuts([
 *   { key: 'k', ctrl: true, description: 'Search', action: () => openSearch() },
 *   { key: 'n', ctrl: true, description: 'New process', action: () => createNew() },
 * ]);
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], enabled = true) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey : true;
        const metaMatch = shortcut.meta ? event.metaKey : true;
        const shiftMatch = shortcut.shift ? event.shiftKey : true;
        const altMatch = shortcut.alt ? event.altKey : true;
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (keyMatch && ctrlMatch && metaMatch && shiftMatch && altMatch) {
          event.preventDefault();
          shortcut.action();
          return;
        }
      }
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
}

/**
 * Pre-configured global shortcuts for the app
 */
export function useGlobalShortcuts() {
  const router = useRouter();

  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'k',
      meta: true, // Cmd+K on Mac, Ctrl+K on Windows
      description: 'Quick search',
      action: () => {
        // TODO: Implement search modal
        console.log('Search shortcut triggered');
      },
    },
    {
      key: 'n',
      meta: true,
      description: 'New process',
      action: () => {
        router.push('/process/new');
      },
    },
    {
      key: 'd',
      meta: true,
      description: 'Go to dashboard',
      action: () => {
        router.push('/dashboard');
      },
    },
    {
      key: '/',
      description: 'Show keyboard shortcuts',
      action: () => {
        // TODO: Show shortcuts modal
        console.log('Shortcuts help triggered');
      },
    },
    {
      key: 'Escape',
      description: 'Close modal/dialog',
      action: () => {
        // Trigger close event for any open modal
        const closeButton = document.querySelector('[aria-label="Close"]') as HTMLElement;
        if (closeButton) {
          closeButton.click();
        }
      },
    },
  ];

  useKeyboardShortcuts(shortcuts);
}

/**
 * Show keyboard shortcuts help modal
 */
export function useShortcutsHelp() {
  const shortcuts = [
    { keys: ['⌘', 'K'], description: 'Quick search' },
    { keys: ['⌘', 'N'], description: 'New process' },
    { keys: ['⌘', 'D'], description: 'Go to dashboard' },
    { keys: ['?'], description: 'Show keyboard shortcuts' },
    { keys: ['Esc'], description: 'Close modal/dialog' },
  ];

  return shortcuts;
}
