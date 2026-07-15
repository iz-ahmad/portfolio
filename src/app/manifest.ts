import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nafis Ahmad · Software Engineer',
    short_name: 'Nafis Ahmad',
    description:
      'I build interfaces and APIs that feel alive - Laravel under the hood, React/Vue on the top',
    start_url: '/',
    display: 'standalone',
    background_color: '#050510',
    theme_color: '#050510',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
