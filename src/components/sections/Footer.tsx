import profile from '@/data/profile.json'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-mark h-display">{profile.name}</div>
        <div className="footer-meta muted">
          <span>BUILT WITH REACT · LARAVEL UNDER THE HOOD</span>
          <span>© 2026 {profile.handle.toUpperCase()} · DHAKA, BD</span>
          <span>v1.2.0 · holographic_glass.kex</span>
        </div>
      </div>
    </footer>
  )
}
