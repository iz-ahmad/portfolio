'use client'

import { useState, useRef, useEffect } from 'react'
import rawStack from '@/data/stack.json'

const STACK = rawStack as Record<string, string[]>
const TABS = Object.keys(STACK)

export function StackViz() {
  const [activeIdx, setActiveIdx] = useState(0)
  const wrapRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect()
      const total = wrap.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const p = Math.min(1, scrolled / total)
      const idx = Math.min(TABS.length - 1, Math.floor(p * TABS.length))
      setActiveIdx(idx)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const active = TABS[activeIdx]

  return (
    <section
      ref={wrapRef}
      id="stack"
      className="stack-wrap"
      aria-label="Tech stack"
    >
      <div className="stack-sticky">
        <div className="stack-inner section">
          <div className="section-head">
            <div>
              <div className="section-num">// 06 / STACK_VIZ</div>
              <h2 className="h-display section-title">The kit I reach for.</h2>
            </div>
            <div className="stack-tabs" role="tablist" aria-label="Stack categories">
              {TABS.map((k, i) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={active === k}
                  onClick={() => setActiveIdx(i)}
                  className={`stack-tab${active === k ? ' is-active' : ''}`}
                  data-cursor="hover"
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div className="stack-grid" role="tabpanel" aria-label={active} key={active}>
            {STACK[active]?.map((tool, i) => (
              <div
                key={tool}
                className="stack-cell glass"
                style={{ animationDelay: `${i * 55}ms` }}
                data-cursor="hover"
                data-cursor-label={tool}
              >
                <div className="stack-cell-glow" aria-hidden />
                <div className="stack-cell-name">{tool}</div>
                <div className="stack-cell-bar" aria-hidden>
                  <div className="stack-cell-fill" style={{ width: `${70 + (i * 7) % 25}%` }} />
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="stack-scroll-hint" aria-hidden>
          {activeIdx < TABS.length - 1
            ? `SCROLL ↓ · ${TABS[activeIdx + 1]}`
            : 'SCROLL ↓ TO CONTINUE'}
        </div>
      </div>
    </section>
  )
}
