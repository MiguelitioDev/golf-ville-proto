import { useCallback, useEffect, useState, type RefCallback } from 'react'
import { useReducedMotion } from './useReducedMotion.ts'

export interface UseInViewOptions {
  readonly once?: boolean
  readonly threshold?: number
  readonly rootMargin?: string
}

export function useInView<T extends Element = HTMLElement>(
  options: UseInViewOptions = {},
): readonly [RefCallback<T>, boolean] {
  const { once = true, threshold = 0.15, rootMargin = '0px' } = options
  const reducedMotion = useReducedMotion()
  const [element, setElement] = useState<T | null>(null)
  const [inViewState, setInViewState] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return true
    }
    return false
  })

  const ref = useCallback((node: T | null) => {
    setElement(node)
  }, [])

  useEffect(() => {
    if (reducedMotion || typeof IntersectionObserver === 'undefined' || !element) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) {
          return
        }
        if (entry.isIntersecting) {
          setInViewState(true)
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setInViewState(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [element, once, reducedMotion, rootMargin, threshold])

  const inView = reducedMotion || typeof IntersectionObserver === 'undefined' ? true : inViewState

  return [ref, inView] as const
}
