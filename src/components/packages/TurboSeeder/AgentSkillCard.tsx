'use client'

import { useState, useRef, useEffect } from 'react'
import data from '@/data/turbo-seeder.json'

const skill = data.agentSkill

export function AgentSkillCard() {
  const [copyLabel, setCopyLabel] = useState('Copy')
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(resetTimerRef.current), [])

  function handleCopy() {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    navigator.clipboard.writeText(skill.command)
      .then(() => setCopyLabel('Copied ✓'))
      .catch(() => setCopyLabel('Failed. Try again.'))
      .finally(() => {
        clearTimeout(resetTimerRef.current)
        resetTimerRef.current = setTimeout(() => setCopyLabel('Copy'), 1600)
      })
  }

  return (
    <aside className="ts-skill-card" aria-labelledby="ts-skill-title">
      <div className="ts-skill-main">
        <div className="ts-skill-head">
          <span className="ts-skill-label">{skill.label}</span>
          <span className="ts-skill-target">{skill.target}</span>
        </div>

        <h3 id="ts-skill-title" className="ts-skill-title">{skill.title}</h3>
        <p className="ts-skill-desc">{skill.desc}</p>

        <button
          type="button"
          className="ts-skill-cmd"
          onClick={handleCopy}
          aria-label={`Copy command: ${skill.command}`}
        >
          <code>
            <span className="ts-install-sigil">$</span> {skill.command}
          </code>
          <span className="ts-copy-label" aria-live="polite">{copyLabel}</span>
        </button>

        <a
          href={skill.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ts-skill-link"
        >
          View the skill on GitHub ↗
        </a>
      </div>

      <div className="ts-skill-side">
        <div className="ts-skill-chat" role="group" aria-label="Example agent session">
          {skill.transcript.map((line, i) => (
            <div key={i} className={`ts-skill-line ts-skill-line-${line.who}`}>
              <span className="ts-skill-who">{line.who}</span>
              <span>{line.text}</span>
            </div>
          ))}
        </div>

        <ul className="ts-skill-rules">
          {skill.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
