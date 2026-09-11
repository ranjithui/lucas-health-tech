import { useRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'light' | 'dark' | 'glass'
  interactive?: boolean
  spotlight?: boolean
  children: ReactNode
}

/** Soft layered card with optional cursor spotlight. */
export function Card({ tone = 'light', interactive, spotlight, className, children, ...rest }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlight || reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        'relative overflow-hidden rounded-3xl border transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)]',
        tone === 'light' && 'bg-white border-paper-300 shadow-soft',
        tone === 'dark' && 'bg-ink-800 border-white/10 text-white',
        tone === 'glass' && 'glass text-white',
        interactive && 'hover:-translate-y-1 hover:shadow-lift',
        interactive && tone !== 'light' && 'hover:border-accent-500/40',
        className,
      )}
      {...rest}
    >
      {spotlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [.group:hover_&]:opacity-100"
          style={{
            background:
              'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(25,198,165,0.14), transparent 60%)',
          }}
        />
      )}
      {children}
    </div>
  )
}
