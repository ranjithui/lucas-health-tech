import { Seo } from '../components/seo/Seo'
import { Button } from '../components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" noIndex />
      <section className="flex min-h-[80vh] items-center bg-ink-900 pt-20 text-white grid-bg">
        <div className="container-x text-center">
          <span className="eyebrow-dark">404</span>
          <h1 className="display-lg mt-4">This page isn’t part of the ecosystem.</h1>
          <p className="mx-auto mt-4 max-w-md text-muted-dark">The page you requested does not exist or has moved.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Button to="/" icon>
              Back to home
            </Button>
            <Button to="/contact" variant="outline" className="text-white">
              Contact
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
