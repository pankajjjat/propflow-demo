'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FolderKanban, CheckSquare, MessageSquare, BarChart3, Bell, IndianRupee,
  ChevronLeft, Menu, Sparkles, Upload, X, Sun, Moon, Plus, Users, Languages
} from 'lucide-react';
import KeyboardShortcutsProvider from '@/components/ui/KeyboardShortcutsProvider';
import OnboardingWizard from '@/components/ui/OnboardingWizard';
import { ErrorBoundary } from '@/components/ui';

const navItems = [
  { href: '/app', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/app/leads', icon: Users, label: 'Leads' },
  { href: '/app/deals', icon: FolderKanban, label: 'Deals' },
  { href: '/app/checklist', icon: CheckSquare, label: 'Checklist' },
  { href: '/app/client', icon: Upload, label: 'Client Portal' },
  { href: '/app/whatsapp', icon: MessageSquare, label: 'WhatsApp' },
  { href: '/app/analytics', icon: BarChart3, label: 'Analytics' },
];

const secondaryNav = [
  { href: '/app/pricing', icon: IndianRupee, label: 'Pricing' },
  { href: '/app/notifications', icon: Bell, label: 'Notifications' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [locale, setLocale] = useState<'en' | 'hi'>('en');
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  // Restore dark mode from localStorage after hydration (client-only)
  useEffect(() => {
    const stored = localStorage.getItem('propflow-dark');
    if (stored === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDark(true);
      document.documentElement.classList.add('dark');
    }
    const lang = localStorage.getItem('propflow-locale');
    if (lang === 'hi' || lang === 'en') setLocale(lang);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('propflow-dark', String(next));
  };

  const toggleLang = () => {
    const next = locale === 'en' ? 'hi' : 'en';
    setLocale(next);
    localStorage.setItem('propflow-locale', next);
  };

  // Keyboard shortcuts: close mobile sidebar on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-surface-50 flex transition-colors duration-300">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        className="hidden md:flex flex-col bg-white border-r border-surface-200 shrink-0 transition-all duration-300 dark:bg-surface-800/50 dark:border-surface-700/30"
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-surface-100 dark:border-surface-700/30">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-bold text-surface-900 whitespace-nowrap dark:text-surface-200"
              >
                PropFlow
              </motion.span>
            )}
          </Link>
          {!collapsed && (
            <button
              onClick={toggleLang}
              aria-label={locale === 'en' ? 'Switch to Hindi' : 'Switch to English'}
              className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors dark:hover:bg-surface-700/50 dark:hover:text-surface-300 mr-1"
              title={locale === 'en' ? 'हिन्दी' : 'English'}
            >
              <Languages size={16} />
            </button>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="ml-auto p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors dark:hover:bg-surface-700/50 dark:hover:text-surface-300"
          >
            <ChevronLeft size={16} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : 'text-surface-500 hover:text-surface-700 hover:bg-surface-50 dark:text-surface-400 dark:hover:text-surface-200 dark:hover:bg-surface-700/30'
                }`}
              >
                <item.icon size={18} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}

          {!collapsed && <div className="h-px bg-surface-100 my-3 dark:bg-surface-700/30" />}

          {secondaryNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : 'text-surface-500 hover:text-surface-700 hover:bg-surface-50 dark:text-surface-400 dark:hover:text-surface-200 dark:hover:bg-surface-700/30'
                }`}
              >
                <item.icon size={18} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}

          {!collapsed && <div className="h-px bg-surface-100 my-3 dark:bg-surface-700/30" />}

          {/* New Deal button */}
          <button
            onClick={() => setOnboardingOpen(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full
                       bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors
                       dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/40"
          >
            <Plus size={18} className="shrink-0" />
            {!collapsed && <span>New Deal</span>}
          </button>

          {!collapsed && <div className="h-px bg-surface-100 my-3 dark:bg-surface-700/30" />}

          {/* AI badge */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-surface-400 dark:text-surface-500">
            <Sparkles size={18} className="shrink-0" />
            {!collapsed && <span>AI Features</span>}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="px-3 py-4 border-t border-surface-100 space-y-2 dark:border-surface-700/30">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium
                       text-surface-500 hover:text-surface-700 hover:bg-surface-50 transition-all duration-200
                       dark:text-surface-400 dark:hover:text-surface-200 dark:hover:bg-surface-700/30"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            {!collapsed && <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          {/* Broker profile */}
          {!collapsed ? (
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold dark:bg-emerald-900/40 dark:text-emerald-300">
                VS
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-surface-900 truncate dark:text-surface-200">Vikram Singh</div>
                <div className="text-xs text-surface-400 truncate dark:text-surface-500">Premium Broker</div>
              </div>
              <div className="shrink-0">
                <span className="badge-green text-[10px]">94%</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold dark:bg-emerald-900/40 dark:text-emerald-300">
                VS
              </div>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-surface-200 h-14 flex items-center px-4 gap-3 dark:bg-surface-800 dark:border-surface-700/30">
        <button onClick={() => setMobileOpen(true)} aria-label="Open navigation menu" className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700/50">
          <Menu size={20} className="text-surface-700 dark:text-surface-300" />
        </button>
        <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
          <span className="text-white font-bold text-xs">P</span>
        </div>
        <span className="font-bold text-surface-900 flex-1 dark:text-surface-200">PropFlow</span>
        <button onClick={toggleLang} aria-label={locale === 'en' ? 'Switch to Hindi' : 'Switch to English'} className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700/50">
          <Languages size={18} className="text-surface-500" />
        </button>
        <button onClick={toggleDark} aria-label="Toggle dark mode" className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700/50">
          {dark ? <Sun size={18} className="text-surface-500" /> : <Moon size={18} className="text-surface-500" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-white z-50 md:hidden shadow-2xl dark:bg-surface-900"
            >
              <div className="h-14 flex items-center justify-between px-4 border-b border-surface-100 dark:border-surface-700/30">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">P</span>
                  </div>
                  <span className="font-bold text-surface-900 dark:text-surface-200">PropFlow</span>
                </div>
                <button onClick={() => setMobileOpen(false)} aria-label="Close navigation menu" className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700/50">
                  <X size={18} className="text-surface-500" />
                </button>
              </div>
              <nav className="px-3 py-4 space-y-1">
                {[...navItems, ...secondaryNav].map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                          : 'text-surface-500 hover:bg-surface-50 dark:text-surface-400 dark:hover:bg-surface-700/30'
                      }`}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content with page transitions */}
      <main className="flex-1 min-w-0 md:pt-0 pt-14">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <KeyboardShortcutsProvider>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <ErrorBoundary>{children}</ErrorBoundary>
            </motion.div>
          </KeyboardShortcutsProvider>
        </div>
      </main>

      {/* Onboarding Wizard */}
      <OnboardingWizard open={onboardingOpen} onClose={() => setOnboardingOpen(false)} />
    </div>
  );
}
