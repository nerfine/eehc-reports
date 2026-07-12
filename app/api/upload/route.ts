import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const THUMBNAILS_DIR = path.join(process.cwd(), 'public', 'thumbmails')

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = path.extname(file.name) || '.png'
    const filename = `${Date.now().toString(36)}${ext}`

    await fs.mkdir(THUMBNAILS_DIR, { recursive: true })
    await fs.writeFile(path.join(THUMBNAILS_DIR, filename), buffer)

    return NextResponse.json({ url: `/thumbmails/${filename}` })
  } catch {
    return NextResponse.json({ error: 'Failed to upload thumbnail' }, { status: 500 })
  }
}
