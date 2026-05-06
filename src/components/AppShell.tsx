'use client'

import { useEffect, useState, useCallback } from 'react'
import type { ContributionGrid, NavSection } from '@/types'

import { BgGrid } from '@/components/ambient/BgGrid'
import { Scanlines } from '@/components/ambient/Scanlines'
import { Starfield } from '@/components/ambient/Starfield'
import { CustomCursor } from '@/components/chrome/CustomCursor'
import { LoadingScreen } from '@/components/chrome/LoadingScreen'
import { SideNav } from '@/components/chrome/SideNav'
import { SoundToggle } from '@/components/chrome/SoundToggle'
import { TopHud } from '@/components/chrome/TopHud'

import { Hero } from '@/components/sections/Hero'
import { NowPlaying } from '@/components/sections/NowPlaying'
import { Experience } from '@/components/sections/Experience'
import { SkillsOrbit } from '@/components/sections/SkillsOrbit'
import { Projects } from '@/components/sections/Projects'
import { StackViz } from '@/components/sections/StackViz'
import { OssContributions } from '@/components/sections/OssContributions'
import { Contributions } from '@/components/sections/Contributions'
import { BugSnake } from '@/components/sections/BugSnake'
import { Writing } from '@/components/sections/Writing'
import { Testimonials } from '@/components/sections/Testimonials'
import { Uses } from '@/components/sections/Uses'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

import rawSections from '@/data/sections.json'
const SECTIONS = rawSections as NavSection[]

interface AppShellProps {
  contributions: ContributionGrid
}

export function AppShell({ contributions }: AppShellProps) {
  const [active, setActive] = useState('home')
  const [loading, setLoading] = useState(true)

  // Reveal-on-scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in')
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [loading])

  // Section scroll-spy
  useEffect(() => {
    if (loading) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [loading])

  const handleDone = useCallback(() => {
    setLoading(false)
    import('@/lib/sfx').then(({ SFX }) => SFX.play('boot'))
  }, [])

  return (
    <>
      {loading && <LoadingScreen onDone={handleDone} />}

      <BgGrid />
      <div className="bg-noise" aria-hidden />
      <Starfield />
      <Scanlines />
      <CustomCursor />

      <TopHud />
      <SoundToggle />
      <SideNav sections={SECTIONS} active={active} />

      <main id="main-content">
        <Hero />
        <NowPlaying />
        <Experience />
        <SkillsOrbit />
        <Projects />
        <StackViz />
        <OssContributions />
        <Contributions data={contributions} />
        <BugSnake />
        <Writing />
        <Testimonials />
        <Uses />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
