import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { getArchitectureData } from '@/lib/architecture'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kelp Architecture',
  description: 'A comprehensive framework for addiction recovery',
}

export default function ArchitecturePage() {
  const data = getArchitectureData()

  return (
    <main className="overflow-hidden">
      <div className="relative">
        <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
        <Container className="relative">
          <Navbar />
          <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
            <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
              Kelp Architecture
            </h1>
            <p className="mt-8 max-w-3xl text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
              {data.kelp_architecture.description}
            </p>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {data.forests.map((forest) => (
                <Link
                  key={forest.id}
                  href={`/architecture/${forest.id}`}
                  className="group rounded-2xl border border-gray-200 p-6 hover:border-gray-300 hover:bg-gray-50"
                >
                  <h2 className="text-2xl font-semibold text-gray-950 group-hover:text-gray-700">
                    {forest.label}
                  </h2>
                  <p className="mt-4 text-base text-gray-700">{forest.scope}</p>
                  <span className="mt-4 inline-block text-sm text-gray-950">
                    Explore →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    </main>
  )
}