import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import {
  getArchitectureData,
  getForestById,
  getFieldById,
  getClusterById,
  getAnchorById,
  getBreadcrumbs,
} from '@/lib/architecture'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const data = getArchitectureData()
  const params: Array<{ id: string }> = []

  // Generate params for all levels
  data.forests.forEach((forest) => {
    params.push({ id: forest.id })
    forest.fields?.forEach((field) => {
      params.push({ id: field.id })
      field.clusters?.forEach((cluster) => {
        params.push({ id: cluster.id })
        cluster.anchors?.forEach((anchor) => {
          params.push({ id: anchor.id })
        })
      })
    })
  })

  return params
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const item =
    getForestById(params.id) ||
    getFieldById(params.id) ||
    getClusterById(params.id) ||
    getAnchorById(params.id)

  if (!item) {
    return {}
  }

  return {
    title: item.label,
    description: item.scope || '',
  }
}

export default async function ArchitectureItemPage(props: Props) {
  const params = await props.params
  
  // Determine type and get data
  const forest = getForestById(params.id)
  const field = getFieldById(params.id)
  const cluster = getClusterById(params.id)
  const anchor = getAnchorById(params.id)

  const item = forest || field || cluster || anchor

  if (!item) {
    notFound()
  }

  const breadcrumbs = getBreadcrumbs(params.id)

  return (
    <main className="overflow-hidden">
      <div className="relative">
        <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
        <Container className="relative">
          <Navbar />
          <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
              {breadcrumbs.map((crumb, index) => (
                <span key={crumb.id} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  <Link href={crumb.href} className="hover:text-gray-950">
                    {crumb.name}
                  </Link>
                </span>
              ))}
            </nav>

            <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-7xl/[0.8]">
              {item.label}
            </h1>
            <p className="mt-8 max-w-3xl text-xl/7 text-gray-700">{item.scope}</p>

            {/* Forest: Show Fields */}
            {forest && forest.fields && (
              <div className="mt-16 space-y-8">
                <h2 className="text-3xl font-semibold text-gray-950">Fields</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {forest.fields.map((f) => (
                    <Link
                      key={f.id}
                      href={`/architecture/${f.id}`}
                      className="group rounded-xl border border-gray-200 p-6 hover:border-gray-300 hover:bg-gray-50"
                    >
                      <h3 className="text-xl font-semibold text-gray-950 group-hover:text-gray-700">
                        {f.label}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">{f.scope}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Field: Show Clusters */}
            {field && field.clusters && (
              <div className="mt-16 space-y-8">
                <h2 className="text-3xl font-semibold text-gray-950">Clusters</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {field.clusters.map((c) => (
                    <Link
                      key={c.id}
                      href={`/architecture/${c.id}`}
                      className="group rounded-xl border border-gray-200 p-6 hover:border-gray-300 hover:bg-gray-50"
                    >
                      <h3 className="text-lg font-semibold text-gray-950 group-hover:text-gray-700">
                        {c.label}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">{c.scope}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Cluster: Show Anchors */}
            {cluster && cluster.anchors && (
              <div className="mt-16 space-y-8">
                <h2 className="text-3xl font-semibold text-gray-950">Anchors</h2>
                <div className="space-y-4">
                  {cluster.anchors.map((a) => (
                    <Link
                      key={a.id}
                      href={`/architecture/${a.id}`}
                      className="block rounded-lg border border-gray-200 p-4 hover:border-gray-300 hover:bg-gray-50"
                    >
                      <h3 className="font-semibold text-gray-950">{a.label}</h3>
                      {a.scope && <p className="mt-1 text-sm text-gray-600">{a.scope}</p>}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Anchor: Show Details */}
            {anchor && (
              <div className="mt-16 max-w-3xl space-y-8">
                {anchor.definition && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-950">Definition</h2>
                    <p className="mt-4 text-lg text-gray-700">{anchor.definition}</p>
                  </div>
                )}

                {anchor.examples && anchor.examples.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-950">Examples</h2>
                    <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
                      {anchor.examples.map((example, i) => (
                        <li key={i}>{example}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {anchor.theoretical_foundations && anchor.theoretical_foundations.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-950">
                      Theoretical Foundations
                    </h2>
                    <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
                      {anchor.theoretical_foundations.map((foundation, i) => (
                        <li key={i}>{foundation}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {anchor.related_concepts && anchor.related_concepts.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-950">Related Concepts</h2>
                    <ul className="mt-4 space-y-2 text-gray-700">
                      {anchor.related_concepts.map((concept, i) => (
                        <li key={i}>{concept}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {anchor.polar_pair && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-950">Polar Pair</h2>
                    <p className="mt-4 text-gray-700">
                      <Link
                        href={`/architecture/${anchor.polar_pair.anchor_id}`}
                        className="text-gray-950 underline hover:text-gray-700"
                      >
                        {anchor.polar_pair.anchor_id}
                      </Link>
                      {' '}({anchor.polar_pair.relationship})
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
        <Footer />
      </div>
    </main>
  )
}