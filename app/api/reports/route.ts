export const dynamic = "force-static";
import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const REPORTS_DIR = path.join(process.cwd(), 'components', 'reports')
const THUMBNAILS_DIR = path.join(process.cwd(), 'public', 'thumbmails')

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
  try {
    const report = await request.json()
    await fs.mkdir(REPORTS_DIR, { recursive: true })
    const filePath = path.join(REPORTS_DIR, `${report.id}.json`)
    await fs.writeFile(filePath, JSON.stringify(report, null, 2))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save report' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const report = await request.json()
    await fs.mkdir(REPORTS_DIR, { recursive: true })
    const filePath = path.join(REPORTS_DIR, `${report.id}.json`)
    await fs.writeFile(filePath, JSON.stringify(report, null, 2))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update report' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const filePath = path.join(REPORTS_DIR, `${id}.json`)
    await fs.unlink(filePath)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete report' }, { status: 500 })
  }
}
