import { useCallback, useEffect, useState, type RefCallback } from 'react'

export interface ScrollStateResult {
  readonly scrolled: boolean
  readonly sentinelRef: RefCallback<HTMLElement>
}

export function useScrollState(externalSentinel?: HTMLElement | null): ScrollStateResult {
  const [internalNode, setInternalNode] = useState<HTMLElement | null>(null)
  const [scrolled, setScrolled] = useState<boolean>(false)

  const sentinelRef = useCallback((node: HTMLElement | null) => {
    setInternalNode(node)
  }, [])

  const target = externalSentinel ?? internalNode

  useEffect(() => {
    if (!target || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) {
          return
        }
        setScrolled(!entry.isIntersecting)
      },
      { threshold: 0 },
    )

    observer.observe(target)
    return () => {
      observer.disconnect()
    }
  }, [target])

  return { scrolled, sentinelRef }
}
