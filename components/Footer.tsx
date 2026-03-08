import Link from 'next/link'

const PHONE = '+01911082536'
const EMAIL = 'info@bddriving.com'
const MAPS_URL = 'https://www.google.com/maps/search/BD+Driving+School+Nikunja+2+Khilkhet+Dhaka'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t" style={{ background: '#070B14', borderColor: 'rgba(255,255,255,0.06)' }}>
      {/* Glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-night text-base"
                style={{ background: 'linear-gradient(135deg, #FCD34D, #F59E0B)' }}>BD</div>
              <div>
                <p className="font-display font-bold text-white text-base leading-none">BD Driving</p>
                <p className="text-[10px] text-gold tracking-widest mt-0.5">SCHOOL</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
              BRTA-approved professional driving school. Trusted by 10,000+ students since 2008.
            </p>
            <p className="text-xs text-gold/60">বাংলাদেশের সেরা ড্রাইভিং স্কুল</p>
          </div>

          <div>
            <p className="font-display font-semibold text-white/90 text-xs tracking-widest uppercase mb-5">Navigate</p>
            <ul className="space-y-3">
              {[['Home', '/'], ['Courses', '/courses'], ['Blog', '/blog'], ['Contact', '/contact']].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm transition-colors hover:text-gold" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display font-semibold text-white/90 text-xs tracking-widest uppercase mb-5">Courses</p>
            <ul className="space-y-3">
              {['Car — Beginner', 'Car — Advanced', 'Motorcycle', 'Commercial Vehicle', "Women's Special"].map((c) => (
                <li key={c}><Link href="/courses" className="text-sm transition-colors hover:text-gold" style={{ color: 'rgba(255,255,255,0.45)' }}>{c}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display font-semibold text-white/90 text-xs tracking-widest uppercase mb-5">Contact</p>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-sm transition-colors hover:text-gold" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
                  <span>📞</span> {PHONE}
                </a>
              </li>
              <li>
                <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-gold" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
                  <span>📧</span> {EMAIL}
                </a>
              </li>
              <li>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm transition-colors hover:text-gold" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
                  <span className="mt-0.5">📍</span>
                  <span>House-20, Road-05,<br />Nikunja-2, Dhaka-1229</span>
                </a>
              </li>
              <li className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>🕐 Sat–Thu: 8AM–6PM</li>
            </ul>
          </div>
        </div>

        <div className="glow-line mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>© {year} BD Driving School. All rights reserved. BRTA Approved.</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>সর্বস্বত্ব সংরক্ষিত · বাংলাদেশ</p>
        </div>
      </div>
    </footer>
  )
}
