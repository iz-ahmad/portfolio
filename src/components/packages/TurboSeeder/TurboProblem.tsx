import data from '@/data/turbo-seeder.json'

export function TurboProblem() {
  return (
    <section className="ts-section reveal">
      <div className="ts-eyebrow">
        <span className="ts-eyebrow-label">01 / THE PROBLEM</span>
        <span className="ts-eyebrow-line" aria-hidden />
      </div>

      <h2 className="ts-section-h2">Default seeders weren't built for scale.</h2>

      <p className="ts-problem-sub">
        Seeding 500K–1M+ records for realistic load testing can take{' '}
        <strong style={{ color: 'var(--ink-0)' }}>30+ minutes</strong> and unbounded memory —
        slowing every iteration. Turbo Seeder eliminates that bottleneck.
      </p>

      {/* Two-column split panel */}
      <div className="ts-cmp-split">
        {/* LEFT — Standard (dim, neutral) */}
        <div className="ts-cmp-left">
          <div className="ts-cmp-panel-label">Standard Laravel seeder</div>
          <div className="ts-cmp-big-metric">
            30<span className="ts-cmp-metric-unit"> min</span>
          </div>
          <div className="ts-cmp-metric-caption">to seed 1,000,000 rows</div>
          <ul className="ts-cmp-bullets">
            <li className="ts-cmp-bullet"><span className="ts-cmp-bullet-prefix" aria-hidden>—</span>One query per row via Eloquent</li>
            <li className="ts-cmp-bullet"><span className="ts-cmp-bullet-prefix" aria-hidden>—</span>Model events fire on every record</li>
            <li className="ts-cmp-bullet"><span className="ts-cmp-bullet-prefix" aria-hidden>—</span>Memory climbs without bound</li>
            <li className="ts-cmp-bullet"><span className="ts-cmp-bullet-prefix" aria-hidden>—</span>Blocks CI/CD &amp; slows iterations</li>
          </ul>
        </div>

        {/* RIGHT — Turbo (lit, accent) */}
        <div className="ts-cmp-right">
          <div className="ts-cmp-glow" aria-hidden />
          <div className="ts-cmp-right-inner">
            <div className="ts-cmp-panel-label ts-cmp-panel-label-accent">
              <span className="ts-cmp-accent-dot" aria-hidden />
              Turbo Seeder · CSV strategy
            </div>
            <div className="ts-cmp-big-metric ts-cmp-big-metric-accent">
              15<span className="ts-cmp-metric-unit"> sec</span>
            </div>
            <div className="ts-cmp-metric-caption ts-cmp-metric-caption-muted">
              same 1,000,000 rows · ~120× faster
            </div>
            <ul className="ts-cmp-bullets">
              <li className="ts-cmp-bullet ts-cmp-bullet-win"><span className="ts-cmp-bullet-prefix" aria-hidden>✓</span>Raw bulk INSERT — no Eloquent</li>
              <li className="ts-cmp-bullet ts-cmp-bullet-win"><span className="ts-cmp-bullet-prefix" aria-hidden>✓</span>Native CSV import (LOAD DATA / COPY)</li>
              <li className="ts-cmp-bullet ts-cmp-bullet-win"><span className="ts-cmp-bullet-prefix" aria-hidden>✓</span>Memory stays flat — lazy generators</li>
              <li className="ts-cmp-bullet ts-cmp-bullet-win"><span className="ts-cmp-bullet-prefix" aria-hidden>✓</span>CI/CD friendly — fast every run</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Scenario comparison table */}
      <div className="ts-cmp-table" role="table" aria-label="Performance comparison">
        <div className="ts-cmp-row ts-cmp-row-header" role="row">
          <div className="ts-cmp-cell-head" role="columnheader">Scenario · 1M rows</div>
          <div className="ts-cmp-cell-head ts-cmp-head-std" role="columnheader">Standard</div>
          <div className="ts-cmp-cell-head ts-cmp-head-turbo" role="columnheader">Turbo Seeder</div>
        </div>
        {data.comparisonTable.map((row) => (
          <div key={row.scenario} className="ts-cmp-row" role="row">
            <div className="ts-cmp-cell" role="cell">{row.scenario}</div>
            <div
              className={`ts-cmp-cell-std${row.standard !== '—' ? ' ts-cmp-cell-std-strike' : ''}`}
              role="cell"
            >
              {row.standard}
            </div>
            <div className="ts-cmp-cell-turbo" role="cell">{row.turbo}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
