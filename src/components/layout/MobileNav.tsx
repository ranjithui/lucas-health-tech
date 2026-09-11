import { NavLink } from 'react-router-dom'
import { Home, Layers, Building2, BookOpen, MessageSquare } from 'lucide-react'
import { cn } from '../../utils/cn'

const items = [
  { to: '/', label: 'Home', Icon: Home, end: true },
  { to: '/solutions', label: 'Solutions', Icon: Layers },
  { to: '/industries', label: 'Industries', Icon: Building2 },
  { to: '/insights', label: 'Insights', Icon: BookOpen },
  { to: '/contact', label: 'Contact', Icon: MessageSquare },
]

/** Mobile bottom navigation, thumb-reachable. Hidden on md+. */
export function MobileNav() {
  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="glass-light fixed inset-x-3 bottom-3 z-[50] rounded-2xl border border-black/5 shadow-lift md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-5">
        {items.map(({ to, label, Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium tracking-wide transition',
                  isActive ? 'text-accent-700' : 'text-muted',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className={cn('grid h-7 w-9 place-items-center rounded-full transition', isActive && 'bg-accent-500/15')}>
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
