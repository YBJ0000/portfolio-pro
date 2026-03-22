import { Container } from '~/components/ui/Container'

export default function BlogPostLoading() {
  return (
    <Container className="mt-16 animate-pulse sm:mt-24">
      <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-6 h-10 max-w-2xl rounded-lg bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-8 space-y-3">
        <div className="h-4 max-w-3xl rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-4 max-w-2xl rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-4 max-w-xl rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </Container>
  )
}
