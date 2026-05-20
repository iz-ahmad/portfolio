export function NowPlaying() {
  return (
    <section id="now" className="section" aria-label="Current status">
      <div className="section-head">
        <div>
          <h2 className="h-display section-title">Current status.</h2>
        </div>
        <div className="section-aside">
          <p>A live snapshot — what I&apos;m shipping, reading, and learning. Where my head is this week.</p>
        </div>
      </div>

      <div className="now-grid">
        <div className="now-card glass now-card-lg reveal">
          <div className="hud-label">// NOW_CRAFTING</div>
          <div className="now-title">Production Laravel + Vue/React solutions at FIGLAB.</div>
          <p className="now-desc">Building reliable backend systems and smooth Vue/React interfaces that work beautifully together. Engineered for scalability, clarity, and long-term product growth.</p>
          <div className="now-stack">
            <span className="chip">PHP</span>
            <span className="chip">Laravel</span>
            <span className="chip">React</span>
            <span className="chip">Vue</span>
            <span className="chip">Inertia</span>
            <span className="chip">MySQL</span>
          </div>
          <div className="now-row">
            <span className="muted">SPRINT · ON-CADENCE</span>
            <div className="now-bar"><div className="now-fill" style={{ width: '72%' }} /></div>
            <span className="glow-cyan">72%</span>
          </div>
        </div>

        <div className="now-card glass reveal">
          <div className="hud-label"><span className="now-pulse" /> READING_SOURCE</div>
          <div className="now-title">laravel/framework</div>
          <div className="muted now-sub">PR-shaped bugs · queues, requests</div>
          <div className="now-eq" aria-hidden>
            <span /><span /><span /><span /><span /><span /><span />
          </div>
        </div>

        <div className="now-card glass reveal">
          <div className="hud-label">// NOW_LEARNING</div>
          <div className="now-title">Deeper Laravel internals</div>
          <div className="muted now-sub">Service container · queue lifecycle</div>
          <div className="now-row">
            <span className="muted">PROGRESS</span>
            <div className="now-bar"><div className="now-fill" style={{ width: '55%' }} /></div>
            <span>55%</span>
          </div>
        </div>

        <div className="now-card glass reveal">
          <div className="hud-label">// OSS_QUEUE</div>
          <div className="now-title">Pending PRs &amp; reviews</div>
          <div className="muted now-sub">laravel/boost · ecosystem packages</div>
        </div>

        <div className="now-card glass reveal">
          <div className="hud-label">// AVAILABILITY</div>
          <div className="now-title glow-cyan">Employed · Open to OSS</div>
          <div className="muted now-sub">Not for freelance · happy to collab on OSS</div>
        </div>

        <div className="now-card glass reveal">
          <div className="hud-label">// LATEST_PR</div>
          <div className="now-title now-mono">fix(docs): retryUntil() return type</div>
          <div className="muted now-sub">laravel/docs#11150 · merged</div>
        </div>
      </div>
    </section>
  )
}
