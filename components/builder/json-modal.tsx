interface JsonModalProps {
  json: object
  onCopy: () => void
  onDownload: () => void
  copied: boolean
  onClose: () => void
}

export function JsonModal({ json, onCopy, onDownload, copied, onClose }: JsonModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[80vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="text-lg font-bold">Generated JSON</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5">
          <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap break-words">
            {JSON.stringify(json, null, 2)}
          </pre>
        </div>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-border">
          <button onClick={onCopy} className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-secondary transition-colors">
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
          <button onClick={onDownload} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            Download .json
          </button>
        </div>
      </div>
    </div>
  )
}
