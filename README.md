# Lucas Health Tech — Next-Generation HealthTech Website

A premium, interactive React website for [Lucas Health Tech](https://lucashealthtech.com/): clinical systems architecture and executive operations for healthcare.

## Stack

- **React 19 + TypeScript + Vite 8** (Rolldown), code-split by route and by heavy section
- **Tailwind CSS v4** design tokens in `src/styles/index.css`
- **Motion** (`motion/react`) for scroll-based storytelling, micro-interactions, and reduced-motion support
- **React Router 7** with legacy-URL redirects from the previous site
- **lucide-react** icons, Google Fonts (Manrope + Inter, `display=swap`)
- No WebGL dependency: the signature hero network is a lightweight Canvas 2D scene with a static SVG fallback on low-power / reduced-motion devices

## Scripts

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # serve dist/
npm run lint      # oxlint
```

## Architecture

```
src/
├── animations/   motion variants (fadeUp, stagger, wordReveal)
├── components/
│   ├── ui/         Button (magnetic), Card (spotlight), Modal (focus trap), Primitives (Section, SectionHeading, Tag, Eyebrow)
│   ├── layout/     Header (transparent → glass), MobileNav (bottom bar), Footer, ScrollProgress, Logo
│   ├── visuals/    NetworkCanvas (hero), EcosystemGraph (SVG), IntelligencePipeline, Counter
│   ├── forms/      ContactWizard (3-step, validated)
│   ├── assistant/  Assistant (rule-based, on-device, no medical advice)
│   └── seo/        Seo (title, description, canonical, Open Graph, JSON-LD via React 19 head hoisting)
├── sections/     Hero, Story, SolutionsExplorer, AudienceSwitch, Ecosystem, Intelligence, Impact, WhyLHT, Engagements, Testimonials, InsightsPreview, PageHero
├── pages/        Home, Solutions, Industries, About, Insights, InsightArticle, Contact, Legal (Privacy, Terms), NotFound
├── layouts/      RootLayout (header, footer, mobile nav, assistant, hash scrolling)
├── hooks/        useAudience (personalization), useMediaQuery/useLowPower, useScrollSpy, useMagnetic, useCountUp
├── data/         ALL COPY LIVES HERE: company, solutions, engagements, testimonials, industries, insights, ecosystem, assistant
├── utils/        cn, format (readingTime, formatDate, slugify)
└── styles/       index.css (tokens, base, components, utilities)
```

## Content: source of truth

Every fact, number, engagement, testimonial, and technology on this site was taken from the published pages of lucashealthtech.com (root page, Intelligent Automation page, Digital Innovation page, privacy policy, terms). Nothing was invented.

**When the client report arrives**, merge it into `src/data/*.ts`:

| File | What to update |
| --- | --- |
| `data/company.ts` | tagline, positioning, phone, hours, verified metrics, differentiators, technologies |
| `data/solutions.ts` | services, capabilities, workflow steps, audiences |
| `data/engagements.ts` | case studies (Challenge → Approach → Technology → Solution → Outcome) |
| `data/testimonials.ts` | references |
| `data/industries.ts` | segments served and evidence |
| `data/insights.ts` | articles (markdown-lite body: `## ` headings, `- ` bullets) |
| `data/assistant.ts` | approved answers for the website assistant |

The `insights` articles are editorial drafts derived from existing site copy and should be reviewed by the client before launch. The legal pages summarise the published policies; replace with full legal text.

## Contact form

The wizard validates client-side and posts JSON to `VITE_CONTACT_ENDPOINT` when set (see `.env.example`). Without an endpoint, submissions are simulated so the experience works locally. Wire it to Formspree, HubSpot, a serverless function, or the client's CRM.

Payload shape:

```json
{ "intent": "consultation", "name": "", "company": "", "email": "", "phone": "", "requirement": "", "consent": true, "source": "lucashealthtech.com", "submittedAt": "ISO-8601" }
```

## Personalization

`AudienceSwitch` lets a visitor pick Healthcare Provider / Health Tech Venture / Technology Partner. The choice is stored in `localStorage` only and reorders and labels solutions. No tracking, no cookies set by the app.

## Accessibility

Skip link, semantic landmarks, keyboard-operable tabs/radios/dialog with focus trap, `aria-live` regions for dynamic panels, visible focus rings, contrast-checked palette, and `prefers-reduced-motion` honoured globally (`MotionConfig reducedMotion="user"` plus CSS).

## SEO

Per-route `<title>`, description, canonical, Open Graph/Twitter tags, JSON-LD (ProfessionalService, Person, Service list, Article). `public/robots.txt`, `public/sitemap.xml`, `public/og-image.png`. Legacy URLs (`/home`, `/contact-us-4831`, `/privacy-policy-8873`, `/terms-conditions-7829`, `/IntelligentAutomation`, `/digital_innovation`) redirect to the new routes.

## Deployment

Static SPA. `vercel.json` and `public/_redirects` (Netlify) rewrite all routes to `index.html`. Build output is `dist/`.
