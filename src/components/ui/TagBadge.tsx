interface TagBadgeProps {
  label: string;
}

export function TagBadge({ label }: TagBadgeProps) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 border border-line font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted">
      {label}
    </span>
  );
}
