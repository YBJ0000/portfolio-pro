import type { GuestbookListItem } from '~/types/content'

export const MOCK_GUESTBOOK_MESSAGES: GuestbookListItem[] = [
  {
    id: 'gb-1',
    message: 'Love the new portfolio shell — the header animation is smooth!',
    createdAt: '2025-03-20T14:22:00.000Z',
    user: {
      displayName: 'Alex',
      imageUrl: 'https://i.pravatar.cc/150?img=12',
    },
  },
  {
    id: 'gb-2',
    message: 'Mock data阶段先把版式对齐，后面再接 Neon + Clerk ✅',
    createdAt: '2025-03-20T08:10:00.000Z',
    user: {
      displayName: 'Bingjia',
      imageUrl: 'https://i.pravatar.cc/150?img=33',
    },
  },
  {
    id: 'gb-3',
    message: 'Guestbook timeline looks good. Waiting for real sign-in.',
    createdAt: '2025-03-18T16:40:00.000Z',
    user: {
      displayName: 'River',
      imageUrl: 'https://i.pravatar.cc/150?img=47',
    },
  },
  {
    id: 'gb-4',
    message: '**Markdown** can be wired later — for now plain text is enough for review.',
    createdAt: '2025-03-15T09:00:00.000Z',
    user: {
      displayName: 'Dev friend',
      imageUrl: 'https://i.pravatar.cc/150?img=68',
    },
  },
]
