import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react'
import { Seo } from '../components/seo/Seo'
import { Section } from '../components/ui/Primitives'
import { Button } from '../components/ui/Button'
import { insights } from '../data/insights'
import { company } from '../data/company'
import { readingTime, formatDate } from '../utils/format'
import { EditorialArt } from './Insights'
import { Fragment } from 'react'

/** Minimal markdown-lite renderer: "## " headings, "- " bullets, paragraphs. */
function renderBody(body: string) {
  const blocks = body.split(/\n\s*\n/)
  return blocks.map((b, i) => {
    const t = b.trim()
    if (t.startsWith('## ')) return <h2 key={i}>{t.slice(3)}</h2>
    if (t.startsWith('### ')) return <h3 key={i}>{t.slice(4)}</h3>
    if (t.split('\n').every((l) => l.trim().startsWith('- ')))
      return (
        <ul key={i}>
          {t.split('\n').map((l, j) => (
            <li key={j}>{l.trim().slice(2)}</li>
          ))}
        </ul>
      )
    return <p key={i}>{t}</p>
  })
}

export default function InsightArticle() {
  const { slug } = useParams()
  const article = insights.find((i) => i.slug === slug)
  if (!article) return <Navigate to="/404" replace />

  const related = insights
    .filter((i) => i.slug !== article.slug)
    .map((i) => ({ i, score: i.tags.filter((t) => article.tags.includes(t)).length + (i.category === article.category ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.i)

  return (
    <Fragment>
      <Seo
        title={article.title}
        description={article.excerpt}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          datePublished: article.date,
          author: { '@type': 'Organization', name: company.name },
          publisher: { '@type': 'Organization', name: company.name },
          keywords: article.tags.join(', '),
        }}
      />
      <article>
        <header className="relative overflow-hidden bg-ink-900 pb-16 pt-36 text-white md:pb-24 md:pt-44">
          <div className="absolute inset-0 opacity-60">
            <EditorialArt seed={article.slug.length % 5} />
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/40" />
          <div className="container-x relative">
            <Link to="/insights" className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
              <ArrowLeft className="h-4 w-4" aria-hidden /> All insights
            </Link>
            <div className="eyebrow-dark mt-8">{article.category}</div>
            <h1 className="display-lg mt-4 max-w-4xl text-balance">{article.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-dark">{article.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-white/60">
              <span>By {company.name}</span>
              <span>·</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden /> {readingTime(article.body)} min read
              </span>
            </div>
          </div>
        </header>

        <Section className="pt-14">
          <div className="container-x grid gap-12 lg:grid-cols-[1fr_300px]">
            <div className="prose-lht max-w-3xl">{renderBody(article.body)}</div>
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-paper-300 bg-white p-6 shadow-soft">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Topics</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {article.tags.map((t) => (
                    <Link key={t} to={`/insights?q=${encodeURIComponent(t)}`} className="rounded-full bg-paper-100 px-2.5 py-1 font-mono text-[11px] text-muted transition hover:bg-accent-500/15 hover:text-accent-700">
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl bg-ink-900 p-6 text-white">
                <div className="eyebrow-dark">Talk to an expert</div>
                <p className="mt-3 text-sm text-muted-dark">Discuss how this applies to your organization.</p>
                <Button to="/contact?intent=consultation" size="sm" icon className="mt-4">
                  Start a conversation
                </Button>
              </div>
            </aside>
          </div>
        </Section>

        {related.length > 0 && (
          <Section className="bg-paper-200 pt-0">
            <div className="container-x">
              <h2 className="display-md text-text">Related insights</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {related.map((r) => (
                  <article key={r.slug} className="group relative rounded-3xl border border-paper-300 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lift">
                    <span className="eyebrow">{r.category}</span>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-text">
                      <Link to={`/insights/${r.slug}`} className="after:absolute after:inset-0">
                        {r.title}
                      </Link>
                    </h3>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted">
                      <span>{readingTime(r.body)} min read</span>
                      <ArrowUpRight className="h-4 w-4 text-accent-600" aria-hidden />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Section>
        )}
      </article>
    </Fragment>
  )
}
