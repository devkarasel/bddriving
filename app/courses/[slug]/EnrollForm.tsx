'use client'
import { useState } from 'react'

export default function EnrollForm({ courseTitle }: { courseTitle: string }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async () => {
    if (!form.name || !form.email || !form.phone) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, course: courseTitle, message: form.message || `Enrollment request for: ${courseTitle}` }) })
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', phone: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  if (status === 'success') return (
    <div className="text-center py-10">
      <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.3)' }}>✅</div>
      <p className="font-display font-bold text-xl mb-2" style={{ color: '#F0F4FF' }}>You&apos;re Enrolled!</p>
      <p className="text-sm" style={{ color: 'rgba(240,244,255,0.45)' }}>We&apos;ll contact you within 24 hours.</p>
      <p className="text-xs mt-2" style={{ color: '#F59E0B' }}>আমরা শীঘ্রই যোগাযোগ করব।</p>
    </div>
  )

  return (
    <div className="space-y-4">
      {[['name', 'Full Name * / পূর্ণ নাম', 'text', 'Md. Rahim Uddin'], ['email', 'Email * / ইমেইল', 'email', 'your@email.com'], ['phone', 'Phone * / ফোন', 'text', '+880 17xx-xxxxxx']].map(([name, label, type, ph]) => (
        <div key={name}>
          <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'rgba(240,244,255,0.4)' }}>{label}</label>
          <input name={name} type={type} value={form[name as keyof typeof form]} onChange={change} placeholder={ph} className="form-field" />
        </div>
      ))}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'rgba(240,244,255,0.4)' }}>Message (optional)</label>
        <textarea name="message" value={form.message} onChange={change} rows={3} placeholder="Preferred schedule..." className="form-field resize-none" />
      </div>
      <button onClick={submit} disabled={status === 'sending' || !form.name || !form.email || !form.phone}
        className="btn-liquid btn-liquid-primary w-full justify-center" style={{ opacity: (status === 'sending' || !form.name || !form.email || !form.phone) ? 0.4 : 1 }}>
        {status === 'sending' ? 'Submitting...' : 'Enroll Now — ভর্তি হন'}
        {status === 'idle' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
      </button>
      {status === 'error' && <p className="text-xs text-center" style={{ color: '#f87171' }}>Something went wrong. Please call us.</p>}
    </div>
  )
}
