'use client'

import { useState } from 'react'
import type { SocialLink } from '@/types'
import rawSocial from '@/data/social-links.json'
import profile from '@/data/profile.json'

const SOCIAL_LINKS = rawSocial as SocialLink[]
const BUDGETS = ['OSS Collab', 'Laravel PR', 'Question', 'Hello']

function SFX_play(name: string) {
  if (typeof window === 'undefined') return
  import('@/lib/sfx').then(({ SFX }) => SFX.play(name))
}

export function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', brief: '', budget: 'OSS Collab' })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    SFX_play('send')
    setSent(true)
  }

  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="section-head">
        <div>
          <div className="section-num">// 13 / OPEN_CHANNEL</div>
          <h2 className="h-display section-title">Send a transmission.</h2>
        </div>
        <div className="section-aside">
          <p>
            Currently employed at FIGLAB &mdash; not for freelance, but happy to talk OSS, Laravel, code review. Or skip the form:{' '}
            <a className="link" href={`mailto:${profile.email}`} data-cursor="hover">{profile.email}</a>
          </p>
        </div>
      </div>

      <div className="contact-grid">
        <form
          className="contact-form glass"
          onSubmit={submit}
          action="https://formspree.io/f/your-form-id"
          method="POST"
        >
          <div className="form-row">
            <label htmlFor="contact-name">NAME</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              data-cursor="text"
              placeholder="Your name"
            />
          </div>
          <div className="form-row">
            <label htmlFor="contact-email">EMAIL</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              data-cursor="text"
              placeholder="you@domain.com"
            />
          </div>
          <div className="form-row">
            <label>SUBJECT</label>
            <div className="budget-row" role="group" aria-label="Subject">
              {BUDGETS.map((b) => (
                <button
                  type="button"
                  key={b}
                  className={`chip${form.budget === b ? ' chip-on' : ''}`}
                  onClick={() => { SFX_play('tick'); setForm({ ...form, budget: b }) }}
                  data-cursor="hover"
                  aria-pressed={form.budget === b}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="contact-message">MESSAGE</label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              value={form.brief}
              onChange={(e) => setForm({ ...form, brief: e.target.value })}
              data-cursor="text"
              placeholder="What's on your mind?"
            />
          </div>
          <div className="form-foot">
            <button type="submit" className="btn btn-primary" data-cursor="hover">
              {sent ? 'TRANSMITTED ✓' : 'TRANSMIT ▸'}
            </button>
            <span className="muted">Replies in &lt; 24h on weekdays</span>
          </div>
        </form>

        <aside className="contact-side glass">
          <div className="hud-label">// SIDE_CHANNELS</div>
          <p className="side-tagline">Pick your wavelength.</p>
          <div className="social-grid">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.key}
                href={s.url}
                className={`social-tile social-${s.key}`}
                data-cursor="hover"
                data-cursor-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="social-icon" aria-hidden>{s.icon}</span>
                <span className="social-meta">
                  <span className="social-label">{s.label}</span>
                  <span className="social-handle">{s.handle}</span>
                </span>
                <span className="social-arrow" aria-hidden>↗</span>
              </a>
            ))}
          </div>
          <div className="contact-loc">
            <div className="hud-label">// LOC</div>
            <div className="loc-val">{profile.location} · UTC{profile.utc}</div>
          </div>
        </aside>
      </div>
    </section>
  )
}
