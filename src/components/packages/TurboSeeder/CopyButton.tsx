'use client'

import { useState, useRef, useEffect } from 'react'

interface CopyButtonProps {
  text: string
  /** accessible name, e.g. "Copy install command" */
  label: string
}

export function CopyButton({ text, label }: CopyButtonProps) {
  const [copyLabel, setCopyLabel] = useState('Copy')
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(resetTimerRef.current), [])

  function handleCopy() {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    navigator.clipboard.writeText(text)
      .then(() => setCopyLabel('Copied ✓'))
      .catch(() => setCopyLabel('Failed. Try again.'))
      .finally(() => {
        clearTimeout(resetTimerRef.current)
        resetTimerRef.current = setTimeout(() => setCopyLabel('Copy'), 1600)
      })
  }

  return (
    <button type="button" className="ts-qs-copy" onClick={handleCopy} aria-label={label}>
      <span aria-live="polite">{copyLabel}</span>
    </button>
  )
}
