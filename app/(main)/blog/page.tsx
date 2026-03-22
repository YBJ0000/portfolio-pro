import type { Metadata } from 'next'

import { BlogPostCard } from '~/app/(main)/blog/BlogPostCard'
import { Container } from '~/components/ui/Container'
import { MOCK_BLOG_POSTS } from '~/data/mock/blog-posts'
import { optionalPageDelay } from '~/lib/optional-page-delay'

const description =
  'I share my thoughts and life experiences through my blog.'

export const metadata: Metadata = {
  title: 'My blog',
  description,
  openGraph: { title: 'My blog', description },
  twitter: { title: 'My blog', description, card: 'summary_large_image' },
}

export default async function BlogIndexPage() {
  await optionalPageDelay()

  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Welcome to my blog!
        </h1>
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </header>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-20 lg:grid-cols-2 lg:gap-8">
        {MOCK_BLOG_POSTS.map(({ views, ...post }) => (
          <BlogPostCard key={post._id} post={post} views={views} />
        ))}
      </div>
    </Container>
  )
}
