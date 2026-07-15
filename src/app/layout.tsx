import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const SITE_URL = 'https://iz-ahmad.vercel.app'
const SITE_NAME = 'Portfolio of Nafis Ahmad'
const TITLE = 'Nafis Ahmad · Software Engineer'
const DESCRIPTION =
  'I build interfaces and APIs that feel alive - Laravel under the hood, React/Vue on the top'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Nafis Ahmad',
    'Nafis Abdullah',
    'Software Engineer',
    'Backend Engineer',
    'PHP',
    'Laravel',
    'React',
    'Vue',
    'API Developer',
    'Full Stack Developer',
    'Web Developer',
    'Dhaka',
  ],
  authors: [{ name: SITE_NAME, url: 'https://github.com/iz-ahmad' }],
  creator: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/large-preview.webp',
        width: 512,
        height: 512,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@iz_ahmad_',
    images: ['/large-preview.webp'],
  },
}

export const viewport: Viewport = {
  themeColor: '#050510',
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/large-preview.webp`,
  jobTitle: 'Software Engineer',
  worksFor: { '@type': 'Organization', name: 'Figlab' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dhaka',
    addressCountry: 'BD',
  },
  sameAs: [
    'https://github.com/iz-ahmad',
    'https://linkedin.com/in/nafis-abdullah/',
    'https://x.com/iz_ahmad_',
    'https://medium.com/@iz-ahmad',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a href="#home" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  )
}
