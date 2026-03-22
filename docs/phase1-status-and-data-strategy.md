# 阶段 1 进度、剩余项与 Blog / Projects 数据策略

本文与 [`REFACTOR-PLAN.md`](../REFACTOR-PLAN.md) **§三 · 阶段 1 / 1.5** 对齐，并说明 **Sanity 在旧站如何进入页面**、**mock vs 真连** 的取舍与落地顺序。

---

## 1. 阶段 1 当前进度（对照规划条目）

| 规划项 | 状态 | 说明 |
|--------|------|------|
| 壳：layout、主题、Header / Footer / 导航 | **已有** | `(main)/layout`、无 Newsletter / 访问量 |
| 动效：Framer Motion、首页头像滚动、`layoutId` | **已有** | 与 first-portfolio 同思路 |
| 图标：占位（lucide 等） | **已有** | 后续可替换资源 |
| 响应式 / 明暗主题 | **已有** | 你已自测 |
| **Clerk 可登录** | **未接** | 当前仅为 **禁用占位按钮**；根布局 **无 `ClerkProvider`**、无 `middleware`，故无法 Sign in（见 §3） |
| **`loading.tsx`** | **未加** | §二之二建议有；可随 `/blog`、`/projects` 一起做 |
| **Guestbook 版式 mock** | **仅占位文案** | 尚未还原列表 + 输入区 UI |
| **Blog / Projects 与旧站卡片一致** | **未做** | 页面空壳；需 mock 或 Sanity 数据 + 组件迁移（见 §4–§6） |

**门禁结论**：若你主观认为「主要壳层已够像」，可将阶段 1 记为 **基本通过**，把 **Blog/Projects 视觉对齐** 与 **Clerk 真接入** 列为 **阶段 1.5 / 阶段 2 前置**，避免无限拖在「纯壳」里。

---

## 2. first-portfolio 里 Sanity 数据是怎么进 Blog / Projects 的？

### 2.1 数据流（运行时）

- **客户端不直连 Sanity**。由 **Server Component** 在 Node 里调用 `sanity/lib/client` + **GROQ**（`sanity/queries.ts`），取到普通 JSON 对象后当作 props 传给子组件。
- **博客列表**：`app/(main)/blog/BlogPosts.tsx` → `getLatestBlogPosts({ limit })` → 渲染 `BlogPostCard`。
- **博客详情**：`app/(main)/blog/[slug]/page.tsx` → `getBlogPost(slug)`。
- **项目列表**：`getSettings()` 里嵌了 `projects[]->`，`Projects.tsx` 映射 `ProjectCard`。

### 2.2 列表页所需「形状」（便于 mock 对齐）

与 `BlogPostCard`、`ProjectCard` 强相关的字段如下（摘自旧站类型与查询）。

**`Post`（列表卡片）**（`sanity/schemas/post.ts` + GROQ 投影）：

- `_id`, `title`, `slug`（字符串）, `publishedAt`, `readingTime`（number）
- `categories`：查询里已是 **`string[]`**（category title）
- `mainImage.asset`：`url`、可选 **`lqip`**（blur）、可选 **`dominant.background` / `dominant.foreground`**（卡片底部玻璃拟态着色）
- 旧卡片还显示 **`views`**：来自 **Redis**，不是 Sanity；重构已砍 Redis → **可省略、写死 0、或 mock 假数字** 仅用于对齐 UI。

**`Project`（`sanity/schemas/project.ts`）**：

- `_id`, `name`, `url`, `description`
- `icon`：Sanity image；旧站用 **`urlForImage(icon)`** 生成 CDN URL。Mock 时可用 **`/public` 静态图** 或任意 `https://` 方形图 + `next/image` 的 `remotePatterns`。

### 2.3 UI 行为要点（与你截图一致）

- **`BlogPostCard`**：`Link` 包整卡，`group-hover:-translate-y-0.5`、底部 **`backdrop-blur` + 主图延伸背景**、`group-hover:before:opacity-30` 等；依赖 **`dominant` 色** 时，mock 需给占位 hex，否则应用默认 zinc。
- **`ProjectCard`**：**client 组件**，Framer Motion **`useMotionTemplate` 径向遮罩** + `Card` 的 **大面积 hit 区**、`group-hover` 底部域名 **lime 变色**。需 **`components/ui/Card`** 同级实现或内联。

---

## 3. Clerk 为何还不能 Sign in？

当前 `portfolio-pro` **未安装 `@clerk/nextjs`**，且 **`app/layout.tsx` 未包裹 `ClerkProvider`**，Header 里是 **`disabled` 占位按钮**，因此不会出现登录弹窗。

**要真登录，至少需要**：

1. 安装 `@clerk/nextjs`，在 `layout` 中加 `ClerkProvider`（填入 `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` 等）。
2. 增加 **`middleware.ts`**（`authMiddleware` 或新版 Clerk 推荐写法），配置 `publicRoutes` 覆盖首页、blog、projects、guestbook、about 等。
3. 将 Header 右侧替换为 **`SignInButton` / `SignedIn` / `UserButton`**（与 first-portfolio 一致）。

这与「只配 `.env`」相比，**多几步代码**；环境变量是必要条件但不是充分条件。

---

## 4. Blog / Projects：要不要先 mock？

**建议：要。** 理由：

- 阶段 1 的目标是 **视觉门禁**；卡片 **悬浮、变色、玻璃底** 与 **Project 的 hover 遮罩** 不依赖 Sanity，只依赖 **数据结构 + Tailwind/Framer**。
- Mock 用 **本地 TS 常量或 `data/mock/*.ts`**，类型与 §2.2 对齐，后续 **`getPosts()` 在开发环境返回 mock、生产返回 Sanity** 即可切换（与 REFACTOR-PLAN 数据边界一致）。

**可提供素材（可选）**：

- 若干 **封面图**：放 `public/mock/blog/` 或继续用占位图服务；若要对齐 LQIP，可手写极短 base64 或先不用 `placeholder="blur"`。
- **项目 icon**：`public/mock/projects/` 小方图，或临时用 emoji / 单色块。

**不必等我方提供**：用占位图即可先验证布局与动效。

---

## 5. 直接连 Sanity（仅 `.env`）够不够？

**不够只配 env。** 还需要：

- 依赖：`next-sanity`、`@sanity/image-url`（若用 builder）、与旧项目一致的 **`sanity/lib/client.ts`、`sanity/queries.ts`**（或精简版）。
- `next.config` 里 **`images.remotePatterns`** 指向 `cdn.sanity.io`。
- 服务端调用 `getLatestBlogPosts` / `getSettings` 的 **Server Component**。

**何时选真连**：

- 你已确认 **dataset 与 project id** 可给本仓库用，且希望 **与线上内容实时一致**、少维护一份 mock。
- **代价**：本地/CI 必须带 env；冷启动与导航会多一次 CMS RTT（可用 **ISR + `revalidate`** 缓解，见 `docs/performance-cold-start-and-navigation.md`）。

**推荐顺序**：

1. **Mock 先把卡片与 grid 做到像素级接近**（含 hover）。  
2. 再 **抽 `lib/content/getPosts` 接口**，实现 **mock 实现 + Sanity 实现** 二选一切换。  
3. 阶段 2 正式以 Sanity 为默认实现。

---

## 6. 小结：你还需要什么 / 我们要做什么

| 问题 | 建议 |
|------|------|
| 阶段 1 还有啥没做？ | **真 Clerk**、**loading.tsx**、**guestbook 完整 mock**、**blog/projects 卡片 UI**；壳层你可判已通过。 |
| 先看 UI 像不像？ | **先 mock** §2.2 形状 + 迁移/重写 `BlogPostCard`、`ProjectCard`、`Card`。 |
| Sanity 数据长什么样？ | **GROQ → JSON**，列表字段见 §2.2；详情页另有 `body` Portable Text，可后置。 |
| 要我提供什么？ | 可选：**真实封面图 / 项目 icon**；不配则用占位图同样能验 UI。 |
| 直接连 Sanity？ | **可以**；需代码接入不仅是 `.env`，并做好 **缓存策略** 以免回到旧站导航偏慢的问题。 |

---

*随 `portfolio-pro` 实现推进，可在 [`REFACTOR-PLAN.md`](../REFACTOR-PLAN.md) 阶段 1 / 2 勾选具体子项。*
