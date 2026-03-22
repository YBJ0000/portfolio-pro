import { LogIn } from 'lucide-react'

/**
 * Visual placeholder for the signed-in composer (see first-portfolio GuestbookInput).
 * Clerk + POST /api/guestbook are deferred — REFACTOR-PLAN phase 3.
 */
export function GuestbookMockInput() {
  return (
    <div className="relative flex w-full rounded-xl bg-gradient-to-b from-zinc-50/50 to-white/70 p-4 pb-6 shadow-xl shadow-zinc-500/10 ring-2 ring-zinc-200/30 dark:from-zinc-900/70 dark:to-zinc-800/60 dark:shadow-zinc-700/10 dark:ring-zinc-700/30 md:p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-200/80 dark:bg-zinc-700/80">
        <LogIn className="h-5 w-5 text-zinc-500 dark:text-zinc-400" aria-hidden />
      </div>
      <div className="ml-3 flex-1 md:ml-4">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Sign-in to post (deferred)
        </p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Clerk wiring is postponed per project docs. This box mirrors the layout only; no data is
          submitted.
        </p>
        <textarea
          readOnly
          rows={3}
          className="mt-3 block w-full resize-none rounded-lg border border-zinc-200/80 bg-white/60 px-3 py-2 text-sm text-zinc-500 outline-none dark:border-zinc-600/80 dark:bg-zinc-900/40 dark:text-zinc-500"
          placeholder="说点什么吧 — 接入登录与 API 后即可使用…"
        />
      </div>
    </div>
  )
}
