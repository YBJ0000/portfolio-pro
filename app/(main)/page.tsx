import { Photos } from '~/app/(main)/Photos'
import { Container } from '~/components/ui/Container'
import { MOCK_HERO_PHOTOS } from '~/data/mock/hero-photos'

export default function HomePage() {
  return (
    <>
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

    <Photos photos={MOCK_HERO_PHOTOS} />

    <Container className="mt-10 sm:mt-12">
      <div className="max-w-2xl">
        <article className="prose prose-zinc max-w-none dark:prose-invert prose-p:leading-relaxed prose-headings:scroll-mt-24">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Refactor approach (English)
          </h2>
          <p>
            This repo is a <strong>ground-up rewrite</strong> of the old
            Next.js portfolio, not a line-by-line fork. We keep what matters for
            <em> your</em> workflow—Sanity for editorial content, Neon for
            guestbook rows and per-post comments, Clerk for authenticated
            writes—while dropping infrastructure you do not want to operate
            (Redis analytics, transactional email, Edge IP blocking, WebGL
            backgrounds, a heavy ORM layer, and admin/newsletter surfaces tied
            to email).
          </p>
          <p>
            The strategy is <strong>incremental strangulation</strong>: ship a
            thin, readable frontend that matches the previous site closely
            enough to pass a visual gate, drive it with <strong>mock data</strong>{' '}
            behind a small data-access boundary, then swap implementations for
            Sanity and SQL without rewriting pages. That boundary is the main
            insurance against another &quot;everything imports the CMS
            client&quot; sprawl.
          </p>
          <p>
            <strong>Phase 1</strong> is explicitly a <em>look-and-feel</em>{' '}
            checkpoint—if the shell does not feel like the old site, we stop
            before investing in API routes and database plumbing.{' '}
            <strong>Phase 2</strong> reconnects Sanity for posts, projects, and
            settings. <strong>Phase 3</strong> adds Neon + handwritten queries
            (no Drizzle unless you change your mind) for{' '}
            <code>guestbook</code> and <code>comments</code>, with Clerk
            guarding mutations. Rate limiting without Upstash is a conscious
            trade-off for a personal site; we can revisit if you ever ship to a
            hostile traffic profile.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            What stays vs. what goes
          </h2>
          <ul>
            <li>
              <strong>Keeps</strong>: Framer Motion for the same motion language;
              class-based dark mode; navigational IA; blog / projects /
              guestbook / about routes; eventual Portable Text or a documented
              alternative for the article body.
            </li>
            <li>
              <strong>Drops</strong>: Vanta + Three, page-view and reaction
              counters, newsletter flows, Resend templates, Redis in middleware
              for geo vanity metrics, Tremor dashboards, and duplicate icon packs
              until you opt back in.
            </li>
            <li>
              <strong>Defers</strong>: Clerk is wired as a styled placeholder on
              the header until keys exist; avatar images are SVG placeholders so
              you can drop in real assets without chasing CMS URLs during the
              mock phase.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Scroll test / 滚动自检
          </h2>
          <p>
            The home hero avatar animates with scroll: it scales from a large
            mark to the small header avatar, mirroring the original
            first-portfolio behavior. If the page is too short, you cannot
            verify that transition or compare proportions against production.
            <strong> Scroll down this block</strong> to exercise the header; if
            anything still feels off versus the old site, note whether it is
            asset dimensions (replace <code>public/avatar.svg</code>), spacing
            above the fold, or the scroll math in{' '}
            <code>app/(main)/Header.tsx</code>.
          </p>
          <p>
            下方多段文字用于<strong>撑开页面高度</strong>，方便你在本地对比「大头像 →
            吸顶小头像」是否与 first-portfolio 一致；若仍觉得比例不对，优先检查占位
            SVG 与首页首屏上方留白，再对照旧站 `Headline` 等区域的总高度。
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Filler (intentionally long)
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Curabitur non nulla sit
            amet nisl tempus convallis quis ac lectus. Vivamus suscipit tortor
            eget felis porttitor volutpat. Pellentesque in ipsum id orci porta
            dapibus. Cras ultricies ligula sed magna dictum porta.
          </p>
          <p>
            Quisque velit nisi, pretium ut lacinia in, elementum id enim.
            Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
            dui. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
            Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie
            malesuada.
          </p>
          <p>
            Praesent sapien massa, convallis a pellentesque nec, egestas non
            nisi. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia curae; Donec velit neque, auctor sit amet
            aliquam vel, ullamcorper sit amet ligula. Sed porttitor lectus nibh.
            Proin eget tortor risus.
          </p>
        </article>
      </div>
    </Container>
    </>
  )
}
