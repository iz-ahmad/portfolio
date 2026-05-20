import type { Post } from '@/types'
import rawPosts from '@/data/posts.json'

const POSTS = rawPosts as Post[]

export function Writing() {
  return (
    <section id="writing" className="section" aria-label="Writing">
      <div className="section-head">
        <div>
          <h2 className="h-display section-title">Things I wrote down.</h2>
        </div>
        <div className="section-aside">
          <p>A collection of my thoughts, experiences, and learnings on various topics.</p>
        </div>
      </div>
      <ul className="post-list">
        {POSTS.map((p, i) => (
          <li key={i}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="post-row reveal"
              data-cursor="hover"
              data-cursor-label="Read post"
            >
              <span className="post-date">{p.date}</span>
              <span className="post-title">{p.title}</span>
              <span className="post-read muted">{p.read}</span>
              <span className="post-arrow" aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
