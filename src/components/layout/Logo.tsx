import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

export function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn('group inline-flex items-center gap-2.5', className)} aria-label="Lucas Health Tech home">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-ink-900 shadow-soft ring-1 ring-white/10">
        <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden>
          <circle cx="20" cy="22" r="5" fill="#19c6a5" />
          <circle cx="44" cy="22" r="5" fill="#19c6a5" />
          <circle cx="32" cy="44" r="6" fill="#f2b441" />
          <path d="M20 22h24M20 22l12 22M44 22L32 44" stroke="#19c6a5" strokeWidth="2.5" strokeLinecap="round" opacity=".7" />
        </svg>
      </span>
      <span className={cn('font-display text-[17px] font-bold tracking-[-0.02em]', light ? 'text-white' : 'text-text')}>
        Lucas <span className={light ? 'text-accent-300' : 'text-accent-600'}>Health</span> Tech
      </span>
    </Link>
  )
}
