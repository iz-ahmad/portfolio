'use client'

import { useRef } from 'react'
import type { Testimonial } from '@/types'
import rawTestimonials from '@/data/testimonials.json'

const TESTIMONIALS = rawTestimonials as Testimonial[]

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' })
  }

  const scrollable = TESTIMONIALS.length > 3

  return (
    <section id="testimonials" className="section" aria-label="Testimonials">
      <div className="section-head">
        <div>
          <div className="section-num">// 11 / TRANSMISSIONS</div>
          <h2 className="h-display section-title">Words from the team.</h2>
        </div>
        {scrollable && (
          <div className="testi-nav" aria-label="Scroll testimonials">
            <button className="testi-nav-btn" onClick={() => scroll(-1)} data-cursor="hover" aria-label="Previous">←</button>
            <button className="testi-nav-btn" onClick={() => scroll(1)} data-cursor="hover" aria-label="Next">→</button>
          </div>
        )}
      </div>

      <div ref={scrollRef} className={`testimonial-grid${scrollable ? ' is-scroll' : ''}`} role="list">
        {TESTIMONIALS.map((t, i) => (
          <figure key={i} className="testi glass" role="listitem">
            <div className="testi-index" aria-hidden>{String(i + 1).padStart(2, '0')}</div>
            <div className="testi-accent" aria-hidden />
            <div className="testi-quote-mark" aria-hidden>"</div>
            <blockquote className="testi-quote">{t.quote}</blockquote>
            <figcaption className="testi-cap">
              <span className="testi-dot" aria-hidden />
              <div>
                <div className="testi-who">{t.who}</div>
                <div className="testi-role">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
