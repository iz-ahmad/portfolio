'use client'

import { useEffect, useRef } from 'react'

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, dpr = 1

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.width = window.innerWidth * dpr
      h = canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 3 + 0.3,
      r: Math.random() * 1.4 + 0.2,
      hue: Math.random() < 0.18 ? 'magenta' : Math.random() < 0.4 ? 'cyan' : 'white',
      tw: Math.random() * Math.PI * 2,
    }))

    let mx = 0, my = 0, sy = 0
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onScroll = () => { sy = window.scrollY }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        s.tw += 0.02
        const px = s.x + mx * s.z * 18 * dpr
        const py = s.y + my * s.z * 18 * dpr - ((sy * 0.05 * s.z) % h)
        const tw = (Math.sin(s.tw) + 1) * 0.5
        const a = (0.4 + tw * 0.6) / s.z * 0.6
        let color = `rgba(255,255,255,${a})`
        if (s.hue === 'cyan') color = `rgba(255,45,61,${a})`
        if (s.hue === 'magenta') color = `rgba(255,90,60,${a})`
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.arc(px, ((py % h) + h) % h, s.r * dpr, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={ref} className="starfield" aria-hidden />
}
