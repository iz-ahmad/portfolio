import type { Metadata } from 'next'
import Link from 'next/link'
import '@/styles/turbo-seeder.css'

import { BgGrid } from '@/components/ambient/BgGrid'
import { Scanlines } from '@/components/ambient/Scanlines'
import { TurboHero } from '@/components/packages/TurboSeeder/TurboHero'
import { TurboProblem } from '@/components/packages/TurboSeeder/TurboProblem'
import { TurboHowFast } from '@/components/packages/TurboSeeder/TurboHowFast'
import { TurboQuickStart } from '@/components/packages/TurboSeeder/TurboQuickStart'
import { TurboChoices } from '@/components/packages/TurboSeeder/TurboChoices'
import { TurboFeatures } from '@/components/packages/TurboSeeder/TurboFeatures'
import { TurboFAQ } from '@/components/packages/TurboSeeder/TurboFAQ'
import { TurboFooterCta } from '@/components/packages/TurboSeeder/TurboFooterCta'
import { RevealObserver } from '@/components/packages/TurboSeeder/RevealObserver'
import { CursorMount } from '@/components/packages/TurboSeeder/CursorMount'
import data from '@/data/turbo-seeder.json'

export const metadata: Metadata = {
  title: 'Laravel Turbo Seeder — seed millions of records in seconds',
  description:
    'A high-performance Laravel database seeder for production-scale data generation — 1M+ records in ~20s with under 200MB memory.',
  keywords: [
    'Laravel Turbo Seeder',
    'Laravel seeder',
    'database seeder',
    'PHP seeder',
    'bulk insert Laravel',
    'CSV import Laravel',
    'production seed',
    'high performance seeder',
  ],
  alternates: { canonical: '/packages/turbo-seeder' },
  openGraph: {
    title: 'Laravel Turbo Seeder — seed millions of records in seconds',
    description:
      'A high-performance Laravel database seeder for production-scale data generation — 1M+ records in ~20s with under 200MB memory.',
    type: 'website',
  },
}

export default function TurboSeederPage() {
  return (
    <div className="ts-page">
      <BgGrid />
      <div className="bg-noise" aria-hidden />
      <Scanlines />

      <div className="ts-inner">
        {/* nav */}
        <header className="ts-nav">
          <Link href="/" className="ts-breadcrumb" aria-label="Return to portfolio home">
            <span className="ts-breadcrumb-dot" aria-hidden />
            <span style={{ color: 'var(--ink-2)' }}>iz-ahmad</span>
            <span style={{ color: 'var(--ink-3)' }}>/</span>
            <span style={{ color: 'var(--ink-2)' }}>packages</span>
            <span style={{ color: 'var(--ink-3)' }}>/</span>
            <span style={{ color: 'var(--ink-0)' }}>turbo-seeder</span>
          </Link>

          <nav className="ts-nav-actions" aria-label="Page navigation">
            <a
              href={data.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn ts-nav-btn"
            >
              GitHub ↗
            </a>
            <a
              href="#start"
              className="btn btn-primary ts-nav-btn"
            >
              Get started
            </a>
          </nav>
        </header>

        <main id="main-content">
          <RevealObserver />
          <CursorMount />
          <TurboHero />
          <TurboProblem />
          <TurboHowFast />
          <TurboQuickStart />
          <TurboChoices />
          <TurboFeatures />
          <TurboFAQ />
          <TurboFooterCta />
        </main>
      </div>
    </div>
  )
}
