interface TagBadgeProps {
  label: string;
}

const COLORS = [
  'bg-violet-500/20 text-violet-300 border-violet-500/30',
  'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'bg-rose-500/20 text-rose-300 border-rose-500/30',
  'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'bg-pink-500/20 text-pink-300 border-pink-500/30',
];

function getColor(label: string): string {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = (hash * 31 + label.charCodeAt(i)) % COLORS.length;
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

export function TagBadge({ label }: TagBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getColor(label)}`}
    >
      {label}
    </span>
  );
}
