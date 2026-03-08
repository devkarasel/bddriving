import { NextRequest, NextResponse } from 'next/server'
import { makeToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123'
  if (password !== adminPass)
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  const token = makeToken(adminPass)
  return NextResponse.json({ success: true, token })
}
