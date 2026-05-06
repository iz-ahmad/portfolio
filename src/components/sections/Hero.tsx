'use client'

import { useEffect, useState } from 'react'
import profile from '@/data/profile.json'

const SCRIPT = [
  { cmd: 'whoami',          out: ['ahmad-cit22 — software engineer @ FIGLAB · full-stack'] },
  { cmd: 'cat ~/about.md',  out: ['# About', 'Full-stack web developer.', 'PHP, Laravel & React day-to-day.', 'Laravel core contributor in spare cycles.', 'Love to learn new stuffs..<3'] },
  { cmd: 'ls ~/focus/',     out: ['laravel-internals/    react-inertia/', 'open-source/           code-review/'] },
  { cmd: 'echo $STATUS',    out: ['● EMPLOYED · OPEN TO OSS COLLABS'] },
]

function Stat({ k, v }: { k: string; v: number }) {
  return (
    <div className="stat">
      <div className="stat-v">{v}</div>
      <div className="stat-k">{k}</div>
    </div>
  )
}

export function Hero() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step >= SCRIPT.length) return
    const t = setTimeout(() => setStep(step + 1), 850)
    return () => clearTimeout(t)
  }, [step])

  const booted = step >= SCRIPT.length
  const visible = SCRIPT.slice(0, step)

  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="hero-inner">
        <div className="hero-meta">
          <span className="hud-label">// 00 / IDENTITY</span>
        </div>

        <div className="hero-grid">
          <div className="hero-left">
            <div className="boot-window glass">
              <div className="boot-chrome">
                <span className="dot dot-r" aria-hidden />
                <span className="dot dot-y" aria-hidden />
                <span className="dot dot-g" aria-hidden />
                <span className="boot-title">iz-ahmad@portfolio · ~/about</span>
              </div>
              <pre className="boot-body" aria-live="polite">
                {visible.map((s, i) => (
                  <div key={i}>
                    <div className="boot-line boot-prompt">
                      <span className="prompt-sigil">iz@portfolio</span>
                      <span className="prompt-arrow"> ❯ </span>
                      <span className="boot-cmd">{s.cmd}</span>
                    </div>
                    {s.out.map((o, j) => (
                      <div key={j} className="boot-line boot-out">{o}</div>
                    ))}
                    <div className="boot-spacer" />
                  </div>
                ))}
                {!booted && (
                  <div className="boot-line boot-prompt">
                    <span className="prompt-sigil">iz@portfolio</span>
                    <span className="prompt-arrow"> ❯ </span>
                    <span className="boot-caret" aria-hidden />
                  </div>
                )}
                {booted && (
                  <div className="boot-line boot-prompt">
                    <span className="prompt-sigil">iz@portfolio</span>
                    <span className="prompt-arrow"> ❯ </span>
                    <span className="boot-cmd boot-blink">_</span>
                  </div>
                )}
              </pre>
            </div>

            <div className={`hero-cta${booted ? ' show' : ''}`}>
              <a href="#projects" className="btn btn-primary" data-cursor="hover" data-cursor-label="Browse work">
                BROWSE WORK <span aria-hidden>↗</span>
              </a>
              <a href="#contact" className="btn" data-cursor="hover" data-cursor-label="Open channel">
                OSS COLLAB
              </a>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-tag">
              <span className="hud-label">CALL SIGN</span>
            </div>
            <h1 className="hero-name h-display">
              <span className="glitch" data-text={profile.name}>{profile.name}</span>
            </h1>
            <div className="hero-role">
              <span className="role-bracket" aria-hidden>[</span>
              <span className="role-text">{profile.role}</span>
              <span className="role-bracket" aria-hidden>]</span>
            </div>
            <p className="hero-tagline">{profile.tagline}</p>

            <div className="hero-stats" aria-label="Quick stats">
              <Stat k="YRS XP" v={profile.yearsXp} />
              <Stat k="SHIPPED" v={profile.shipped} />
              <Stat k="COMMITS" v={profile.commits} />
              <Stat k="PRS MERGED" v={profile.prsMerged} />
            </div>
          </div>
        </div>

        <div className="hero-marquee" aria-hidden>
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <div className="marquee-row" key={k}>
                {['@ FIGLAB · DHAKA', '★', 'PHP · LARAVEL · REACT', '★', 'LARAVEL CORE CONTRIBUTOR', '★', 'OPEN TO OSS', '★', 'FULL-STACK', '★'].map((t, i) => (
                  <span key={i} className="marquee-item">{t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
