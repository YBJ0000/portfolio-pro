export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">portfolio-pro</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Next.js + TypeScript + Tailwind. See{' '}
        <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          REFACTOR-PLAN.md
        </code>{' '}
        for the roadmap.
      </p>
    </main>
  )
}
