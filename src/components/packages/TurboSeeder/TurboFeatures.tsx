import data from '@/data/turbo-seeder.json'

export function TurboFeatures() {
  return (
    <section className="ts-section reveal">
      <div className="ts-eyebrow">
        <span className="ts-eyebrow-label">05 / CAPABILITIES</span>
        <span className="ts-eyebrow-line" aria-hidden />
      </div>

      <h2 className="ts-section-h2" style={{ marginBottom: '30px' }}>
        Everything you need — at a glance.
      </h2>

      <div className="ts-feat-grid">
        {data.features.map((f) => (
          <div key={f.title} className="ts-feat-card">
            <div className="ts-feat-title">{f.title}</div>
            <p className="ts-feat-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
