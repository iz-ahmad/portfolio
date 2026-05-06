'use client'

import { useClock } from '@/hooks/useClock'
import profile from '@/data/profile.json'

export function TopHud() {
  const t = useClock()

  const hh = t ? String(t.getUTCHours()).padStart(2, '0') : '--'
  const mm = t ? String(t.getUTCMinutes()).padStart(2, '0') : '--'
  const ss = t ? String(t.getUTCSeconds()).padStart(2, '0') : '--'

  return (
    <div className="top-hud" role="banner">
      <div className="hud-side">
        <span className="hud-bracket">[</span>
        <span className="hud-key">SYS</span>
        <span className="hud-val">{profile.handle.toUpperCase()}</span>
        <span className="hud-bracket">]</span>
        <span className="hud-sep">/</span>
        <span className="hud-key">STATUS</span>
        <span className="hud-val glow-cyan">● {profile.status}</span>
      </div>
      <div className="hud-side hud-right">
        <span className="hud-key">UTC{profile.utc}</span>
        <span className="hud-val mono-tabular">{hh}:{mm}:{ss}</span>
        <span className="hud-sep">/</span>
        <span className="hud-key">LAT</span>
        <span className="hud-val">12ms</span>
      </div>
    </div>
  )
}
