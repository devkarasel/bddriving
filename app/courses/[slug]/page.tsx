import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import { getCollection } from '@/lib/db'
import type { Metadata } from 'next'
import EnrollForm from './EnrollForm'

interface CourseData {
  icon: string; title: string; titleBn: string; description: string
  price: number; duration: string; sessions: string; slug: string
  published: boolean; order: number; highlights?: string[]
  schedule?: string; certificate?: string; includes?: string[]
}

const DEFAULT_COURSES: Record<string, CourseData> = {
  'car-driving-beginner': { icon: '🚗', title: 'Car Driving — Beginner', titleBn: 'গাড়ি চালানো — শিক্ষার্থী', description: 'Our beginner car driving course is perfect for those who have never sat behind the wheel. You will learn everything from vehicle controls to confident road driving.', price: 8000, duration: '30 Days', sessions: '20 Sessions', slug: 'car-driving-beginner', published: true, order: 1, highlights: ['Manual & automatic transmission', 'Traffic rules & road signs', 'Parking & reversing techniques', 'Highway & city driving', 'Emergency braking & safety', 'BRTA license test preparation'], schedule: 'Morning (8AM–10AM) / Evening (5PM–7PM)', certificate: 'BRTA-recognized completion certificate', includes: ['Theory classes (5 sessions)', 'Practical training (15 sessions)', 'License test guidance', 'Study materials & handbook'] },
  'car-driving-advanced': { icon: '🚗', title: 'Car Driving — Advanced', titleBn: 'গাড়ি চালানো — উন্নত', description: 'For drivers who have basic skills but want to sharpen their techniques. Master defensive driving, high-speed control, and complex maneuvers.', price: 6000, duration: '20 Days', sessions: '15 Sessions', slug: 'car-driving-advanced', published: true, order: 2, highlights: ['Defensive driving techniques', 'High-speed highway control', 'Night driving confidence', 'Emergency maneuver mastery', 'Fuel-efficient driving', 'Advanced parking techniques'], schedule: 'Morning (8AM–10AM) / Evening (5PM–7PM)', certificate: 'Advanced Driver Certificate', includes: ['Advanced theory (3 sessions)', 'Practical driving (12 sessions)', 'Personal performance report', 'Defensive driving handbook'] },
  'motorcycle-training': { icon: '🏍️', title: 'Motorcycle Training', titleBn: 'মোটরসাইকেল প্রশিক্ষণ', description: 'Comprehensive two-wheeler training for scooters, standard bikes, and heavy motorcycles. Learn safe riding with proper gear and road awareness.', price: 5000, duration: '15 Days', sessions: '12 Sessions', slug: 'motorcycle-training', published: true, order: 3, highlights: ['Scooter & manual bike training', 'Balance & low-speed control', 'Cornering & braking techniques', 'Gear usage & engine management', 'Traffic navigation on two wheels', 'Motorcycle license preparation'], schedule: 'Morning (8AM–10AM) / Afternoon (3PM–5PM)', certificate: 'BRTA Motorcycle License Support', includes: ['Safety gear provided', 'Theory (3 sessions)', 'Practical riding (9 sessions)', 'Road test preparation'] },
  'commercial-vehicle': { icon: '🚛', title: 'Commercial Vehicle', titleBn: 'বাণিজ্যিক যানবাহন', description: 'Professional training for bus, truck, and commercial transport operators. Includes cargo handling, passenger safety, and commercial license support.', price: 15000, duration: '45 Days', sessions: '30 Sessions', slug: 'commercial-vehicle', published: true, order: 4, highlights: ['Bus & minibus operation', 'Heavy truck & lorry training', 'Cargo loading & weight management', 'Passenger safety protocols', 'Route planning & navigation', 'Job placement assistance'], schedule: 'Full day: 8AM–2PM', certificate: 'Professional Commercial Driver Certificate', includes: ['Full theory curriculum', '25 practical sessions', 'License application help', 'Job placement assistance'] },
  'womens-special-course': { icon: '👩', title: "Women's Special Course", titleBn: 'মহিলাদের বিশেষ কোর্স', description: 'Designed for women with female instructors. Learn in a safe, comfortable environment with flexible scheduling to fit your lifestyle.', price: 7000, duration: '25 Days', sessions: '18 Sessions', slug: 'womens-special-course', published: true, order: 5, highlights: ['Female-only instructor team', 'Flexible morning & evening batches', 'Safe & comfortable environment', 'Manual & automatic car options', 'Confidence building techniques', 'BRTA license guidance'], schedule: 'Women-only batches: 9AM–11AM / 6PM–8PM', certificate: 'BRTA-recognized completion certificate', includes: ['Theory (5 sessions)', 'Practical training (13 sessions)', 'License guidance', 'Personal driving assessment'] },
  'refresher-course': { icon: '🔄', title: 'Refresher Course', titleBn: 'রিফ্রেশার কোর্স', description: 'Already licensed but feeling rusty? Brush up on updated traffic rules, new road regulations, and confidence-building practice sessions.', price: 3000, duration: '10 Days', sessions: '8 Sessions', slug: 'refresher-course', published: true, order: 6, highlights: ['Updated traffic law review', 'Confidence rebuilding sessions', 'Parallel parking & tight maneuvers', 'Defensive driving recap', 'Highway driving practice', 'Personal skill assessment'], schedule: 'Flexible scheduling available', certificate: 'Refresher Completion Certificate', includes: ['Updated traffic rules handbook', 'Skill assessment (2 sessions)', 'Practical driving (6 sessions)', 'Personal feedback report'] },
}

async function getCourse(slug: string): Promise<CourseData | null> {
  try {
    const col = await getCollection('courses')
    const course = await col.findOne({ slug, published: true })
    if (course) return { ...course, _id: undefined } as unknown as CourseData
  } catch { /* fall through */ }
  return DEFAULT_COURSES[slug] || null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const course = await getCourse(slug)
  if (!course) return { title: 'Course Not Found' }
  return { title: `${course.title} — BD Driving School`, description: course.description }
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = await getCourse(slug)
  if (!course) notFound()

  return (
    <div style={{ background: '#070B14', color: '#F0F4FF', minHeight: '100vh' }}>
      <CustomCursor />
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-14 relative" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(245,158,11,0.08) 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/courses" className="font-display font-semibold transition-colors hover:text-gold" style={{ color: 'rgba(240,244,255,0.4)', textDecoration: 'none' }}>Courses</Link>
            <span style={{ color: 'rgba(240,244,255,0.2)' }}>/</span>
            <span className="font-display font-semibold" style={{ color: '#F59E0B' }}>{course.title}</span>
          </div>
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl hidden md:flex items-center justify-center text-5xl flex-shrink-0"
              style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
              {course.icon}
            </div>
            <div>
              <p className="section-label mb-3">Course Details / কোর্সের বিবরণ</p>
              <h1 className="font-display font-black leading-none mb-2" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#F0F4FF' }}>
                {course.title}
              </h1>
              <p className="font-display font-semibold mb-4" style={{ color: '#F59E0B' }}>{course.titleBn}</p>
              <p className="max-w-2xl leading-relaxed" style={{ color: 'rgba(240,244,255,0.5)' }}>{course.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Course Fee', value: `৳${course.price.toLocaleString()}`, color: '#F59E0B' },
            { label: 'Duration', value: course.duration, color: '#60a5fa' },
            { label: 'Sessions', value: course.sessions, color: '#4ade80' },
            { label: 'Schedule', value: course.schedule || 'Flexible', color: '#c084fc' },
          ].map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-wider mb-1 font-display" style={{ color: 'rgba(240,244,255,0.35)' }}>{s.label}</p>
              <p className="font-display font-bold text-xl" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.3fr_1fr] gap-12">
          {/* Left */}
          <div className="space-y-10">
            {course.highlights && (
              <div>
                <p className="section-label mb-6">What You&apos;ll Learn / যা শিখবেন</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.highlights.map((h) => (
                    <div key={h} className="glass-card flex items-start gap-3 p-4">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)' }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'rgba(240,244,255,0.7)' }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {course.includes && (
              <div>
                <p className="section-label mb-5">What&apos;s Included / অন্তর্ভুক্ত</p>
                <ul className="space-y-3">
                  {course.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 px-5 py-4 rounded-xl"
                      style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}>
                      <span style={{ color: '#F59E0B' }}>→</span>
                      <span className="text-sm font-medium" style={{ color: 'rgba(240,244,255,0.75)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {course.certificate && (
              <div className="flex items-start gap-4 p-6 rounded-2xl"
                style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <span className="text-3xl">🏆</span>
                <div>
                  <p className="font-display font-bold mb-1" style={{ color: '#F0F4FF' }}>Certificate Awarded</p>
                  <p className="text-sm" style={{ color: '#F59E0B' }}>{course.certificate}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right: Enroll Form */}
          <div>
            <div className="glass-card p-8 sticky top-28">
              <p className="section-label mb-2">Enroll Now / ভর্তি হন</p>
              <h2 className="font-display font-bold text-2xl mb-1" style={{ color: '#F0F4FF' }}>Reserve Your Spot</h2>
              <p className="text-sm mb-6" style={{ color: 'rgba(240,244,255,0.4)' }}>We&apos;ll contact you within 24 hours. আমরা যোগাযোগ করব।</p>
              <div className="flex items-center justify-between mb-7 p-4 rounded-xl"
                style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <div>
                  <p className="text-xs font-semibold mb-0.5 font-display" style={{ color: 'rgba(240,244,255,0.4)' }}>Course Fee</p>
                  <p className="font-display font-black text-3xl text-gold-gradient">৳{course.price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold" style={{ color: '#60a5fa' }}>{course.duration}</p>
                  <p className="text-sm" style={{ color: 'rgba(240,244,255,0.45)' }}>{course.sessions}</p>
                </div>
              </div>
              <EnrollForm courseTitle={course.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Other Courses */}
      <section className="py-14 mx-6 mb-10 rounded-3xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl" style={{ color: '#F0F4FF' }}>Other Courses</h2>
            <Link href="/courses" className="text-sm font-semibold font-display transition-colors hover:text-gold" style={{ color: '#F59E0B', textDecoration: 'none' }}>View All →</Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {Object.values(DEFAULT_COURSES).filter(c => c.slug !== slug).slice(0, 3).map((c) => (
              <Link href={`/courses/${c.slug}`} key={c.slug} className="glass-card block p-5 group" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>{c.icon}</div>
                  <span className="text-xs font-semibold font-display px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)' }}>{c.duration}</span>
                </div>
                <p className="font-display font-bold text-sm mb-0.5 group-hover:text-gold transition-colors" style={{ color: '#F0F4FF' }}>{c.title}</p>
                <p className="text-xs mb-3 font-semibold font-display" style={{ color: '#F59E0B' }}>{c.titleBn}</p>
                <p className="font-display font-black text-xl text-gold-gradient">৳{c.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
