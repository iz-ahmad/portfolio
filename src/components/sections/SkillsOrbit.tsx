'use client'

import { useState } from 'react'
import type { Skill } from '@/types'
import rawSkills from '@/data/skills.json'
import profile from '@/data/profile.json'

const SKILLS = rawSkills as Skill[]

const CORE_SKILLS     = SKILLS.filter((s) => s.ring === 1)
const STRONG_SKILLS   = SKILLS.filter((s) => s.ring === 2)
const FAMILIAR_SKILLS = SKILLS.filter((s) => s.ring === 3)

export function SkillsOrbit() {
  const [, setHover] = useState<Skill | null>(null)
  const [paused, setPaused] = useState(false)

  return (
    <section id="skills" className="section" aria-label="Skills orbit">
      <div className="section-head">
        <div>
          <div className="section-num">// 04 / SKILLS_ORBIT</div>
          <h2 className="h-display section-title">Tools, in orbit.</h2>
        </div>
        <div className="section-aside">
          <p>Distance = depth. Closer rings = deeper reach. Hover a satellite to lock the orbit.</p>
        </div>
      </div>

      <div className="orbit-wrap">
        <div
          className={`orbit-stage${paused ? ' paused' : ''}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { setPaused(false); setHover(null) }}
          aria-label="Skill orbit visualization"
        >
          <div className="orbit-ring r1" aria-hidden />
          <div className="orbit-ring r2" aria-hidden />
          <div className="orbit-ring r3" aria-hidden />

          <div className="orbit-core" aria-hidden>
            <div className="core-label">
              <div className="core-name">{profile.handle}</div>
              <div className="core-sub">core · runtime active</div>
            </div>
            <div className="core-pulse" />
          </div>

          {SKILLS.map((s) => {
            const ringRadius = s.ring === 1 ? 150 : s.ring === 2 ? 250 : 350
            const speed = s.ring === 1 ? 26 : s.ring === 2 ? 42 : 60
            const ringSkills = SKILLS.filter((x) => x.ring === s.ring)
            const idx = ringSkills.findIndex((x) => x.name === s.name)
            const offset = (idx / ringSkills.length) * 360

            return (
              <div
                key={s.name}
                className={`orbit-orbital ring-${s.ring}`}
                style={{
                  '--r': `${ringRadius}px`,
                  '--dur': `${speed}s`,
                  '--offset': `${offset}deg`,
                  animationDelay: `-${(offset / 360) * speed}s`,
                } as React.CSSProperties}
                aria-hidden
              >
                <button
                  className={`sat sat-${s.color}`}
                  data-cursor="hover"
                  data-cursor-label={s.name}
                  onMouseEnter={() => setHover(s)}
                  onMouseLeave={() => setHover(null)}

                  aria-label={`${s.name}, proficiency ${s.weight}%`}
                  style={{ '--w': s.weight } as React.CSSProperties}
                >
                  <span className="sat-label">{s.name}</span>
                </button>
              </div>
            )
          })}
        </div>

        <aside className="orbit-legend glass" aria-label="Orbit legend">
          <div className="legend-row"><span className="legend-dot d-cyan" aria-hidden /> CORE · ring 1</div>
          <div className="legend-row"><span className="legend-dot d-magenta" aria-hidden /> STRONG · ring 2</div>
          <div className="legend-row"><span className="legend-dot d-violet" aria-hidden /> FAMILIAR · ring 3</div>
        </aside>
      </div>

      {/* Mobile chip clusters — shown only at ≤639px via CSS */}
      <div className="skills-chips" aria-label="Skills by proficiency">
        <div className="skills-cluster">
          <div className="cluster-label">
            <span className="legend-dot d-cyan" aria-hidden />
            CORE
          </div>
          <div className="cluster-chips">
            {CORE_SKILLS.map((s) => (
              <span key={s.name} className="chip chip-core">{s.name}</span>
            ))}
          </div>
        </div>
        <div className="skills-cluster">
          <div className="cluster-label">
            <span className="legend-dot d-magenta" aria-hidden />
            STRONG
          </div>
          <div className="cluster-chips">
            {STRONG_SKILLS.map((s) => (
              <span key={s.name} className="chip chip-strong">{s.name}</span>
            ))}
          </div>
        </div>
        <div className="skills-cluster">
          <div className="cluster-label">
            <span className="legend-dot d-violet" aria-hidden />
            FAMILIAR
          </div>
          <div className="cluster-chips">
            {FAMILIAR_SKILLS.map((s) => (
              <span key={s.name} className="chip chip-familiar">{s.name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
