import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { usePrefersReducedMotion } from './useMediaQuery'

export function useCountUp(target: number, duration = 1600, decimals = 0) {
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setValue(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 4)
      setValue(Number((target * eased).toFixed(decimals)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration, decimals, reduced])

  return { ref, value }
}
