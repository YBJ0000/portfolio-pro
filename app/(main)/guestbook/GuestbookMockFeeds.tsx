import Image from 'next/image'

import { cn } from '~/lib/cn'
import type { GuestbookListItem } from '~/types/content'

function formatFeedTime(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function MessageRow({
  message,
  idx,
  length,
}: {
  message: GuestbookListItem
  idx: number
  length: number
}) {
  return (
    <li className="relative pb-8">
      {idx !== length - 1 && (
        <span
          className="absolute left-5 top-14 -ml-px h-[calc(100%-4.5rem)] w-0.5 rounded bg-zinc-200 dark:bg-zinc-800"
          aria-hidden="true"
        />
      )}
      <div className="relative flex items-start space-x-3">
        <Image
          src={message.user.imageUrl}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 flex-shrink-0 rounded-full bg-zinc-200 ring-2 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-800"
        />
        <div className="-mt-1 flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">
          <b className="text-sm font-bold dark:text-zinc-100">
            {message.user.displayName}
          </b>
          <time
            dateTime={message.createdAt}
            className="inline-flex select-none text-[12px] font-medium opacity-40"
          >
            {formatFeedTime(message.createdAt)}
          </time>
        </div>
      </div>
      <div
        className={cn(
          '-mt-4 mb-1 pl-[3.25rem] text-sm text-zinc-700 dark:text-zinc-300',
          'whitespace-pre-wrap'
        )}
      >
        {message.message}
      </div>
    </li>
  )
}

export function GuestbookMockFeeds({ messages }: { messages: GuestbookListItem[] }) {
  return (
    <div className="relative mt-12">
      <ul role="list" className="-mb-8 px-1 md:px-4">
        {messages.map((message, idx) => (
          <MessageRow
            key={message.id}
            message={message}
            idx={idx}
            length={messages.length}
          />
        ))}
      </ul>
    </div>
  )
}
