import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

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
  title: 'Nafis Ahmad · Software Engineer',
  description: 'I build interfaces and APIs that feel alive - Laravel under the hood, React on top, motion in the cracks.',
  icons: {
    icon: '/favicon.jpg',
  },
  openGraph: {
    title: 'Nafis Ahmad · Software Engineer',
    description: 'I build interfaces and APIs that feel alive - Laravel under the hood, React on top, motion in the cracks.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a href="#home" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  )
}
