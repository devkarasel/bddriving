'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const py = useTransform(scrollY, [0, 80], [20, 10])
  const bg = useTransform(scrollY, [0, 80], ['rgba(7,11,20,0)', 'rgba(7,11,20,0.85)'])
  const blur = useTransform(scrollY, [0, 80], [0, 20])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
      style={{
        paddingTop: py, paddingBottom: py,
        backgroundColor: bg,
        backdropFilter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none',
        borderBottomColor: useTransform(scrollY, [0, 80], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.06)']),
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-night text-base"
            style={{ background: 'linear-gradient(135deg, #FCD34D, #F59E0B)' }}>
            BD
          </div>
          <div>
            <p className="font-display font-bold text-white text-base leading-none tracking-wide">BD Driving</p>
            <p className="text-[10px] text-gold tracking-widest font-display">SCHOOL</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="text-sm font-medium text-white/70 hover:text-gold transition-colors duration-200 tracking-wide font-display">
              {l.label}
            </Link>
          ))}
          <Link href="/courses" className="btn-liquid btn-liquid-primary text-sm px-6 py-2.5">
            Enroll Now
          </Link>
        </nav>

        {/* Mobile */}
        <button className="md:hidden text-white/60 hover:text-gold transition-colors" onClick={() => setOpen(!open)}>
          {open
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          }
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mx-4 mt-2 rounded-2xl border border-glass-border p-6 flex flex-col gap-5"
          style={{ background: 'rgba(13,19,33,0.95)', backdropFilter: 'blur(20px)' }}
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-base font-display font-semibold text-white/80 hover:text-gold transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/courses" onClick={() => setOpen(false)} className="btn-liquid btn-liquid-primary self-start text-sm">
            Enroll Now
          </Link>
        </motion.div>
      )}
    </motion.header>
  )
}
