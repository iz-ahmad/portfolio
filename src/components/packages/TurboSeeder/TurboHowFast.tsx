import data from '@/data/turbo-seeder.json'

export function TurboHowFast() {
  return (
    <section className="ts-section reveal">
      <div className="ts-eyebrow">
        <span className="ts-eyebrow-label">02 / UNDER THE HOOD</span>
        <span className="ts-eyebrow-line" aria-hidden />
      </div>

      <h2 className="ts-section-h2" style={{ marginBottom: '34px' }}>How it&apos;s so fast.</h2>

      <div className="ts-fast-grid">
        {data.speedCards.map((card) => (
          <div key={card.num} className="ts-fast-card">
            <div className="ts-fast-num" aria-hidden>{card.num}</div>
            <div className="ts-fast-title">{card.title}</div>
            <p className="ts-fast-desc">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
