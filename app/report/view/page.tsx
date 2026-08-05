"use client"

import { Suspense, useMemo, useState } from "react"
import { ArrowLeft, LayoutGrid, Shield, Zap, Palette, Flame, Infinity } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useReports } from "@/lib/reports-context"

function ReportContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { reports } = useReports()
  const [activeSection, setActiveSection] = useState("overview")

  const reportId = searchParams.get("id") as string

  const report = useMemo(() => {
    return reports.find(r => r.id === reportId)
  }, [reports, reportId])

  if (!report) {
    return (
      <div className="min-h-[calc(100vh-73px)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Report Not Found</h1>
          <p className="text-muted-foreground mb-6">The report you&apos;re looking for doesn&apos;t exist.</p>
          <button onClick={() => router.back()} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90">
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const secChecks = report.securityChecks || []
  const fnChecks = report.functionChecks || []
  const uiLibs = report.uiLibs || []
  const stressLevels = report.stressLevels || []
  const fib = report.fibonacci || { target: "F(10,000)", resultLength: "— digits" }

  const secPass = secChecks.filter(c => c.status === "pass").length
  const secTotal = secChecks.length
  const fnPresent = fnChecks.filter(f => f.status === "pass").length
  const fnMissing = fnChecks.filter(f => f.status === "skip").length
  const fnTotal = fnChecks.length
  const uiLoaded = uiLibs.filter(u => u.cat === "Loaded").length
  const uiTotal = uiLibs.length
  const stPass = stressLevels.filter(s => s.status === "pass").length
  const stTotal = stressLevels.length
  const hasBuilderData = secTotal > 0 || fnTotal > 0 || uiTotal > 0 || stTotal > 0

  const badge = (status: string) => {
    const map: Record<string, { cls: string; label: string }> = {
      pass: { cls: "text-emerald-400 bg-emerald-500/10", label: "OK" },
      flag: { cls: "text-amber-400 bg-amber-500/10", label: "Flagged" },
      skip: { cls: "text-muted-foreground bg-secondary", label: "Skipped" },
    }
    const { cls, label } = map[status] || map.skip
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cls}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {label}
      </span>
    )
  }

  const sections = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "security", label: "Security", icon: Shield },
    { id: "functions", label: "Functions", icon: Zap },
    { id: "uilibs", label: "UI Libs", icon: Palette },
    { id: "stress", label: "Stress", icon: Flame },
    { id: "fibonacci", label: "Fibonacci", icon: Infinity },
  ]

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#0a0a0c]">
      <div className="sticky top-0 z-20 bg-[#0a0a0c]/90 backdrop-blur-md border-b border-border">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button onClick={() => router.back()} className="p-2.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground active-scale-lg shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,199,123,0.8)] shrink-0" />
              <span className="font-bold text-sm sm:text-base truncate">ExecutorHealthCheck</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-sm text-muted-foreground shrink-0">
            <button onClick={() => router.push("/")} className="px-2 py-2 rounded-lg hover:text-foreground transition-colors min-h-[44px]">Home</button>
            <button onClick={() => router.push("/reports")} className="px-2 py-2 rounded-lg hover:text-foreground transition-colors min-h-[44px]">Reports</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="text-xs font-mono uppercase tracking-[0.12em] text-muted-foreground mb-2">Diagnostic Report</div>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            {report.thumbnailUrl && (
              <div className="w-16 h-16 sm:w-[88px] sm:h-[88px] rounded-2xl overflow-hidden border border-white/12 shadow-[0_2px_10px_rgba(91,141,239,0.35)] shrink-0">
                <img src={report.thumbnailUrl} alt={report.name} className="w-full h-full object-cover" />
              </div>
            )}
            <h1 className="text-2xl sm:text-[34px] font-extrabold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              {report.name}
            </h1>
          </div>
          <span className="text-muted-foreground font-medium text-base sm:text-lg">— health report</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border border-border rounded-[10px] overflow-hidden mb-7">
          <div className="p-3 sm:p-4 border-r border-border">
            <div className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground mb-1">Timestamp</div>
            <div className="text-sm sm:text-[15px] font-semibold">{report.timestamp || "—"}</div>
          </div>
          <div className="p-3 sm:p-4 border-r border-border">
            <div className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground mb-1">Total Time</div>
            <div className="text-sm sm:text-[15px] font-semibold">—</div>
          </div>
          <div className="p-3 sm:p-4 border-r border-border hidden sm:block">
            <div className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground mb-1">Memory</div>
            <div className="text-sm sm:text-[15px] font-semibold">—</div>
          </div>
          <div className="p-3 sm:p-4">
            <div className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground mb-1">Overall Score</div>
            <div className="text-sm sm:text-[15px] font-semibold text-emerald-400">{report.security}%</div>
          </div>
        </div>

        <nav className="flex gap-1 flex-wrap border-b border-border mb-9">
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-1.5 text-[13px] font-semibold px-3 sm:px-4 py-3 min-h-[44px] border-b-2 transition-colors active-scale-sm ${activeSection === s.id ? "text-foreground border-primary" : "text-muted-foreground border-transparent hover:text-foreground"}`}
            >
              <s.icon className="w-3.5 h-3.5" />
              {s.label}
            </button>
          ))}
        </nav>
      </div>

      <main className="max-w-[1160px] mx-auto px-4 sm:px-6 pb-20">
        <div key={activeSection}>
        {/* Overview */}
        {activeSection === "overview" && (
          <section>
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              <LayoutGrid className="w-5 h-5 text-primary" /> Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {!hasBuilderData ? (
                <div className="col-span-full text-center py-8 text-muted-foreground text-sm">
                  No builder data yet. Complete the builder to populate this section.
                </div>
              ) : (
                <>
                  <div className="bg-card border border-border rounded-[10px] p-5">
                    <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground mb-2">All Modules</div>
                    <div className="text-[26px] font-bold text-emerald-400">{report.security}%</div>
                  </div>
                  <div className="bg-card border border-border rounded-[10px] p-5">
                    <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground mb-2">Security</div>
                    <div className="text-[26px] font-bold text-emerald-400">{secPass}/{secTotal}</div>
                  </div>
                  <div className="bg-card border border-border rounded-[10px] p-5">
                    <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground mb-2">Functions</div>
                    <div className="text-[26px] font-bold text-emerald-400">{fnPresent}/{fnTotal}</div>
                  </div>
                  <div className="bg-card border border-border rounded-[10px] p-5">
                    <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground mb-2">UI Libs</div>
                    <div className="text-[26px] font-bold text-emerald-400">{uiLoaded}/{uiTotal}</div>
                  </div>
                  <div className="bg-card border border-border rounded-[10px] p-5">
                    <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground mb-2">Stress</div>
                    <div className="text-[26px] font-bold">{stPass}/{stTotal}</div>
                  </div>
                  <div className="bg-card border border-border rounded-[10px] p-5">
                    <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground mb-2">Fibonacci</div>
                    <div className="text-[26px] font-bold">{fib.target}</div>
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {activeSection === "security" && (
          <section>
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              <Shield className="w-5 h-5 text-red-500" /> Security
            </h2>
            <div className="border border-border rounded-[10px] overflow-hidden bg-card shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_8px_24px_rgba(0,0,0,0.25)]">
              <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[500px]">
                <thead>
                  <tr>
                    <th className="text-left text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground bg-[#131317] px-5 py-3 border-b border-border w-[35%]">Check</th>
                    <th className="text-left text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground bg-[#131317] px-5 py-3 border-b border-border w-[15%]">Status</th>
                    <th className="text-left text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground bg-[#131317] px-5 py-3 border-b border-border w-[50%]">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {secChecks.length === 0 ? (
                    <tr><td colSpan={3} className="px-5 py-8 text-center text-muted-foreground text-sm">No security checks configured.</td></tr>
                  ) : secChecks.map((c, i) => (
                    <tr key={i}>
                      <td className="px-5 py-3.5 border-b border-border/50 text-[13.5px] font-semibold">{c.name}</td>
                      <td className="px-5 py-3.5 border-b border-border/50">{badge(c.status)}</td>
                      <td className="px-5 py-3.5 border-b border-border/50 text-[12.5px] text-muted-foreground">
                        {c.detail.length > 40 ? c.detail.slice(0, 38) + "…" : c.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </section>
        )}

        {activeSection === "functions" && (
          <section>
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              <Zap className="w-5 h-5 text-primary" /> Functions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
              <div className="bg-card border border-border rounded-[10px] p-5">
                <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground mb-2">Present</div>
                <div className="text-[26px] font-bold text-emerald-400">{fnPresent}</div>
              </div>
              <div className="bg-card border border-border rounded-[10px] p-5">
                <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground mb-2">Missing</div>
                <div className="text-[26px] font-bold">{fnMissing}</div>
              </div>
              <div className="bg-card border border-border rounded-[10px] p-5">
                <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground mb-2">Coverage</div>
                <div className="text-[26px] font-bold text-emerald-400">{fnTotal > 0 ? Math.round(fnPresent / fnTotal * 100) : 0}%</div>
              </div>
            </div>
            <div className="border border-border rounded-[10px] overflow-hidden bg-card shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_8px_24px_rgba(0,0,0,0.25)]">
              <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[500px]">
                <thead>
                  <tr>
                    <th className="text-left text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground bg-[#131317] px-5 py-3 border-b border-border w-[35%]">Function</th>
                    <th className="text-left text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground bg-[#131317] px-5 py-3 border-b border-border w-[15%]">Status</th>
                    <th className="text-left text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground bg-[#131317] px-5 py-3 border-b border-border w-[50%]">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {fnChecks.length === 0 ? (
                    <tr><td colSpan={3} className="px-5 py-8 text-center text-muted-foreground text-sm">No functions configured.</td></tr>
                  ) : fnChecks.map((f, i) => (
                    <tr key={i}>
                      <td className="px-5 py-3.5 border-b border-border/50 text-[13.5px] font-semibold">{f.name}</td>
                      <td className="px-5 py-3.5 border-b border-border/50">{badge(f.status)}</td>
                      <td className="px-5 py-3.5 border-b border-border/50 text-[12.5px] text-muted-foreground">
                        {f.detail.length > 40 ? f.detail.slice(0, 38) + "…" : f.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </section>
        )}

        {activeSection === "uilibs" && (
          <section>
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              <Palette className="w-5 h-5 text-emerald-500" /> UI Libs
            </h2>
            <div className="border border-border rounded-[10px] overflow-hidden">
              {uiLibs.length === 0 ? (
                <div className="px-5 py-8 text-center text-muted-foreground text-sm">No UI libraries configured.</div>
              ) : uiLibs.map((u, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3 border-b border-border/50 last:border-0 text-[13.5px]">
                  <span className="font-semibold">{u.name}</span>
                  {u.cat === "Loaded" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-500/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      Loaded
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-muted-foreground bg-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      Not Loaded
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === "stress" && (
          <section>
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              <Flame className="w-5 h-5 text-amber-500" /> Stress
            </h2>
            <div className="grid grid-cols-2 gap-3.5 mb-6">
              <div className="bg-card border border-border rounded-[10px] p-5">
                <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground mb-2">Avg Throughput</div>
                <div className="text-[26px] font-bold">—</div>
              </div>
              <div className="bg-card border border-border rounded-[10px] p-5">
                <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground mb-2">Passes</div>
                <div className="text-[26px] font-bold text-emerald-400">{stPass}/{stTotal}</div>
              </div>
            </div>
            <div className="border border-border rounded-[10px] overflow-hidden">
              {stressLevels.length === 0 ? (
                <div className="px-5 py-8 text-center text-muted-foreground text-sm">No stress levels configured.</div>
              ) : stressLevels.map((s, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3 border-b border-border/50 last:border-0 text-[13.5px]">
                  <span>{s.name}</span>
                  {badge(s.status)}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === "fibonacci" && (
          <section>
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              <Infinity className="w-5 h-5 text-purple-500" /> Fibonacci
            </h2>
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-card border border-border rounded-[10px] p-5">
                <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground mb-2">Target</div>
                <div className="text-[26px] font-bold">{fib.target}</div>
              </div>
              <div className="bg-card border border-border rounded-[10px] p-5">
                <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground mb-2">Result Length</div>
                <div className="text-[26px] font-bold">{fib.resultLength}</div>
              </div>
            </div>
          </section>
        )}
        </div>
      </main>

      <footer className="max-w-[1160px] mx-auto px-4 sm:px-6 py-8 border-t border-border text-center text-[12px] text-muted-foreground font-mono">
        {report.name} — ExecutorHealthCheck report
      </footer>
    </div>
  )
}

export default function ReportViewPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-73px)] flex items-center justify-center"><div className="text-muted-foreground">Loading...</div></div>}>
      <ReportContent />
    </Suspense>
  )
}
