/**
 * Slows server-rendered pages in development so `loading.tsx` is visible.
 * Set `MOCK_PAGE_DELAY_MS=1500` in `.env.local` (see docs).
 */
export async function optionalPageDelay() {
  const raw = process.env.MOCK_PAGE_DELAY_MS
  const ms = raw ? parseInt(raw, 10) : 0
  if (process.env.NODE_ENV !== 'development' || !Number.isFinite(ms) || ms <= 0) {
    return
  }
  const capped = Math.min(ms, 30000)
  await new Promise((r) => setTimeout(r, capped))
}
