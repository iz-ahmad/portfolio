'use client'

import { useEffect, useRef, useState } from 'react'
import type { Testimonial } from '@/types'
import rawTestimonials from '@/data/testimonials.json'

const TESTIMONIALS = rawTestimonials as Testimonial[]

function SignalBars({ strength = 'full' }: { strength?: 'full' | 'med' | 'weak' }) {
  const cls = strength === 'weak' ? 'tx-signal weak'
            : strength === 'med'  ? 'tx-signal med'
            : 'tx-signal'
  return <span className={cls} aria-hidden><span /><span /><span /><span /></span>
}

function initialsOf(who: string): string {
  return who.split(/\s+/).map((p) => p[0]).join('').slice(0, 2).toUpperCase()
}

export function Testimonials() {
  const wrapRef  = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const wrap  = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return
    if (!window.matchMedia('(min-width: 1024px)').matches) return

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect()
      const total = wrap.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / total))
      setProgress(p)
      const pRight = parseFloat(getComputedStyle(track).paddingRight) || 0
      const dist = track.scrollWidth + pRight - window.innerWidth + 80
      track.style.transform = `translate3d(${-p * dist}px,0,0)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const idx = Math.round(progress * Math.max(0, TESTIMONIALS.length - 1)) + 1

  return (
    <section ref={wrapRef} id="testimonials" className="tx-wrap" data-mode="live"
             aria-label="Recommendations">
      <div className="tx-sticky">
        <div className="tx-header">
          <div className="tx-header-left">
            <h2 className="h-display section-title">Voices from the Network.</h2>
          </div>
          <div className="tx-progress"
               aria-label={`Transmission ${idx} of ${TESTIMONIALS.length}`}>
            <span className="tx-progress-label">INCOMING · SIGNAL LOCKED</span>
            <div className="tx-progress-bar" aria-hidden>
              <div className="tx-progress-fill" style={{ width: `${progress * 100}%` }} />
            </div>
            <div className="tx-progress-meta">
              <span>{String(idx).padStart(2, '0')}</span>
              <span className="muted"> / {String(TESTIMONIALS.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        <div className="tx-track-wrap">
          <div ref={trackRef} className="tx-track" role="list">
            {TESTIMONIALS.map((t, i) => (
              <article key={i} className="tx-card" data-cursor="hover" role="listitem">
                <div className="tx-card-head">
                  <span className="tx-id">TX_{String(i + 1).padStart(3, '0')}</span>
                  <span>{t.channel ?? 'INTERNAL'}</span>
                  <SignalBars strength={t.signal ?? 'full'} />
                </div>
                <div className="tx-card-body">
                  <span className="tx-mark" aria-hidden>&ldquo;</span>
                  <blockquote className="tx-quote">{t.quote}</blockquote>
                  <div className="tx-meta-row">
                    <span className="tx-decoded">Decoded · {t.quote.length} chars</span>
                    <span className="tx-length">REL · 09:14</span>
                  </div>
                </div>
                <div className="tx-card-foot">
                  <span className="tx-avatar" aria-hidden>{t.initials ?? initialsOf(t.who)}</span>
                  <div>
                    <div className="tx-who">{t.who}</div>
                    <div className="tx-role"><span>@</span> {t.role}</div>
                  </div>
                </div>
              </article>
            ))}
            <div className="tx-end">
              <div className="hud-label">// END_OF_FEED</div>
              <div className="tx-end-msg">
                More on file. <a href="#contact" className="link">Get in touch.</a>
              </div>
            </div>
          </div>
        </div>

        <div className="tx-scroll-hint" aria-hidden>SCROLL ↓ TO ADVANCE FEED</div>
      </div>
    </section>
  )
}
