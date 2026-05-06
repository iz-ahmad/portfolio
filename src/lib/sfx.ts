type ToneParams = {
  freq?: number
  type?: OscillatorType
  dur?: number
  gain?: number
  slide?: number
  attack?: number
  release?: number
}

let _ctx: AudioContext | null = null
let _muted = false

if (typeof window !== 'undefined') {
  _muted = localStorage.getItem('iz_muted') === '1'
}

function ensureCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (_muted) return null
  if (_ctx) return _ctx
  try {
    _ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  } catch {
    return null
  }
  return _ctx
}

function tone({ freq = 440, type = 'sine' as OscillatorType, dur = 0.08, gain = 0.05, slide = 0, attack = 0.005, release = 0.05 }: ToneParams) {
  const c = ensureCtx()
  if (!c) return
  if (c.state === 'suspended') c.resume()
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.setValueAtTime(freq, c.currentTime)
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), c.currentTime + dur)
  g.gain.setValueAtTime(0, c.currentTime)
  g.gain.linearRampToValueAtTime(gain, c.currentTime + attack)
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur + release)
  o.connect(g).connect(c.destination)
  o.start()
  o.stop(c.currentTime + dur + release + 0.02)
}

function noise({ dur = 0.12, gain = 0.04, hp = 1200 }: { dur?: number; gain?: number; hp?: number }) {
  const c = ensureCtx()
  if (!c) return
  if (c.state === 'suspended') c.resume()
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  const src = c.createBufferSource(); src.buffer = buf
  const filt = c.createBiquadFilter(); filt.type = 'highpass'; filt.frequency.value = hp
  const g = c.createGain(); g.gain.setValueAtTime(gain, c.currentTime)
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur)
  src.connect(filt).connect(g).connect(c.destination)
  src.start(); src.stop(c.currentTime + dur)
}

export const SFX = {
  play(name: string) {
    switch (name) {
      case 'hover': tone({ freq: 880, type: 'sine',     dur: 0.04, gain: 0.025, attack: 0.002, release: 0.03 }); break
      case 'tick':  tone({ freq: 1200, type: 'square',  dur: 0.03, gain: 0.02,  attack: 0.001, release: 0.02 }); break
      case 'click': tone({ freq: 540, type: 'triangle', dur: 0.06, gain: 0.05,  slide: -120 }); break
      case 'send':
        tone({ freq: 320, type: 'sawtooth', dur: 0.18, gain: 0.05, slide: 380, release: 0.12 })
        setTimeout(() => tone({ freq: 880, type: 'sine', dur: 0.1, gain: 0.04 }), 120)
        break
      case 'eat':  tone({ freq: 660, type: 'square',   dur: 0.06, gain: 0.05, slide: 400 }); break
      case 'over':
        tone({ freq: 220, type: 'sawtooth', dur: 0.5, gain: 0.06, slide: -180, release: 0.3 })
        noise({ dur: 0.3, gain: 0.03 })
        break
      case 'boot':
        tone({ freq: 220, type: 'sine', dur: 0.12, gain: 0.03, slide: 440 })
        setTimeout(() => tone({ freq: 660, type: 'sine', dur: 0.1, gain: 0.03 }), 100)
        break
    }
  },
  setMuted(v: boolean) {
    _muted = v
    if (typeof window !== 'undefined') localStorage.setItem('iz_muted', v ? '1' : '0')
  },
  isMuted() { return _muted },
}

export function wireGlobalSfx() {
  if (typeof window === 'undefined') return

  const hovered = new WeakSet<Element>()

  document.addEventListener('mouseover', (e) => {
    const t = (e.target as Element).closest?.('[data-cursor="hover"]')
    if (t && !hovered.has(t)) {
      hovered.add(t)
      SFX.play('hover')
    }
  })
  document.addEventListener('mouseout', (e) => {
    const t = (e.target as Element).closest?.('[data-cursor="hover"]')
    if (t) hovered.delete(t)
  })
  document.addEventListener('click', (e) => {
    const t = (e.target as Element).closest?.('button, a')
    if (t) SFX.play('click')
  })
}
