/** List card shape aligned with first-portfolio GROQ + BlogPostCard (mock / future Sanity). */
export type BlogPostListItem = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  categories: string[]
  readingTime: number
  mainImage: {
    asset: {
      url: string
      lqip?: string
      dominant?: { background?: string; foreground?: string }
    }
  }
}

export type ProjectListItem = {
  _id: string
  name: string
  url: string
  description: string
  /** CDN or remote icon URL (Sanity would use urlForImage). */
  iconUrl: string
}

export type GuestbookListItem = {
  id: string
  message: string
  createdAt: string
  user: { displayName: string; imageUrl: string }
}

/** Home hero strip — first-portfolio `settings.heroPhotos` is `string[]`; we keep alt + optional tilt for mock. */
export type HeroPhoto = {
  src: string
  alt: string
  /** degrees; if omitted, matches first-portfolio alternating 2 / -1 */
  rotateDeg?: number
}
