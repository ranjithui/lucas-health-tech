import { motion, useScroll, useSpring } from 'motion/react'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-accent-500 via-accent-400 to-signal-500"
      style={{ scaleX }}
    />
  )
}
