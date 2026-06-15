'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FolderKanban, CheckSquare, MessageSquare, BarChart3, Bell,
  ChevronLeft, Menu, Sparkles, Upload, X
} from 'lucide-react';

const navItems = [
  { href: '/app', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/app/deals', icon: FolderKanban, label: 'Deals' },
  { href: '/app/checklist', icon: CheckSquare, label: 'Checklist' },
  { href: '/app/client', icon: Upload, label: 'Client Portal' },
  { href: '/app/whatsapp', icon: MessageSquare, label: 'WhatsApp' },
  { href: '/app/analytics', icon: BarChart3, label: 'Analytics' },
];

const secondaryNav = [
  { href: '/app/notifications', icon: Bell, label: 'Notifications' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        className="hidden md:flex flex-col bg-white border-r border-surface-200 shrink-0 transition-all duration-300"
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-surface-100">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-bold text-surface-900 whitespace-nowrap"
              >
                PropFlow
              </motion.span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors"
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
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-surface-500 hover:text-surface-700 hover:bg-surface-50'
                }`}
              >
                <item.icon size={18} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}

          {!collapsed && <div className="h-px bg-surface-100 my-3" />}

          {secondaryNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-surface-500 hover:text-surface-700 hover:bg-surface-50'
                }`}
              >
                <item.icon size={18} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}

          {!collapsed && <div className="h-px bg-surface-100 my-3" />}

          {/* AI badge */}
          <a
            href="https://hermes-agent.nousresearch.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-surface-400 hover:text-surface-600 hover:bg-surface-50 transition-all duration-200"
          >
            <Sparkles size={18} className="shrink-0" />
            {!collapsed && <span>AI Features</span>}
          </a>
        </nav>

        {/* Bottom section */}
        <div className="px-3 py-4 border-t border-surface-100">
          {!collapsed ? (
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
                VS
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-surface-900 truncate">Vikram Singh</div>
                <div className="text-xs text-surface-400 truncate">Premium Broker</div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
                VS
              </div>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-surface-200 h-14 flex items-center px-4 gap-3">
        <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg hover:bg-surface-100">
          <Menu size={20} />
        </button>
        <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
          <span className="text-white font-bold text-xs">P</span>
        </div>
        <span className="font-bold text-surface-900">PropFlow</span>
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
              className="fixed left-0 top-0 bottom-0 w-64 bg-white z-50 md:hidden shadow-2xl"
            >
              <div className="h-14 flex items-center justify-between px-4 border-b border-surface-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">P</span>
                  </div>
                  <span className="font-bold text-surface-900">PropFlow</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-surface-100">
                  <X size={18} />
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
                        isActive ? 'bg-emerald-50 text-emerald-700' : 'text-surface-500 hover:bg-surface-50'
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

      {/* Main content */}
      <main className="flex-1 min-w-0 md:pt-0 pt-14">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
