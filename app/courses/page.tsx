import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import { getCollection } from '@/lib/db'
import type { Metadata } from 'next'

export const revalidate = 0

interface Course {
  _id: string
  icon: string
  title: string
  titleBn?: string
  description?: string
  price: number
  duration?: string
  sessions?: string
  slug: string
  published?: boolean
  order?: number
}

export const metadata: Metadata = {
  title: 'Driving Courses — কোর্সসমূহ',
  description: 'Browse all BD Driving School courses.',
}

const DEFAULT_COURSES: Course[] = [
  { _id: '1', icon: '🚗', title: 'Car Driving — Beginner', titleBn: 'গাড়ি চালানো — শিক্ষার্থী', description: 'Manual & automatic transmission, traffic rules, parking, and road safety from scratch.', price: 8000, duration: '30 Days', sessions: '20 Sessions', slug: 'car-driving-beginner' },
  { _id: '2', icon: '🚗', title: 'Car Driving — Advanced', titleBn: 'গাড়ি চালানো — উন্নত', description: 'High-speed control, defensive driving, emergency maneuvers, and highway driving.', price: 6000, duration: '20 Days', sessions: '15 Sessions', slug: 'car-driving-advanced' },
  { _id: '3', icon: '🏍️', title: 'Motorcycle Training', titleBn: 'মোটরসাইকেল প্রশিক্ষণ', description: 'Comprehensive two-wheeler training for scooters, bikes, and heavy motorcycles.', price: 5000, duration: '15 Days', sessions: '12 Sessions', slug: 'motorcycle-training' },
  { _id: '4', icon: '🚛', title: 'Commercial Vehicle', titleBn: 'বাণিজ্যিক যানবাহন', description: 'Professional bus, truck & delivery vehicle training. Job placement support included.', price: 15000, duration: '45 Days', sessions: '30 Sessions', slug: 'commercial-vehicle' },
  { _id: '5', icon: '👩', title: "Women's Special Course", titleBn: 'মহিলাদের বিশেষ কোর্স', description: 'Female instructors, flexible scheduling, safe and comfortable environment.', price: 7000, duration: '25 Days', sessions: '18 Sessions', slug: 'womens-special-course' },
  { _id: '6', icon: '🔄', title: 'Refresher Course', titleBn: 'রিফ্রেশার কোর্স', description: 'Update your skills with new traffic rules, defensive techniques, and practice sessions.', price: 3000, duration: '10 Days', sessions: '8 Sessions', slug: 'refresher-course' },
]

async function getCourses(): Promise<Course[]> {
  try {
    const col = await getCollection('courses')
    const courses = await col.find({ published: true }).sort({ order: 1 }).toArray()
    if (courses.length === 0) return DEFAULT_COURSES
    return courses.map(c => ({ ...c, _id: c._id.toString() })) as Course[]
  } catch { return DEFAULT_COURSES }
}

export default async function CoursesPage() {
  const courses = await getCourses()
  return (
    <div style={{ background: '#070B14', color: '#F0F4FF', minHeight: '100vh' }}>
      <CustomCursor />
      <Navbar />

      <section className="pt-36 pb-16 relative" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 60% 30%, rgba(245,158,11,0.08) 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <p className="section-label mb-4">All Courses / সকল কোর্স</p>
          <h1 className="font-display font-black leading-none mb-4" style={{ fontSize: 'clamp(48px, 7vw, 80px)', color: '#F0F4FF' }}>
            Choose Your <span className="text-gold-gradient">Path</span>
          </h1>
          <p style={{ color: 'rgba(240,244,255,0.5)' }} className="max-w-xl">সঠিক কোর্সটি বেছে নিন এবং আত্মবিশ্বাসী চালক হয়ে উঠুন।</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link href={`/courses/${course.slug}`} key={course._id}
              className="glass-card block p-7 group" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
                  style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                  {course.icon}
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold font-display px-3 py-1.5 rounded-full block mb-1"
                    style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)' }}>
                    {course.duration}
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(240,244,255,0.35)' }}>{course.sessions}</span>
                </div>
              </div>
              <h2 className="font-display font-bold text-xl mb-1" style={{ color: '#F0F4FF' }}>{course.title}</h2>
              <p className="text-xs mb-4 font-semibold font-display" style={{ color: '#F59E0B' }}>{course.titleBn}</p>
              <p className="text-sm leading-relaxed mb-6 line-clamp-2" style={{ color: 'rgba(240,244,255,0.45)' }}>{course.description}</p>
              <div className="flex items-center justify-between pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: 'rgba(240,244,255,0.35)' }}>Course Fee</p>
                  <span className="font-display font-black text-2xl text-gold-gradient">৳{course.price.toLocaleString()}</span>
                </div>
                <span className="text-sm font-semibold font-display group-hover:text-gold transition-colors" style={{ color: 'rgba(240,244,255,0.4)' }}>Enroll →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 mx-6 mb-10 rounded-3xl text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(245,158,11,0.04))', border: '1px solid rgba(245,158,11,0.15)' }}>
        <h2 className="font-display font-black text-4xl mb-3" style={{ color: '#F0F4FF' }}>Not Sure Which Course?</h2>
        <p className="mb-8" style={{ color: 'rgba(240,244,255,0.5)' }}>আমাদের সাথে যোগাযোগ করুন — we&apos;ll help you choose.</p>
        <Link href="/contact" className="btn-liquid btn-liquid-primary">Talk to an Advisor</Link>
      </section>
      <Footer />
    </div>
  )
}