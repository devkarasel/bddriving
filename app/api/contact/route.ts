import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getCollection } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, course, message } = body
    if (!name || !email || !message)
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    // Save to MongoDB
    try {
      const col = await getCollection('messages')
      await col.insertOne({ name, email, phone, course, message, receivedAt: new Date().toISOString(), read: false, replied: false })
    } catch (dbErr) { console.error('DB save failed:', dbErr) }

    // Send email
    if (process.env.SMTP_HOST && process.env.SMTP_PASS) {
      const port = parseInt(process.env.SMTP_PORT || '587')
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: port === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })
      await transporter.sendMail({
        from: `"BD Driving School" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || 'info@bddriving.com',
        replyTo: email,
        subject: `[BD Driving] New enquiry from ${name} — ${course || 'General'}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;background:#111;color:#f5f5f5;padding:32px;border-top:4px solid #E63329">
            <h2 style="color:#E63329;margin:0 0 20px">New Enquiry — BD Driving School</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#E63329">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Course:</strong> ${course || 'Not specified'}</p>
            <hr style="border-color:#333;margin:20px 0"/>
            <p style="white-space:pre-wrap">${message}</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Contact error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
