import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { RootLayout } from './layouts/RootLayout'
import { AudienceProvider } from './hooks/useAudience'
import Home from './pages/Home'

const Solutions = lazy(() => import('./pages/Solutions'))
const Industries = lazy(() => import('./pages/Industries'))
const About = lazy(() => import('./pages/About'))
const Insights = lazy(() => import('./pages/Insights'))
const InsightArticle = lazy(() => import('./pages/InsightArticle'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const PrivacyPolicy = lazy(() => import('./pages/Legal').then((m) => ({ default: m.PrivacyPolicy })))
const Terms = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Terms })))

function PageFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-ink-900" role="status" aria-label="Loading">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent-500 border-t-transparent" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <AudienceProvider>
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route
                path="solutions"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <Solutions />
                  </Suspense>
                }
              />
              <Route
                path="industries"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <Industries />
                  </Suspense>
                }
              />
              <Route
                path="about"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <About />
                  </Suspense>
                }
              />
              <Route
                path="insights"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <Insights />
                  </Suspense>
                }
              />
              <Route
                path="insights/:slug"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <InsightArticle />
                  </Suspense>
                }
              />
              <Route
                path="contact"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <Contact />
                  </Suspense>
                }
              />
              <Route
                path="privacy-policy"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <PrivacyPolicy />
                  </Suspense>
                }
              />
              <Route
                path="terms"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <Terms />
                  </Suspense>
                }
              />
              {/* Legacy URLs from the previous website */}
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="contact-us-4831" element={<Navigate to="/contact" replace />} />
              <Route path="privacy-policy-8873" element={<Navigate to="/privacy-policy" replace />} />
              <Route path="terms-conditions-7829" element={<Navigate to="/terms" replace />} />
              <Route path="IntelligentAutomation" element={<Navigate to="/solutions#ai-automation-strategy" replace />} />
              <Route path="digital_innovation" element={<Navigate to="/solutions#digital-transformation" replace />} />
              <Route
                path="*"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </AudienceProvider>
      </MotionConfig>
    </BrowserRouter>
  )
}
