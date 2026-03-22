# 阶段 1 进度、剩余项与 Blog / Projects 数据策略

本文与 [`REFACTOR-PLAN.md`](../REFACTOR-PLAN.md) **§三 · 阶段 1 / 1.5** 对齐，并说明 **Sanity 在旧站如何进入页面**、**mock vs 真连** 的取舍与落地顺序。

---

## 1. 阶段 1 当前进度（对照规划条目）

| 规划项 | 状态 | 说明 |
|--------|------|------|
| 壳：layout、主题、Header / Footer / 导航 | **已有** | `(main)/layout`、无 Newsletter / 访问量 |
| 动效：Framer Motion、首页头像滚动、`layoutId` | **已有** | 与 first-portfolio 同思路 |
| 图标：占位（lucide 等） | **已有** | 后续可替换资源 |
| 响应式 / 明暗主题 | **已有** | 以你本地验收为准 |
| **`/blog` 列表 + 卡片** | **已有（mock）** | `data/mock/blog-posts.ts`、`BlogPostCard.tsx`；`/blog/[slug]` 为静态 mock 详情 |
| **`/projects` 网格** | **已有（mock）** | `data/mock/projects.ts`、`ProjectCard.tsx`、`components/ui/Card.tsx` |
| **`/guestbook` 版式** | **已有（mock）** | `GuestbookMockInput` + `GuestbookMockFeeds`、`data/mock/guestbook.ts`；无 API |
| **`loading.tsx`** | **已有** | `/blog`、`/blog/[slug]`、`/projects`、`/guestbook`；验收见 **§7** |
| **Clerk 可登录** | **推迟至阶段 3** | 与 Neon 留言墙 / 评论 POST 一并接入；阶段 1 **不要求**（Header 占位按钮保留） |

**门禁结论**：阶段 1 以 **mock 数据 + 列表/卡片 UI + loading 骨架** 为主目标时，可 **关闭阶段 1**；下一阶段为 **Sanity（阶段 2）** 与 **Clerk + Neon（阶段 3）**。

---

## 2. first-portfolio 里 Sanity 数据是怎么进 Blog / Projects 的？

### 2.1 数据流（运行时）

- **客户端不直连 Sanity**。由 **Server Component** 在 Node 里调用 `sanity/lib/client` + **GROQ**（`sanity/queries.ts`），取到普通 JSON 对象后当作 props 传给子组件。
- **博客列表**：`app/(main)/blog/BlogPosts.tsx` → `getLatestBlogPosts({ limit })` → 渲染 `BlogPostCard`。
- **博客详情**：`app/(main)/blog/[slug]/page.tsx` → `getBlogPost(slug)`。
- **项目列表**：`getSettings()` 里嵌了 `projects[]->`，`Projects.tsx` 映射 `ProjectCard`。

### 2.2 列表页所需「形状」（便于 mock 对齐）

与 `BlogPostCard`、`ProjectCard` 强相关的字段如下（摘自旧站类型与查询）。**portfolio-pro** 的 TypeScript 类型在 `types/content.ts`，mock 在 `data/mock/*`。

**`Post`（列表卡片）**（`sanity/schemas/post.ts` + GROQ 投影）：

- `_id`, `title`, `slug`（字符串）, `publishedAt`, `readingTime`（number）
- `categories`：查询里已是 **`string[]`**（category title）
- `mainImage.asset`：`url`、可选 **`lqip`**（blur）、可选 **`dominant.background` / `dominant.foreground`**（卡片底部玻璃拟态着色）
- 旧卡片还显示 **`views`**：来自 **Redis**，不是 Sanity；本仓库 mock 里为 **写死数字**。

**`Project`（`sanity/schemas/project.ts`）**：

- `_id`, `name`, `url`, `description`
- `icon`：Sanity image；旧站用 **`urlForImage(icon)`**。本仓库 mock 用 **`iconUrl`**（`next/image` + `next.config` `remotePatterns`）。

### 2.3 UI 行为要点（与你截图一致）

- **`BlogPostCard`**：`Link` 包整卡，`group-hover:-translate-y-0.5`、底部 **`backdrop-blur` + 主图延伸背景**、`group-hover:before:opacity-30` 等；依赖 **`dominant` 色** 时，mock 已给占位 hex。
- **`ProjectCard`**：**client 组件**，Framer Motion **`useMotionTemplate` 径向遮罩** + `Card` 的 **大面积 hit 区**、`group-hover` 底部域名 **lime 变色**。

---

## 3. Clerk：为何阶段 1 不接？

- **决策**：**真实 Sign in / UserButton** 推迟到 **阶段 3**，与 **`POST /api/guestbook`**、评论写接口、**`ClerkProvider` + `middleware` + `publicRoutes`** 一起做，避免半套 Clerk 与 mock 留言墙并存时行为混乱。
- **现状**：未安装 `@clerk/nextjs`；Header 为 **占位按钮**（可保留视觉位，点击无弹窗属预期）。

**阶段 3 接入时至少需要**：

1. 安装 `@clerk/nextjs`，根 `layout` 包裹 **`ClerkProvider`**（`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` 等）。
2. **`middleware.ts`**，配置 **`publicRoutes`** 覆盖首页、blog、projects、guestbook、about。
3. Header 替换为 **`SignInButton` / `SignedIn` / `UserButton`**；Guestbook 再用 **`SignedIn` / `SignedOut`** 切换真实输入框。

---

## 4. Blog / Projects：要不要先 mock？

**已在仓库内用 mock 完成阶段 1.5。** 后续可抽 **`lib/content/getPosts`** / **`getProjects`**，实现 **mock 实现 vs Sanity 实现** 切换（阶段 2）。

**可选素材**：将 `data/mock/*` 中的 Unsplash / pravatar URL 换为你的 **封面图、项目 icon**（`public/` 或新域名需写入 `next.config` `images.remotePatterns`）。

---

## 5. 直接连 Sanity（仅 `.env`）够不够？

**不够只配 env。** 还需要：

- 依赖：`next-sanity`、`@sanity/image-url`（若用 builder）、与旧项目一致的 **`sanity/lib/client.ts`、`sanity/queries.ts`**（或精简版）。
- `next.config` 里 **`images.remotePatterns`** 指向 `cdn.sanity.io`。
- 服务端调用 `getLatestBlogPosts` / `getSettings` 的 **Server Component**。

**推荐顺序**（与当前代码一致）：mock UI 已就绪 → 阶段 2 **替换数据源**，尽量少改 `BlogPostCard` / `ProjectCard` 的 props 形状。

---

## 6. 小结

| 问题 | 现状 / 建议 |
|------|-------------|
| 阶段 1 还有啥没做？ | **Sanity 真数据**、**Portable Text 详情**、**Clerk + Neon API** 属阶段 2–3。 |
| Mock 在哪？ | `data/mock/blog-posts.ts`、`projects.ts`、`guestbook.ts`。 |
| 如何测 `loading.tsx`？ | 见 **§7**。 |
| Clerk？ | **阶段 3** 与写库能力一起接。 |

---

## 7. 如何验收 `loading.tsx`（衔接段 / 慢导航）

Next.js 在 **客户端路由跳转**时，若目标段的 **RSC payload** 尚未返回，会显示该段同级目录下的 **`loading.tsx`**。

**方法 A — Chrome DevTools 限速（你记得的 Slow 4G）**

1. 打开站点（建议 `npm run dev` 或 `npm run start`）。
2. **DevTools** → **Network** 面板 → **Throttling** 选 **Slow 4G**（或 **Fast 3G**）。
3. 在站内用 **导航栏链接** 在 Home ↔ Blog ↔ Projects ↔ Guestbook 之间多点几次。
4. 预期：在慢网下能看到 **灰色脉冲骨架**（`PageLoadingSkeleton`），随后替换为真实内容。

**方法 B — 本地人为延迟（不依赖网速）**

1. 在项目根 `.env.local` 增加：`MOCK_PAGE_DELAY_MS=1500`（整数毫秒，开发环境生效，上限 30s）。
2. 重启 `npm run dev`。
3. 再执行方法 A 的导航；骨架应 **稳定可见约 1.5s**（由 `lib/optional-page-delay.ts` 在 **`/blog`、`/blog/[slug]`、`/projects`、`/guestbook`** 的 Server Component 中 `await`）。

**注意**：`next build` 后的 **静态页** 首次加载可能仍很快（CDN/本地缓存）；**慢网 + 客户端导航** 比「硬刷新单页」更容易看到 `loading`。生产环境 **不会** 读取 `MOCK_PAGE_DELAY_MS`（仅在 `NODE_ENV === 'development'` 生效）。

---

*随 `portfolio-pro` 实现推进，可在 [`REFACTOR-PLAN.md`](../REFACTOR-PLAN.md) 阶段 1–3 勾选具体子项。*
