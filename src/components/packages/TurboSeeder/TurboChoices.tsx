'use client'

import { useState } from 'react'
import data from '@/data/turbo-seeder.json'

type Tab = 'factory' | 'generate' | 'csv'

const TAB_HINTS: Record<Tab, string> = {
  factory:  'reuse your factory',
  generate: 'max speed · faker-free',
  csv:      '2–4× faster',
}

export function TurboChoices() {
  const [tab, setTab] = useState<Tab>('factory')

  return (
    <section id="choices" className="ts-section reveal">
      <div className="ts-eyebrow">
        <span className="ts-eyebrow-label">04 / CHOICES YOU MAKE</span>
        <span className="ts-eyebrow-line" aria-hidden />
      </div>

      <h2 className="ts-section-h2">Two choices. Any combination.</h2>
      <p className="ts-qs-sub">
        How you generate rows, and how they&apos;re written to the database — pick each independently.
      </p>

      {/* comparison card groups */}
      <div className="ts-choices-grid">
        <div className="ts-choices-group">
          <div className="ts-choices-group-label">Data generation path</div>
          <div className="ts-choices-cards">
            {data.dataPaths.map((p) => (
              <div key={p.method} className="ts-choices-card">
                <div className="ts-choices-card-tag">{p.tag}</div>
                <div className="ts-choices-card-title">{p.method}</div>
                <p className="ts-choices-card-desc">{p.desc}</p>
                <div className="ts-choices-card-meta">{p.meta}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="ts-choices-divider" aria-hidden>×</div>

        <div className="ts-choices-group">
          <div className="ts-choices-group-label">Seeding strategy</div>
          <div className="ts-choices-cards">
            {data.seedingStrategies.map((s) => (
              <div key={s.method} className="ts-choices-card">
                <div className="ts-choices-card-tag">{s.tag}</div>
                <div className="ts-choices-card-title">{s.method}</div>
                <p className="ts-choices-card-desc">{s.desc}</p>
                <div className="ts-choices-card-meta">{s.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* code tabs */}
      <div className="ts-code-panel">
        <div className="ts-tab-bar" role="tablist" aria-label="Code examples">
          {(['factory', 'generate', 'csv'] as Tab[]).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              className={`ts-tab${tab === t ? ' ts-tab-active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t === 'factory'  ? 'fromFactory()'    : null}
              {t === 'generate' ? 'generate()'       : null}
              {t === 'csv'      ? 'useCsvStrategy()' : null}
            </button>
          ))}
          <span className="ts-tab-hint" aria-hidden>{TAB_HINTS[tab]}</span>
        </div>

        {/* fromFactory */}
        {tab === 'factory' && (
          <pre className="ts-code-block" role="tabpanel">
            <span className="ts-c-comment">{'// Reuse your existing factory — ~100× faster at scale'}</span>{'\n'}
            <span className="ts-c-keyword">use</span>{' IzAhmad\\TurboSeeder\\Facades\\'}
            <span className="ts-c-class">TurboSeeder</span>{';\n\n'}
            <span className="ts-c-class">TurboSeeder</span>
            {'::'}
            <span className="ts-c-method">fromFactory</span>
            {'(User::factory())\n    ->'}
            <span className="ts-c-method">count</span>
            {'('}
            <span className="ts-c-number">100_000</span>
            {')\n    ->'}
            <span className="ts-c-method">run</span>
            {'();'}
          </pre>
        )}

        {/* generate */}
        {tab === 'generate' && (
          <pre className="ts-code-block" role="tabpanel">
            <span className="ts-c-comment">{'// Faker-free closure — maximum speed for huge datasets'}</span>{'\n'}
            <span className="ts-c-keyword">use</span>{' IzAhmad\\TurboSeeder\\Helpers\\'}
            <span className="ts-c-class">TurboData</span>{';\n\n'}
            {'$email = '}
            <span className="ts-c-class">TurboData</span>
            {'::'}
            <span className="ts-c-method">uniqueEmail</span>
            {'();\n\n'}
            <span className="ts-c-class">TurboSeeder</span>
            {'::'}
            <span className="ts-c-method">forTable</span>
            {'('}
            <span className="ts-c-string">{'\'users\''}</span>
            {')\n    ->'}
            <span className="ts-c-method">columns</span>
            {'(['}
            <span className="ts-c-string">{'\'name\''}</span>
            {', '}
            <span className="ts-c-string">{'\'email\''}</span>
            {', '}
            <span className="ts-c-string">{'\'password\''}</span>
            {'])\n    ->'}
            <span className="ts-c-method">generate</span>
            {'('}
            <span className="ts-c-keyword">fn</span>
            {' ($i) => [\n        '}
            <span className="ts-c-string">{'\'name\''}</span>
            {'     => '}
            <span className="ts-c-string">{"\"User {$i}\""}</span>
            {',\n        '}
            <span className="ts-c-string">{'\'email\''}</span>
            {'    => $email($i),\n        '}
            <span className="ts-c-string">{'\'password\''}</span>
            {' => '}
            <span className="ts-c-class">TurboData</span>
            {'::'}
            <span className="ts-c-method">hashedPassword</span>
            {'(),\n    ])\n    ->'}
            <span className="ts-c-method">withTimestamps</span>
            {'()\n    ->'}
            <span className="ts-c-method">count</span>
            {'('}
            <span className="ts-c-number">1_000_000</span>
            {')\n    ->'}
            <span className="ts-c-method">run</span>
            {'();'}
          </pre>
        )}

        {/* useCsvStrategy */}
        {tab === 'csv' && (
          <pre className="ts-code-block" role="tabpanel">
            <span className="ts-c-comment">{'// Add ONE method for 2–4× more speed — that\'s it'}</span>{'\n'}
            <span className="ts-c-class">TurboSeeder</span>
            {'::'}
            <span className="ts-c-method">fromFactory</span>
            {'(Post::factory())\n    ->'}
            <span className="ts-c-method">count</span>
            {'('}
            <span className="ts-c-number">1_000_000</span>
            {')\n    ->'}
            <span className="ts-c-method">useCsvStrategy</span>
            {'()   '}
            <span className="ts-c-comment">{'// LOAD DATA / COPY FROM STDIN'}</span>
            {'\n    ->'}
            <span className="ts-c-method">run</span>
            {'();'}
          </pre>
        )}
      </div>

      <p className="ts-code-caption">
        Both paths run through the same engine, and either strategy works with either path —{' '}
        mix and match freely.{' '}
        <a href={data.docsUrl} target="_blank" rel="noopener noreferrer" className="ts-caption-link">
          Explore the docs →
        </a>
      </p>
    </section>
  )
}
