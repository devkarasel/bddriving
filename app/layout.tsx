import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://bddriving.com'),
  title: { default: 'BD Driving School — বাংলাদেশের সেরা ড্রাইভিং স্কুল', template: '%s | BD Driving School' },
  description: "Bangladesh's premier BRTA-approved driving school. Professional car, motorcycle & commercial vehicle training in Dhaka.",
  keywords: ['driving school bangladesh', 'ড্রাইভিং স্কুল', 'BRTA driving license', 'car training dhaka'],
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    siteName: 'BD Driving School',
    title: 'BD Driving School — বাংলাদেশের সেরা ড্রাইভিং স্কুল',
    description: 'BRTA-approved professional driving training in Bangladesh.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'DrivingSchool',
          name: 'BD Driving School',
          url: 'https://bddriving.com',
          description: 'BRTA-approved professional driving school in Bangladesh',
          address: { '@type': 'PostalAddress', streetAddress: 'House-20, Road-05, Nikunja-2, Khilkhet', addressLocality: 'Dhaka', postalCode: '1229', addressCountry: 'BD' },
          telephone: '+8801911082536',
          email: 'info@bddriving.com',
        })}} />
      </head>
      <body style={{ background: '#070B14' }}>
        {children}
      </body>
    </html>
  )
}
