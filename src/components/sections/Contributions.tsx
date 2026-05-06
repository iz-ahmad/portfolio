'use client'

import { useEffect, useState } from 'react'
import type { ContributionGrid } from '@/types'
import profile from '@/data/profile.json'

interface ContributionsProps {
  data: ContributionGrid
}

export function Contributions({ data }: ContributionsProps) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = document.getElementById('contributions')
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRevealed(true); io.disconnect() }
    }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="contributions" className="section" aria-label="GitHub contribution graph">
      <div className="section-head">
        <div>
          <div className="section-num">// 08 / SIGNAL_LOG</div>
          <h2 className="h-display section-title">Last 12 months on GitHub.</h2>
        </div>
        <div className="section-aside">
          <p>Each cell is a day. Brighter = more commits. Streaks bloom in red.</p>
        </div>
      </div>

      <div className="contrib glass">
        <div className="contrib-grid" role="grid" aria-label="GitHub contributions" style={{ opacity: revealed ? 1 : 0, transition: 'opacity 600ms' }}>
          {data[0]?.map((_, c) => (
            <div key={c} className="contrib-col" role="row">
              {data.map((row, r) => {
                const cell = row[c] ?? { level: 0, count: 0 }
                const delay = revealed ? `${(c + r) * 8}ms` : '0ms'
                const label = cell.count === 0 ? 'No contributions' : `${cell.count} contribution${cell.count !== 1 ? 's' : ''}`
                return (
                  <div
                    key={r}
                    role="gridcell"
                    className={`contrib-cell lvl-${cell.level}`}
                    style={{
                      opacity: revealed ? 1 : 0,
                      transition: `opacity 400ms ${delay}, background-color 200ms`,
                    }}
                    data-cursor="hover"
                    data-cursor-label={label}
                    aria-label={label}
                  />
                )
              })}
            </div>
          ))}
        </div>
        <div className="contrib-foot">
          <div>
            <span className="muted">Less&nbsp;</span>
            {[0,1,2,3,4].map((l) => (
              <span key={l} className={`contrib-cell lvl-${l} sm`} aria-hidden />
            ))}
            <span className="muted">&nbsp;More</span>
          </div>
          <div className="muted">{profile.commits}+ commits · {profile.prsMerged} OSS PRs merged</div>
        </div>
      </div>
    </section>
  )
}
