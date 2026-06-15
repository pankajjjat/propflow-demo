import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold text-emerald-600">?</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-surface-900 mb-2">404</h1>
        <p className="text-lg text-surface-500 mb-2">Page not found</p>
        <p className="text-sm text-surface-400 mb-8">
          This deal might have been archived, or the link may be broken.
        </p>
        <Link
          href="/app"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-all"
        >
          <Home size={16} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}