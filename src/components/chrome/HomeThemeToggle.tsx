'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'iz_site_theme'

function applyTheme(theme: 'light' | 'dark') {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-site-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-site-theme')
  }
}

export function HomeThemeToggle() {
  // Render as dark on the server so SSR matches the first client paint —
  // the blocking inline script (see page.tsx) already applied the real
  // stored theme before this component mounts, avoiding a flash. Dark is
  // the default theme for the homepage.
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = document.documentElement.getAttribute('data-site-theme')
    setTheme(stored === 'dark' ? 'dark' : 'light')
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* ignore */ }
    setTheme(next)
  }

  const isDark = !mounted || theme === 'dark'

  return (
    <button
      className="hud-theme-toggle"
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
