'use client'

import { useEffect, useRef, useState } from 'react'
import type { Project } from '@/types'
import rawProjects from '@/data/projects.json'

const PROJECTS = rawProjects as Project[]

// Pre-computed to avoid server/client floating-point mismatch
const BAR_ATTRS = [...Array(12)].map((_, i) => ({
  x: 20 + i * 24,
  y: Math.round((80 + Math.sin(i) * 30) * 1e6) / 1e6,
  h: Math.round((60 - Math.cos(i) * 30) * 1e6) / 1e6,
  op: 0.4 + (i % 3) * 0.2,
}))

function FilmMock({ idx }: { idx: number }) {
  const variants = [
    <svg key={0} viewBox="0 0 320 200" className="mock-svg" aria-hidden>
      <defs><linearGradient id="g1" x1="0" x2="1"><stop offset="0" stopColor="#ff2d3d" stopOpacity="0.4"/><stop offset="1" stopColor="#b8132a" stopOpacity="0.4"/></linearGradient></defs>
      <rect width="320" height="200" fill="url(#g1)" opacity="0.18"/>
      {BAR_ATTRS.map(({ x, y, h, op }, i) => (
        <rect key={i} x={x} y={y} width="16" height={h} fill="#ff2d3d" opacity={op}/>
      ))}
      <circle cx="240" cy="60" r="34" fill="none" stroke="#ff5a3c" strokeWidth="1.5" opacity="0.7"/>
      <circle cx="240" cy="60" r="20" fill="#ff5a3c" opacity="0.4"/>
    </svg>,
    <svg key={1} viewBox="0 0 320 200" className="mock-svg" aria-hidden>
      {[...Array(8)].map((_,i)=>(
        <rect key={i} x={16} y={20+i*20} width={120 + (i%3)*40} height="10" fill="#ff5a3c" opacity={0.15+(i%4)*0.18}/>
      ))}
    </svg>,
    <svg key={2} viewBox="0 0 320 200" className="mock-svg" aria-hidden>
      <path d="M 0 100 Q 80 40 160 100 T 320 100" fill="none" stroke="#b8132a" strokeWidth="1.2" opacity="0.7"/>
      <path d="M 0 120 Q 80 60 160 120 T 320 120" fill="none" stroke="#ff2d3d" strokeWidth="1.2" opacity="0.7"/>
    </svg>,
    <svg key={4} viewBox="0 0 320 200" className="mock-svg" aria-hidden>
      <polyline points="0,150 30,120 60,140 90,90 120,110 150,70 180,80 210,40 240,60 270,30 300,50 320,20" fill="none" stroke="#ff5a3c" strokeWidth="2"/>
      <polyline points="0,170 30,160 60,165 90,150 120,160 150,140 180,150 210,130 240,140 270,120 300,130 320,110" fill="none" stroke="#ff2d3d" strokeWidth="2"/>
    </svg>,
    <svg key={5} viewBox="0 0 320 200" className="mock-svg" aria-hidden>
      <text x="20" y="40" fontFamily="monospace" fontSize="10" fill="#b8132a">$ build</text>
      <text x="20" y="60" fontFamily="monospace" fontSize="10" fill="#fafafa" opacity="0.7">→ scanning 1,248 pages</text>
      <text x="20" y="80" fontFamily="monospace" fontSize="10" fill="#ff2d3d">→ rendered in 0.41s</text>
      <rect x="20" y="120" width="280" height="6" fill="#fff" fillOpacity="0.08"/>
      <rect x="20" y="120" width="260" height="6" fill="#ff5a3c"/>
    </svg>,
  ]

  return <>{variants[idx % variants.length]}</>
}

export function Projects() {
  const wrapRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(1)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    // Filmstrip scroll only on desktop; mobile/tablet use vertical card layout
    if (!window.matchMedia('(min-width: 1279px)').matches) return

    const bgEls = Array.from(track.querySelectorAll<HTMLDivElement>('.film-card-bg'))
    const fill = fillRef.current
    const max = Math.max(1, PROJECTS.length - 1)
    const pRight = parseFloat(getComputedStyle(track).paddingRight) || 0

    let wrapHeight = wrap.offsetHeight
    let trackWidth = track.scrollWidth
    let wrapTop = wrap.getBoundingClientRect().top + window.scrollY

    const handleResize = () => {
      wrapHeight = wrap.offsetHeight
      trackWidth = track.scrollWidth
      wrapTop = wrap.getBoundingClientRect().top + window.scrollY
    }

    let raf = 0
    let pending = false
    let lastIdx = -1

    const update = () => {
      pending = false
      const scrolled = window.scrollY - wrapTop
      const total = wrapHeight - window.innerHeight
      const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0

      const dist = trackWidth + pRight - window.innerWidth + 80
      track.style.transform = `translate3d(${-p * dist}px,0,0)`

      if (fill) fill.style.width = `${p * 100}%`

      for (let i = 0; i < bgEls.length; i++) {
        bgEls[i].style.transform = `translate3d(${(p - i / max) * 60}px,0,0)`
      }

      const nextIdx = Math.round(p * max) + 1
      if (nextIdx !== lastIdx) {
        lastIdx = nextIdx
        setIdx(nextIdx)
      }
    }

    const onScroll = () => {
      if (!pending) {
        pending = true
        raf = requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section ref={wrapRef} id="projects" className="filmstrip-wrap" aria-label="Selected work">
      <div className="filmstrip-sticky">
        <div className="filmstrip-header">
          <div>
            <h2 className="h-display section-title">Some of my works.</h2>
          </div>
          <div className="filmstrip-progress" aria-label={`Project ${idx} of ${PROJECTS.length}`}>
            <div className="fp-bar" aria-hidden>
              <div ref={fillRef} className="fp-fill" />
            </div>
            <div className="fp-meta">
              <span>{String(idx).padStart(2, '0')}</span>
              <span className="muted"> / {String(PROJECTS.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        <div className="filmstrip-track-wrap">
          <div ref={trackRef} className="filmstrip-track">
            {PROJECTS.map((p, i) => (
              <article key={p.id} className={`film-card film-${p.accent}`} data-cursor="hover" data-cursor-label="View project">
                <div className="film-card-bg" aria-hidden />
                <div className="film-card-num" aria-hidden>{String(i + 1).padStart(2, '0')}</div>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="film-card-link">
                  <div className="film-card-mock" aria-hidden>
                    <FilmMock idx={i} />
                  </div>
                  <div className="film-card-body glass">
                    <div className="film-meta">
                      <span className="hud-label">{p.year}</span>
                      <span className="muted">{p.role}</span>
                    </div>
                    <h3 className="film-title">{p.name}</h3>
                    <p className="film-desc">{p.desc}</p>
                    <div className="film-stack">
                      {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
                    </div>
                  </div>
                </a>
              </article>
            ))}
            <div className="film-end glass">
              <div className="hud-label">// END_OF_LOG</div>
              <div className="end-msg">More in private repos. <a href="#contact" className="link">Ask me.</a></div>
            </div>
          </div>
        </div>

        <div className="scroll-hint" aria-hidden>SCROLL ↓ TO ADVANCE FILM</div>
      </div>
    </section>
  )
}
