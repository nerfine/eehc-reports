"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"

export interface SecurityCheck {
  name: string
  status: "pass" | "skip" | "flag"
  detail: string
}

export interface FunctionCheck {
  name: string
  status: "pass" | "skip" | "flag"
  detail: string
}

export interface UILib {
  name: string
  cat: string
}

export interface StressLevel {
  name: string
  status: "pass" | "skip" | "flag"
  detail: string
}

export interface Report {
  id: string
  name: string
  ver: string
  date: string
  time: string
  exec: string
  thumbnailUrl: string
  timestamp: string
  type: "internal" | "external"
  platform: string
  keySystem: string
  detection: string
  pricing: string
  security: number
  bg: string
  securityChecks: SecurityCheck[]
  functionChecks: FunctionCheck[]
  uiLibs: UILib[]
  stressLevels: StressLevel[]
  fibonacci: {
    target: string
    resultLength: string
  }
}

interface ReportsContextType {
  reports: Report[]
  addReport: (report: Omit<Report, "id">) => void
  updateReport: (id: string, report: Partial<Report>) => void
  deleteReport: (id: string) => void
}

const ReportsContext = createContext<ReportsContextType>({
  reports: [],
  addReport: () => {},
  updateReport: () => {},
  deleteReport: () => {},
})

const STORAGE_KEY = "ehc_reports"

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

const gradients = [
  "bg-gradient-to-br from-blue-900/40 to-slate-950",
  "bg-gradient-to-br from-emerald-900/40 to-slate-950",
  "bg-gradient-to-br from-purple-900/40 to-slate-950",
  "bg-gradient-to-br from-orange-900/40 to-slate-950",
  "bg-gradient-to-br from-red-900/40 to-slate-950",
  "bg-gradient-to-br from-cyan-900/40 to-slate-950",
  "bg-gradient-to-br from-pink-900/40 to-slate-950",
  "bg-gradient-to-br from-yellow-900/40 to-slate-950",
]

function getRandomGradient() {
  return gradients[Math.floor(Math.random() * gradients.length)]
}

async function apiSave(report: Report) {
  try {
    const session = localStorage.getItem("ehc_session")
    const res = await fetch("/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(session ? { Authorization: `Bearer ${session}` } : {}),
      },
      body: JSON.stringify(report),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || "Failed to save report")
    }
  } catch (err) {
    console.error("Failed to sync report to server:", err)
    alert("Report was saved locally but could not be synced to the server, so it may not be visible to everyone.")
  }
}

async function apiDelete(id: string) {
  try {
    const session = localStorage.getItem("ehc_session")
    const res = await fetch("/api/reports", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(session ? { Authorization: `Bearer ${session}` } : {}),
      },
      body: JSON.stringify({ id }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || "Failed to delete report")
    }
  } catch (err) {
    console.error("Failed to delete report on server:", err)
    alert("Report was removed locally but could not be deleted on the server, so it may still be visible to others.")
  }
}

export function ReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    let cancelled = false

    let local: Report[] = []
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        local = JSON.parse(stored)
        setReports(local)
      }
    } catch {}

    fetch("/api/reports")
      .then((res) => (res.ok ? res.json() : null))
      .then((serverReports: Report[] | null) => {
        if (cancelled || !Array.isArray(serverReports)) return
        const byId = new Map<string, Report>()
        for (const report of serverReports) byId.set(report.id, report)
        for (const report of local) if (!byId.has(report.id)) byId.set(report.id, report)
        const merged = Array.from(byId.values())
        setReports(merged)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  const save = useCallback((next: Report[]) => {
    setReports(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const addReport = useCallback((report: Omit<Report, "id">) => {
    const newReport = { ...report, id: generateId() }
    save([newReport, ...reports])
    apiSave(newReport)
  }, [reports, save])

  const updateReport = useCallback((id: string, updates: Partial<Report>) => {
    const next = reports.map(r => r.id === id ? { ...r, ...updates } : r)
    save(next)
    const updated = next.find(r => r.id === id)
    if (updated) apiSave(updated)
  }, [reports, save])

  const deleteReport = useCallback((id: string) => {
    save(reports.filter(r => r.id !== id))
    apiDelete(id)
  }, [reports, save])

  return (
    <ReportsContext.Provider value={{ reports, addReport, updateReport, deleteReport }}>
      {children}
    </ReportsContext.Provider>
  )
}

export const useReports = () => useContext(ReportsContext)
export { gradients, getRandomGradient }
