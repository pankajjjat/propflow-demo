'use client';

import {
  useEffect,
  useState,
  type ReactNode,
  useCallback,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ShortcutEntry {
  keys: string;
  action: string;
}

const SHORTCUTS: ShortcutEntry[] = [
  { keys: '⌘/Ctrl + 1', action: 'Dashboard' },
  { keys: '⌘/Ctrl + 2', action: 'Deals' },
  { keys: '⌘/Ctrl + 3', action: 'Analytics' },
  { keys: '⌘/Ctrl + 4', action: 'Pricing' },
  { keys: '⌘/Ctrl + 5', action: 'Notifications' },
  { keys: '⌘/Ctrl + 6', action: 'Client Admin' },
  { keys: 'G + D', action: 'Go to Dashboard' },
  { keys: 'G + D', action: 'Go to Deals' },
  { keys: 'R', action: 'Refresh current view' },
  { keys: '?', action: 'Toggle this help' },
];

export default function KeyboardShortcutsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't intercept when user is typing in a form element
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === '?' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
      }
    },
    [open],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Dark backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Centered white card */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-surface-900">
                  Keyboard Shortcuts
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors"
                  aria-label="Close shortcuts"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Shortcuts list */}
              <div className="space-y-1">
                {SHORTCUTS.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-surface-50 transition-colors"
                  >
                    <kbd className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium font-mono text-surface-600 bg-surface-100 rounded-lg border border-surface-200 shadow-sm">
                      {s.keys}
                    </kbd>
                    <span className="text-sm text-surface-500">{s.action}</span>
                  </div>
                ))}
              </div>

              {/* Footer hint */}
              <p className="mt-5 text-xs text-surface-400 text-center">
                Press{' '}
                <kbd className="px-1.5 py-0.5 text-xs font-mono bg-surface-100 rounded border border-surface-200">
                  ?
                </kbd>{' '}
                to toggle this card
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
