import type { Use } from '@/types'
import rawUses from '@/data/uses.json'

const USES = rawUses as Use[]

export function Uses() {
  return (
    <section id="uses" className="section" aria-label="Uses / Rig">
      <div className="section-head">
        <div>
          <div className="section-num">// 12 / RIG</div>
          <h2 className="h-display section-title">What I use.</h2>
        </div>
      </div>
      <div className="uses-grid">
        {USES.map((u) => (
          <div key={u.label} className="uses-row">
            <div className="uses-label">{u.label}</div>
            <div className="uses-dots" aria-hidden>{'·'.repeat(60)}</div>
            <div className="uses-value">{u.value}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
