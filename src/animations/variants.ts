import type { Variants, Transition } from 'motion/react'

export const easeOutExpo: Transition['ease'] = [0.16, 1, 0.3, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: easeOutExpo } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: easeOutExpo } },
}

export const stagger = (delay = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren } },
})

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '0.6em', rotateX: -30 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: easeOutExpo } },
}

export const viewportOnce = { once: true, amount: 0.25 } as const
