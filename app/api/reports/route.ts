import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { getAuthFromRequest } from '@/lib/auth'

export const dynamic = "force-dynamic"

const GITHUB_API = "https://api.github.com"
const GITHUB_REPO = process.env.GITHUB_REPO || "nerfine/eehc-reports"
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ""

// Folder inside the repo where report JSON files live.
const REPORTS_DIR = "reports"
const LOCAL_REPORTS_DIR = path.join(process.cwd(), REPORTS_DIR)

const CACHE_TTL_MS = 5 * 60 * 1000
let cache: { at: number; reports: unknown[] | null } | null = null

function githubConfigured(): boolean {
  return GITHUB_TOKEN.length > 0
}

async function githubRequest(method: string, apiPath: string, body?: unknown, accept = "application/vnd.github+json") {
  const res = await fetch(`${GITHUB_API}${apiPath}`, {
    method,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: accept,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "eehc-report-sync",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  return res
}

function reportPath(id: string): string {
  return `${REPORTS_DIR}/${id}.json`
}

async function githubGetFileSha(filePath: string): Promise<string | null> {
  const res = await githubRequest(
    "GET",
    `/repos/${GITHUB_REPO}/contents/${encodeURIComponent(filePath)}?ref=${encodeURIComponent(GITHUB_BRANCH)}`
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.sha || null
}

async function githubSave(report: Record<string, unknown>): Promise<boolean> {
  try {
    const filePath = reportPath(report.id as string)
    const content = JSON.stringify(report, null, 2)
    const sha = await githubGetFileSha(filePath)
    const res = await githubRequest("PUT", `/repos/${GITHUB_REPO}/contents/${encodeURIComponent(filePath)}`, {
      message: `report: ${sha ? "update" : "create"} ${filePath}`,
      content: Buffer.from(content).toString("base64"),
      branch: GITHUB_BRANCH,
      ...(sha ? { sha } : {}),
    })
    return res.ok
  } catch {
    return false
  }
}

async function githubDelete(id: string): Promise<boolean> {
  try {
    const filePath = reportPath(id)
    const sha = await githubGetFileSha(filePath)
    if (!sha) return true
    const res = await githubRequest("DELETE", `/repos/${GITHUB_REPO}/contents/${encodeURIComponent(filePath)}`, {
      message: `report: delete ${filePath}`,
      sha,
      branch: GITHUB_BRANCH,
    })
    return res.ok
  } catch {
    return false
  }
}

async function githubAll(): Promise<unknown[] | null> {
  if (!githubConfigured()) return null
  const now = Date.now()
  if (cache && cache.reports && now - cache.at < CACHE_TTL_MS) return cache.reports

  try {
    const list = await githubRequest(
      "GET",
      `/repos/${GITHUB_REPO}/contents/${encodeURIComponent(REPORTS_DIR)}?ref=${encodeURIComponent(GITHUB_BRANCH)}`
    )
    if (list.status === 401 || list.status === 403) return null
    if (!list.ok) {
      cache = { at: now, reports: [] }
      return []
    }

    const entries: { name: string; path: string; type: string }[] = await list.json()
    const files = entries.filter((e) => e.type === "file" && e.name.endsWith(".json"))

    const reports: unknown[] = []
    for (const file of files) {
      const res = await githubRequest(
        "GET",
        `/repos/${GITHUB_REPO}/contents/${encodeURIComponent(file.path)}?ref=${encodeURIComponent(GITHUB_BRANCH)}`,
        undefined,
        "application/vnd.github.raw"
      )
      if (!res.ok) continue
      try {
        reports.push(JSON.parse(await res.text()))
      } catch {}
    }

    cache = { at: now, reports }
    return reports
  } catch {
    return null
  }
}

function dbUrl(): string | null {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || null
}

let tableReady = false
async function ensureTable() {
  if (tableReady) return
  const url = dbUrl()
  if (!url) return
  const { neon } = await import('@neondatabase/serverless')
  const sql = neon(url)
  await sql`
    CREATE TABLE IF NOT EXISTS ehc_reports (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  tableReady = true
}

async function dbUpsert(report: Record<string, unknown>) {
  const url = dbUrl()
  if (!url) return false
  const { neon } = await import('@neondatabase/serverless')
  const sql = neon(url)
  await ensureTable()
  await sql`
    INSERT INTO ehc_reports (id, data, updated_at)
    VALUES (${report.id}, ${JSON.stringify(report)}::jsonb, NOW())
    ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
  `
  return true
}

async function dbDelete(id: string) {
  const url = dbUrl()
  if (!url) return false
  const { neon } = await import('@neondatabase/serverless')
  const sql = neon(url)
  await ensureTable()
  await sql`DELETE FROM ehc_reports WHERE id = ${id}`
  return true
}

async function dbAll() {
  const url = dbUrl()
  if (!url) return null
  const { neon } = await import('@neondatabase/serverless')
  const sql = neon(url)
  await ensureTable()
  const rows = await sql`SELECT data FROM ehc_reports`
  return rows.map((row) => row.data)
}

export async function GET() {
  try {
    const githubReports = await githubAll()
    if (githubReports !== null) return NextResponse.json(githubReports)

    const dbReports = await dbAll()
    if (dbReports) return NextResponse.json(dbReports)

    const files = await fs.readdir(LOCAL_REPORTS_DIR)
    const jsonFiles = files.filter((f) => f.endsWith('.json'))
    const reports = []
    for (const file of jsonFiles) {
      const content = await fs.readFile(path.join(LOCAL_REPORTS_DIR, file), 'utf-8')
      reports.push(JSON.parse(content))
    }
    return NextResponse.json(reports)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  if (!getAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const report = await request.json()
    if (!report.id || typeof report.id !== 'string') {
      return NextResponse.json({ error: 'Invalid report id' }, { status: 400 })
    }
    if (githubConfigured()) {
      if (await githubSave(report)) {
        cache = null
        return NextResponse.json({ success: true })
      }
      return NextResponse.json({ error: 'Failed to sync report to GitHub' }, { status: 500 })
    }
    if (await dbUpsert(report)) {
      return NextResponse.json({ success: true })
    }
    const safeName = path.basename(`${report.id}.json`)
    await fs.mkdir(LOCAL_REPORTS_DIR, { recursive: true })
    await fs.writeFile(path.join(LOCAL_REPORTS_DIR, safeName), JSON.stringify(report, null, 2))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save report' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  return POST(request)
}

export async function DELETE(request: NextRequest) {
  if (!getAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await request.json()
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }
    if (githubConfigured()) {
      if (await githubDelete(id)) {
        cache = null
        return NextResponse.json({ success: true })
      }
      return NextResponse.json({ error: 'Failed to delete report from GitHub' }, { status: 500 })
    }
    if (await dbDelete(id)) {
      return NextResponse.json({ success: true })
    }
    const safeName = path.basename(`${id}.json`)
    await fs.unlink(path.join(LOCAL_REPORTS_DIR, safeName))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete report' }, { status: 500 })
  }
}
