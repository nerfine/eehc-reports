import { Report, getRandomGradient } from "@/lib/reports-context"

export type CheckStatus = "pass" | "skip" | "flag"

export interface HealthcheckCheck {
  name: string
  status: string
  detail?: string
}

export interface HealthcheckUILib {
  name: string
  status?: string
  cat?: string
}

export interface HealthcheckJSON {
  productName?: string
  thumbnailUrl?: string
  timestamp?: string
  ver?: string
  exec?: string
  type?: string
  platform?: string
  keySystem?: string
  detection?: string
  pricing?: string
  security?: number
  securityChecks?: HealthcheckCheck[]
  functionsSummary?: { present?: string; missing?: string; coverage?: string }
  functionChecks?: HealthcheckCheck[]
  uiLibs?: HealthcheckUILib[]
  stress?: {
    passes?: string
    levels?: HealthcheckCheck[]
  }
  stressLevels?: HealthcheckCheck[]
  fibonacci?: { target?: string; resultLength?: string }
}

export function mapStatus(status?: string): CheckStatus {
  const s = (status || "pass").toLowerCase()
  if (s === "fail" || s === "failed" || s === "flag" || s === "flagged") return "flag"
  if (s === "skip" || s === "skipped") return "skip"
  return "pass"
}

export function mapUILibCat(status?: string): "Loaded" | "Not loaded" {
  const s = (status || "").toLowerCase()
  if (s === "failed" || s === "not loaded" || s === "notloaded" || s === "unloaded") return "Not loaded"
  return "Loaded"
}

export function healthcheckToReportData(json: HealthcheckJSON): Omit<Report, "id"> {
  const now = new Date()

  const securityChecks = (json.securityChecks || []).map((c) => {
    const status = mapStatus(c.status)
    return {
      name: c.name,
      status,
      detail: c.detail ?? (status === "pass" ? "nil" : status === "skip" ? "Executor does not support function" : "WARNING"),
    }
  })

  const functionChecks = (json.functionChecks || []).map((f) => {
    const status = mapStatus(f.status)
    return {
      name: f.name,
      status,
      detail: f.detail ?? (status === "pass" ? "Present (loaded by executor)" : status === "skip" ? "Function not found" : "Unstable — may crash"),
    }
  })

  const uiLibs = (json.uiLibs || []).map((u) => ({
    name: u.name,
    cat: mapUILibCat(u.status ?? u.cat),
  }))

  const stressLevels = (json.stress?.levels || json.stressLevels || []).map((s) => ({
    name: s.name,
    status: mapStatus(s.status),
    detail: s.detail ?? "Completed",
  }))

  return {
    name: json.productName || "Imported Report",
    ver: json.ver || "",
    date: now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
    exec: json.exec || json.productName || "",
    thumbnailUrl: json.thumbnailUrl || "",
    timestamp: json.timestamp || "",
    type: json.type === "external" ? "external" : "internal",
    platform: json.platform || "windows",
    keySystem: json.keySystem || "keyless",
    detection: json.detection || "undetected",
    pricing: json.pricing || "free",
    security: typeof json.security === "number" ? json.security : 0,
    bg: getRandomGradient(),
    securityChecks,
    functionChecks,
    uiLibs,
    stressLevels,
    fibonacci: {
      target: json.fibonacci?.target || "F(10,000)",
      resultLength: json.fibonacci?.resultLength || "— digits",
    },
  }
}
