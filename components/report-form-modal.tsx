"use client"

import { useState, useEffect, useRef } from "react"
import { X, Plus, Pencil, Upload } from "lucide-react"
import { Report, getRandomGradient } from "@/lib/reports-context"
import { useRouter } from "next/navigation"

interface ReportFormModalProps {
  open: boolean
  onClose: () => void
  onSave: (report: Omit<Report, "id">) => void
  editReport?: Report | null
}

const platforms = ["windows", "apple", "android", "macos"]
const keySystems = ["keyless", "key-system"]
const detections = ["undetected", "detected", "client-mod-bypass", "possible-banwave", "unknown"]
const pricings = ["free", "paid"]

export function ReportFormModal({ open, onClose, onSave, editReport }: ReportFormModalProps) {
  const router = useRouter()

  // All fields
  const [name, setName] = useState("")
  const [thumbnailUrl, setThumbnailUrl] = useState("")
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState("")
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [timestamp, setTimestamp] = useState("")
  const [ver, setVer] = useState("")
  const [exec, setExec] = useState("")
  const [type, setType] = useState<"internal" | "external">("internal")
  const [platform, setPlatform] = useState("windows")
  const [keySystem, setKeySystem] = useState("keyless")
  const [detection, setDetection] = useState("undetected")
  const [pricing, setPricing] = useState("free")
  const [security, setSecurity] = useState("100")

  const isEditing = !!editReport

  useEffect(() => {
    if (editReport) {
      setName(editReport.name)
      setThumbnailUrl(editReport.thumbnailUrl || "")
      setThumbnailFile(null)
      setThumbnailPreview(editReport.thumbnailUrl || "")
      setTimestamp(editReport.timestamp || "")
      setVer(editReport.ver)
      setExec(editReport.exec)
      setType(editReport.type)
      setPlatform(editReport.platform)
      setKeySystem(editReport.keySystem)
      setDetection(editReport.detection)
      setPricing(editReport.pricing)
      setSecurity(String(editReport.security))
    } else {
      setName("")
      setThumbnailUrl("")
      setThumbnailFile(null)
      setThumbnailPreview("")
      setTimestamp("")
      setVer("")
      setExec("")
      setType("internal")
      setPlatform("windows")
      setKeySystem("keyless")
      setDetection("undetected")
      setPricing("free")
      setSecurity("100")
    }
  }, [editReport, open])

  if (!open) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      setThumbnailPreview(URL.createObjectURL(file))
    }
  }

  const uploadThumbnail = async (): Promise<string> => {
    if (!thumbnailFile) return thumbnailUrl
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", thumbnailFile)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      return data.url || thumbnailUrl
    } catch {
      return thumbnailUrl
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const finalThumbnailUrl = await uploadThumbnail()
    const now = new Date()
    const date = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })

    const reportData = {
      name,
      thumbnailUrl: finalThumbnailUrl,
      timestamp,
      ver,
      date,
      time,
      exec: exec || name,
      type,
      platform,
      keySystem,
      detection,
      pricing,
      security: Number(security) || 0,
      bg: getRandomGradient(),
      securityChecks: editReport?.securityChecks || [],
      functionChecks: editReport?.functionChecks || [],
      uiLibs: editReport?.uiLibs || [],
      stressLevels: editReport?.stressLevels || [],
      fibonacci: editReport?.fibonacci || { target: "F(10,000)", resultLength: "— digits" },
    }

    if (isEditing) {
      onSave({ ...reportData, bg: editReport?.bg || "" })
      onClose()
    } else {
      onSave(reportData)
      onClose()
      router.push("/builder")
    }
  }

  const Pill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button type="button" onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${active ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/10" : "text-muted-foreground border-border bg-secondary/50 hover:text-foreground"}`}>
      {label}
    </button>
  )

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-lg mx-4 bg-card border border-border rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              {isEditing ? <Pencil className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
            </div>
            <div>
              <h2 className="text-lg font-bold">{isEditing ? "Edit Report" : "Create Report"}</h2>
              <p className="text-xs text-muted-foreground">
                {isEditing ? "Update report details" : "Fill in basic info, then build the full report"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Executor Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required autoFocus
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="e.g. Cosmic" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Thumbnail</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative w-full h-24 bg-secondary border border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-muted-foreground transition-colors overflow-hidden"
              >
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-muted-foreground">
                    <Upload className="w-5 h-5" />
                    <span className="text-xs">Click to upload image</span>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <input type="text" value={thumbnailUrl} onChange={e => { setThumbnailUrl(e.target.value); setThumbnailPreview(""); setThumbnailFile(null) }}
                className="w-full mt-2 bg-secondary border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="Or paste image URL..." />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Timestamp</label>
            <input type="text" value={timestamp} onChange={e => setTimestamp(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="2026-03-28 · 20:45" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Version</label>
              <input type="text" value={ver} onChange={e => setVer(e.target.value)} required
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="e.g. v1.0.0" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Executor Display</label>
              <input type="text" value={exec} onChange={e => setExec(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Same as name" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Type</label>
            <div className="flex gap-2">
              <Pill label="Internal" active={type === "internal"} onClick={() => setType("internal")} />
              <Pill label="External" active={type === "external"} onClick={() => setType("external")} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Platform</label>
            <div className="flex flex-wrap gap-2">
              {platforms.map(p => (
                <Pill key={p} label={p.charAt(0).toUpperCase() + p.slice(1)} active={platform === p} onClick={() => setPlatform(p)} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Key System</label>
              <div className="flex gap-2">
                {keySystems.map(ks => (
                  <Pill key={ks} label={ks === "keyless" ? "Keyless" : "Key System"} active={keySystem === ks} onClick={() => setKeySystem(ks)} />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Pricing</label>
              <div className="flex gap-2">
                {pricings.map(p => (
                  <Pill key={p} label={p.charAt(0).toUpperCase() + p.slice(1)} active={pricing === p} onClick={() => setPricing(p)} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Detection</label>
            <div className="flex flex-wrap gap-2">
              {detections.map(d => (
                <Pill key={d} label={d.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} active={detection === d} onClick={() => setDetection(d)} />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Security Score %</label>
            <input type="number" min="0" max="100" value={security} onChange={e => setSecurity(e.target.value)} required
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="0-100" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              {isEditing ? "Update Report" : "Create Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
