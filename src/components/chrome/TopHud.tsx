'use client'

import { useEffect, useState } from 'react'
import { useClock } from '@/hooks/useClock'
import profile from '@/data/profile.json'

export function TopHud() {
  // Hydration-safe: only show live values after the client mounts.
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const t = useClock()

  const hh = mounted && t ? String(t.getUTCHours()).padStart(2, '0') : '--'
  const mm = mounted && t ? String(t.getUTCMinutes()).padStart(2, '0') : '--'
  const ss = mounted && t ? String(t.getUTCSeconds()).padStart(2, '0') : '--'

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
        <span className="hud-val mono-tabular" suppressHydrationWarning>{hh}:{mm}:{ss}</span>
      </div>
    </div>
  )
}
