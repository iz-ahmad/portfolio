import data from '@/data/turbo-seeder.json'
import { AgentSkillCard } from './AgentSkillCard'
import { CopyButton } from './CopyButton'

export function TurboQuickStart() {
  return (
    <section id="start" className="ts-section ts-qs reveal">
      <div className="ts-eyebrow">
        <span className="ts-eyebrow-label">03 / Get started</span>
        <span className="ts-eyebrow-line" aria-hidden />
      </div>

      <h2 className="ts-section-h2 ts-qs-h2">
        Up and running in <em>three</em> steps.
      </h2>
      <p className="ts-qs-sub">No config required — sensible, performance-tuned defaults out of the box.</p>

      <div className="ts-qs-timeline">
        <div className="ts-qs-track" aria-hidden />
        <ol className="ts-qs-steps">
          {data.steps.map((step, i) => {
            const command = step.parts.map((p) => p.text).join('')
            return (
              <li key={step.num} className={`ts-qs-step${i === 0 ? ' is-current' : ''}`}>
                <div className="ts-qs-node" aria-hidden>{step.num}</div>
                <div className="ts-qs-step-title">
                  <h3>{step.label}</h3>
                  <span>Step {step.num}</span>
                </div>
                <div className="ts-qs-term">
                  <div className="ts-qs-term-bar">
                    <i className="ts-qs-dot" aria-hidden />
                    <i className="ts-qs-dot" aria-hidden />
                    <i className="ts-qs-dot" aria-hidden />
                    <span className="ts-qs-term-name">bash</span>
                    <CopyButton text={command} label={`Copy step ${step.num} command`} />
                  </div>
                  <code className="ts-qs-cmd">
                    <span className="ts-qs-prompt" aria-hidden>$</span>
                    {step.parts.map((part, j) => (
                      <span key={j} className={'tone' in part ? `ts-qs-tone-${part.tone}` : undefined}>
                        {part.text}
                      </span>
                    ))}
                  </code>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      <AgentSkillCard />

      <div className="ts-qs-foot">
        <div className="ts-qs-req">
          <span className="ts-qs-req-label">Requires</span>
          {data.requirements.map((r) => (
            <span key={r.label} className="ts-qs-pill">
              <b>{r.label}</b>
              {r.value}
            </span>
          ))}
        </div>
        <a href="#choices" className="ts-qs-more">
          Want more control? See the data paths &amp; seeding strategies <span aria-hidden>↓</span>
        </a>
      </div>
    </section>
  )
}
