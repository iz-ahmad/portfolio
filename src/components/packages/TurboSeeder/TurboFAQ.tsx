'use client'

import { useState } from 'react'
import data from '@/data/turbo-seeder.json'

export function TurboFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="ts-section reveal">
      <div className="ts-eyebrow">
        <span className="ts-eyebrow-label">06 / FAQ</span>
        <span className="ts-eyebrow-line" aria-hidden />
      </div>

      <h2 className="ts-section-h2" style={{ marginBottom: '30px' }}>
        Common questions.
      </h2>

      <div className="ts-faq-list">
        {data.faq.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div key={item.q} className={`ts-faq-item${isOpen ? ' ts-faq-item-open' : ''}`}>
              <button
                type="button"
                className="ts-faq-question"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span className="ts-faq-icon" aria-hidden>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <p className="ts-faq-answer">{item.a}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
