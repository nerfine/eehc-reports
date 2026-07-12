const BADGE_STYLES: Record<string, { cls: string; label: string }> = {
  pass: { cls: "text-emerald-400 bg-emerald-500/10", label: "Pass" },
  flag: { cls: "text-amber-400 bg-amber-500/10", label: "Flagged" },
  skip: { cls: "text-muted-foreground bg-secondary", label: "Skipped" },
}

export function StatusBadge({ status }: { status: string }) {
  const { cls, label } = BADGE_STYLES[status] || BADGE_STYLES.skip
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}
