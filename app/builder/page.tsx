"use client"

import { useState, useMemo } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useReports } from "@/lib/reports-context"
import { CheckList } from "@/components/builder/check-list"
import { PreviewPanel } from "@/components/builder/preview-panel"
import { JsonModal } from "@/components/builder/json-modal"
import { FloatingDock } from "@/components/builder/floating-dock"
import { Reveal } from "@/components/reveal"

const SECURITY_CHECKS = [
  "Clipboard Data Theft","Registry Key Creation","Run Key Persistence",
  "Registry Enumeration","Installed Software Enumeration","UAC Bypass Attempt",
  "Admin Rights Check","Service Creation","Scheduled Task Creation",
  "WMI Event Subscription","WiFi Password Extraction","Saved RDP Credentials",
  "Winlogon Registry Persistence","BITS Job Abuse","COM Hijacking Persistence",
  "Process List Enumeration","Process Termination","Anti-Virus Detection",
  "Symbolic Link Creation","Hidden Folder Creation","Local Network Scanning",
  "Port Scanning Capability","HttpRbxApiService:PostAsync()",
  "HttpRbxApiService:PostAsyncFullUrl()","HttpRbxApiService:GetAsyncFullUrl()",
  "MarketplaceService:PerformPurchaseV2()","MarketplaceService:PromptBundlePurchase()",
  "MarketplaceService:PromptGamePassPurchase()","MarketplaceService:PromptProductPurchase()",
  "MarketplaceService:PromptPurchase()","MarketplaceService:PromptRobloxPurchase()",
  "MarketplaceService:PromptThirdPartyPurchase()","MarketplaceService:PerformPurchase()",
  "MarketplaceService:GetRobuxBalance()","MarketplaceService:PromptNativePurchaseWithLocalPlayer()",
  "MarketplaceService:PromptNativePurchase()","MarketplaceService:PromptCollectiblesPurchase()",
  "GuiService:OpenBrowserWindow()","GuiService:OpenNativeOverlay()",
  "BrowserService:EmitHybridEvent()","BrowserService:ExecuteJavaScript()",
  "BrowserService:OpenBrowserWindow()","BrowserService:OpenNativeOverlay()",
  "BrowserService:ReturnToJavaScript()","BrowserService:SendCommand()",
  "MessageBusService:Call()","MessageBusService:GetLast()",
  "MessageBusService:GetMessageId()","MessageBusService:GetProtocolMethodRequestMessageId()",
  "MessageBusService:GetProtocolMethodResponseMessageId()","MessageBusService:MakeRequest()",
  "MessageBusService:Publish()","MessageBusService:PublishProtocolMethodRequest()",
  "MessageBusService:PublishProtocolMethodResponse()","MessageBusService:Subscribe()",
  "MessageBusService:SubscribeToProtocolMethodRequest()",
  "MessageBusService:SubscribeToProtocolMethodResponse()",
  "OpenCloudService:HttpRequestAsync()","ScriptContext:AddCoreScriptLocal()",
  "DataModel:Load()","DataModel:OpenScreenshotsFolder()","DataModel:OpenVideosFolder()",
  "OmniRecommendationsService:MakeRequest()","Players:ReportAbuse()",
  "Players:ReportAbuseV3()","CoreGui:TakeScreenshot()","Robux API Access",
  "ScriptContext:AddCoreScriptLocal","MessageBusService:Publish (URL)",
  "os.execute()","ContentProvider:PreloadAsync","listfiles() root access",
  "System32 Access Attempt","User Directory Enumeration","Program Files Write Access",
  "Startup Folder Persistence","Browser Data Access","System: OS/IO Library RCE",
  "File System: UNC Path Bypass","Network: file:// Protocol Access",
  "System: Console Spam/Freeze","System: FFI Exposure","Process Injection Attempt",
  "DLL Injection Test","Data Exfiltration Test","Environment Variable Access",
  "Hidden File Creation","Chrome Password Theft","Discord Token Extraction",
  "Steam Session Hijacking","SSH Key Theft","Browser Cookie Extraction",
  "Cryptocurrency Wallet Theft","Module Script Injection","CoreGui Access",
  "Plugin Security Bypass","Require Hijacking","Metatable Protection Bypass",
  "Memory Dump Capability","Stack Trace Manipulation","Heap Spray Detection",
  "Temp Folder Write Access","AppData Roaming Access","Desktop File Access",
  "Downloads Folder Enumeration","Documents Folder Access","File Extension Spoofing",
  "Path Traversal (Relative)","File Overwrite Protection","WebSocket Connection",
  "FTP Connection Attempt","IP Geolocation Leak",
]

const FUNCTIONS = [
  "Drawing","appendfile","checkcaller","crypt.base64decode","crypt.base64encode",
  "crypt.decrypt","crypt.encrypt","crypt.generatebytes","crypt.generatekey",
  "crypt.hash","decompile","delfile","dumpstring","getcallingscript",
  "getconnections","getconstant","getconstants","getfenv","getgc","getgenv",
  "gethiddenproperty","getinfo","getinstances","getloadedmodules","getmenv",
  "getnamecallmethod","getnilinstances","getproto","getprotos","getrawmetatable",
  "getreg","getscripts","getsenv","getstack","getupvalue","getupvalues",
  "hookfunction","islclosure","isreadonly","listfiles","loadfile","loadstring",
  "makefolder","newcclosure","readfile","replaceclosure","request","setconstant",
  "setfflag","sethiddenproperty","setmetatable","setnamecallmethod","setreadonly",
  "setstack","setupvalue","writefile",
]

const UI_LIBS = [
  "OrionLib","Rayfield","SiriusLib","WallyV3","ReGui","Bracket",
  "Obsidian","LinoriaLib","Darius (Wax)","Darius (Min)","Darius (RBXM)",
  "Linoria (wis-h)","Monolith",
]

const STRESS_LEVELS = ["Very Light","Light","Medium","Heavy","Very Heavy","Extreme"]

type StatusFilter = "all" | "pass" | "skip" | "flag"

export default function BuilderPage() {
  const router = useRouter()
  const { reports, updateReport } = useReports()
  const latestReport = reports[0]

  const [secChecks, setSecChecks] = useState(SECURITY_CHECKS.map((name) => ({ name, status: "pass" as const })))
  const [fnChecks, setFnChecks] = useState(FUNCTIONS.map((name) => ({ name, status: "pass" as const })))
  const [uiLibs, setUILibs] = useState(UI_LIBS.map((name) => ({ name, status: "Loaded" as const })))
  const [stressLevels, setStressLevels] = useState(STRESS_LEVELS.map((name) => ({ name, status: "pass" as const })))
  const [fibTarget, setFibTarget] = useState("")
  const [fibLength, setFibLength] = useState("")

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

  return (
    <div className="min-h-[calc(100vh-73px)] bg-background">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground active-scale-lg shrink-0">
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
            <TopBarBtn onClick={() => setShowPreview(!showPreview)} active={showPreview}>
              {showPreview ? "Hide Preview" : "Show Preview"}
            </TopBarBtn>
            <TopBarBtn onClick={saveToReport} saved={saved}>
              {saved ? "Saved!" : "Save to Report"}
            </TopBarBtn>
          </div>
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

      <FloatingDock showPreview={showPreview} onTogglePreview={() => setShowPreview(!showPreview)} onShowJson={() => setShowJSON(true)} onCopy={copyJSON} onDownload={downloadJSON} copied={copied} />

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
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border active-scale-sm ${
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
                  <button key={s} onClick={() => onSetStatus(i, s)} className={`px-2.5 py-1 rounded text-xs font-medium transition-colors active-scale-sm ${item.status === s ? s === "pass" ? "bg-emerald-500/20 text-emerald-400" : s === "flag" ? "bg-amber-500/20 text-amber-400" : "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
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
