import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { ObjectId } from 'mongodb'

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const col = await getCollection('messages')
  const msgs = await col.find({}).sort({ receivedAt: -1 }).toArray()
  return NextResponse.json(msgs.map(m => ({ ...m, _id: m._id.toString() })))
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, field, value } = await req.json()
  const col = await getCollection('messages')
  await col.updateOne({ _id: new ObjectId(id) }, { $set: { [field]: value } })
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  const col = await getCollection('messages')
  await col.deleteOne({ _id: new ObjectId(id) })
  return NextResponse.json({ success: true })
}
