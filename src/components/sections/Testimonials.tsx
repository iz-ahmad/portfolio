'use client'

import { memo, useEffect, useRef, useState } from 'react'
import type { Testimonial } from '@/types'
import rawTestimonials from '@/data/testimonials.json'

const TESTIMONIALS = rawTestimonials as Testimonial[]

function SignalBars({ strength = 'full' }: { strength?: 'full' | 'med' | 'weak' }) {
  const cls = strength === 'weak' ? 'tx-signal weak'
            : strength === 'med'  ? 'tx-signal med'
            : 'tx-signal'
  return <span className={cls} aria-hidden><span /><span /><span /><span /></span>
}

function initialsOf(who: string) {
  return who.split(/\s+/).map(p => p[0]).join('').slice(0, 2).toUpperCase()
}

interface TxCardProps {
  t: Testimonial
  i: number
}

const TxCard = memo(function TxCard({ t, i }: TxCardProps) {
  return (
    <article className="tx-card" data-cursor="hover" role="listitem">
      <div className="tx-card-head">
        <span className="tx-id">TX_{String(i + 1).padStart(3, '0')}</span>
        <span>{t.channel ?? 'INTERNAL'}</span>
        <SignalBars strength={t.signal ?? 'full'} />
      </div>
      <div className="tx-card-body">
        <span className="tx-mark" aria-hidden>&ldquo;</span>
        <blockquote className={`tx-quote ${t.quote.length < 200 ? 'short-quote' : ''}`}>{t.quote}</blockquote>
        <div className="tx-meta-row">
          <span className="tx-decoded">
            Decoded · {t.quote.length} chars
          </span>
        </div>
      </div>
      <div className="tx-card-foot">
        {t.avatar ? (
          <img
            className="tx-avatar"
            src={`/images/avatars/${t.avatar}`}
            alt={t.who ?? ''}
            width={42}
            height={42}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="tx-avatar" aria-hidden>{t.initials ?? initialsOf(t.who)}</span>
        )}
        <div>
          <div className="tx-who">{t.who}</div>
          <div className="tx-role"><span>@</span> {t.role}</div>
        </div>
      </div>
    </article>
  )
})

export function Testimonials() {
  const wrapRef  = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const fillRef  = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(1)

  useEffect(() => {
    const wrap  = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return
    if (!window.matchMedia('(min-width: 1279px)').matches) return

    const fill = fillRef.current
    const max = Math.max(1, TESTIMONIALS.length - 1)
    const pRight = parseFloat(getComputedStyle(track).paddingRight) || 0

    let raf = 0
    let pending = false
    let lastIdx = -1

    const update = () => {
      pending = false
      const rect = wrap.getBoundingClientRect()
      const total = wrap.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0

      const dist = track.scrollWidth + pRight - window.innerWidth + 80
      track.style.transform = `translate3d(${-p * dist}px,0,0)`

      if (fill) fill.style.width = `${p * 100}%`

      const nextIdx = Math.round(p * max) + 1
      if (nextIdx !== lastIdx) {
        lastIdx = nextIdx
        setIdx(nextIdx)
      }
    }

    const onScroll = () => {
      if (pending) return
      pending = true
      raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

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
              <div ref={fillRef} className="tx-progress-fill" />
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
              <TxCard key={i} t={t} i={i} />
            ))}
            <div className="tx-end">
              <div className="hud-label">// END_OF_FEED</div>
              <div className="tx-end-msg">
                View full testimonials on <a href="https://www.linkedin.com/in/nafis-abdullah/" target="_blank" rel="noopener noreferrer" className="link">LinkedIn.</a>
              </div>
            </div>
          </div>
        </div>

        <div className="tx-scroll-hint" aria-hidden>SCROLL ↓ TO ADVANCE FEED</div>
      </div>
    </section>
  )
}
