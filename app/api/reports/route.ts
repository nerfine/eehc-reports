export const dynamic = "force-static"
import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { getAuthFromRequest } from '@/lib/auth'

const REPORTS_DIR = path.join(process.cwd(), 'components', 'reports')

export async function GET() {
  try {
    const files = await fs.readdir(REPORTS_DIR)
    const jsonFiles = files.filter(f => f.endsWith('.json'))
    const reports = []
    for (const file of jsonFiles) {
      const content = await fs.readFile(path.join(REPORTS_DIR, file), 'utf-8')
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
    const safeName = path.basename(`${report.id}.json`)
    await fs.mkdir(REPORTS_DIR, { recursive: true })
    await fs.writeFile(path.join(REPORTS_DIR, safeName), JSON.stringify(report, null, 2))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save report' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!getAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const report = await request.json()
    if (!report.id || typeof report.id !== 'string') {
      return NextResponse.json({ error: 'Invalid report id' }, { status: 400 })
    }
    const safeName = path.basename(`${report.id}.json`)
    await fs.mkdir(REPORTS_DIR, { recursive: true })
    await fs.writeFile(path.join(REPORTS_DIR, safeName), JSON.stringify(report, null, 2))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update report' }, { status: 500 })
  }
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
    const safeName = path.basename(`${id}.json`)
    await fs.unlink(path.join(REPORTS_DIR, safeName))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete report' }, { status: 500 })
  }
}
