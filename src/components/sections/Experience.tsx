'use client'

import { useEffect, useRef } from 'react'
import type { Experience as ExperienceType } from '@/types'
import rawExperiences from '@/data/experiences.json'

const EXPERIENCES = rawExperiences as ExperienceType[]

function yearLabel(e: ExperienceType): string {
  if (e.status === 'current') return 'NOW'
  const m = e.period.match(/(\d{4})/g)
  return m ? m[m.length - 1] : e.period
}

function fileSlug(co: string): string {
  return co.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function Experience() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const rows = root.querySelectorAll<HTMLElement>('.exp2-row')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )
    rows.forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [])

  return (
    <section id="experience" className="section" aria-label="Career and experience">
      <div className="section-head">
        <div>
          <h2 className="h-display section-title">Career &amp; experience.</h2>
        </div>
        <div className="section-aside">
          <p>Jobholder, not a freelancer. Day job at FIGLAB, evenings in the
          Laravel source. Scroll to load the records.</p>
        </div>
      </div>

      <div className="exp2-meta">
        <span className="exp2-meta-dot">REC // CAREER_LOG · {EXPERIENCES.length} ENTRIES</span>
        <div className="exp2-meta-cluster">
          <span>RANGE <b>2018→NOW</b></span>
          <span>STATUS <b>ACTIVE</b></span>
          <span>FMT <b>ASCII/UTF-8</b></span>
        </div>
      </div>

      <div className="exp2" ref={rootRef} data-mode="reveal">
        {EXPERIENCES.map((e, i) => {
          const idHex = (0xC0DE + i * 17).toString(16).toUpperCase()
          const path  = `/career/${fileSlug(e.company)}.md`
          return (
            <article
              key={e.company + e.period}
              className={[
                'exp2-row',
                e.status === 'current' ? 'is-current' : '',
                e.status === 'active'  ? 'is-active'  : '',
              ].filter(Boolean).join(' ')}
              data-cursor="hover"
            >
              <div className="exp2-rail">
                <div className="exp2-period">{e.period}</div>
                <span className="exp2-year">{yearLabel(e)}</span>
                <span className="exp2-status">
                  {e.status === 'current' ? 'Active · Current'
                    : e.status === 'active' ? 'Active'
                    : 'Archived'}
                </span>
                <span className="exp2-loc">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {e.location}
                </span>
              </div>

              <div className="exp2-body">
                <div className="exp2-co-row">
                  <h3 className="exp2-co">{e.company}</h3>
                  <span className="exp2-id">ID <b>0x{idHex}</b></span>
                </div>
                <div className="exp2-role">›&nbsp;{e.role}</div>
                <p className="exp2-blurb">{e.blurb}</p>
                <div className="exp2-tags">
                  {e.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
                <div className="exp2-foot">
                  <span className="exp2-foot-path"><span>$</span> cat {path}</span>
                  <span className="exp2-foot-arrow">[ view record → ]</span>
                </div>
              </div>

              {i < EXPERIENCES.length - 1 && <span className="exp2-thread" aria-hidden />}
            </article>
          )
        })}
      </div>
    </section>
  )
}
