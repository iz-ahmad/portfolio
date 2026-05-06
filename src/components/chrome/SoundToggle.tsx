'use client'

import { useState } from 'react'
import { SFX } from '@/lib/sfx'

export function SoundToggle() {
  const [muted, setMuted] = useState(() => {
    if (typeof window === 'undefined') return false
    return SFX.isMuted()
  })

  const toggle = () => {
    const next = !muted
    SFX.setMuted(next)
    setMuted(next)
    if (!next) SFX.play('tick')
  }

  return (
    <button
      className="sound-toggle"
      onClick={toggle}
      data-cursor="hover"
      data-cursor-label={muted ? 'Unmute' : 'Mute'}
      aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
    >
      <span className="sound-icon">{muted ? '✕' : '♪'}</span>
      <span className="sound-eq" aria-hidden>
        <span style={{ animationPlayState: muted ? 'paused' : 'running' }} />
        <span style={{ animationPlayState: muted ? 'paused' : 'running' }} />
        <span style={{ animationPlayState: muted ? 'paused' : 'running' }} />
      </span>
      <span className="sound-label">SFX {muted ? 'OFF' : 'ON'}</span>
    </button>
  )
}
