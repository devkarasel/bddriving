import HomeClient from '@/components/HomeClient'
import { getCollection } from '@/lib/db'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BD Driving School — বাংলাদেশের সেরা ড্রাইভিং স্কুল',
  description: 'BRTA-approved professional driving school at Nikunja-2, Khilkhet, Dhaka. Car, motorcycle & commercial vehicle training.',
}

async function getFeaturedCourses() {
  try {
    const col = await getCollection('courses')
    const courses = await col.find({ published: true }).sort({ order: 1 }).limit(3).toArray()
    return courses.map(c => ({ ...c, _id: c._id.toString() }))
  } catch { return [] }
}

export default async function Home() {
  const courses = await getFeaturedCourses()
  return <HomeClient courses={courses} />
}
