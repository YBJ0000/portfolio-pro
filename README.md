# portfolio-pro

Personal portfolio **rebuild** (cleaner codebase, fewer runtime deps) — roadmap in [`REFACTOR-PLAN.md`](./REFACTOR-PLAN.md).

**Upstream lineage**：UI/IA 曾参考自 [CaliCastle/cali.so](https://github.com/CaliCastle/cali.so) → 你的 Fork [YBJ0000/first-portfolio](https://github.com/YBJ0000/first-portfolio)。本仓库是 **新实现**，致谢与许可边界见 [`NOTICE`](./NOTICE)。

## Scripts

- `npm run dev` — local dev server (`next dev`)
- `npm run build` / `npm run start` — production build & serve (`next build` / `next start`)
- `npm run lint` — ESLint
- `npm run format` — Prettier

**Production preview（对齐线上行为）**：`npm run build && npm run start`。若本机 `3000` 已被 `next dev` 占用，可用 `npm run start -- -p 3001` 后访问 `http://localhost:3001`。

## Environment

Copy [`.env.example`](./.env.example) to `.env.local` when connecting Clerk, Sanity, or Neon. Optional dev-only: `MOCK_PAGE_DELAY_MS` slows some pages so **`loading.tsx`** is easier to see ([`docs/phase1-status-and-data-strategy.md`](./docs/phase1-status-and-data-strategy.md) §7).

## Documentation

| 文档 | 内容 |
|------|------|
| [`REFACTOR-PLAN.md`](./REFACTOR-PLAN.md) | 重构阶段、技术取舍、成功标准 |
| [`docs/nextjs-dev-compile-vs-production.md`](./docs/nextjs-dev-compile-vs-production.md) | `next dev` 按需编译 vs 生产构建、部署后是否「再 compile」 |
| [`docs/performance-cold-start-and-navigation.md`](./docs/performance-cold-start-and-navigation.md) | 冷启动与 Neon 用量、Netlify 与定时 ping、站内导航速度与 `loading.tsx` / ISR 等策略（**与规划文档 §二之二、阶段 2–3 对齐**） |
| [`docs/phase1-status-and-data-strategy.md`](./docs/phase1-status-and-data-strategy.md) | **阶段 1 进度**、mock 数据路径、**Clerk 推迟至阶段 3**、Sanity 形状、**如何测 `loading.tsx`（Slow 4G / `MOCK_PAGE_DELAY_MS`）** |
| [`NOTICE`](./NOTICE) | 与 [cali.so](https://github.com/CaliCastle/cali.so) / [first-portfolio](https://github.com/YBJ0000/first-portfolio) 的 fork 链与致谢说明 |

## License & attribution

- **本仓库原创代码**：[MIT License](./LICENSE) © Bingjia Yang。
- **上游与致谢**：[NOTICE](./NOTICE) 说明了与 [cali.so](https://github.com/CaliCastle/cali.so) / [first-portfolio](https://github.com/YBJ0000/first-portfolio) 的关系；上游仓库当前根目录未见 `LICENSE` 文件，以后续上游为准。
