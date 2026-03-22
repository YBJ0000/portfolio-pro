import type { Metadata } from 'next'

import { ProjectCard } from '~/app/(main)/projects/ProjectCard'
import { Container } from '~/components/ui/Container'
import { MOCK_PROJECTS } from '~/data/mock/projects'
import { optionalPageDelay } from '~/lib/optional-page-delay'

const description = 'Exploring various projects.'

export const metadata: Metadata = {
  title: 'Projects',
  description,
  openGraph: { title: 'Projects', description },
  twitter: { title: 'Projects', description, card: 'summary_large_image' },
}

export default async function ProjectsPage() {
  await optionalPageDelay()

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          My Projects
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">{description}</p>
      </header>
      <ul
        role="list"
        className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3"
      >
        {MOCK_PROJECTS.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </ul>
    </Container>
  )
}
