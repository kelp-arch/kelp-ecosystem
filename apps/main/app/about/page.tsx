import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Kelp and our mission in addiction recovery',
}

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <div className="relative">
        <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
        <Container className="relative">
          <Navbar />
          <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
            <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
              About Kelp
            </h1>
            <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
              Building evidence-based frameworks for lasting transformation in addiction recovery.
            </p>
            
            <div className="mt-16 max-w-3xl">
              <h2 className="text-3xl font-semibold text-gray-950">Our Mission</h2>
              <p className="mt-4 text-lg text-gray-700">
                Kelp provides a comprehensive, hierarchical framework for understanding and navigating addiction recovery. 
                We combine cutting-edge research with practical application to help individuals build lasting change.
              </p>
              
              <h2 className="mt-12 text-3xl font-semibold text-gray-950">The Kelp Architecture</h2>
              <p className="mt-4 text-lg text-gray-700">
                Our framework organizes recovery knowledge across four domains: Physiological, Psychological, 
                Sociological, and Existential. This structure enables deeper understanding and personalized pathways 
                to lasting recovery.
              </p>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    </main>
  )
}