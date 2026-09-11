import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react'
import { Logo } from './Logo'
import { Button } from '../ui/Button'
import { useScrolled } from '../../hooks/useScrollSpy'
import { company } from '../../data/company'
import { cn } from '../../utils/cn'

export const navItems = [
  { label: 'Solutions', to: '/solutions' },
  { label: 'Industries', to: '/industries' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

/** Transparent over dark heroes; solid + blurred once scrolled. */
export function Header({ overHero }: { overHero: boolean }) {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const light = overHero && !scrolled && !open

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-ink-900"
      >
        Skip to content
      </a>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,backdrop-filter] duration-500',
          light ? 'border-b border-transparent bg-transparent' : 'glass-light border-b border-black/5',
        )}
      >
        <div className="container-x flex h-[72px] items-center justify-between">
          <Logo light={light} />

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors',
                    light ? 'text-white/75 hover:text-white' : 'text-muted hover:text-text',
                    isActive && (light ? 'text-white' : 'text-text'),
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className={cn('absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full', light ? 'bg-accent-400' : 'bg-accent-500')}
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={company.phoneHref}
              className={cn('inline-flex items-center gap-2 text-[13px] font-medium', light ? 'text-white/70 hover:text-white' : 'text-muted hover:text-text')}
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {company.phone}
            </a>
            <Button to="/contact" size="sm" icon variant={light ? 'inverse' : 'primary'}>
              Talk to an Expert
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full border md:hidden',
              light ? 'border-white/20 text-white' : 'border-paper-300 text-text',
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-paper-100 pt-[72px] md:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
              className="container-x flex h-full flex-col justify-between pb-8 pt-6"
            >
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <motion.li key={item.to} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl font-bold',
                          isActive ? 'bg-white text-text shadow-soft' : 'text-text/80',
                        )
                      }
                    >
                      {item.label}
                      <ArrowUpRight className="h-5 w-5 text-accent-600" aria-hidden />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="space-y-3">
                <Button to="/contact" size="lg" icon className="w-full">
                  Talk to an Expert
                </Button>
                <a href={company.phoneHref} className="flex items-center justify-center gap-2 text-sm text-muted">
                  <Phone className="h-4 w-4" aria-hidden /> {company.phone}
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
