import { StatusBadge } from "./status-badge"

interface PreviewPanelProps {
  reportName: string
  timestamp: string
  version: string
  platform: string
  securityScore: number
  secChecks: { name: string; status: string }[]
  fnChecks: { name: string; status: string }[]
  stressLevels: { name: string; status: string }[]
  fibTarget: string
  fibLength: string
  secPassCount: number
  secTotal: number
  fnPresentCount: number
  fnTotal: number
  uiLoadedCount: number
  uiTotal: number
  stressPassCount: number
  stressTotal: number
  onClose: () => void
}

export function PreviewPanel({
  reportName,
  timestamp,
  version,
  platform,
  securityScore,
  secChecks,
  fnChecks,
  stressLevels,
  fibTarget,
  fibLength,
  secPassCount,
  secTotal,
  fnPresentCount,
  fnTotal,
  uiLoadedCount,
  uiTotal,
  stressPassCount,
  stressTotal,
  onClose,
}: PreviewPanelProps) {
  return (
    <div className="sticky top-24 h-fit space-y-4">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-sm font-bold">Live Preview</h3>
          <button onClick={onClose} className="text-xs text-muted-foreground hover:text-foreground">
            ✕ Close
          </button>
        </div>

        <div className="p-4 space-y-4 text-xs">
          {/* Brand + Title */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-bold text-sm">ExecutorHealthCheck</span>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Diagnostic Report</div>
          <div className="font-bold text-lg">
            {reportName || "—"} <span className="text-muted-foreground font-normal">— health report</span>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-2">
            <MetaCard label="Timestamp" value={timestamp} />
            <MetaCard label="Version" value={version} />
            <MetaCard label="Platform" value={platform} capitalize />
            <MetaCard label="Score" value={`${securityScore}%`} highlight />
          </div>

          {/* Overview Grid */}
          <div className="text-[10px] font-bold uppercase tracking-wider">Overview</div>
          <div className="grid grid-cols-3 gap-2">
            <StatCard label="Security" value={`${secPassCount}/${secTotal}`} />
            <StatCard label="Functions" value={`${fnPresentCount}/${fnTotal}`} />
            <StatCard label="UI Libs" value={`${uiLoadedCount}/${uiTotal}`} />
            <StatCard label="Stress" value={`${stressPassCount}/${stressTotal}`} />
            <div className="bg-secondary rounded-lg p-2 col-span-2">
              <div className="text-[9px] text-muted-foreground">Fibonacci</div>
              <div className="font-bold">{fibTarget || "F(10,000)"}</div>
            </div>
          </div>

          {/* Security Preview */}
          <PreviewSection title={`Security (${secPassCount} passed)`} maxItems={8} totalItems={secChecks.length}>
            {secChecks.slice(0, 8).map((c) => (
              <PreviewRow key={c.name} name={c.name} mono={false}>
                <StatusBadge status={c.status} />
              </PreviewRow>
            ))}
          </PreviewSection>

          {/* Functions Preview */}
          <PreviewSection title={`Functions (${fnPresentCount} present)`} maxItems={6} totalItems={fnChecks.length}>
            {fnChecks.slice(0, 6).map((f) => (
              <PreviewRow key={f.name} name={f.name} mono>
                <StatusBadge status={f.status} />
              </PreviewRow>
            ))}
          </PreviewSection>

          {/* Stress Preview */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-2">
              Stress ({stressPassCount}/{stressTotal})
            </div>
            <div className="space-y-1">
              {stressLevels.map((s) => (
                <PreviewRow key={s.name} name={s.name} mono={false}>
                  <StatusBadge status={s.status} />
                </PreviewRow>
              ))}
            </div>
          </div>

          {/* Fibonacci Preview */}
          <div className="bg-secondary rounded-lg p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider mb-2">Fibonacci</div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-[9px] text-muted-foreground">Target</div>
                <div className="font-bold">{fibTarget || "F(10,000)"}</div>
              </div>
              <div>
                <div className="text-[9px] text-muted-foreground">Result</div>
                <div className="font-bold">{fibLength || "— digits"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetaCard({
  label,
  value,
  capitalize,
  highlight,
}: {
  label: string
  value: string
  capitalize?: boolean
  highlight?: boolean
}) {
  return (
    <div className="bg-secondary rounded-lg p-2">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`font-semibold ${highlight ? "text-emerald-400" : ""} ${capitalize ? "capitalize" : ""}`}>
        {value || "—"}
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-secondary rounded-lg p-2">
      <div className="text-[9px] text-muted-foreground">{label}</div>
      <div className="font-bold text-emerald-400">{value}</div>
    </div>
  )
}

function PreviewSection({
  title,
  maxItems,
  totalItems,
  children,
}: {
  title: string
  maxItems: number
  totalItems: number
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider mb-2">{title}</div>
      <div className="space-y-1 max-h-32 overflow-y-auto">{children}</div>
      {totalItems > maxItems && (
        <div className="text-center text-muted-foreground text-[10px] py-1">
          + {totalItems - maxItems} more...
        </div>
      )}
    </div>
  )
}

function PreviewRow({
  name,
  mono,
  children,
}: {
  name: string
  mono: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-border/30 last:border-0">
      <span className={`truncate mr-2 text-[10px] ${mono ? "font-mono" : ""}`}>{name}</span>
      {children}
    </div>
  )
}
