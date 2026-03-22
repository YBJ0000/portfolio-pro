import type { BlogPostListItem } from '~/types/content'

export type MockBlogPost = BlogPostListItem & { views: number }

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=960&q=80`

/** Mirrors first-portfolio card fields; views are mock-only (no Redis). */
export const MOCK_BLOG_POSTS: MockBlogPost[] = [
  {
    _id: 'mock-1',
    title: 'Capstone Project Finished!',
    slug: 'capstone-project-finished',
    publishedAt: '2025-08-14T12:00:00.000Z',
    categories: ['Tech Issues'],
    readingTime: 5,
    views: 838,
    mainImage: {
      asset: {
        url: u('photo-1555066931-4365d14bab8c'),
        dominant: { background: '#14532d', foreground: '#ecfccb' },
      },
    },
  },
  {
    _id: 'mock-2',
    title: 'Summary of Prisma ORM and database workflows',
    slug: 'summary-prisma-orm',
    publishedAt: '2025-07-06T10:00:00.000Z',
    categories: ['Tech Issues'],
    readingTime: 8,
    views: 1204,
    mainImage: {
      asset: {
        url: u('photo-1544383835-bda2bc66a55d'),
        dominant: { background: '#1e3a5f', foreground: '#e0f2fe' },
      },
    },
  },
  {
    _id: 'mock-3',
    title: 'Sanity Studio problem finally fixed!',
    slug: 'sanity-studio-fixed',
    publishedAt: '2025-06-20T08:00:00.000Z',
    categories: ['Tech Issues'],
    readingTime: 6,
    views: 512,
    mainImage: {
      asset: {
        url: u('photo-1460925895917-afdab827c52f'),
        dominant: { background: '#3f3f46', foreground: '#fafafa' },
      },
    },
  },
  {
    _id: 'mock-4',
    title: 'Through the Years: My Photos with NBA Stars 🏀',
    slug: 'photos-with-nba-stars',
    publishedAt: '2025-05-01T12:00:00.000Z',
    categories: ['Random'],
    readingTime: 4,
    views: 2401,
    mainImage: {
      asset: {
        url: u('photo-1546519638-68e109498ffc'),
        dominant: { background: '#7c2d12', foreground: '#ffedd5' },
      },
    },
  },
  {
    _id: 'mock-5',
    title: '🚗 A New Chapter: Just Got My Toyota Camry SX!',
    slug: 'toyota-camry-sx',
    publishedAt: '2025-04-12T09:00:00.000Z',
    categories: ['Random'],
    readingTime: 3,
    views: 903,
    mainImage: {
      asset: {
        url: u('photo-1492144534655-ae79c964c9d7'),
        dominant: { background: '#27272a', foreground: '#fafafa' },
      },
    },
  },
  {
    _id: 'mock-6',
    title: 'Full Stack Deployment Guide with EC2 and Vercel',
    slug: 'full-stack-ec2-vercel',
    publishedAt: '2025-03-28T15:00:00.000Z',
    categories: ['Tech Issues'],
    readingTime: 12,
    views: 3310,
    mainImage: {
      asset: {
        url: u('photo-1558494949-ef010cbdcc31'),
        dominant: { background: '#18181b', foreground: '#a1a1aa' },
      },
    },
  },
  {
    _id: 'mock-7',
    title: "Fixing 504 Gateway Timeout on Vercel's /studio",
    slug: 'vercel-studio-504',
    publishedAt: '2025-02-14T11:00:00.000Z',
    categories: ['Tech Issues'],
    readingTime: 7,
    views: 672,
    mainImage: {
      asset: {
        url: u('photo-1551288049-bebda4e38f71'),
        dominant: { background: '#1e293b', foreground: '#f1f5f9' },
      },
    },
  },
  {
    _id: 'mock-8',
    title: 'Monkey',
    slug: 'monkey',
    publishedAt: '2025-01-08T18:00:00.000Z',
    categories: ['Random'],
    readingTime: 2,
    views: 88,
    mainImage: {
      asset: {
        url: u('photo-1540573133985-87b940d6a56d'),
        dominant: { background: '#422006', foreground: '#fef3c7' },
      },
    },
  },
]
