import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

export default function BlogPage() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Container className="mt-16 pb-16">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Blog
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Coming Soon
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our blog will feature insights on addiction recovery, neuroscience research, and evidence-based treatment approaches.
          </p>
        </div>
      </Container>
      <Footer />
    </main>
  )
}
