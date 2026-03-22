# portfolio-pro

Rebuild of the personal portfolio — roadmap in [`REFACTOR-PLAN.md`](./REFACTOR-PLAN.md).

## Scripts

- `npm run dev` — local dev server (`next dev`)
- `npm run build` / `npm run start` — production build & serve (`next build` / `next start`)
- `npm run lint` — ESLint
- `npm run format` — Prettier

**Production preview（对齐线上行为）**：`npm run build && npm run start`。若本机 `3000` 已被 `next dev` 占用，可用 `npm run start -- -p 3001` 后访问 `http://localhost:3001`。

## Environment

Copy [`.env.example`](./.env.example) to `.env.local` when connecting Clerk, Sanity, or Neon.

## Documentation

| 文档 | 内容 |
|------|------|
| [`REFACTOR-PLAN.md`](./REFACTOR-PLAN.md) | 重构阶段、技术取舍、成功标准 |
| [`docs/nextjs-dev-compile-vs-production.md`](./docs/nextjs-dev-compile-vs-production.md) | `next dev` 按需编译 vs 生产构建、部署后是否「再 compile」 |
| [`docs/performance-cold-start-and-navigation.md`](./docs/performance-cold-start-and-navigation.md) | 冷启动与 Neon 用量、Netlify 与定时 ping、站内导航速度与 `loading.tsx` / ISR 等策略（**与规划文档 §二之二、阶段 2–3 对齐**） |

## License

[MIT](./LICENSE) © Bingjia Yang. 若你基于他人模板衍生，请在仓库中保留对方要求的许可证或致谢说明。
