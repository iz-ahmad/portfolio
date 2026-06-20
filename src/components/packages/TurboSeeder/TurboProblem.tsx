'use client'

import { useEffect, useRef, useState } from 'react'
import data from '@/data/turbo-seeder.json'

type RaceState = 'idle' | 'running' | 'done'

const STD_DUR  = 5200  // ms — Standard animates over this duration
const TURBO_DUR = 900  // ms — Turbo animates over this duration
const STD_SECS  = 1800 // 30:00 in seconds
const TURBO_SECS = 15  // 00:15 in seconds

function fmt(s: number): string {
  s = Math.max(0, Math.round(s))
  const m  = String(Math.floor(s / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${m}:${ss}`
}

export function TurboProblem() {
  const [state, setState] = useState<RaceState>('idle')

  const stdClockRef  = useRef<HTMLDivElement>(null)
  const turboClockRef = useRef<HTMLDivElement>(null)
  const stdFillRef   = useRef<HTMLDivElement>(null)
  const turboFillRef = useRef<HTMLDivElement>(null)
  const rafRef       = useRef<number>(0)
  const wrapRef      = useRef<HTMLDivElement>(null)
  const hasAutoRun   = useRef(false)

  function resetTimers() {
    if (stdClockRef.current)   stdClockRef.current.textContent  = '00:00'
    if (turboClockRef.current) turboClockRef.current.textContent = '00:00'
    if (stdFillRef.current)    stdFillRef.current.style.transform  = 'scaleX(0)'
    if (turboFillRef.current)  turboFillRef.current.style.transform = 'scaleX(0)'
  }

  function runRace() {
    cancelAnimationFrame(rafRef.current)
    resetTimers()
    setState('running')

    const t0 = performance.now()

    const tick = (now: number) => {
      const elapsed = now - t0
      const ps = Math.min(1, elapsed / STD_DUR)
      const pt = Math.min(1, elapsed / TURBO_DUR)

      if (stdFillRef.current)   stdFillRef.current.style.transform   = `scaleX(${ps})`
      if (turboFillRef.current) turboFillRef.current.style.transform  = `scaleX(${pt})`
      if (stdClockRef.current)  stdClockRef.current.textContent       = fmt(ps * STD_SECS)
      if (turboClockRef.current) turboClockRef.current.textContent    = fmt(pt * TURBO_SECS)

      if (ps < 1 || pt < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setState('done')
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }

  // Auto-run once on scroll into view
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    resetTimers()

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAutoRun.current) {
          hasAutoRun.current = true
          runRace()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(rafRef.current) }
  }, [])

  const stdStatus   = state === 'done' ? 'done'       : state === 'running' ? 'seeding…'    : 'ready'
  const turboStatus = state === 'done' ? '✓ done'     : state === 'running' ? 'streaming…'  : 'ready'
  const turboRate   = state === 'done' ? '✓ 1,000,000 rows · 67,540 rows/s'
                    : state === 'running' ? 'streaming to disk…' : 'press run to race'
  const btnLabel    = state === 'running' ? '↻ Racing…' : '▶ Run the race'

  return (
    <section className="ts-section reveal">
      <div className="ts-eyebrow">
        <span className="ts-eyebrow-label">01 / THE PROBLEM</span>
        <span className="ts-eyebrow-line" aria-hidden />
      </div>

      <h2 className="ts-section-h2">Default seeders weren't built for scale.</h2>

      <p className="ts-problem-sub">
        Seeding 500K–1M+ records for realistic load testing can take{' '}
        <strong style={{ color: 'var(--ink-0)' }}>30+ minutes</strong> and unbounded memory —
        slowing every iteration. Turbo Seeder eliminates that bottleneck.
      </p>

      {/* race card */}
      <div ref={wrapRef} className="ts-race-wrap">
        <div className="ts-race-header">
          <span className="ts-race-label">
            <span className="ts-race-label-dot" aria-hidden />
            Head-to-head · 1,000,000 rows
          </span>
          <button
            className="ts-run-btn"
            onClick={runRace}
            disabled={state === 'running'}
            aria-label="Run the benchmark race"
          >
            {btnLabel}
          </button>
        </div>

        <div className="ts-race">
          {/* Standard */}
          <div className="ts-race-card">
            <div className="ts-race-card-head">
              <span className="ts-race-name">Standard Laravel</span>
              <span className="ts-status-chip">
                <span className="ts-status-dot" aria-hidden />
                {stdStatus}
              </span>
            </div>
            <div className="ts-race-sub">factory()-&gt;create()</div>
            <div ref={stdClockRef} className="ts-clock" aria-live="polite" aria-label="Standard seeder timer">
              00:00
            </div>
            <div className="ts-race-caption">≈ 30 minutes of waiting</div>
            <div className="ts-bar-track" role="progressbar" aria-hidden>
              <div ref={stdFillRef} className="ts-bar-fill" />
            </div>
          </div>

          {/* Multiplier */}
          <div className="ts-vs" aria-hidden>
            <div className="ts-vs-num">120×</div>
            <div className="ts-vs-label">faster</div>
          </div>

          {/* Turbo */}
          <div className="ts-race-card ts-race-card-turbo">
            <div className="ts-race-card-head">
              <span className="ts-race-name ts-race-name-turbo">Turbo Seeder</span>
              <span className="ts-status-chip ts-status-chip-turbo">
                <span className={`ts-status-dot${state !== 'idle' ? ' ts-status-dot-accent' : ''}`} aria-hidden />
                {turboStatus}
              </span>
            </div>
            <div className="ts-race-sub" style={{ color: '#9a9ab0' }}>CSV strategy</div>
            <div
              ref={turboClockRef}
              className="ts-clock ts-clock-accent"
              aria-live="polite"
              aria-label="Turbo seeder timer"
            >
              00:00
            </div>
            <div className="ts-race-caption">≈ 15 seconds, done</div>
            <div className="ts-bar-track" role="progressbar" aria-hidden>
              <div ref={turboFillRef} className="ts-bar-fill ts-bar-fill-turbo" />
            </div>
            <div className="ts-turbo-rate" aria-live="polite">{turboRate}</div>
          </div>
        </div>

        {/* comparison table */}
        <div className="ts-cmp-table" role="table" aria-label="Performance comparison">
          <div className="ts-cmp-row ts-cmp-row-header" role="row">
            <div className="ts-cmp-cell-head" role="columnheader">Scenario · 1M rows</div>
            <div className="ts-cmp-cell-head ts-cmp-head-std" role="columnheader">Standard</div>
            <div className="ts-cmp-cell-head ts-cmp-head-turbo" role="columnheader">Turbo Seeder</div>
          </div>
          {data.comparisonTable.map((row) => (
            <div key={row.scenario} className="ts-cmp-row" role="row">
              <div className="ts-cmp-cell" role="cell">{row.scenario}</div>
              <div className="ts-cmp-cell-std" role="cell">{row.standard}</div>
              <div className="ts-cmp-cell-turbo" role="cell">{row.turbo}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
