import type { Metadata } from 'next'

import { GuestbookMockFeeds } from '~/app/(main)/guestbook/GuestbookMockFeeds'
import { GuestbookMockInput } from '~/app/(main)/guestbook/GuestbookMockInput'
import { Container } from '~/components/ui/Container'
import { MOCK_GUESTBOOK_MESSAGES } from '~/data/mock/guestbook'
import { optionalPageDelay } from '~/lib/optional-page-delay'

const title = 'Guestbook'
const description =
  "Here, you can leave your messages for me—whether it's suggestions, thoughts, criticism, praise, encouragement, or even a rant."

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description, card: 'summary_large_image' },
}

export default async function GuestbookPage() {
  await optionalPageDelay()

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">{description}</p>
      </header>
      <div className="mt-16 max-w-2xl sm:mt-20">
        <section className="space-y-10">
          <GuestbookMockInput />
          <GuestbookMockFeeds messages={MOCK_GUESTBOOK_MESSAGES} />
        </section>
      </div>
    </Container>
  )
}
