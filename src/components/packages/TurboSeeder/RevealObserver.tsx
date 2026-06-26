'use client'

import { useEffect } from 'react'

export function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.ts-page .reveal')
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      // rootMargin fires 120px before the element enters the viewport so
      // backdrop-filter compositing happens off-screen, eliminating first-scroll jank
      { rootMargin: '0px 0px 120px 0px', threshold: 0 }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
