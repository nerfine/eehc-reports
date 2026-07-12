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
    await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    })
  } catch {}
}

async function apiDelete(id: string) {
  try {
    await fetch("/api/reports", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
  } catch {}
}

export function ReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setReports(JSON.parse(stored))
      }
    } catch {}
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
