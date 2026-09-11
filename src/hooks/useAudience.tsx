import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Audience } from '../data/solutions'

interface AudienceContextValue {
  audience: Audience | null
  setAudience: (a: Audience | null) => void
}

const AudienceContext = createContext<AudienceContextValue>({ audience: null, setAudience: () => {} })
const KEY = 'lht:audience'

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setState] = useState<Audience | null>(() => {
    try {
      const saved = localStorage.getItem(KEY)
      return saved === 'provider' || saved === 'venture' || saved === 'partner' ? saved : null
    } catch {
      return null
    }
  })

  const setAudience = useCallback((a: Audience | null) => {
    setState(a)
    try {
      if (a) localStorage.setItem(KEY, a)
      else localStorage.removeItem(KEY)
    } catch {
      /* storage unavailable */
    }
  }, [])

  const value = useMemo(() => ({ audience, setAudience }), [audience, setAudience])
  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>
}

export const useAudience = () => useContext(AudienceContext)
