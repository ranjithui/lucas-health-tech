import { lazy, Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { MobileNav } from '../components/layout/MobileNav'
import { ScrollProgress } from '../components/layout/ScrollProgress'

const Assistant = lazy(() => import('../components/assistant/Assistant').then((m) => ({ default: m.Assistant })))

const darkHeroRoutes = ['/', '/solutions', '/industries', '/about', '/insights', '/contact']

export function RootLayout() {
  const { pathname, hash } = useLocation()
  const overHero = darkHeroRoutes.includes(pathname) || pathname.startsWith('/insights/')

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return (
    <>
      <ScrollProgress />
      <Header overHero={overHero} />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <Suspense fallback={null}>
        <Assistant />
      </Suspense>
    </>
  )
}
