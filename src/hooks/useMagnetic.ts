import { useCallback, useRef } from 'react'
import { usePrefersReducedMotion, useIsMobile } from './useMediaQuery'

/** Magnetic hover effect for CTA buttons. Disabled on touch and reduced-motion. */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null)
  const reduced = usePrefersReducedMotion()
  const mobile = useIsMobile()
  const enabled = !reduced && !mobile

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!enabled || !ref.current) return
      const el = ref.current
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * strength
      const y = (e.clientY - (r.top + r.height / 2)) * strength
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    },
    [enabled, strength],
  )

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'translate3d(0,0,0)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
