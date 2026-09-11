import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import {
  assistantAnswers,
  assistantFallback,
  assistantMedicalRefusal,
  assistantSuggestions,
  medicalKeywords,
} from '../../data/assistant'
import { cn } from '../../utils/cn'

interface Msg {
  id: number
  role: 'user' | 'assistant'
  text: string
  links?: { label: string; to: string }[]
}

function answer(q: string): Omit<Msg, 'id' | 'role'> {
  const t = q.toLowerCase()
  if (medicalKeywords.some((k) => t.includes(k))) return { text: assistantMedicalRefusal, links: [{ label: 'Contact', to: '/contact' }] }
  let best: { score: number; a: (typeof assistantAnswers)[number] } | null = null
  for (const a of assistantAnswers) {
    const score = a.keywords.reduce((s, k) => (t.includes(k) ? s + k.length : s), 0)
    if (score > 0 && (!best || score > best.score)) best = { score, a }
  }
  if (!best) return { text: assistantFallback, links: [{ label: 'Talk to an expert', to: '/contact' }] }
  return { text: best.a.answer, links: best.a.links }
}

/** Rule-based, on-device assistant. Answers only from approved company content. */
export function Assistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 0,
      role: 'assistant',
      text: 'Hi, I can help you understand Lucas Health Tech’s services, find the right solution, and get in touch. What are you looking for?',
    },
  ])
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const idRef = useRef(1)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, open])

  const ask = (q: string) => {
    const text = q.trim()
    if (!text) return
    const u: Msg = { id: idRef.current++, role: 'user', text }
    setMsgs((m) => [...m, u])
    setInput('')
    setTimeout(() => {
      const a = answer(text)
      setMsgs((m) => [...m, { id: idRef.current++, role: 'assistant', ...a }])
    }, 350)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    ask(input)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="lht-assistant"
        aria-label={open ? 'Close website assistant' : 'Open website assistant'}
        className={cn(
          'fixed right-4 z-[65] inline-flex h-12 items-center gap-2 rounded-full bg-ink-900 pl-4 pr-5 text-sm font-semibold text-white shadow-lift ring-1 ring-white/10 transition hover:bg-ink-700',
          'bottom-[88px] md:bottom-6',
        )}
      >
        {open ? <X className="h-4 w-4" /> : <Sparkles className="h-4 w-4 text-accent-400" />}
        <span className="hidden sm:inline">{open ? 'Close' : 'Ask LHT'}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.section
            id="lht-assistant"
            aria-label="Website assistant"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[148px] right-4 z-[65] flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-paper-300 bg-white shadow-lift md:bottom-[84px]"
            style={{ maxHeight: 'min(70dvh, 560px)' }}
          >
            <header className="flex items-center gap-3 border-b border-paper-200 bg-ink-900 px-4 py-3 text-white">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-500/20 text-accent-300">
                <MessageCircle className="h-4 w-4" />
              </span>
              <div>
                <div className="text-sm font-semibold">LHT Assistant</div>
                <div className="text-[11px] text-white/55">Answers from approved company content only</div>
              </div>
            </header>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" role="log" aria-live="polite">
              {msgs.map((m) => (
                <div key={m.id} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed',
                      m.role === 'user' ? 'bg-ink-900 text-white' : 'bg-paper-100 text-text',
                    )}
                  >
                    {m.text}
                    {m.links && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.links.map((l) => (
                          <Link
                            key={l.to}
                            to={l.to}
                            onClick={() => setOpen(false)}
                            className="rounded-full border border-accent-500/40 bg-white px-2.5 py-1 text-[12px] font-medium text-accent-700 hover:bg-accent-500/10"
                          >
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-paper-200 px-3 pb-3 pt-2">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {assistantSuggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="rounded-full border border-paper-300 px-2.5 py-1 text-[11.5px] text-muted transition hover:border-accent-500 hover:text-text"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <form onSubmit={onSubmit} className="flex items-center gap-2">
                <label htmlFor="assistant-input" className="sr-only">
                  Ask a question about Lucas Health Tech
                </label>
                <input
                  id="assistant-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about services, industries, or contact…"
                  className="h-10 flex-1 rounded-full border border-paper-300 bg-paper-50 px-4 text-[13.5px] outline-none transition focus:border-accent-500"
                  maxLength={300}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-500 text-ink-900 transition hover:bg-accent-400"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-2 text-[10.5px] leading-snug text-muted">No medical advice. Nothing you type leaves your browser.</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}
