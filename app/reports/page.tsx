"use client"

import { useState, useMemo, Fragment } from "react"
import { Filter, ChevronDown, FileText, ShieldCheck, Globe, SearchX, RotateCcw, Plus, Pencil, Trash2, MoreVertical } from "lucide-react"
import Link from "next/link"
import { useReports, Report } from "@/lib/reports-context"
import { useAdmin } from "@/lib/admin-context"
import { ReportFormModal } from "@/components/report-form-modal"
import { Reveal, StaggerContainer, StaggerItem } from "@/components/reveal"

const PLATFORMS = ["windows", "apple", "android", "macos"]
const DETECTIONS = ["all", "undetected", "detected", "client-mod-bypass", "possible-banwave", "unknown"]
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "security-high", label: "Security High-Low" },
  { value: "security-low", label: "Security Low-High" },
  { value: "name-az", label: "Name A-Z" },
  { value: "name-za", label: "Name Z-A" },
]

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-2 rounded-lg text-sm border transition-colors active-scale-sm ${
        active
          ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/10 font-semibold"
          : "text-muted-foreground border-border bg-secondary/50 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  )
}

export default function ReportsPage() {
  const { reports, addReport, updateReport, deleteReport } = useReports()
  const { isAdmin } = useAdmin()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [editingReport, setEditingReport] = useState<Report | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  const [sortBy, setSortBy] = useState("newest")
  const [filterType, setFilterType] = useState("all")
  const [filterPlatform, setFilterPlatform] = useState<string[]>([])
  const [filterKeySystem, setFilterKeySystem] = useState("all")
  const [filterDetection, setFilterDetection] = useState("all")
  const [filterPricing, setFilterPricing] = useState("all")

  const togglePlatform = (p: string) => {
    setFilterPlatform((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]))
  }

  const resetFilters = () => {
    setSortBy("newest")
    setFilterType("all")
    setFilterPlatform([])
    setFilterKeySystem("all")
    setFilterDetection("all")
    setFilterPricing("all")
  }

  const filtered = useMemo(() => {
    let result = [...reports]
    if (filterType !== "all") result = result.filter((r) => r.type === filterType)
    if (filterPlatform.length) result = result.filter((r) => filterPlatform.includes(r.platform))
    if (filterKeySystem !== "all") result = result.filter((r) => r.keySystem === filterKeySystem)
    if (filterDetection !== "all") result = result.filter((r) => r.detection === filterDetection)
    if (filterPricing !== "all") result = result.filter((r) => r.pricing === filterPricing)
    switch (sortBy) {
      case "newest": result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); break
      case "oldest": result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); break
      case "security-high": result.sort((a, b) => b.security - a.security); break
      case "security-low": result.sort((a, b) => a.security - b.security); break
      case "name-az": result.sort((a, b) => a.name.localeCompare(b.name)); break
      case "name-za": result.sort((a, b) => b.name.localeCompare(a.name)); break
    }
    return result
  }, [reports, sortBy, filterType, filterPlatform, filterKeySystem, filterDetection, filterPricing])

  const internalCount = filtered.filter((r) => r.type === "internal").length
  const externalCount = filtered.filter((r) => r.type === "external").length

  const handleEdit = (report: Report) => {
    setEditingReport(report)
    setFormOpen(true)
  }

  const handleSave = (data: Omit<Report, "id">) => {
    if (editingReport) {
      updateReport(editingReport.id, {
        ...data,
        securityChecks: data.securityChecks || editingReport.securityChecks || [],
        functionChecks: data.functionChecks || editingReport.functionChecks || [],
        uiLibs: data.uiLibs || editingReport.uiLibs || [],
        stressLevels: data.stressLevels || editingReport.stressLevels || [],
        fibonacci: data.fibonacci || editingReport.fibonacci || { target: "F(10,000)", resultLength: "— digits" },
      })
      setEditingReport(null)
    } else {
      addReport(data)
    }
  }

  const handleDelete = (id: string) => {
    deleteReport(id)
    setDeleteConfirm(null)
  }

  return (
    <div className={`flex min-h-[calc(100vh-73px)] transition-[margin] duration-300 ${sidebarOpen ? "lg:mr-[360px]" : ""}`}>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1280px] mx-auto min-w-0">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Reports</h1>
              <p className="text-muted-foreground text-sm mt-1">Browse and analyze all executor reports.</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {isAdmin && (
                <button
                  onClick={() => { setEditingReport(null); setFormOpen(true) }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:scale-[1.03] active:scale-[0.97] transition-transform"
                >
                  <Plus className="w-4 h-4" /> New Report
                </button>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors active-scale-sm ${
                  sidebarOpen
                    ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                    : "text-foreground/80 border-border bg-card hover:bg-secondary"
                }`}
              >
                <Filter className="w-4 h-4" /> Filters
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${sidebarOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { icon: FileText, label: "Total Reports", value: filtered.length, color: undefined, extra: (
              <span className="flex gap-6 text-sm text-muted-foreground">
                <span>Internal <b className="text-emerald-400 font-semibold">{internalCount}</b></span>
                <span>External <b className="text-blue-400 font-semibold">{externalCount}</b></span>
              </span>
            )},
            { icon: ShieldCheck, label: "Internal Reports", value: internalCount, color: "text-emerald-400" },
            { icon: Globe, label: "External Reports", value: externalCount, color: "text-blue-400" },
          ].map((card) => (
            <StaggerItem key={card.label}>
              <StatCard icon={card.icon} label={card.label} value={card.value} color={card.color}>
                {card.extra}
              </StatCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-border/60">
                {[
                  { label: "REPORT", className: "" },
                  { label: "EXECUTOR", className: "hidden sm:table-cell" },
                  { label: "TYPE", className: "hidden md:table-cell" },
                  { label: "PLATFORM", className: "hidden lg:table-cell" },
                  { label: "SECURITY", className: "" },
                ].map((h) => (
                  <th key={h.label} className={`text-left text-[11.5px] font-semibold tracking-wider text-muted-foreground uppercase px-4 sm:px-5 py-4 ${h.className}`}>
                    {h.label}
                  </th>
                ))}
                <th className="text-right text-[11.5px] font-semibold tracking-wider text-muted-foreground uppercase px-5 py-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-muted-foreground">
                    <SearchX className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
                    <h3 className="text-foreground font-semibold mb-2">No reports found</h3>
                    <p className="text-sm">Try adjusting your filters to see more results.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <Fragment key={r.id}>
                    <tr className="border-b border-border/40 hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 sm:px-5 py-3">
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-[66px] h-[44px] rounded-lg flex items-center justify-center text-white font-bold text-[11px] tracking-wide overflow-hidden ${r.thumbnailUrl ? "" : r.bg}`}
                          >
                            {r.thumbnailUrl ? (
                              <img src={r.thumbnailUrl} alt={r.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-center leading-tight drop-shadow-md">{r.name.toUpperCase()}</span>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{r.name}</div>
                            <div className="text-xs text-muted-foreground/60">
                              {r.date} • {r.time} • {r.ver}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-5 py-3 text-sm hidden sm:table-cell">{r.exec}</td>
                      <td className="px-4 sm:px-5 py-3 hidden md:table-cell">
                        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${r.type === "internal" ? "text-emerald-400 bg-emerald-500/10" : "text-blue-400 bg-blue-500/10"}`}>
                          {r.type.charAt(0).toUpperCase() + r.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 sm:px-5 py-3 text-sm capitalize text-muted-foreground hidden lg:table-cell">{r.platform}</td>
                      <td className="px-4 sm:px-5 py-3 text-emerald-400 font-bold">{r.security}%</td>
                      <td className="px-4 sm:px-5 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/report/view?id=${r.id}`} className="px-3 py-1.5 rounded-md border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                            View Report
                          </Link>
                          {isAdmin && (
                            <div className="relative">
                              <button
                                onClick={() => setMenuOpen(menuOpen === r.id ? null : r.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                              {menuOpen === r.id && (
                                <div className="absolute right-0 top-full mt-1 w-36 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden animate-scale-in">
                                  <button
                                    onClick={() => { handleEdit(r); setMenuOpen(null) }}
                                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                                  >
                                    <Pencil className="w-3.5 h-3.5" /> Edit
                                  </button>
                                  <button
                                    onClick={() => { setDeleteConfirm(r.id); setMenuOpen(null) }}
                                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" /> Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                    {deleteConfirm === r.id && (
                      <tr className="bg-red-500/5 animate-fade-in-up">
                        <td colSpan={6} className="px-5 py-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-red-400">
                              Are you sure you want to delete <b>{r.name}</b>?
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDelete(r.id)}
                                className="px-3 py-1.5 rounded-md text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors active-scale-sm"
                              >
                                Yes, Delete
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-3 py-1.5 rounded-md text-xs font-medium bg-secondary text-muted-foreground border border-border hover:text-foreground transition-colors active-scale-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
          </div>
          <div className="flex items-center justify-between px-5 py-4 border-t border-border/40">
            <span className="text-sm text-muted-foreground">
              Showing {filtered.length > 0 ? 1 : 0} to {filtered.length} of {filtered.length} reports
            </span>
          </div>
        </div>
      </div>

      {/* Filter Sidebar */}
      <div
        className={`fixed top-[73px] right-0 bottom-0 w-full sm:w-[360px] bg-card border-l border-border overflow-y-auto z-[90] p-4 sm:p-6 sidebar-slide ${sidebarOpen ? "open" : ""}`}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold">Filters</h2>
          <button onClick={resetFilters} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Reset All <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <FilterSection label="Sort By">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full bg-secondary border border-border text-foreground text-sm px-3 py-2.5 rounded-lg appearance-none">
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </FilterSection>

        <FilterSection label="Type">
          <div className="flex flex-wrap gap-2">
            <Pill label="All Types" active={filterType === "all"} onClick={() => setFilterType("all")} />
            <Pill label="Internal" active={filterType === "internal"} onClick={() => setFilterType("internal")} />
            <Pill label="External" active={filterType === "external"} onClick={() => setFilterType("external")} />
          </div>
        </FilterSection>

        <FilterSection label="Platform">
          <div className="grid grid-cols-2 gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => togglePlatform(p)}
                className={`h-14 flex flex-col items-center justify-center gap-1 rounded-lg border text-xs transition-colors ${
                  filterPlatform.includes(p)
                    ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/10"
                    : "text-muted-foreground border-border bg-secondary/50 hover:text-foreground"
                }`}
              >
                <span className="capitalize">{p}</span>
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection label="Key System">
          <div className="flex flex-wrap gap-2">
            <Pill label="All Systems" active={filterKeySystem === "all"} onClick={() => setFilterKeySystem("all")} />
            <Pill label="Keyless" active={filterKeySystem === "keyless"} onClick={() => setFilterKeySystem("keyless")} />
            <Pill label="Key System" active={filterKeySystem === "key-system"} onClick={() => setFilterKeySystem("key-system")} />
          </div>
        </FilterSection>

        <FilterSection label="Detection">
          <div className="flex flex-wrap gap-2">
            {DETECTIONS.map((d) => (
              <Pill
                key={d}
                label={d === "all" ? "All" : d.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                active={filterDetection === d}
                onClick={() => setFilterDetection(d)}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection label="Pricing">
          <div className="flex flex-wrap gap-2">
            <Pill label="All" active={filterPricing === "all"} onClick={() => setFilterPricing("all")} />
            <Pill label="Free" active={filterPricing === "free"} onClick={() => setFilterPricing("free")} />
            <Pill label="Paid" active={filterPricing === "paid"} onClick={() => setFilterPricing("paid")} />
          </div>
        </FilterSection>

        <button
          onClick={() => setSidebarOpen(false)}
          className="w-full mt-1 py-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium flex items-center justify-center gap-2 hover:bg-emerald-500/15 transition-colors active-scale-sm"
        >
          Apply Filters <Filter className="w-3.5 h-3.5" />
        </button>
      </div>

      <ReportFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingReport(null) }}
        onSave={handleSave}
        editReport={editingReport}
      />
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  color?: string
  children?: React.ReactNode
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover-lift">
      <div className="flex items-start justify-between mb-3.5">
        <span className="text-muted-foreground text-sm">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className={`text-3xl sm:text-4xl font-bold tracking-tight mb-3.5 ${color || ""}`}>{value}</div>
      {children}
    </div>
  )
}

function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="text-xs font-semibold text-muted-foreground mb-2.5">{label}</div>
      {children}
    </div>
  )
}
