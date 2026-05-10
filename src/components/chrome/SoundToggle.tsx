'use client'

import { useEffect, useState } from 'react'
import { SFX } from '@/lib/sfx'

export function SoundToggle() {
  // Always render as un-muted on the server so SSR matches the first client paint.
  // Read the real value from localStorage in an effect, after hydration.
  const [muted, setMuted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setMuted(SFX.isMuted())
  }, [])

  const toggle = () => {
    const next = !muted
    SFX.setMuted(next)
    setMuted(next)
    if (!next) SFX.play('tick')
  }

  // Until mounted, render the default-state label so SSR/CSR markup is identical.
  const label = mounted ? (muted ? 'OFF' : 'ON') : 'ON'
  const icon = mounted ? (muted ? '✕' : '♪') : '♪'

  return (
    <button
      className="sound-toggle"
      onClick={toggle}
      data-cursor="hover"
      data-cursor-label={muted ? 'Unmute' : 'Mute'}
      aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
      suppressHydrationWarning
    >
      <span className="sound-icon">{icon}</span>
      <span className="sound-eq" aria-hidden>
        <span style={{ animationPlayState: muted ? 'paused' : 'running' }} />
        <span style={{ animationPlayState: muted ? 'paused' : 'running' }} />
        <span style={{ animationPlayState: muted ? 'paused' : 'running' }} />
      </span>
      <span className="sound-label">SFX {label}</span>
    </button>
  )
}
