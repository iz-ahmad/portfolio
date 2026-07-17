import { AppShell } from '@/components/AppShell'
import type { ContributionGrid, ContributionLevel, ContributionCell } from '@/types'

const CONTRIBUTIONS_API = 'https://github-contributions-api.deno.dev/iz-ahmad.json'

// Blocking script — reads the stored theme before first paint. Dark is the
// default; only an explicit stored 'light' choice opts out of it, so
// first-time visitors and returning dark-mode visitors never see a flash
// of the light theme.
const THEME_INIT_SCRIPT = `try{if(localStorage.getItem('iz_site_theme')!=='light')document.documentElement.setAttribute('data-site-theme','dark')}catch(e){}`

// API returns { contributions: Week[][] } where Week = { contributionLevel: string, contributionCount: number, date: string }[]
// Outer array = weeks (columns), inner = days (rows 0-6)
const LEVEL_MAP: Record<string, ContributionLevel> = {
  NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4,
}

async function fetchContributions(): Promise<ContributionGrid> {
  try {
    const res = await fetch(CONTRIBUTIONS_API, { next: { revalidate: 86400 } })
    if (!res.ok) throw new Error('fetch failed')
    const json = await res.json()

    const weeklyData = json.contributions as Array<Array<{ contributionLevel: string; contributionCount: number }>>
    if (!Array.isArray(weeklyData) || !Array.isArray(weeklyData[0])) throw new Error('bad shape')

    // Build grid[day 0-6][week 0-N]
    const grid: ContributionCell[][] = Array.from({ length: 7 }, (_, r) =>
      weeklyData.map((week) => ({
        level: LEVEL_MAP[week[r]?.contributionLevel ?? 'NONE'] ?? 0,
        count: week[r]?.contributionCount ?? 0,
      }))
    )
    return grid
  } catch {
    return Array.from({ length: 7 }, () => Array(52).fill({ level: 0, count: 0 }) as ContributionCell[])
  }
}

export default async function Home() {
  const contributions = await fetchContributions()
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <AppShell contributions={contributions} />
    </>
  )
}
