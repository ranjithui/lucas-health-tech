import { useEffect, useState } from 'react'

/** Tracks which section id is currently most visible. */
export function useScrollSpy(ids: string[], rootMargin = '-40% 0px -55% 0px'): string | null {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids.join('|'), rootMargin]) // eslint-disable-line react-hooks/exhaustive-deps
  return active
}

export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > threshold))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [threshold])
  return scrolled
}
