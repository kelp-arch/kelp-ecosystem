import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on addiction recovery and the Kelp framework',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="overflow-hidden">
      <div className="relative">
        <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
        <Container className="relative">
          <Navbar />
          <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
            <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
              Blog
            </h1>
            <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
              Insights on addiction recovery, research, and the Kelp framework
            </p>

            <div className="mt-16 space-y-16">
              {posts.map((post) => (
                <article key={post.slug} className="max-w-3xl">
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-3xl font-semibold text-gray-950 hover:text-gray-700">
                      {post.title}
                    </h2>
                  </Link>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                  <p className="mt-4 text-lg text-gray-700">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-block text-gray-950 hover:text-gray-700"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    </main>
  )
}