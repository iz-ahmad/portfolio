'use client'

import { useEffect, useState } from 'react'

const PHASES = [
  'init holographic_glass.kex',
  'mounting profile / iz-ahmad',
  'calibrating orbital cursor',
  'loading neon shaders',
  'system ready',
]

interface LoadingScreenProps {
  onDone: () => void
}

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [pct, setPct] = useState(0)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let p = 0
    const id = setInterval(() => {
      p += Math.random() * 6 + 2
      if (p >= 100) {
        p = 100
        clearInterval(id)
        setPct(100)
        setPhase(PHASES.length - 1)
        setTimeout(() => onDone(), 600)
        return
      }
      setPct(Math.min(100, Math.floor(p)))
      setPhase(Math.min(PHASES.length - 1, Math.floor((p / 100) * PHASES.length)))
    }, 110)
    return () => clearInterval(id)
  }, [onDone])

  return (
    <div className={`loader${pct >= 100 ? ' loader-done' : ''}`} role="status" aria-label="Loading portfolio">
      <div className="loader-grid" aria-hidden />
      <div className="loader-noise" aria-hidden />
      <div className="loader-center">
        <div className="loader-mark">
          <span className="loader-bracket">[</span>
          <span className="loader-mark-text">IZ-AHMAD</span>
          <span className="loader-bracket">]</span>
          <span className="loader-cursor" aria-hidden />
        </div>
        <div className="loader-sub">// boot sequence in progress</div>
        <div className="loader-bar" aria-hidden>
          <div className="loader-fill" style={{ width: pct + '%' }} />
        </div>
        <div className="loader-row">
          <span className="loader-phase">▸ {PHASES[phase]}</span>
          <span className="loader-pct">{String(pct).padStart(3, '0')}%</span>
        </div>
        <div className="loader-spinner" aria-hidden>
          {Array.from({ length: 8 }).map((_, i) => <span key={i} />)}
        </div>
      </div>
    </div>
  )
}
