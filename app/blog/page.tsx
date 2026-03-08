import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import { getCollection } from '@/lib/db'
import type { Metadata } from 'next'

interface Blog {
  _id: string
  title: string
  titleBn?: string
  excerpt?: string
  content?: string
  category: string
  slug: string
  published?: boolean
  createdAt?: string
}

export const metadata: Metadata = {
  title: 'Blog — ড্রাইভিং টিপস ও খবর',
  description: 'Driving tips, road safety guides from BD Driving School.',
}

const DEFAULT_POSTS: Blog[] = [
  { _id: '1', slug: 'brta-driving-test', title: 'How to Pass Your BRTA Driving Test First Time', titleBn: 'প্রথমবারেই বিআরটিএ পরীক্ষায় পাস করুন', excerpt: 'Essential tips to help you prepare and pass your Bangladesh driving license test on your first attempt.', category: 'Tips', createdAt: new Date().toISOString() },
  { _id: '2', slug: 'traffic-rules-bangladesh', title: 'Traffic Rules Every Driver Must Know in Bangladesh', titleBn: 'বাংলাদেশে প্রতিটি চালকের জানা উচিত ট্রাফিক নিয়ম', excerpt: 'A comprehensive guide to Bangladesh\'s traffic laws, road signs, and regulations every driver should know.', category: 'Guide', createdAt: new Date().toISOString() },
  { _id: '3', slug: 'defensive-driving-dhaka', title: 'Defensive Driving: Stay Safe on Dhaka Roads', titleBn: 'ঢাকার রাস্তায় নিরাপদ থাকুন', excerpt: 'Learn defensive driving techniques to keep yourself and others safe in Dhaka\'s challenging traffic conditions.', category: 'Safety', createdAt: new Date().toISOString() },
  { _id: '4', slug: 'womens-driving-license-guide', title: "Women's Guide to Getting a Driving License", titleBn: 'নারীদের ড্রাইভিং লাইসেন্স গাইড', excerpt: 'A step-by-step guide for women looking to get their driving license in Bangladesh with helpful tips.', category: 'Guide', createdAt: new Date().toISOString() },
  { _id: '5', slug: 'manual-vs-automatic', title: 'Manual vs Automatic Car: Which Should You Learn?', titleBn: 'ম্যানুয়াল না অটোমেটিক: কোনটি শিখবেন?', excerpt: 'Comparing manual and automatic transmission to help you decide which is best for you.', category: 'Tips', createdAt: new Date().toISOString() },
  { _id: '6', slug: 'road-safety-statistics', title: 'Road Safety Statistics in Bangladesh', titleBn: 'বাংলাদেশে সড়ক নিরাপত্তা পরিসংখ্যান', excerpt: 'Understanding road accident data and how proper driver training can make our roads safer.', category: 'Safety', createdAt: new Date().toISOString() },
]

const CAT_COLORS: Record<string, string> = {
  Tips: '#60a5fa', Guide: '#4ade80', Safety: '#f87171', News: '#fbbf24',
}

async function getPosts(): Promise<Blog[]> {
  try {
    const col = await getCollection('blogs')
    const posts = await col.find({ published: true }).sort({ createdAt: -1 }).toArray()
    if (posts.length === 0) return DEFAULT_POSTS
    return posts.map(p => ({ ...p, _id: p._id.toString() })) as Blog[]
  } catch { return DEFAULT_POSTS }
}

export default async function BlogPage() {
  const posts = await getPosts()
  const [featured, ...rest] = posts

  return (
    <div style={{ background: '#070B14', color: '#F0F4FF', minHeight: '100vh' }}>
      <CustomCursor />
      <Navbar />

      <section className="pt-36 pb-16 relative" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(245,158,11,0.06) 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <p className="section-label mb-4">Blog / ব্লগ</p>
          <h1 className="font-display font-black leading-none" style={{ fontSize: 'clamp(48px, 7vw, 80px)', color: '#F0F4FF' }}>
            Driving <span className="text-gold-gradient">Tips & Guides</span>
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {featured && (
            <div className="glass-card p-8 md:p-10 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full font-display"
                  style={{ background: `${CAT_COLORS[featured.category] || '#F59E0B'}20`, color: CAT_COLORS[featured.category] || '#F59E0B', border: `1px solid ${CAT_COLORS[featured.category] || '#F59E0B'}40` }}>
                  {featured.category}
                </span>
                <span className="text-xs" style={{ color: 'rgba(240,244,255,0.3)' }}>{new Date(featured.createdAt ?? '').toLocaleDateString('en-BD', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span className="text-xs font-bold font-display" style={{ color: '#F59E0B' }}>★ Featured</span>
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-2" style={{ color: '#F0F4FF' }}>{featured.title}</h2>
              <p className="text-sm font-semibold mb-4 font-display" style={{ color: '#F59E0B' }}>{featured.titleBn}</p>
              <p className="leading-relaxed max-w-2xl" style={{ color: 'rgba(240,244,255,0.5)' }}>{featured.excerpt}</p>
              <p className="mt-5 text-xs font-bold uppercase tracking-widest font-display" style={{ color: 'rgba(240,244,255,0.25)' }}>Full article coming soon</p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post) => {
              const color = CAT_COLORS[post.category] || '#F59E0B'
              return (
                <div key={post._id} className="glass-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full font-display"
                      style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
                      {post.category}
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(240,244,255,0.3)' }}>
                      {new Date(post.createdAt ?? '').toLocaleDateString('en-BD', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-lg mb-2 line-clamp-2" style={{ color: '#F0F4FF' }}>{post.title}</h2>
                  <p className="text-xs font-semibold mb-3 font-display" style={{ color: '#F59E0B' }}>{post.titleBn}</p>
                  <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'rgba(240,244,255,0.45)' }}>{post.excerpt}</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest font-display" style={{ color: 'rgba(240,244,255,0.2)' }}>Coming soon</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}