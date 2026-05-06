'use client'

import { useEffect, useRef } from 'react'

const TRAIL = 10

export function CustomCursor() {
  const orbRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])

  const stateRef = useRef({
    x: 0, y: 0,
    tx: 0, ty: 0,
    trail: Array.from({ length: TRAIL }, () => ({ x: 0, y: 0 })),
  })

  useEffect(() => {
    stateRef.current.x = window.innerWidth / 2
    stateRef.current.y = window.innerHeight / 2
    stateRef.current.tx = stateRef.current.x
    stateRef.current.ty = stateRef.current.y

    const onMove = (e: MouseEvent) => {
      stateRef.current.tx = e.clientX
      stateRef.current.ty = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`
      }
      if (labelRef.current) {
        labelRef.current.style.left = e.clientX + 'px'
        labelRef.current.style.top = e.clientY + 'px'
      }
    }
    const onDown = () => orbRef.current?.classList.add('is-down')
    const onUp = () => orbRef.current?.classList.remove('is-down')

    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element).closest?.('[data-cursor]') as HTMLElement | null
      const orb = orbRef.current
      const label = labelRef.current
      if (!orb) return
      orb.classList.remove('is-hover', 'is-text')
      if (label) label.classList.remove('show')
      if (!t) return
      const kind = t.getAttribute('data-cursor')
      if (kind === 'text') orb.classList.add('is-text')
      else orb.classList.add('is-hover')
      const labelText = t.getAttribute('data-cursor-label')
      if (labelText && label) {
        label.textContent = labelText
        label.classList.add('show')
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseover', onOver)

    let raf: number
    const tick = () => {
      const s = stateRef.current
      s.x += (s.tx - s.x) * 0.18
      s.y += (s.ty - s.y) * 0.18
      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${s.x}px,${s.y}px) translate(-50%,-50%)`
      }
      let prevX = s.x, prevY = s.y
      for (let i = 0; i < TRAIL; i++) {
        const p = s.trail[i]
        p.x += (prevX - p.x) * (0.35 - i * 0.025)
        p.y += (prevY - p.y) * (0.35 - i * 0.025)
        const el = trailRefs.current[i]
        if (el) {
          const scale = Math.max(0.1, 1 - i * 0.07)
          el.style.transform = `translate(${p.x}px,${p.y}px) translate(-50%,-50%) scale(${scale})`
          el.style.opacity = String(Math.max(0, 0.55 - i * 0.05))
        }
        prevX = p.x; prevY = p.y
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {Array.from({ length: TRAIL }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el }}
          className="cursor-trail"
          aria-hidden
        />
      ))}
      <div ref={orbRef} className="cursor-orb" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={labelRef} className="cursor-label" aria-hidden />
    </>
  )
}
