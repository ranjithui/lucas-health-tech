import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../utils/cn'
import { useMagnetic } from '../../hooks/useMagnetic'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'outline'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,border-color] duration-300 ease-[cubic-bezier(.16,1,.3,1)] disabled:opacity-50 disabled:pointer-events-none select-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent-500 text-ink-900 hover:bg-accent-400 shadow-[0_8px_24px_-8px_rgba(25,198,165,.6)] hover:shadow-[0_12px_32px_-8px_rgba(25,198,165,.7)]',
  secondary: 'bg-ink-900 text-white hover:bg-ink-700',
  inverse: 'bg-white text-ink-900 hover:bg-paper-200',
  ghost: 'bg-transparent text-current hover:bg-black/5 dark:hover:bg-white/10',
  outline: 'bg-transparent border border-current/25 text-current hover:border-current/60',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-[14px]',
  lg: 'h-13 px-8 text-[15px] min-h-[52px]',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  icon?: boolean
  magnetic?: boolean
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined }
type LinkProps = CommonProps & { to: string; href?: undefined } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
type AnchorProps = CommonProps & { href: string; to?: undefined } & AnchorHTMLAttributes<HTMLAnchorElement>

export type Props = ButtonProps | LinkProps | AnchorProps

function Inner({ children, icon }: { children: ReactNode; icon?: boolean }) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowUpRight
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}
    </>
  )
}

export const Button = forwardRef<HTMLElement, Props>(function Button(props, _ref) {
  const { variant = 'primary', size = 'md', icon, magnetic = true, className, children, ...rest } = props
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLElement>(0.3)
  const cls = cn(base, variants[variant], sizes[size], magnetic && 'will-change-transform transition-transform', className)
  const magnet = magnetic ? { onMouseMove, onMouseLeave } : {}

  if ('to' in props && props.to) {
    const { to, ...a } = rest as LinkProps
    return (
      <Link to={to} ref={ref as React.Ref<HTMLAnchorElement>} className={cls} {...magnet} {...(a as object)}>
        <Inner icon={icon}>{children}</Inner>
      </Link>
    )
  }
  if ('href' in props && props.href) {
    const { href, ...a } = rest as AnchorProps
    return (
      <a href={href} ref={ref as React.Ref<HTMLAnchorElement>} className={cls} {...magnet} {...(a as object)}>
        <Inner icon={icon}>{children}</Inner>
      </a>
    )
  }
  const b = rest as ButtonProps
  return (
    <button type={b.type ?? 'button'} ref={ref as React.Ref<HTMLButtonElement>} className={cls} {...magnet} {...(b as object)}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  )
})
