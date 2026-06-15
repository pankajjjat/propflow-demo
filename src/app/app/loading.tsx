export default function AppLoading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Page header skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-lg bg-surface-200" />
          <div className="h-4 w-32 rounded-lg bg-surface-100" />
        </div>
        <div className="h-10 w-32 rounded-xl bg-surface-200" />
      </div>

      {/* Stats row skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card-premium p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="h-3 w-20 rounded bg-surface-200" />
              <div className="w-9 h-9 rounded-xl bg-surface-100" />
            </div>
            <div className="h-7 w-24 rounded bg-surface-200 mb-2" />
            <div className="h-3 w-16 rounded bg-surface-100" />
          </div>
        ))}
      </div>

      {/* Deals list skeleton */}
      <div className="space-y-3">
        <div className="h-5 w-32 rounded bg-surface-200 mb-4" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card-premium p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-surface-100" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 rounded bg-surface-200" />
              <div className="h-3 w-32 rounded bg-surface-100" />
            </div>
            <div className="h-6 w-16 rounded-full bg-surface-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
