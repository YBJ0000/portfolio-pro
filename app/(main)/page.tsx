import { Container } from '~/components/ui/Container'

export default function HomePage() {
  return (
    <Container className="mt-10">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          portfolio-pro
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          Phase 0 shell: header scroll avatar, nav pill, theme toggle, footer
          rail. Stub routes exist for nav links. Next: mock content per{' '}
          <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            REFACTOR-PLAN.md
          </code>
          .
        </p>
      </div>
    </Container>
  )
}
