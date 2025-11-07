import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Suspense } from 'react'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="overflow-hidden">
      <div className="relative">
        <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
        <Container className="relative">
          <Navbar />
          <article className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
            <header className="max-w-3xl">
              <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-7xl/[0.8]">
                {post.title}
              </h1>
              <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
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
            </header>

            <Suspense fallback={<div>Loading...</div>}>
              <div className="prose prose-lg prose-gray mt-12 max-w-3xl">
                <MDXRemote source={post.content} />
              </div>
            </Suspense>
          </article>
        </Container>
        <Footer />
      </div>
    </main>
  )
}