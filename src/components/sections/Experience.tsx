'use client'

import { useState, useEffect, useRef } from 'react'
import { SFX } from '@/lib/sfx'
import type { Experience as ExperienceType } from '@/types'
import rawExperiences from '@/data/experiences.json'

const EXPERIENCES = rawExperiences as ExperienceType[]

function yearLabel(entry: ExperienceType): string {
  if (entry.status === 'current') return 'NOW'
  const m = entry.period.match(/(\d{4})/g)
  return m ? m[m.length - 1] : entry.period
}

export function Experience() {
  const initial = Math.max(0, EXPERIENCES.findIndex((it) => it.status === 'current'))
  const [active, setActive] = useState(initial)
  const [flashKey, setFlashKey] = useState(0)
  const cardRef = useRef<HTMLElement>(null)
  const it = EXPERIENCES[active] ?? EXPERIENCES[0]

  const select = (i: number) => {
    if (i === active) return
    setActive(i)
    setFlashKey((k) => k + 1)
    SFX.play('tick')
  }

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    el.classList.remove('is-flashing')
    void el.offsetWidth
    el.classList.add('is-flashing')
  }, [flashKey])

  const [typed, setTyped] = useState('')
  const tRef = useRef(0)
  useEffect(() => {
    if (!it) return
    setTyped('')
    tRef.current = 0
    const full = it.blurb
    const id = setInterval(() => {
      tRef.current += 2
      if (tRef.current >= full.length) {
        setTyped(full)
        clearInterval(id)
      } else {
        setTyped(full.slice(0, tRef.current))
      }
    }, 12)
    return () => clearInterval(id)
  }, [active, it?.blurb])

  if (!it) return null

  return (
    <section id="experience" className="section" aria-label="Career and experience">
      <div className="section-head">
        <div>
          <div className="section-num">// 03 / CAREER_LOG</div>
          <h2 className="h-display section-title">Career &amp; experience.</h2>
        </div>
        <div className="section-aside">
          <p>Jobholder, not a freelancer. Day job at FIGLAB, evenings in the Laravel source. Hover an entry to load its record.</p>
        </div>
      </div>

      <div className="exp-shell">
        <ol className="exp-index" role="listbox" aria-label="Career timeline">
          {EXPERIENCES.map((entry, i) => {
            const isActive = i === active
            return (
              <li
                key={i}
                className={[
                  'exp-index-row',
                  isActive ? 'is-active' : '',
                  entry.status === 'current' ? 'is-current' : '',
                ].filter(Boolean).join(' ')}
                onMouseEnter={() => select(i)}
                onClick={() => select(i)}
                role="option"
                aria-selected={isActive}
                data-cursor="hover"
              >
                <span className="exp-index-marker" aria-hidden>
                  <span className="exp-marker-dot" />
                  {i < EXPERIENCES.length - 1 && <span className="exp-marker-line" />}
                </span>
                <div className="exp-index-body">
                  <div className="exp-index-year">{yearLabel(entry)}</div>
                  <div className="exp-index-role">{entry.role}</div>
                  <div className="exp-index-co">
                    <span className="exp-index-arrow">›</span> {entry.company}
                  </div>
                </div>
                <span className="exp-index-glyph" aria-hidden>
                  {entry.status === 'current' ? '●' : isActive ? '▸' : '·'}
                </span>
              </li>
            )
          })}
        </ol>

        <article className="exp-card glass" ref={cardRef} aria-live="polite">
          <header className="exp-card-head">
            <div className="exp-card-meta">
              <span className="exp-card-tag">{`> entry [${String(active + 1).padStart(2, '0')}/${String(EXPERIENCES.length).padStart(2, '0')}]`}</span>
              <span className="exp-card-status">
                <span className={`status-dot status-${it.status}`} />
                {it.status === 'current' ? 'active · current role'
                  : it.status === 'active' ? 'active · ongoing'
                  : 'archived'}
              </span>
            </div>
            <div className="exp-card-period">{it.period}</div>
          </header>

          <div className="exp-card-body">
            <div className="exp-card-co-row">
              <div className="exp-card-co">{it.company}</div>
              <div className="exp-card-loc">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {it.location}
              </div>
            </div>
            <h3 className="exp-card-role">{it.role}</h3>
            <p className="exp-card-blurb">
              {typed}
              {typed.length < it.blurb.length && <span className="exp-cursor" aria-hidden>▌</span>}
            </p>
            <div className="exp-card-tags">
              {it.tags.map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </div>
          </div>

          <footer className="exp-card-foot">
            <span className="exp-card-id">id:0x{(0xC0DE + active * 17).toString(16).toUpperCase()}</span>
            <span className="exp-card-hint">[ hover to focus ]</span>
          </footer>

          <span className="exp-card-scan" aria-hidden />
          <span className="exp-card-noise" aria-hidden />
        </article>
      </div>
    </section>
  )
}
