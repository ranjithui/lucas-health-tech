import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Eyebrow } from '../components/ui/Primitives'
import { fadeUp, stagger } from '../animations/variants'
import { cn } from '../utils/cn'

/** Compact dark hero for inner pages. */
export function PageHero({ eyebrow, title, lead, children, className }: { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <section className={cn('relative overflow-hidden bg-ink-900 pb-16 pt-36 text-white md:pb-24 md:pt-44', className)}>
      <div aria-hidden className="absolute inset-0 grid-bg opacity-50" />
      <div aria-hidden className="absolute -right-40 top-0 h-[480px] w-[480px] rounded-full bg-accent-500/15 blur-3xl" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper-100 to-transparent" />
      <motion.div variants={stagger(0.08)} initial="hidden" animate="show" className="container-x relative">
        <motion.div variants={fadeUp}>
          <Eyebrow dark>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1 variants={fadeUp} className="display-xl mt-5 max-w-4xl text-balance">
          {title}
        </motion.h1>
        {lead && (
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-dark md:text-xl">
            {lead}
          </motion.p>
        )}
        {children && (
          <motion.div variants={fadeUp} className="mt-8">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
