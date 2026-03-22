import { Container } from '~/components/ui/Container'

export function BlogLoadingSkeleton() {
  return (
    <Container className="mt-16 animate-pulse sm:mt-24">
      <div className="h-12 max-w-md rounded-lg bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-6 h-4 max-w-xl rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-20 lg:grid-cols-2 lg:gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[280px] rounded-3xl bg-zinc-200 dark:bg-zinc-700"
          />
        ))}
      </div>
    </Container>
  )
}

export function ProjectsLoadingSkeleton() {
  return (
    <Container className="mt-16 animate-pulse sm:mt-32">
      <div className="h-12 max-w-md rounded-lg bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-6 h-4 max-w-xl rounded bg-zinc-200 dark:bg-zinc-700" />
      <ul className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <li
            key={i}
            className="h-56 rounded-2xl bg-zinc-200 dark:bg-zinc-700"
          />
        ))}
      </ul>
    </Container>
  )
}

export function GuestbookLoadingSkeleton() {
  return (
    <Container className="mt-16 animate-pulse sm:mt-32">
      <div className="h-12 max-w-md rounded-lg bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-6 h-16 max-w-2xl rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-16 h-32 max-w-2xl rounded-xl bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-12 space-y-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 max-w-2xl rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        ))}
      </div>
    </Container>
  )
}
