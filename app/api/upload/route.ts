import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { getAuthFromRequest } from '@/lib/auth'

const THUMBNAILS_DIR = path.join(process.cwd(), 'public', 'thumbmails')
const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']

export async function POST(request: NextRequest) {
  if (!getAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
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
