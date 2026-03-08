import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { ObjectId } from 'mongodb'

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const col = await getCollection('blogs')
  const posts = await col.find({}).sort({ createdAt: -1 }).toArray()
  return NextResponse.json(posts.map(p => ({ ...p, _id: p._id.toString() })))
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const col = await getCollection('blogs')
  const result = await col.insertOne({ ...body, createdAt: new Date().toISOString() })
  return NextResponse.json({ success: true, id: result.insertedId.toString() })
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, ...data } = await req.json()
  const col = await getCollection('blogs')
  await col.updateOne({ _id: new ObjectId(id) }, { $set: data })
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  const col = await getCollection('blogs')
  await col.deleteOne({ _id: new ObjectId(id) })
  return NextResponse.json({ success: true })
}
