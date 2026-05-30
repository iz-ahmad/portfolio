export interface Profile {
  handle: string
  name: string
  role: string
  tagline: string
  location: string
  utc: string
  email: string
  github: string
  status: string
  company: string
  yearsXp: number
  shipped: number
  commits: number
  prsMerged: number
}

export interface Skill {
  name: string
  ring: 1 | 2 | 3
  weight: number
  color: 'cyan' | 'magenta' | 'violet'
}

export interface Project {
  id: string
  name: string
  year: string
  role: string
  desc: string
  stack: string[]
  metric: string
  accent: 'cyan' | 'magenta' | 'violet'
  link: string
}

export interface Experience {
  period: string
  company: string
  companyWebsite: string
  role: string
  location: string
  blurb: string
  tags: string[]
  status: 'current' | 'active' | 'past'
}

export interface OssPR {
  repo: string
  num: number
  branch: string
  title: string
  desc: string
  status: 'merged' | 'closed'
  tag: string
  url: string
  weight: 3 | 4 | 5
}

export interface Post {
  date: string
  title: string
  read: string
  url: string
}

export interface Testimonial {
  quote: string
  who: string
  role: string
  /** 2-letter initials shown in the avatar disc. Defaults to first letters of `who`. */
  initials?: string
  /** Filmstrip label — short channel name shown next to TX_NNN. */
  channel?: string
  /** Signal-bar strength. Defaults to 'full'. */
  signal?: 'full' | 'med' | 'weak'
}

export interface Use {
  label: string
  value: string
}

export interface SocialLink {
  key: string
  label: string
  handle: string
  url: string
  icon: string
}

export interface NavSection {
  id: string
  label: string
}

export type ContributionLevel = 0 | 1 | 2 | 3 | 4
export type ContributionCell = { level: ContributionLevel; count: number }
export type ContributionGrid = ContributionCell[][]
