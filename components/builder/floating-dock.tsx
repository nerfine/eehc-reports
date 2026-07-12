import { Eye, EyeOff, Copy, Check, Download } from "lucide-react"

interface FloatingDockProps {
  showPreview: boolean
  onTogglePreview: () => void
  onShowJson: () => void
  onCopy: () => void
  onDownload: () => void
  copied: boolean
}

export function FloatingDock({
  showPreview,
  onTogglePreview,
  onShowJson,
  onCopy,
  onDownload,
  copied,
}: FloatingDockProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
      <div className="flex items-end gap-3 bg-card border border-border rounded-2xl p-3 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <DockButton
          onClick={onTogglePreview}
          active={showPreview}
          tooltip="Preview"
          icon={showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        />
        <DockButton onClick={onShowJson} tooltip="JSON" icon={<JsonIcon />} />
        <DockButton
          onClick={onCopy}
          tooltip="Copy"
          primary
          icon={copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        />
        <DockButton onClick={onDownload} tooltip="Download" green icon={<Download className="w-5 h-5" />} />
      </div>
    </div>
  )
}

function DockButton({
  onClick,
  active,
  primary,
  green,
  tooltip,
  icon,
}: {
  onClick: () => void
  active?: boolean
  primary?: boolean
  green?: boolean
  tooltip: string
  icon: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all hover:w-16 hover:h-16 ${
        active
          ? "bg-primary text-primary-foreground"
          : primary
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : green
              ? "bg-emerald-500 text-white hover:bg-emerald-400"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-primary/10"
      }`}
    >
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-secondary border border-border text-xs font-medium text-foreground whitespace-nowrap opacity-0 pointer-events-none transition-opacity hover:opacity-100">
        {tooltip}
      </span>
      {icon}
    </button>
  )
}

function JsonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}
