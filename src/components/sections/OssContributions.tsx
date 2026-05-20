'use client'

import { useMemo, useState } from 'react'
import type { OssPR } from '@/types'
import rawPrs from '@/data/oss-prs.json'

const OSS_PRS = rawPrs as OssPR[]

function tagClass(tag: string) {
  switch (tag) {
    case 'feat':     return 'feat'
    case 'fix':      return 'fix'
    case 'sec':      return 'sec'
    case 'docs':     return 'docs'
    case 'refactor': return 'ref'
    case 'pkg':      return 'pkg'
    default:         return 'fix'
  }
}

export function OssContributions() {
  const [hovered, setHovered] = useState<number | null>(null)

  const stats = useMemo(() => {
    const merged = OSS_PRS.filter((p) => p.status === 'merged').length
    const repos = new Set(OSS_PRS.map((p) => p.repo)).size
    return { total: OSS_PRS.length + 2, merged: merged + 2, repos }
  }, [])

  return (
    <section id="oss" className="section" aria-label="Open source contributions">
      <div className="section-head">
        <div>
          <h2 className="h-display section-title">Open source — signed, sealed, merged.</h2>
        </div>
        <div className="section-aside">
          <p>Selected PRs into <code className="oss-mono">laravel/framework</code>, <code className="oss-mono">laravel/boost</code>, <code className="oss-mono">laravel/docs</code> and ecosystem packages. Small, correct, merged upstream.</p>
        </div>
      </div>

      <div className="oss-stats" role="list" aria-label="Contribution stats">
        <div className="oss-stat" role="listitem">
          <span className="oss-stat-num glow-cyan">{stats.merged}</span>
          <span className="oss-stat-key">PRs merged</span>
        </div>
        <span className="oss-stat-sep" aria-hidden>/</span>
        <div className="oss-stat" role="listitem">
          <span className="oss-stat-num">{stats.repos}</span>
          <span className="oss-stat-key">repos touched</span>
        </div>
        <span className="oss-stat-sep" aria-hidden>/</span>
        <div className="oss-stat" role="listitem">
          <span className="oss-stat-num">11.x — 13.x</span>
          <span className="oss-stat-key">laravel range</span>
        </div>
        <span className="oss-stat-sep" aria-hidden>/</span>
        <div className="oss-stat" role="listitem">
          <span className="oss-stat-num oss-stat-live">
            <span className="oss-stat-pulse" aria-hidden /> open to OSS
          </span>
          <span className="oss-stat-key">always cooking</span>
        </div>
      </div>

      <div className="oss-grid">
        {OSS_PRS.map((pr, i) => (
          <a
            key={i}
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'oss-card glass',
              `oss-w-${pr.weight}`,
              hovered === i ? 'is-hover' : '',
              pr.status === 'closed' ? 'is-closed' : '',
            ].filter(Boolean).join(' ')}
            onMouseEnter={() => { setHovered(i); SFX_play('tick') }}
            onMouseLeave={() => setHovered(null)}
            data-cursor="hover"
            data-cursor-label={`#${pr.num}`}
            aria-label={`${pr.title} — ${pr.status}`}
          >
            <div className="oss-card-head">
              <span className={`oss-tag oss-tag-${tagClass(pr.tag)}`}>{pr.tag}</span>
              <span className="oss-card-num mono-tabular">#{pr.num}</span>
              <span className={`oss-status oss-status-${pr.status}`}>
                <span className="oss-status-dot" aria-hidden />
                {pr.status}
              </span>
            </div>

            <div className="oss-card-repo">
              <span className="oss-repo-glyph" aria-hidden>›</span>
              {pr.repo}
              <span className="oss-branch">@{pr.branch}</span>
            </div>

            <h3 className="oss-card-title">{pr.title}</h3>
            <p className="oss-card-desc">{pr.desc}</p>

            <div className="oss-card-foot">
              <span className="oss-card-cta">
                view on github
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
              <span className="oss-card-id mono-tabular">log/0x{(0xC0DE + pr.num).toString(16).toUpperCase()}</span>
            </div>

            <span className="oss-bracket oss-bracket-tl" aria-hidden />
            <span className="oss-bracket oss-bracket-tr" aria-hidden />
            <span className="oss-bracket oss-bracket-bl" aria-hidden />
            <span className="oss-bracket oss-bracket-br" aria-hidden />
            <span className="oss-card-scan" aria-hidden />
          </a>
        ))}
      </div>

      <div className="oss-foot">
        <span className="muted">// see all activity</span>
        <a className="link" href="https://github.com/iz-ahmad" target="_blank" rel="noopener noreferrer" data-cursor="hover">
          github.com/iz-ahmad →
        </a>
      </div>
    </section>
  )
}

// Lazy import to avoid SSR issues
function SFX_play(name: string) {
  if (typeof window === 'undefined') return
  import('@/lib/sfx').then(({ SFX }) => SFX.play(name))
}
