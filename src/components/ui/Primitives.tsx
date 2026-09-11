import type { HTMLAttributes, ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '../../utils/cn'
import { fadeUp, stagger, viewportOnce } from '../../animations/variants'

export function Tag({ children, dark, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-wide',
        dark ? 'border-white/12 bg-white/5 text-white/75' : 'border-paper-300 bg-paper-100 text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Eyebrow({ children, dark, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', dark ? 'eyebrow-dark' : 'eyebrow', className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', dark ? 'bg-accent-400' : 'bg-accent-500')} aria-hidden />
      {children}
    </span>
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  dark?: boolean
  align?: 'left' | 'center'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeading({ eyebrow, title, lead, dark, align = 'left', className, as = 'h2' }: SectionHeadingProps) {
  const Heading = motion[as]
  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <motion.div variants={fadeUp} className="mb-5">
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </motion.div>
      )}
      <Heading variants={fadeUp} className={cn('display-lg text-balance', dark ? 'text-white' : 'text-text')}>
        {title}
      </Heading>
      {lead && (
        <motion.p
          variants={fadeUp}
          className={cn('mt-5 text-[17px] leading-relaxed text-pretty md:text-lg', dark ? 'text-muted-dark' : 'text-muted')}
        >
          {lead}
        </motion.p>
      )}
    </motion.div>
  )
}

export function Section({
  id,
  dark,
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLElement> & { dark?: boolean; children: ReactNode }) {
  return (
    <section
      id={id}
      className={cn('relative py-24 md:py-32', dark ? 'bg-ink-900 text-white' : 'bg-paper-100 text-text', className)}
      {...rest}
    >
      {children}
    </section>
  )
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
