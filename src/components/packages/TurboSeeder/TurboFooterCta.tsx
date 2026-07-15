'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import data from '@/data/turbo-seeder.json'

const CMD = data.install

export function TurboFooterCta() {
  const [copyLabel, setCopyLabel] = useState('Copy')
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  function handleCopy() {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    navigator.clipboard.writeText(CMD)
      .then(() => setCopyLabel('Copied ✓'))
      .catch(() => setCopyLabel('Failed. Try again.'))
      .finally(() => {
        clearTimeout(resetTimerRef.current)
        resetTimerRef.current = setTimeout(() => setCopyLabel('Copy'), 1600)
      })
  }

  return (
    <section className="ts-cta-section reveal">
      <div className="ts-cta-panel">
        <div className="ts-cta-glow" aria-hidden />
        <div className="ts-cta-content">
          <div className="ts-cta-eyebrow">
            <span className="ts-cta-eyebrow-dot" aria-hidden />
            Ready to seed at scale
          </div>

          <h2 className="ts-cta-h2">Stop waiting on your seeders.</h2>

          <p className="ts-cta-p">
            Install it, scaffold a seeder, and seed production-scale data in seconds.
            Free &amp; open source under MIT.
          </p>

          <div
            className="ts-cta-install"
            role="button"
            tabIndex={0}
            aria-label="Copy install command"
            onClick={handleCopy}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCopy() }}
          >
            <code>
              <span className="ts-install-sigil">$</span> composer require iz-ahmad/laravel-turbo-seeder
            </code>
            <span className="ts-copy-label">{copyLabel}</span>
          </div>

          <div className="ts-cta-actions">
            <a
              href={data.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View on GitHub ↗
            </a>
            <a
              href={data.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Read the docs
            </a>
          </div>
        </div>
      </div>

      <div className="ts-page-foot">
        <span className="ts-page-foot-left">
          Made with <span style={{ color: 'var(--red)' }}>♥</span> for the Laravel community
        </span>
        <Link href="/" className="ts-page-foot-back">← Back to portfolio</Link>
      </div>
    </section>
  )
}
