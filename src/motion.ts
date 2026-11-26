import { useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'

export const reducedMotion = '(prefers-reduced-motion: reduce)'

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const node = ref.current
    if (!node || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.dataset.reveal = 'visible'
        observer.disconnect()
      }
    }, { threshold: .08 })
    node.dataset.reveal = 'pending'
    observer.observe(node)
    return () => {
      observer.disconnect()
      delete node.dataset.reveal
    }
  }, [])
  return ref
}

export function transition(update: () => void) {
  if (document.startViewTransition && !matchMedia(reducedMotion).matches) {
    const animation = document.startViewTransition(() => flushSync(update))
    void animation.ready.catch(() => {}) // Resizing can skip the snapshot animation.
    return animation.finished.catch(() => {})
  }
  update()
  return Promise.resolve()
}
