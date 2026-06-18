export function ProgressBar({
  value,
  max = 100,
  color = 'emerald',
  height = 2,
  className = '',
}: {
  value: number;
  max?: number;
  color?: 'emerald' | 'amber' | 'rose' | 'slate';
  height?: number;
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const fill: Record<string, string> = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    slate: 'bg-slate-400',
  };
  const track: Record<string, string> = {
    emerald: 'bg-emerald-100',
    amber: 'bg-amber-100',
    rose: 'bg-rose-100',
    slate: 'bg-slate-200',
  };

  return (
    <div
      className={`w-full rounded-full overflow-hidden ${track[color]} ${className}`}
      style={{ height }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${fill[color]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
