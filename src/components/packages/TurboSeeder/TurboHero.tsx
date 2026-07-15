'use client'

import { useState, useRef } from 'react'
import data from '@/data/turbo-seeder.json'

const CMD = data.install

export function TurboHero() {
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
    <section className="ts-hero reveal">
      <div className="ts-hero-grid">
        {/* left — copy */}
        <div>
          <div className="ts-hero-eyebrow">
            <span className="ts-hero-dot" aria-hidden />
            OPEN SOURCE · PHP / LARAVEL PACKAGE
          </div>

          <h1 className="ts-hero-h1">
            Laravel<br />
            <span className="ts-hero-accent">Turbo Seeder</span>
          </h1>

          <p className="ts-hero-tagline">
            Seed <strong style={{ color: 'var(--ink-0)' }}>millions of records in seconds</strong> — not minutes.
            A high-performance database seeder built for production-scale data generation with minimal time and memory.
          </p>

          {/* metric badges */}
          <div className="ts-metrics">
            {data.metrics.map((m) => (
              <div key={m.label} className={`ts-metric${m.accent ? ' ts-metric-accent-bg' : ''}`}>
                <span className={`ts-metric-val${m.accent ? ' ts-metric-val-accent' : ''}`}>
                  {m.value}
                </span>
                <span className="ts-metric-key">{m.label}</span>
              </div>
            ))}
          </div>

          {/* install command */}
          <div
            className="ts-install"
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
        </div>

        {/* right — terminal */}
        <div>
          <div className="ts-terminal">
            <div className="ts-terminal-chrome">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" style={{ opacity: 0.7 }} />
              <span className="ts-terminal-title">{data.terminal.title}</span>
            </div>
            <pre className="ts-terminal-body">
              <span style={{ color: 'var(--accent)' }}>❯</span>{' '}
              {'php artisan turbo-seeder:run UsersTurboSeeder\n'}
              <span style={{ color: 'var(--ink-2)' }}>→ table</span>
              {' users  '}
              <span style={{ color: 'var(--ink-2)' }}>strategy</span>
              {' csv  '}
              <span style={{ color: 'var(--ink-2)' }}>count</span>
              {' 1,000,000\n\n'}
              {'['}
              <span style={{ color: 'var(--crimson)' }}>{data.terminal.progressBar}</span>
              {'] '}
              {data.terminal.progressPct}
              {'\n\n'}
              <span style={{ color: '#2ecc71' }}>{'✓ done'}</span>
              {'  '}
              <span style={{ color: 'var(--ink-2)' }}>inserted</span>
              {' 1,000,000 rows\n  '}
              <span style={{ color: 'var(--ink-2)' }}>time</span>
              {' '}
              <span style={{ color: 'var(--ink-0)' }}>{data.terminal.seedTime}</span>
              {'   '}
              <span style={{ color: 'var(--ink-2)' }}>mem</span>
              {' '}
              <span style={{ color: 'var(--ink-0)' }}>{data.terminal.seedMem}</span>
              {'\n  '}
              <span style={{ color: 'var(--ink-2)' }}>rate</span>
              {' '}
              <span style={{ color: 'var(--accent)' }}>{data.terminal.seedRate}</span>
              <span className="ts-terminal-caret" aria-hidden />
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
