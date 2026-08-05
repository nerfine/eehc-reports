"use client"

import { useState, useMemo, useRef } from "react"
import { ArrowLeft, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useReports } from "@/lib/reports-context"
import { mapStatus, mapUILibCat, healthcheckToReportData, HealthcheckJSON } from "@/lib/healthcheck"
import { CheckList } from "@/components/builder/check-list"
import { PreviewPanel } from "@/components/builder/preview-panel"
import { JsonModal } from "@/components/builder/json-modal"
import { FloatingDock } from "@/components/builder/floating-dock"
import { Reveal } from "@/components/reveal"
import templateData from "@/data/template.json"

const TEMPLATE_SECURITY = (templateData.securityChecks || []).map((c) => ({ name: c.name, status: mapStatus(c.status) }))
const TEMPLATE_FUNCTIONS = (templateData.functionChecks || []).map((f) => ({ name: f.name, status: mapStatus(f.status) }))
const TEMPLATE_UI_LIBS = (templateData.uiLibs || []).map((u) => ({ name: u.name, status: mapUILibCat(u.status) }))
const TEMPLATE_STRESS = (templateData.stress?.levels || []).map((s) => ({ name: s.name, status: mapStatus(s.status) }))
const TEMPLATE_FIB = {
  target: templateData.fibonacci?.target || "F(10,000)",
  resultLength: templateData.fibonacci?.resultLength || "— digits",
}

type StatusFilter = "all" | "pass" | "skip" | "flag"

export default function BuilderPage() {
  const router = useRouter()
  const { reports, updateReport } = useReports()
  const latestReport = reports[0]

  const importInputRef = useRef<HTMLInputElement>(null)

  const [secChecks, setSecChecks] = useState(TEMPLATE_SECURITY)
  const [fnChecks, setFnChecks] = useState(TEMPLATE_FUNCTIONS)
  const [uiLibs, setUILibs] = useState(TEMPLATE_UI_LIBS)
  const [stressLevels, setStressLevels] = useState(TEMPLATE_STRESS)
  const [fibTarget, setFibTarget] = useState(TEMPLATE_FIB.target)
  const [fibLength, setFibLength] = useState(TEMPLATE_FIB.resultLength)

  const [secSearch, setSecSearch] = useState("")
  const [fnSearch, setFnSearch] = useState("")
  const [uiSearch, setUISearch] = useState("")
  const [secFilter, setSecFilter] = useState<StatusFilter>("all")
  const [fnFilter, setFnFilter] = useState<StatusFilter>("all")

  const [showPreview, setShowPreview] = useState(false)
  const [showJSON, setShowJSON] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  const filteredSec = useMemo(() => {
    let items = secChecks.filter((i) => i.name.toLowerCase().includes(secSearch.toLowerCase()))
    if (secFilter !== "all") items = items.filter((i) => i.status === secFilter)
    return items
  }, [secChecks, secSearch, secFilter])

  const filteredFn = useMemo(() => {
    let items = fnChecks.filter((i) => i.name.toLowerCase().includes(fnSearch.toLowerCase()))
    if (fnFilter !== "all") items = items.filter((i) => i.status === fnFilter)
    return items
  }, [fnChecks, fnSearch, fnFilter])

  const filteredUI = useMemo(() => {
    return uiLibs.filter((i) => i.name.toLowerCase().includes(uiSearch.toLowerCase()))
  }, [uiLibs, uiSearch])

  const secPassCount = secChecks.filter((i) => i.status === "pass").length
  const fnPresentCount = fnChecks.filter((i) => i.status === "pass").length
  const uiLoadedCount = uiLibs.filter((i) => i.status === "Loaded").length
  const stressPassCount = stressLevels.filter((i) => i.status === "pass").length

  const setSecStatus = (idx: number, status: "pass" | "skip" | "flag") => {
    setSecChecks((prev) => prev.map((c, i) => (i === idx ? { ...c, status } : c)))
  }

  const setFnStatus = (idx: number, status: "pass" | "skip" | "flag") => {
    setFnChecks((prev) => prev.map((f, i) => (i === idx ? { ...f, status } : f)))
  }

  const setUIStatus = (idx: number, status: "Loaded" | "Not loaded") => {
    setUILibs((prev) => prev.map((u, i) => (i === idx ? { ...u, status } : u)))
  }

  const setStressStatus = (idx: number, status: "pass" | "skip" | "flag") => {
    setStressLevels((prev) => prev.map((s, i) => (i === idx ? { ...s, status } : s)))
  }

  const applyGlobalSec = (status: "pass" | "skip" | "flag") => setSecChecks((prev) => prev.map((c) => ({ ...c, status })))
  const applyGlobalFn = (status: "pass" | "skip" | "flag") => setFnChecks((prev) => prev.map((f) => ({ ...f, status })))
  const applyGlobalUI = (status: "Loaded" | "Not loaded") => setUILibs((prev) => prev.map((u) => ({ ...u, status })))
  const applyGlobalStress = (status: "pass" | "skip" | "flag") => setStressLevels((prev) => prev.map((s) => ({ ...s, status })))

  const generateJSON = () => ({
    productName: latestReport?.name || "PLACEHOLDER_NAME",
    thumbnailUrl: latestReport?.thumbnailUrl || "",
    timestamp: latestReport?.timestamp || "",
    ver: latestReport?.ver || "",
    exec: latestReport?.exec || "",
    type: latestReport?.type || "internal",
    platform: latestReport?.platform || "windows",
    keySystem: latestReport?.keySystem || "keyless",
    detection: latestReport?.detection || "undetected",
    pricing: latestReport?.pricing || "free",
    security: latestReport?.security || 0,
    overview: {
      security: `${Math.round((secPassCount / secChecks.length) * 100)}%`,
      functions: `${Math.round((fnPresentCount / fnChecks.length) * 100)}%`,
      uiLibs: `${Math.round((uiLoadedCount / uiLibs.length) * 100)}%`,
      stress: `${stressPassCount}/${stressLevels.length}`,
    },
    securityChecks: secChecks,
    functionsSummary: {
      present: String(fnPresentCount),
      missing: String(fnChecks.length - fnPresentCount),
      coverage: `${Math.round((fnPresentCount / fnChecks.length) * 100)}%`,
    },
    functionChecks: fnChecks,
    uiLibs: uiLibs,
    stress: {
      passes: `${stressPassCount}/${stressLevels.length}`,
      levels: stressLevels,
    },
    fibonacci: {
      target: fibTarget || "F(10,000)",
      resultLength: fibLength || "— digits",
    },
  })

  const saveToReport = () => {
    if (!latestReport) return
    updateReport(latestReport.id, {
      securityChecks: secChecks.map((c) => ({
        name: c.name,
        status: c.status,
        detail: c.status === "pass" ? "nil" : c.status === "skip" ? "Executor does not support function" : "WARNING",
      })),
      functionChecks: fnChecks.map((f) => ({
        name: f.name,
        status: f.status,
        detail: f.status === "pass" ? "Present (loaded by executor)" : f.status === "skip" ? "Function not found" : "Unstable — may crash",
      })),
      uiLibs: uiLibs.map((u) => ({ name: u.name, cat: u.status })),
      stressLevels: stressLevels.map((s) => ({
        name: s.name,
        status: s.status,
        detail: s.status === "pass" ? "Completed" : s.status === "skip" ? "Skipped" : "Warning",
      })),
      fibonacci: { target: fibTarget || "F(10,000)", resultLength: fibLength || "— digits" },
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(generateJSON(), null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(generateJSON(), null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${latestReport?.name || "report"}_EEHC.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const applyImportedData = (data: ReturnType<typeof healthcheckToReportData>) => {
    setSecChecks(data.securityChecks.map(({ name, status }) => ({ name, status })))
    setFnChecks(data.functionChecks.map(({ name, status }) => ({ name, status })))
    setUILibs(data.uiLibs.map((u) => ({ name: u.name, status: u.cat })))
    setStressLevels(data.stressLevels.map(({ name, status }) => ({ name, status })))
    setFibTarget(data.fibonacci.target)
    setFibLength(data.fibonacci.resultLength)
    if (latestReport) {
      updateReport(latestReport.id, {
        name: data.name,
        ver: data.ver,
        exec: data.exec,
        thumbnailUrl: data.thumbnailUrl,
        timestamp: data.timestamp,
        type: data.type,
        platform: data.platform,
        keySystem: data.keySystem,
        detection: data.detection,
        pricing: data.pricing,
        security: data.security,
        securityChecks: data.securityChecks,
        functionChecks: data.functionChecks,
        uiLibs: data.uiLibs,
        stressLevels: data.stressLevels,
        fibonacci: data.fibonacci,
      })
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        applyImportedData(healthcheckToReportData(JSON.parse(String(reader.result)) as HealthcheckJSON))
      } catch {
        alert("Could not parse that JSON file. Expected an EEHC healthcheck export.")
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-background pb-24">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button onClick={() => router.back()} className="p-2.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground active-scale-lg shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold truncate">Report Builder</h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                {latestReport?.name || "Report"} — Stage 2: Detailed Checks
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TopBarBtn onClick={() => importInputRef.current?.click()}>
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Import JSON</span>
            </TopBarBtn>
            <TopBarBtn onClick={() => setShowPreview(!showPreview)} active={showPreview}>
              {showPreview ? "Hide Preview" : "Show Preview"}
            </TopBarBtn>
            <TopBarBtn onClick={saveToReport} saved={saved}>
              {saved ? "Saved!" : "Save to Report"}
            </TopBarBtn>
          </div>
          <input
            ref={importInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={handleImport}
          />
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 grid gap-6 ${showPreview ? "lg:grid-cols-[1fr_400px]" : "grid-cols-1"}`}>
        <div className="min-w-0 space-y-6">
          <FibonacciSection target={fibTarget} length={fibLength} onTargetChange={setFibTarget} onLengthChange={setFibLength} />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <SummaryCard label="Security" count={secPassCount} total={secChecks.length} />
            <SummaryCard label="Functions" count={fnPresentCount} total={fnChecks.length} />
            <SummaryCard label="UI Libs" count={uiLoadedCount} total={uiLibs.length} />
            <SummaryCard label="Stress" count={stressPassCount} total={stressLevels.length} />
          </div>

          <CheckList
            title="Security Checks"
            items={secChecks}
            filteredItems={filteredSec}
            search={secSearch}
            onSearchChange={setSecSearch}
            filter={secFilter}
            onFilterChange={setSecFilter}
            onSetStatus={(idx, status) => setSecStatus(idx, status as "pass" | "skip" | "flag")}
            onSetAll={(status) => applyGlobalSec(status as "pass" | "skip" | "flag")}
            statusOptions={[{ value: "pass", label: "All Pass" }, { value: "skip", label: "All Skip" }, { value: "flag", label: "All Flag" }]}
            passCount={secPassCount}
          />

          <CheckList
            title="Functions"
            items={fnChecks}
            filteredItems={filteredFn}
            search={fnSearch}
            onSearchChange={setFnSearch}
            filter={fnFilter}
            onFilterChange={setFnFilter}
            onSetStatus={(idx, status) => setFnStatus(idx, status as "pass" | "skip" | "flag")}
            onSetAll={(status) => applyGlobalFn(status as "pass" | "skip" | "flag")}
            statusOptions={[{ value: "pass", label: "All Present" }, { value: "skip", label: "All Missing" }, { value: "flag", label: "All Unstable" }]}
            passCount={fnPresentCount}
            filterLabels={{ all: "All", pass: "Present", skip: "Skipped", flag: "Flagged" }}
          />

          <CheckList
            title="UI Libraries"
            items={uiLibs}
            filteredItems={filteredUI}
            search={uiSearch}
            onSearchChange={setUISearch}
            filter="all"
            onFilterChange={() => {}}
            onSetStatus={(idx, status) => setUIStatus(idx, status as "Loaded" | "Not loaded")}
            onSetAll={(status) => applyGlobalUI(status as "Loaded" | "Not loaded")}
            statusOptions={[{ value: "Loaded", label: "All Loaded" }, { value: "Not loaded", label: "All Not Loaded" }]}
            passCount={uiLoadedCount}
          />

          <StressSection levels={stressLevels} passCount={stressPassCount} onSetStatus={setStressStatus} onSetAll={applyGlobalStress} />
        </div>

        {showPreview && (
          <PreviewPanel
            reportName={latestReport?.name || "—"}
            timestamp={latestReport?.timestamp || "—"}
            version={latestReport?.ver || "—"}
            platform={latestReport?.platform || "—"}
            securityScore={latestReport?.security || 0}
            secChecks={secChecks}
            fnChecks={fnChecks}
            stressLevels={stressLevels}
            fibTarget={fibTarget}
            fibLength={fibLength}
            secPassCount={secPassCount}
            secTotal={secChecks.length}
            fnPresentCount={fnPresentCount}
            fnTotal={fnChecks.length}
            uiLoadedCount={uiLoadedCount}
            uiTotal={uiLibs.length}
            stressPassCount={stressPassCount}
            stressTotal={stressLevels.length}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>

      <FloatingDock showPreview={showPreview} onTogglePreview={() => setShowPreview(!showPreview)} onShowJson={() => setShowJSON(true)} onCopy={copyJSON} onDownload={downloadJSON} onImport={() => importInputRef.current?.click()} copied={copied} />

      {showJSON && (
        <JsonModal json={generateJSON()} onCopy={copyJSON} onDownload={downloadJSON} copied={copied} onClose={() => setShowJSON(false)} />
      )}
    </div>
  )
}

function TopBarBtn({ onClick, active, saved, children }: { onClick: () => void; active?: boolean; saved?: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border active-scale-sm min-h-[44px] ${
        saved ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
          : active ? "bg-primary/10 text-primary border-primary/30"
            : "hover:bg-secondary text-muted-foreground hover:text-foreground border-border"
      }`}
    >
      {children}
    </button>
  )
}

function FibonacciSection({ target, length, onTargetChange, onLengthChange }: { target: string; length: string; onTargetChange: (v: string) => void; onLengthChange: (v: string) => void }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h2 className="text-lg font-bold">Fibonacci</h2>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Target" value={target} onChange={onTargetChange} placeholder="e.g. F(10,000)" />
          <InputField label="Result Length" value={length} onChange={onLengthChange} placeholder="e.g. 2090 digits" />
        </div>
      </div>
    </div>
  )
}

function InputField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder={placeholder} />
    </div>
  )
}

function SummaryCard({ label, count, total }: { label: string; count: number; total: number }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-bold text-emerald-400">{count}/{total}</div>
    </div>
  )
}

function StressSection({ levels, passCount, onSetStatus, onSetAll }: { levels: { name: string; status: string }[]; passCount: number; onSetStatus: (idx: number, status: "pass" | "skip" | "flag") => void; onSetAll: (status: "pass" | "skip" | "flag") => void }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h2 className="text-lg font-bold">Stress Levels</h2>
        <span className="text-sm text-muted-foreground">{passCount}/{levels.length} passed</span>
      </div>
      <div className="p-5">
        <select onChange={(e) => { if (e.target.value) onSetAll(e.target.value as "pass" | "skip" | "flag"); e.target.value = "" }} className="px-3 py-2 bg-secondary border border-border rounded-lg text-xs font-medium text-muted-foreground">
          <option value="">Set All...</option>
          <option value="pass">All Pass</option>
          <option value="skip">All Skip</option>
          <option value="flag">All Warning</option>
        </select>
        <div className="mt-4 space-y-2">
          {levels.map((item, i) => (
            <div key={item.name} className="flex items-center justify-between px-4 py-3 rounded-lg border border-border hover:bg-secondary/30 transition-colors">
              <span className="text-sm font-medium">{item.name}</span>
              <div className="flex gap-1.5">
                {(["pass", "skip", "flag"] as const).map((s) => (
                  <button key={s} onClick={() => onSetStatus(i, s)} className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors active-scale-sm min-h-[36px] ${item.status === s ? s === "pass" ? "bg-emerald-500/20 text-emerald-400" : s === "flag" ? "bg-amber-500/20 text-amber-400" : "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                    {s === "pass" ? "Pass" : s === "skip" ? "Skip" : "Warning"}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
