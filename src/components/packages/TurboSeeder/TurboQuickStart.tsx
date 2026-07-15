import data from '@/data/turbo-seeder.json'

export function TurboQuickStart() {
  return (
    <section id="start" className="ts-section reveal">
      <div className="ts-eyebrow">
        <span className="ts-eyebrow-label">03 / GET STARTED</span>
        <span className="ts-eyebrow-line" aria-hidden />
      </div>

      <h2 className="ts-section-h2">Up and running in three steps.</h2>
      <p className="ts-qs-sub">No config required — sensible, performance-tuned defaults out of the box.</p>

      {/* 3 step cards */}
      <div className="ts-step-grid">
        {data.steps.map((step) => (
          <div key={step.num} className="ts-step-card">
            <div className="ts-step-label">Step {step.num} · {step.label}</div>
            <code className="ts-step-code">
              {step.lines.map((line, i) => (
                <span key={i}>
                  {i === 0
                    ? <><span className="ts-install-sigil">$</span>{line.slice(1)}</>
                    : line
                  }
                  {i < step.lines.length - 1 ? '\n' : ''}
                </span>
              ))}
            </code>
          </div>
        ))}
      </div>

      <a href="#choices" className="ts-qs-more">
        Want more control? See the data paths &amp; seeding strategies ↓
      </a>
    </section>
  )
}
