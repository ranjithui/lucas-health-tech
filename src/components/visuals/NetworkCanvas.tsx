import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLowPower, useIsMobile } from '../../hooks/useMediaQuery'
import { cn } from '../../utils/cn'

/**
 * Signature hero visual: Healthcare → Data → Technology → Intelligence → Outcomes.
 * Lightweight Canvas 2D particle network (no WebGL dependency) with mouse
 * interaction and animated data packets. Falls back to a static SVG on
 * low-power devices or when reduced motion is preferred.
 */
interface HubNode {
  id: string
  label: string
  x: number // 0..1
  y: number // 0..1
  info: string
}

const hubs: HubNode[] = [
  { id: 'healthcare', label: 'Healthcare', x: 0.14, y: 0.42, info: 'Clinical workflows, providers, and patients. Where every platform decision starts.' },
  { id: 'data', label: 'Data', x: 0.36, y: 0.2, info: 'FHIR-native, HL7-interoperable clinical data and enterprise data products.' },
  { id: 'technology', label: 'Technology', x: 0.5, y: 0.66, info: 'Platform architecture across Epic, Oracle Health, payer portals, and specialty networks.' },
  { id: 'intelligence', label: 'Intelligence', x: 0.7, y: 0.3, info: 'RPA, API orchestration, and predictive models governed through Centers of Excellence.' },
  { id: 'outcomes', label: 'Better outcomes', x: 0.88, y: 0.6, info: '200+ production automations and 2.1M+ annual transactions aligned to quantified ROI.' },
]

const edges: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [3, 4],
]

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

interface Packet {
  edge: number
  t: number
  speed: number
  dir: 1 | -1
}

export function NetworkCanvas({ className }: { className?: string }) {
  const lowPower = useLowPower()
  const mobile = useIsMobile()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<HubNode | null>(null)
  const [hubPx, setHubPx] = useState<{ x: number; y: number }[]>([])
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    if (lowPower) return
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0
    let running = true
    const count = mobile ? 34 : 70
    let particles: Particle[] = []
    let packets: Packet[] = []

    const resize = () => {
      const r = wrap.getBoundingClientRect()
      w = r.width
      h = r.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      setHubPx(hubs.map((n) => ({ x: n.x * w, y: n.y * h })))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }))
      packets = edges.map((_, i) => ({ edge: i, t: Math.random(), speed: 0.0025 + Math.random() * 0.003, dir: Math.random() > 0.5 ? 1 : -1 }))
    }

    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    resize()

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => (mouse.current = { x: -9999, y: -9999 })
    wrap.addEventListener('pointermove', onMove, { passive: true })
    wrap.addEventListener('pointerleave', onLeave)

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting
      if (running) raf = requestAnimationFrame(draw)
    })
    io.observe(wrap)

    let last = performance.now()
    const draw = (now: number) => {
      if (!running) return
      const dt = Math.min(32, now - last) / 16.67
      last = now
      ctx.clearRect(0, 0, w, h)

      const hp = hubs.map((n) => ({ x: n.x * w, y: n.y * h }))
      const m = mouse.current

      // particles
      for (const p of particles) {
        const dx = p.x - m.x
        const dy = p.y - m.y
        const d2 = dx * dx + dy * dy
        if (d2 < 140 * 140) {
          const d = Math.sqrt(d2) || 1
          p.vx += (dx / d) * 0.06
          p.vy += (dy / d) * 0.06
        }
        p.vx *= 0.985
        p.vy *= 0.985
        p.x += p.vx * dt
        p.y += p.vy * dt
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }

      // particle links
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 110 * 110) {
            const alpha = (1 - Math.sqrt(d2) / 110) * 0.16
            ctx.strokeStyle = `rgba(154,164,177,${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        // link to nearest hub
        for (const hh of hp) {
          const dx = a.x - hh.x
          const dy = a.y - hh.y
          const d2 = dx * dx + dy * dy
          if (d2 < 150 * 150) {
            const alpha = (1 - Math.sqrt(d2) / 150) * 0.22
            ctx.strokeStyle = `rgba(25,198,165,${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(hh.x, hh.y)
            ctx.stroke()
          }
        }
      }
      for (const p of particles) {
        ctx.fillStyle = 'rgba(200,210,220,0.55)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // hub edges
      ctx.lineWidth = 1.2
      for (const [a, b] of edges) {
        const g = ctx.createLinearGradient(hp[a].x, hp[a].y, hp[b].x, hp[b].y)
        g.addColorStop(0, 'rgba(25,198,165,0.35)')
        g.addColorStop(1, 'rgba(242,180,65,0.25)')
        ctx.strokeStyle = g
        ctx.beginPath()
        ctx.moveTo(hp[a].x, hp[a].y)
        ctx.lineTo(hp[b].x, hp[b].y)
        ctx.stroke()
      }

      // packets
      for (const pk of packets) {
        pk.t += pk.speed * dt * pk.dir
        if (pk.t > 1 || pk.t < 0) {
          pk.dir = pk.dir === 1 ? -1 : 1
          pk.t = Math.max(0, Math.min(1, pk.t))
        }
        const [a, b] = edges[pk.edge]
        const x = hp[a].x + (hp[b].x - hp[a].x) * pk.t
        const y = hp[a].y + (hp[b].y - hp[a].y) * pk.t
        ctx.fillStyle = 'rgba(111,227,203,0.95)'
        ctx.shadowColor = 'rgba(25,198,165,0.9)'
        ctx.shadowBlur = 12
        ctx.beginPath()
        ctx.arc(x, y, 2.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // hub cores
      for (let i = 0; i < hp.length; i++) {
        const { x, y } = hp[i]
        const pulse = 0.5 + 0.5 * Math.sin(now / 900 + i)
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 26 + pulse * 8)
        grad.addColorStop(0, 'rgba(25,198,165,0.35)')
        grad.addColorStop(1, 'rgba(25,198,165,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(x, y, 26 + pulse * 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = i === hubs.length - 1 ? '#f2b441' : '#19c6a5'
        ctx.beginPath()
        ctx.arc(x, y, 4.5, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [lowPower, mobile])

  if (lowPower) return <StaticNetwork className={className} />

  return (
    <div ref={wrapRef} className={cn('relative h-full w-full', className)} role="img" aria-label="Animated network connecting Healthcare, Data, Technology, Intelligence, and Better outcomes">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      {hubPx.length > 0 &&
        hubs.map((n, i) => (
          <button
            key={n.id}
            type="button"
            onMouseEnter={() => setActive(n)}
            onFocus={() => setActive(n)}
            onMouseLeave={() => setActive(null)}
            onBlur={() => setActive(null)}
            onClick={() => setActive((a) => (a?.id === n.id ? null : n))}
            className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-accent-400"
            style={{ left: hubPx[i].x, top: hubPx[i].y }}
            aria-label={`${n.label}: ${n.info}`}
          >
            <span className="block h-8 w-8 rounded-full" aria-hidden />
            <span
              className={cn(
                'absolute top-full mt-1 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors',
                n.x > 0.8 ? 'right-0' : n.x < 0.2 ? 'left-0' : 'left-1/2 -translate-x-1/2',
                i === hubs.length - 1
                  ? 'border-signal-500/30 bg-ink-900/80 text-signal-400'
                  : 'border-accent-500/25 bg-ink-900/80 text-accent-300',
                'group-hover:border-accent-400/60',
              )}
            >
              {n.label}
            </span>
          </button>
        ))}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="glass pointer-events-none absolute bottom-3 left-3 right-3 z-10 rounded-2xl p-4 text-sm text-white/85 sm:left-auto sm:w-72"
            role="status"
          >
            <div className="eyebrow-dark mb-1">{active.label}</div>
            {active.info}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Reduced-motion / low-power fallback: static SVG with the same nodes. */
function StaticNetwork({ className }: { className?: string }) {
  return (
    <div className={cn('relative h-full w-full', className)}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={hubs[a].x * 100}
            y1={hubs[a].y * 100}
            x2={hubs[b].x * 100}
            y2={hubs[b].y * 100}
            stroke="rgba(25,198,165,0.4)"
            strokeWidth={0.3}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {hubs.map((n, i) => (
        <div
          key={n.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }}
        >
          <span className={cn('mx-auto block h-3 w-3 rounded-full', i === hubs.length - 1 ? 'bg-signal-500' : 'bg-accent-500')} />
          <span className="mt-1 block whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent-300">{n.label}</span>
        </div>
      ))}
      <p className="sr-only">Healthcare connects to Data, Technology, Intelligence, and Better outcomes.</p>
    </div>
  )
}
