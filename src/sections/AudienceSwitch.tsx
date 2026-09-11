import { audiences } from '../data/solutions'
import { useAudience } from '../hooks/useAudience'
import { cn } from '../utils/cn'

/** Lightweight personalization: pick who you are; stored locally, no tracking. */
export function AudienceSwitch({ dark, className }: { dark?: boolean; className?: string }) {
  const { audience, setAudience } = useAudience()
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <span className={cn('font-mono text-[10.5px] uppercase tracking-[0.2em]', dark ? 'text-white/45' : 'text-muted')}>I am a…</span>
      <div role="radiogroup" aria-label="Personalize content for your role" className={cn('inline-flex flex-wrap gap-1 rounded-full border p-1', dark ? 'border-white/12 bg-white/5' : 'border-paper-300 bg-white')}>
        {audiences.map((a) => {
          const on = audience === a.id
          return (
            <button
              key={a.id}
              role="radio"
              aria-checked={on}
              title={a.description}
              onClick={() => setAudience(on ? null : a.id)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300',
                on ? 'bg-accent-500 text-ink-900 shadow-[0_4px_12px_-4px_rgba(25,198,165,.6)]' : dark ? 'text-white/70 hover:text-white' : 'text-muted hover:text-text',
              )}
            >
              {a.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
