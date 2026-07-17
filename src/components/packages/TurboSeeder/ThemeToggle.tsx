'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'iz_ts_theme'

function applyTheme(theme: 'light' | 'dark') {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-ts-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-ts-theme')
  }
}

export function ThemeToggle() {
  // Render as light on the server so SSR matches the first client paint —
  // the blocking inline script (see page.tsx) already applied the real
  // stored theme before this component mounts, avoiding a flash.
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = document.documentElement.getAttribute('data-ts-theme')
    setTheme(stored === 'dark' ? 'dark' : 'light')
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* ignore */ }
    setTheme(next)
  }

  const isDark = mounted && theme === 'dark'

  return (
    <button
      className="ts-theme-toggle"
      onClick={toggle}
      data-cursor="hover"
      data-cursor-label={isDark ? 'Switch to light' : 'Switch to dark'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      suppressHydrationWarning
    >
      {isDark ? '☀' : '☾'}
    </button>
  )
}
