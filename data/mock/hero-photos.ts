import type { HeroPhoto } from '~/types/content'

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`

/**
 * Six hero photos aligned with live site (ybj.au) — basketball, guitars, kangaroo, trophy, etc.
 * Replace `src` with your own uploads under `public/` or Sanity `heroPhotos` URLs in phase 2.
 */
export const MOCK_HERO_PHOTOS: HeroPhoto[] = [
  {
    src: u('photo-1519861531463-62981d9763e2'),
    alt: 'Spinning a basketball on a finger at night',
    rotateDeg: 2.5,
  },
  {
    src: u('photo-1510915361894-db8b79f67dd2'),
    alt: 'Playing acoustic guitar on stage with a microphone',
    rotateDeg: -2,
  },
  {
    src: u('photo-1555164665-f74a21c5abf8'),
    alt: 'Sitting on grass next to a kangaroo',
    rotateDeg: 1.5,
  },
  {
    src: u('photo-1574629810570-a797cfeccd8'),
    alt: 'Holding a large trophy and an ice cream cone',
    rotateDeg: -1.5,
  },
  {
    src: u('photo-1516924962500-2b048b01ecb4'),
    alt: 'Playing a red electric guitar indoors',
    rotateDeg: 2,
  },
  {
    src: u('photo-1506905925346-21bda4d32df4'),
    alt: 'Outdoors in a jacket with mountains in the background',
    rotateDeg: -2.5,
  },
]
