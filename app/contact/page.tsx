'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

const PHONE = '+8801911082536'
const EMAIL = 'info@bddriving.com'
const MAPS_URL = 'https://www.google.com/maps/search/BD+Driving+School+Nikunja+2+Khilkhet+Dhaka'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', phone: '', course: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <div style={{ background: '#070B14', color: '#F0F4FF', minHeight: '100vh' }}>
      <CustomCursor />
      <Navbar />

      <section className="pt-36 pb-16 relative" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 40% 50%, rgba(59,130,246,0.08) 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <p className="section-label mb-4">Contact / যোগাযোগ</p>
          <h1 className="font-display font-black leading-none mb-4" style={{ fontSize: 'clamp(48px, 7vw, 80px)', color: '#F0F4FF' }}>
            Get In <span className="text-gold-gradient">Touch</span>
          </h1>
          <p style={{ color: 'rgba(240,244,255,0.5)' }}>Enroll or ask us anything — we respond within 24 hours.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.6fr] gap-12">
          <div className="space-y-4">
            <h2 className="font-display font-bold text-2xl mb-5" style={{ color: '#F0F4FF' }}>Contact Information</h2>

            <a href={`tel:${PHONE}`} className="glass-card flex items-center gap-4 p-5 group" style={{ textDecoration: 'none' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.3)' }}>📞</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#4ade80' }}>Tap to Call</p>
                <p className="font-display font-bold text-lg group-hover:text-gold transition-colors" style={{ color: '#F0F4FF' }}>{PHONE}</p>
                <p className="text-xs" style={{ color: 'rgba(240,244,255,0.35)' }}>Opens phone dialpad</p>
              </div>
            </a>

            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`} target="_blank" rel="noopener noreferrer"
              className="glass-card flex items-center gap-4 p-5 group" style={{ textDecoration: 'none' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)' }}>📧</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#f87171' }}>Click to Email</p>
                <p className="font-display font-bold text-lg group-hover:text-gold transition-colors" style={{ color: '#F0F4FF' }}>{EMAIL}</p>
                <p className="text-xs" style={{ color: 'rgba(240,244,255,0.35)' }}>Opens Gmail compose</p>
              </div>
            </a>

            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
              className="glass-card flex items-center gap-4 p-5 group" style={{ textDecoration: 'none' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(29,78,216,0.15)', border: '1px solid rgba(29,78,216,0.3)' }}>📍</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#60a5fa' }}>Open in Maps</p>
                <p className="font-display font-bold text-base group-hover:text-gold transition-colors leading-snug" style={{ color: '#F0F4FF' }}>House-20, Road-05, Nikunja-2<br />Khilkhet, Dhaka-1229</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(240,244,255,0.35)' }}>নিকুঞ্জ-২, খিলক্ষেত, ঢাকা-১২২৯</p>
              </div>
            </a>

            <div className="glass-card flex items-center gap-4 p-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}>🕐</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#F59E0B' }}>Office Hours</p>
                <p className="font-display font-bold text-base" style={{ color: '#F0F4FF' }}>Saturday – Thursday: 8AM – 6PM</p>
                <p className="text-xs" style={{ color: 'rgba(240,244,255,0.35)' }}>শনি–বৃহস্পতি: সকাল ৮টা – সন্ধ্যা ৬টা</p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <iframe title="BD Driving School" src="https://maps.google.com/maps?q=BD+Driving+School+Nikunja+2+Khilkhet+Dhaka&output=embed&z=16"
                width="100%" height="240" style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>

          <div className="glass-card p-8">
            <h2 className="font-display font-bold text-2xl mb-2" style={{ color: '#F0F4FF' }}>Send a Message</h2>
            <p className="text-sm mb-7" style={{ color: 'rgba(240,244,255,0.45)' }}>We&apos;ll get back to you within 24 hours. আমরা যোগাযোগ করব।</p>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'rgba(240,244,255,0.4)' }}>Full Name *</label>
                  <input name="name" value={form.name} onChange={change} placeholder="Your full name" className="form-field" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'rgba(240,244,255,0.4)' }}>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={change} placeholder="your@email.com" className="form-field" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'rgba(240,244,255,0.4)' }}>Phone</label>
                  <input name="phone" value={form.phone} onChange={change} placeholder="+880 17xx-xxxxxx" className="form-field" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'rgba(240,244,255,0.4)' }}>Interested Course</label>
                  <select name="course" value={form.course} onChange={change} className="form-field">
                    <option value="">Select a course</option>
                    <option>Car Driving — Beginner</option>
                    <option>Car Driving — Advanced</option>
                    <option>Motorcycle Training</option>
                    <option>Commercial Vehicle</option>
                    <option>Women&apos;s Special Course</option>
                    <option>Refresher Course</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'rgba(240,244,255,0.4)' }}>Message *</label>
                <textarea name="message" value={form.message} onChange={change} rows={5} placeholder="Tell us about your requirements..." className="form-field resize-none" />
              </div>
              <div>
                <button onClick={submit} disabled={status === 'sending' || !form.name || !form.email || !form.message}
                  className="btn-liquid btn-liquid-primary w-full justify-center" style={{ opacity: (status === 'sending' || !form.name || !form.email || !form.message) ? 0.4 : 1 }}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  {status === 'idle' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>}
                </button>
                {status === 'success' && <div className="rounded-xl p-4 text-center text-sm font-semibold mt-3" style={{ background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.3)', color: '#4ade80' }}>✓ Message sent! We&apos;ll contact you within 24 hours.</div>}
                {status === 'error' && <div className="rounded-xl p-4 text-center text-sm font-semibold mt-3" style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', color: '#f87171' }}>Something went wrong. Please call us directly.</div>}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
