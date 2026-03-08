import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://bddriving.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://bddriving.com/courses', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://bddriving.com/blog', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: 'https://bddriving.com/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
