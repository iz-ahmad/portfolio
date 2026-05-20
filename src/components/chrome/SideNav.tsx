'use client'

import type { NavSection } from '@/types'

interface SideNavProps {
  sections: NavSection[]
  active: string
}

export function SideNav({ sections, active }: SideNavProps) {
  return (
    <nav className="side-nav" aria-label="Section navigation">
      {sections.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`nav-dot${active === s.id ? ' active' : ''}`}
          data-cursor="hover"
          aria-current={active === s.id ? 'page' : undefined}
        >
          <span className="nav-dot-num">{String(i).padStart(2, '0')}</span>
          <span className="nav-dot-tick" />
          <span className="nav-dot-label">{s.label}</span>
        </a>
      ))}
    </nav>
  )
}
