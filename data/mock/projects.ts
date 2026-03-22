import type { ProjectListItem } from '~/types/content'

const icon = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=128&h=128&q=80`

export const MOCK_PROJECTS: ProjectListItem[] = [
  {
    _id: 'proj-1',
    name: 'ThreadTalk',
    url: 'https://ybj-threadtalk.vercel.app',
    description:
      'Interactive forum web app with dynamic particle effects and full thread management features using HTML, CSS, Three.js and Node.js.',
    iconUrl: icon('photo-1618005182384-a83a8bd57fbe'),
  },
  {
    _id: 'proj-2',
    name: 'Cloud-Native Mini Blog',
    url: 'https://full-stack-mini-blog.vercel.app',
    description:
      'Cloud-native full-stack blog using React, Node.js, Prisma (PostgreSQL on Neon), and Redis. Deployed with Vercel (frontend) and Dockerized backend on AWS EC2 via Nginx + HTTPS + custom domain.',
    iconUrl: icon('photo-1499750310107-5fef28a66643'),
  },
  {
    _id: 'proj-3',
    name: 'World Clock',
    url: 'https://world-clock-ybj.vercel.app',
    description:
      'World clock app featuring dynamic theming, real-time updates, and responsive design using React, Tailwind CSS and Axios.',
    iconUrl: icon('photo-1509042239860-f550ce710b93'),
  },
  {
    _id: 'proj-4',
    name: '3D Monkey Viewer',
    url: 'https://hungrymonkey.netlify.app',
    description:
      'Mobile-friendly 3D model viewer with photo-to-3D model conversion and interactive scene rendering via Rodin, HTML, CSS and Three.js.',
    iconUrl: icon('photo-1540573133985-87b940d6a56d'),
  },
  {
    _id: 'proj-5',
    name: '3D Guitar Viewer',
    url: 'https://threejs-guitar-demo.vercel.app',
    description: 'This is a Strandberg guitar 3D model.',
    iconUrl: icon('photo-1516924962500-2b048b01ecb4'),
  },
  {
    _id: 'proj-6',
    name: 'Linkt login page',
    url: 'https://pictocode.netlify.app',
    description:
      'An HTML & CSS mobile responsive assignment imitating the Linkt login page.',
    iconUrl: icon('photo-1551650975-87deedd944c3'),
  },
]
