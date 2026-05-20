'use client'

interface MobileNavProps {
  active: string
}

const DOCK = [
  {
    id: 'home',
    label: 'HOME',
    icon: '⌂',
    group: ['home', 'now'],
  },
  {
    id: 'projects',
    label: 'WORK',
    icon: '▣',
    group: ['experience', 'skills', 'projects'],
  },
  {
    id: 'oss',
    label: 'COMMITS',
    icon: '◈',
    group: ['oss', 'contributions', 'writing', 'testimonials', 'game', 'uses'],
  },
  {
    id: 'contact',
    label: 'CONTACT',
    icon: '◎',
    group: ['contact'],
  },
]

export function MobileNav({ active }: MobileNavProps) {
  return (
    <nav className="mobile-dock" aria-label="Quick navigation">
      {DOCK.map((link) => {
        const isActive = link.group.includes(active)
        return (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`dock-tab${isActive ? ' active' : ''}`}
            aria-label={link.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="dock-icon" aria-hidden>{link.icon}</span>
            <span className="dock-label">{link.label}</span>
          </a>
        )
      })}
    </nav>
  )
}
