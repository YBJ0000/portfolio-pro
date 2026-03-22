import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '~/components/ui/Container'
import { MOCK_BLOG_POSTS } from '~/data/mock/blog-posts'
import { optionalPageDelay } from '~/lib/optional-page-delay'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return MOCK_BLOG_POSTS.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const { slug } = params
  const row = MOCK_BLOG_POSTS.find((p) => p.slug === slug)
  if (!row) return { title: 'Post' }
  return {
    title: row.title,
    description: `Mock article: ${row.title}`,
  }
}

export default async function BlogPostMockPage({ params }: Props) {
  await optionalPageDelay()
  const { slug } = params
  const row = MOCK_BLOG_POSTS.find((p) => p.slug === slug)
  if (!row) notFound()

  return (
    <Container className="mt-16 sm:mt-24">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/blog" className="text-lime-600 hover:underline dark:text-lime-400">
          ← Blog
        </Link>
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
        {row.title}
      </h1>
      <p className="mt-6 text-zinc-600 dark:text-zinc-400">
        This is a <strong>mock</strong> article shell for phase 1. Portable Text, comments, and
        Sanity-backed content will replace this in phase 2.
      </p>
    </Container>
  )
}
