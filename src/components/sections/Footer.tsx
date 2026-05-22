import profile from '@/data/profile.json'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-mark h-display">{profile.name}</div>
        <div className="footer-meta muted">
          <span>BUILT WITH ❤️ by <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link">NAFIS AHMAD</a> </span>
          <span>© 2026 {profile.handle.toUpperCase()} · DHAKA</span>
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  )
}
