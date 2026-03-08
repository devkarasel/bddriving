'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from './CustomCursor'

const PHONE = '+8801911082536'
const EMAIL = 'info@bddriving.com'
const MAPS_URL = 'https://www.google.com/maps/search/BD+Driving+School+Nikunja+2+Khilkhet+Dhaka'
const GOOGLE_REVIEW_URL = 'https://www.google.com/maps/search/BD+Driving+School+Nikunja+2+Khilkhet+Dhaka'

const DEFAULT_COURSES = [
  { _id: '1', icon: '🚗', title: 'Car Driving — Beginner', titleBn: 'গাড়ি চালানো — শিক্ষার্থী', description: 'Complete beginner course covering manual & automatic, traffic rules, and road safety.', price: 8000, duration: '30 Days', slug: 'car-driving-beginner' },
  { _id: '2', icon: '🏍️', title: 'Motorcycle Training', titleBn: 'মোটরসাইকেল প্রশিক্ষণ', description: 'Comprehensive two-wheeler training for scooters, bikes, and heavy motorcycles.', price: 5000, duration: '15 Days', slug: 'motorcycle-training' },
  { _id: '3', icon: '🚛', title: 'Commercial Vehicle', titleBn: 'বাণিজ্যিক যানবাহন', description: 'Professional bus, truck & delivery vehicle training with job placement support.', price: 15000, duration: '45 Days', slug: 'commercial-vehicle' },
]

const GOOGLE_REVIEWS = [
  { name: 'Sabbir Ahmed', rating: 5, text: 'ONE OF THE BEST DRIVING SCHOOL. My instructor Anowar Hossain sir was incredibly patient and professional. Passed on first attempt!', time: '2 months ago', avatar: 'S' },
  { name: 'Md. Rakibul Islam', rating: 5, text: 'Excellent training environment. The instructors are very professional and knowledgeable. I passed my BRTA test on the first attempt after training here.', time: '3 months ago', avatar: 'R' },
  { name: 'Nusrat Jahan', rating: 5, text: 'Very good driving school in Dhaka. The staff is helpful and the training was thorough. They helped with the BRTA license process as well. Worth every taka!', time: '1 month ago', avatar: 'N' },
  { name: 'Tanvir Hossain', rating: 5, text: 'I completed my car driving course here. The instructor was very calm and taught me everything step by step. The vehicles are well maintained.', time: '4 months ago', avatar: 'T' },
  { name: 'Farhan Kabir', rating: 4, text: 'Good driving school near Nikunja. Instructors are experienced and friendly. The schedule is flexible which was great for me as a working professional.', time: '5 months ago', avatar: 'F' },
  { name: 'Anika Rahman', rating: 5, text: 'Best decision I made was enrolling here. Theory and practical classes are well balanced. I now drive confidently on Dhaka roads. Thank you!', time: '2 months ago', avatar: 'A' },
]

const FEATURES = [
  { icon: '🎓', title: 'BRTA Certified', bn: 'বিআরটিএ অনুমোদিত', desc: 'Fully approved by Bangladesh Road Transport Authority.' },
  { icon: '👨‍🏫', title: 'Expert Instructors', bn: 'অভিজ্ঞ প্রশিক্ষক', desc: 'Trained, licensed professionals with years of experience.' },
  { icon: '🚗', title: 'Modern Fleet', bn: 'আধুনিক গাড়ি', desc: 'Late-model vehicles with dual controls for safe learning.' },
  { icon: '📋', title: 'License Assistance', bn: 'লাইসেন্স সহায়তা', desc: 'Full BRTA license application support step by step.' },
  { icon: '🏆', title: '98% Pass Rate', bn: 'সাফল্যের হার', desc: 'Proven results across 10,000+ successful graduates.' },
  { icon: '💼', title: 'Job Placement', bn: 'চাকরি সহায়তা', desc: 'Career support for graduates in professional driving.' },
]

// Scroll reveal wrapper
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 3D tilt card
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`
  }
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)'
  }
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)', willChange: 'transform' }}
      className={className}>
      {children}
    </div>
  )
}

export default function HomeClient({ courses }: { courses: Record<string, string | number>[] }) {
  const displayCourses = courses.length > 0 ? courses : DEFAULT_COURSES
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <div className="min-h-screen" style={{ background: '#070B14', color: '#F0F4FF' }}>
      <CustomCursor />
      <Navbar />

      {/* ── HERO ── */}
      <motion.section ref={heroRef} style={{ opacity: heroOpacity }} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #F59E0B, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10"
            style={{ background: 'radial-gradient(circle, #3B82F6, transparent 70%)' }} />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-24">
          {/* Left — text */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="section-label mb-6"
            >
              BRTA Approved · বিআরটিএ অনুমোদিত
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(52px, 7vw, 90px)' }}
            >
              <span style={{ color: '#F0F4FF' }}>Master the</span><br />
              <span className="text-gold-gradient">Art of</span><br />
              <span style={{ color: '#F0F4FF' }}>Driving</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg mb-2 leading-relaxed max-w-md"
              style={{ color: 'rgba(240,244,255,0.6)' }}
            >
              Bangladesh&apos;s most trusted driving school. Professional training for cars, motorcycles, and commercial vehicles.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm mb-10 font-display"
              style={{ color: '#F59E0B' }}
            >
              আত্মনির্ভরশীলতা বাড়াতে ড্রাইভিং শিখুন
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/courses" className="btn-liquid btn-liquid-primary">
                Explore Courses
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <a href={`tel:${PHONE}`} className="btn-liquid btn-liquid-ghost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.18 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                Call Us Now
              </a>
            </motion.div>
          </div>

          {/* Right — steering wheel + stats */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Big steering wheel decoration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute opacity-10"
              style={{ width: 420, height: 420 }}
            >
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="90" stroke="#F59E0B" strokeWidth="6"/>
                <circle cx="100" cy="100" r="25" stroke="#F59E0B" strokeWidth="4"/>
                <line x1="100" y1="10" x2="100" y2="75" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round"/>
                <line x1="100" y1="125" x2="100" y2="190" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round"/>
                <line x1="10" y1="100" x2="75" y2="100" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round"/>
                <line x1="125" y1="100" x2="190" y2="100" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round"/>
                <line x1="26.9" y1="26.9" x2="72.8" y2="72.8" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
                <line x1="173.1" y1="26.9" x2="127.2" y2="72.8" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
                <line x1="26.9" y1="173.1" x2="72.8" y2="127.2" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
                <line x1="173.1" y1="173.1" x2="127.2" y2="127.2" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 relative z-10">
              {[
                { num: '10K+', label: 'Students Trained', bn: 'শিক্ষার্থী' },
                { num: '15+', label: 'Years Experience', bn: 'বছরের অভিজ্ঞতা' },
                { num: '4.8★', label: 'Google Rating', bn: 'গুগল রেটিং' },
                { num: '98%', label: 'Pass Rate', bn: 'সাফল্যের হার' },
              ].map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-card p-6 text-center"
                >
                  <p className="font-display font-black text-3xl text-gold-gradient mb-1">{s.num}</p>
                  <p className="text-xs font-semibold font-display" style={{ color: 'rgba(240,244,255,0.8)' }}>{s.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(240,244,255,0.35)' }}>{s.bn}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-xs tracking-widest font-display" style={{ color: 'rgba(255,255,255,0.3)' }}>SCROLL</p>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(245,158,11,0.5)" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ── FEATURES ── */}
      <section className="py-28 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="section-label justify-center mb-4">Why Choose Us / কেন আমাদের বেছে নেবেন</p>
              <h2 className="font-display font-black text-5xl md:text-6xl" style={{ color: '#F0F4FF' }}>
                The BD Driving <span className="text-gold-gradient">Difference</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <TiltCard>
                  <div className="glass-card p-7 h-full">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                      style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                      {f.icon}
                    </div>
                    <h3 className="font-display font-bold text-lg mb-1" style={{ color: '#F0F4FF' }}>{f.title}</h3>
                    <p className="text-xs mb-3 font-display font-semibold" style={{ color: '#F59E0B' }}>{f.bn}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,244,255,0.5)' }}>{f.desc}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section className="py-28 relative">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.04) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <Reveal>
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="section-label mb-4">Courses / কোর্সসমূহ</p>
                <h2 className="font-display font-black text-5xl md:text-6xl" style={{ color: '#F0F4FF' }}>
                  Popular <span className="text-gold-gradient">Courses</span>
                </h2>
              </div>
              <Link href="/courses" className="btn-liquid btn-liquid-ghost hidden md:flex">All Courses →</Link>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {displayCourses.map((course, i) => (
              <Reveal key={String(course._id)} delay={i * 0.1}>
                <TiltCard>
                  <Link href={`/courses/${course.slug}`} className="glass-card block p-7 group h-full" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
                        style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                        {String(course.icon || '🚗')}
                      </div>
                      <span className="text-xs font-semibold font-display px-3 py-1.5 rounded-full"
                        style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)' }}>
                        {String(course.duration || '')}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl mb-1" style={{ color: '#F0F4FF' }}>{String(course.title)}</h3>
                    <p className="text-xs mb-4 font-semibold font-display" style={{ color: '#F59E0B' }}>{String(course.titleBn || '')}</p>
                    <p className="text-sm leading-relaxed mb-6 line-clamp-2" style={{ color: 'rgba(240,244,255,0.45)' }}>{String(course.description || '')}</p>
                    <div className="flex items-center justify-between pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="font-display font-black text-3xl text-gold-gradient">৳{Number(course.price).toLocaleString()}</span>
                      <span className="text-sm font-semibold font-display group-hover:text-gold transition-colors" style={{ color: 'rgba(240,244,255,0.5)' }}>
                        Enroll →
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link href="/courses" className="btn-liquid btn-liquid-ghost">All Courses →</Link>
          </div>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS ── */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <p className="section-label mb-4">Google Reviews / গুগল রিভিউ</p>
                <h2 className="font-display font-black text-5xl md:text-6xl" style={{ color: '#F0F4FF' }}>
                  What Students <span className="text-gold-gradient">Say</span>
                </h2>
                <div className="flex items-center gap-3 mt-5">
                  <div className="flex gap-1">{[1,2,3,4,5].map(i => <span key={i} style={{ color: '#F59E0B', fontSize: 20 }}>★</span>)}</div>
                  <span className="font-display font-black text-2xl" style={{ color: '#F0F4FF' }}>4.8</span>
                  <span className="text-sm" style={{ color: 'rgba(240,244,255,0.4)' }}>Google Reviews</span>
                </div>
              </div>
              <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="btn-liquid btn-liquid-primary self-start">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Write a Review
              </a>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GOOGLE_REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.07}>
                <div className="glass-card p-6 relative overflow-hidden h-full">
                  <div className="absolute top-4 right-4 opacity-10">
                    <svg width="28" height="28" viewBox="0 0 48 48"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.32-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.68 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18V14.12H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.34-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.34 5.7C13.42 14.62 18.27 10.75 24 10.75z"/></svg>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-night text-sm flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #FCD34D, #F59E0B)' }}>
                      {r.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-sm font-display" style={{ color: '#F0F4FF' }}>{r.name}</p>
                      <p className="text-xs" style={{ color: 'rgba(240,244,255,0.35)' }}>{r.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: r.rating }).map((_, i) => <span key={i} style={{ color: '#F59E0B', fontSize: 13 }}>★</span>)}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,244,255,0.55)' }}>{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="text-center mt-10">
              <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="btn-liquid btn-liquid-ghost">
                See All Reviews on Google →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT + MAP ── */}
      <section className="py-28 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.06) 0%, transparent 60%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <Reveal>
            <div className="text-center mb-16">
              <p className="section-label justify-center mb-4">Find Us / আমাদের খুঁজুন</p>
              <h2 className="font-display font-black text-5xl md:text-6xl" style={{ color: '#F0F4FF' }}>
                Our <span className="text-gold-gradient">Location</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <Reveal>
              <div className="space-y-4">
                {/* Phone */}
                <a href={`tel:${PHONE}`} className="glass-card flex items-center gap-4 p-5 group" style={{ textDecoration: 'none' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.3)' }}>📞</div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#4ade80' }}>Tap to Call</p>
                    <p className="font-display font-bold text-lg group-hover:text-gold transition-colors" style={{ color: '#F0F4FF' }}>{PHONE}</p>
                    <p className="text-xs" style={{ color: 'rgba(240,244,255,0.35)' }}>Opens phone dialpad</p>
                  </div>
                </a>

                {/* Email */}
                <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`} target="_blank" rel="noopener noreferrer"
                  className="glass-card flex items-center gap-4 p-5 group" style={{ textDecoration: 'none' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)' }}>📧</div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#f87171' }}>Click to Email</p>
                    <p className="font-display font-bold text-lg group-hover:text-gold transition-colors" style={{ color: '#F0F4FF' }}>{EMAIL}</p>
                    <p className="text-xs" style={{ color: 'rgba(240,244,255,0.35)' }}>Opens Gmail compose</p>
                  </div>
                </a>

                {/* Address */}
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
                  className="glass-card flex items-center gap-4 p-5 group" style={{ textDecoration: 'none' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: 'rgba(29,78,216,0.15)', border: '1px solid rgba(29,78,216,0.3)' }}>📍</div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#60a5fa' }}>Open in Maps</p>
                    <p className="font-display font-bold text-base group-hover:text-gold transition-colors leading-snug" style={{ color: '#F0F4FF' }}>House-20, Road-05, Nikunja-2<br />Khilkhet, Dhaka-1229</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(240,244,255,0.35)' }}>নিকুঞ্জ-২, খিলক্ষেত, ঢাকা-১২২৯</p>
                  </div>
                </a>

                {/* Hours */}
                <div className="glass-card flex items-center gap-4 p-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}>🕐</div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#F59E0B' }}>Office Hours</p>
                    <p className="font-display font-bold text-base" style={{ color: '#F0F4FF' }}>Saturday – Thursday: 8AM – 6PM</p>
                    <p className="text-xs" style={{ color: 'rgba(240,244,255,0.35)' }}>শনি–বৃহস্পতি: সকাল ৮টা – সন্ধ্যা ৬টা</p>
                  </div>
                </div>

                <Link href="/contact" className="btn-liquid btn-liquid-primary w-full justify-center">
                  Send Us a Message →
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <iframe
                  title="BD Driving School Nikunja-2 Dhaka"
                  src="https://maps.google.com/maps?q=BD+Driving+School+Nikunja+2+Khilkhet+Dhaka&output=embed&z=16"
                  width="100%" height="480"
                  style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <Reveal>
        <section className="py-24 mx-6 mb-10 rounded-3xl relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0.05) 100%)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.1) 0%, transparent 70%)' }} />
          <div className="relative text-center max-w-2xl mx-auto px-6">
            <h2 className="font-display font-black text-5xl md:text-6xl mb-4" style={{ color: '#F0F4FF' }}>Ready to <span className="text-gold-gradient">Drive?</span></h2>
            <p className="mb-8" style={{ color: 'rgba(240,244,255,0.55)' }}>আজই ভর্তি হন এবং আত্মবিশ্বাসী চালক হয়ে উঠুন!</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/courses" className="btn-liquid btn-liquid-primary">Enroll Today</Link>
              <a href={`tel:${PHONE}`} className="btn-liquid btn-liquid-ghost">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.18 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                Call Now
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      <Footer />
    </div>
  )
}
