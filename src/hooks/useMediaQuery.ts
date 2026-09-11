import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/** Heuristic for "low-performance" devices: coarse pointer + few cores or save-data. */
export function useLowPower(): boolean {
  const reduced = usePrefersReducedMotion()
  const [low, setLow] = useState(false)
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
    const cores = nav.hardwareConcurrency ?? 4
    const mem = nav.deviceMemory ?? 4
    setLow(cores <= 2 || mem <= 2 || !!nav.connection?.saveData)
  }, [])
  return reduced || low
}
