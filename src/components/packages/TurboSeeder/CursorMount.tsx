'use client'

import { useEffect, useState } from 'react'
import { CustomCursor } from '@/components/chrome/CustomCursor'

export function CursorMount() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    setShow(mq.matches)
  }, [])

  return show ? <CustomCursor /> : null
}
