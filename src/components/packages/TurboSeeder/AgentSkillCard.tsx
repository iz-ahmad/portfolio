import data from '@/data/turbo-seeder.json'
import { CopyButton } from './CopyButton'

const skill = data.agentSkill

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
      <path d="M4 12l5 5L20 6" />
    </svg>
  )
}

export function AgentSkillCard() {
  return (
    <aside className="ts-qs-agent" aria-labelledby="ts-qs-agent-title">
      <div className="ts-qs-agent-l">
        <span className="ts-qs-badge">
          <i aria-hidden />
          {skill.label}
        </span>

        <h3 id="ts-qs-agent-title">{skill.title}</h3>
        <p>{skill.desc}</p>

        <div className="ts-qs-install">
          <span className="ts-qs-prompt" aria-hidden>$</span>
          <code>{skill.command}</code>
          <CopyButton text={skill.command} label={`Copy command: ${skill.command}`} />
        </div>

        <div className="ts-qs-ver">{skill.target}</div>

        <a href={skill.repoUrl} target="_blank" rel="noopener noreferrer" className="ts-qs-gh">
          View the skill on GitHub <span aria-hidden>↗</span>
        </a>
      </div>

      <div className="ts-qs-agent-r">
        <div className="ts-qs-chat" role="group" aria-label="Example agent session">
          {skill.transcript.map((line, i) => (
            <div key={i} className={`ts-qs-msg ts-qs-msg-${line.who}`}>
              <span className="ts-qs-who">{line.who}</span>
              <div className="ts-qs-bub">{line.text}</div>
            </div>
          ))}
        </div>

        <ul className="ts-qs-checks">
          {skill.rules.map((r) => (
            <li key={r} className="ts-qs-chk">
              <CheckIcon />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
