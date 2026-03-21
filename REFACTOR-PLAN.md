# Portfolio 重构规划（first-portfolio → portfolio-pro）

本文档基于对 `first-portfolio` 的阅读与后续讨论，用于在 `portfolio-pro` 中 **先验证前端是否足够像原站**，再按需接回 **Sanity（内容）** 与 **Neon（用户留言类数据）**，并刻意砍掉一批你不需要的基础设施。

---

## 〇、产品与技术取舍（已对齐）

下列结论作为后续开发的默认前提；若与实现冲突，以「少依赖、像原站」为准。

| 方向 | 决策 | 说明 |
|------|------|------|
| **内容** | **保留 Sanity** | 文章、项目、站点设置仍由你在 Studio 里维护；重构重点是前端壳与数据访问层瘦身。 |
| **Neon** | **保留，但极薄** | 至少承载 **两套互不替代的能力**（见 §0.0）：**留言墙**、**博客块级评论**；表结构可与现仓库一致，查询可手写 SQL。 |
| **Drizzle ORM** | **可不使用** | 见 §0.1；用 Neon 官方 serverless 驱动 + 少量手写 SQL 即可。 |
| **Upstash Redis** | **不用** | 去掉浏览量、总访问量、reactions；**注意**：现仓库里 **留言墙与评论 API 的限流**也绑在 Redis 上，重构时需改为「无 Redis 的限流/不设限」等替代方案（见 §0.2）。 |
| **Clerk** | **保留** | **留言墙发文**与**博客评论**均需登录（与原站一致：`Guestbook.tsx`、`Commentable.tsx` 均为 `SignedIn` / `SignInButton`）；middleware 可大幅简化，仅服务 Clerk。 |
| **Resend + React Email** | **不用** | 去掉 Newsletter、确认邮件、群发；**同时去掉**「新留言 / 新回复发站长邮件」等分支（`guestbook` POST、`comments` 里对 `resend` 的调用）。 |
| **Vercel Edge Config** | **不用** | 去掉封禁 IP、相关 middleware 分支；本地/未上线场景无必要。 |
| **Vanta + Three.js** | **不用** | 背景改为纯色 / 渐变 / 静态图等轻量方案，保证明暗主题协调即可。 |
| **Framer Motion** | **保留** | 前端观感优先，动画与原版对齐，只删「未使用或重复」的 motion 代码。 |
| **图标** | **占位优先** | 先用统一占位方案（如 `lucide-react`、emoji、或外链默认图标），最后再替换为你的资源。 |

### 0.0 重要：first-portfolio 里 Neon 管的不是「一种评论」

此前文档把「评论」说得太笼统，容易和 **留言墙** 混成一件事。以源码为准，对应关系是：

| 能力 | 路由 / 位置 | Neon 表 | API（现仓库） | 说明 |
|------|-------------|---------|---------------|------|
| **留言墙** | `/guestbook` 整页 | **`guestbook`** | `app/api/guestbook/route.ts`（GET 列表、POST 新留言） | 一条记录 = 用户写的一段 **message**；与哪篇博客 **无关**。 |
| **博客评论** | 文章页内，挂在 Portable Text 各块旁的 `Commentable` | **`comments`** | `app/api/comments/[id]/route.ts`（`id` = Sanity 文章 `_id`） | `body` 里带 **blockId**，可回复（`parentId`）；与 **某篇 post** 强绑定。 |

两者都依赖 **Clerk** 身份，都写 **Neon**，但 **产品形态、表、API 完全不同**。规划里的「接 Neon」应理解为 **至少这两张表（若你两种功能都要保留）**，而不是「只接评论、留言墙另说」这种错误二分。

**第一阶段（视觉门禁）**：两条线都可以用 mock 列表 + 假表单占位，**不接库**；**接库阶段**再分别实现 `/api/guestbook` 与 `/api/comments/[postId]`（或你合并后的等价设计）。

### 0.1 判断：Neon GUI 不能替代「应用里的数据库访问」

你在 Neon 控制台里增删改查，解决的是 **运维/手工纠错**；读者打开站点时，Next.js 仍要通过 **SQL** 读写 `guestbook` / `comments` 等数据。因此：

- **可以去掉 Drizzle**：改 `@neondatabase/serverless` + 少量 `sql` 模板字符串（或两三个封装函数）+ TypeScript 类型 / Zod，迁移 SQL 可手写进 `migrations/*.sql` 在控制台执行，不必上 `drizzle-kit`。
- **不必为了「有 GUI」而保留 ORM**：ORM 主要价值是类型与迁移流水线；你若接受「表少、查询少」，无 ORM 完全合理。

### 0.2 随邮件与 Redis 一起收缩 / 调整的行为

- **从 UI 与路由中移除**：Newsletter 区块、订阅数展示、`/newsletters/*`、`/confirm/*`、与订阅相关的 API 与 **依赖 `subscribers` / `newsletters` 表的 admin 页**（若不再做邮件产品）。
- **从博客页与 Footer 移除**：浏览量、reactions、Footer「Total views」等一切原依赖 `lib/redis.ts` 统计的展示与接口。
- **留言墙与评论 API**：现实现里 **GET/POST 使用 Upstash 限流**。去掉 Redis 后需任选其一：**不做限流**（个人站可接受）、**Edge 内简单内存限流**（多实例不完美）、或 **延迟到上线后再加别的方案**。不要默默删掉 Redis 却以为接口行为不变。
- **邮件通知**：`guestbook` 与 `comments` 路由里「给站长发 Resend 邮件」的分支整段删除，与「不用邮件」一致。

### 0.3 Admin 后台

原站 `app/admin/*` 含订阅者、newsletter、**评论（comments 表）** 等。邮件与订阅砍掉后，可 **只做 comments（及你若需要的 guestbook）极简审核页**，或 **完全依赖 Neon GUI 删违规内容**——二选一即可，不必恢复 Tremor 大盘。

---

## 一、当前代码库快照（first-portfolio）→ 目标对照

### 1.1 原项目技术栈（节选）

- **框架**：Next.js 14（App Router）、React 18、TypeScript、Tailwind。
- **CMS**：Sanity（`post`、`project`、`settings`、Portable Text 等）。
- **数据库**：Neon + Drizzle；表包括 **`subscribers`、`newsletters`、`comments`、`guestbook`**（前两者随「不做邮件」可不再迁移进新项目）。
- **Redis**：浏览量、reactions、**guestbook/comments 的 ratelimit**、middleware 内 geo 等。
- **认证**：Clerk。
- **邮件**：Resend + React Email（含 Newsletter 与留言/评论通知）。
- **其他**：Edge Config、Vanta + Three、Framer Motion、块级 `Commentable`、react-query 等。

### 1.2 页面与数据依赖（按你的目标改版）

| 区域 | 目标数据源 | 备注 |
|------|------------|------|
| 首页 | Sanity + mock 阶段假数据 | 去掉 Newsletter 侧栏块或改为静态文案；去掉浏览量相关 |
| `/blog`、`/blog/[slug]` | Sanity | 去掉 views / reactions；**博客块级评论**仍对应 **`comments` 表 + Clerk**（接库阶段再通） |
| `/projects` | Sanity `settings.projects` | |
| **`/guestbook`** | **Neon `guestbook` + Clerk** | **留言墙独立页面**；与博客评论不是同一套数据；视觉门禁阶段可 mock |
| `/ama` | 静态或本地 JSON | |
| `/admin/*` | **极简或省略** | 若不做 admin，留言与评论 moderation 用 Neon GUI |
| `/studio` | Sanity | 可继续沿用现 Studio 项目，与新版前端共用 dataset |
| RSS / sitemap | Sanity | |

### 1.3 仍建议精简或核实之处

1. **Portable Text 与块级评论**：`Commentable` 体量大；若你愿改产品形态，可改为 **文末单一讨论区**（仍用 `comments` 表但不再按 `blockId` 渲染在段落旁）——**与 `/guestbook` 仍是两回事**（一个绑 post，一个全站墙）。
2. **`@splinetool/react-spline`**：若路由中未使用，直接删依赖。
3. **`@tremor/react`**：无复杂 admin 则不引入。
4. **`@zolplay/*`、巨量自绘 SVG 图标**：用占位图标 + 少量工具函数替代，最后再精修。
5. **react-query**：若改为「进页拉一次 + 提交后 mutate/刷新」，可用 `useEffect` + `useState` / SWR 等取代，不必保留 react-query。
6. **middleware**：仅 Clerk 时，`publicRoutes` 与 matcher 会简单很多（勿忘 **`/guestbook` 一般为公开路由**，仅提交需登录）。
7. **死代码**：已注释的 Multiplayer / LiveAvatars 等直接删除。

---

## 二、重构目标（一句话）

**第一阶段以「视觉与交互是否接近 first-portfolio」为门禁**：像则继续接 Sanity / Neon（**含留言墙与博客评论两条线**）与写路径；不像则停，避免在后端细节上投入过多。

长期目标：在 **无 Redis、无邮件、无 Edge Config、无 WebGL 背景** 的前提下，**Sanity 管内容**、**Neon 管 `guestbook` + `comments`**、**Clerk 管身份**，代码量明显小于现仓库。

---

## 三、建议执行顺序

### 阶段 0：仓库与基线 ✅ **已完成**

- [x] 初始化 `portfolio-pro`（App Router + TS + Tailwind；Next 14.x）。
- [x] 从 `first-portfolio` **有选择地迁移**：`globals.css`（背景色 / 选区高亮 / 滚动）、Manrope 字体、`Container`、`Header`（含滚动头像与 `layoutId`）、`NavigationBar`（桌面 pill + 移动菜单）、`ThemeSwitcher`、`Footer` 骨架（无 Newsletter / 访问量）；**未迁移** Vanta、Redis、邮件、Edge Config、Drizzle、Clerk（登录为占位按钮）。
- [x] 依赖相对旧站 **明显更短**；为还原壳层仅增加 `framer-motion`、`next-themes`、`@headlessui/react`、`lucide-react`、`clsx`、`tailwind-merge`。

**落地位置**：`app/(main)/*`、`components/ui/Container.tsx`、`config/nav.ts`、`lib/font.ts`、`public/avatar*.svg` 等。

### 阶段 1（门禁阶段）：前端像不像

**目标**：用 mock 数据跑通主流程，在浏览器里对比原站截图/本地双开。

1. **壳**：`layout`、明暗主题、`Header` / `Footer` / 导航；**无** WebGL 背景；**无** Newsletter、无访问量数字。
2. **动效**：Framer Motion 按页保留与原版接近的入场与滚动表现。
3. **图标**：占位方案统一。
4. **页面顺序建议**：`/ama` → `/projects` → **`/guestbook`（列表+输入区 mock）** → `/blog` 列表与详情（含评论 UI 占位）→ 首页。
5. **Clerk**：若 Header 依赖登录视觉，可接 **ClerkProvider** + `publicRoutes`；**留言墙与评论 API 可先不接**，用静态数据占位。
6. **门禁标准**：主要页面一眼像原站（含 **留言墙版式**是否与现站一致）。

**若不通过**：优先调布局/字体/动效，**不要**先扩后端功能。

### 阶段 2：接 Sanity（内容真源）

1. 抽象 `getPosts` / `getPostBySlug` / `getSiteSettings`，实现 Sanity 驱动版本。
2. Portable Text：尽量复用现有渲染链；图片域名写入 `next.config`。
3. RSS、sitemap、`generateMetadata` 与 Sanity 数据同源。

### 阶段 3：Neon 用户内容（Clerk + 手写 SQL，无 Drizzle）

建议 **分两条线实现**，与现 API 边界一致：

1. **留言墙**：`guestbook` 表；`GET/POST /api/guestbook`；POST 需 Clerk `currentUser()`；**去掉** Resend 与 Redis ratelimit（或换替代限流）。
2. **博客评论**：`comments` 表；`GET/POST /api/comments/[postId]`（`postId` 为 Sanity `_id`）；**去掉** Resend 与 Redis ratelimit（或同上）。
3. 产品形态：保留 **块级 `Commentable`** 或改为 **文末讨论区**（仅影响前端与 `body.blockId` 是否必填），**不改变**「comments 属于文章、guestbook 属于全站墙」这一数据划分。

### 阶段 4（可选）

- 极简审核页（Clerk）或仅用 Neon GUI。
- RSS 增强、分析工具等。

---

## 四、仍需提前想清楚的点

### 4.1 环境变量（会比旧项目干净很多）

最小集合大致为：`NEXT_PUBLIC_CLERK_*`、Clerk secret、Sanity 相关、`DATABASE_URL`（接 Neon 阶段起需要）。**不再强制** Resend、Redis、Edge Config。

仍建议：开发时支持按功能拆分校验，或 `SKIP_ENV_VALIDATION`，避免「没接 DB 时 dev 起不来」。

### 4.2 博客评论的交互形态（仅影响 `comments`，不影响留言墙）

文末单线程评论实现快、与 Portable Text 解耦；**块级评论**更贴原站但前端 + API 更复杂。第一阶段结束前选定，避免阶段 3 返工。

### 4.3 图片与 SEO

Sanity 图床、`next/image` 域名、metadata 与正文标题层级，继续影响「像不像」与收录。

### 4.4 `prefers-reduced-motion`

保留 Framer Motion 时，对关键动画做减弱或关闭。

### 4.5 许可证

Fork 模板若要求保留声明，在 `portfolio-pro` 里保留对应文件或致谢段落。

---

## 五、成功标准（自检清单）

**阶段 0 结束（仓库与壳）** ✅

- [x] 本地 Git 仓库与可运行的 Next 脚手架。
- [x] 与 first-portfolio **视觉同构的壳**：顶栏、可滚动首页大头像 → 小头像、`Footer` 顶部分割线与导航。
- [x] 导航所列路由均有占位页，避免 404 干扰对比。

**阶段 1 结束（门禁）**

- [ ] 无 Vanta/Three、无 Redis、无邮件相关 UI 与路由。
- [ ] 核心页面在 mock 下可浏览，**观感接近** first-portfolio（**含 `/guestbook` 页面**）。
- [ ] 依赖列表明显短于原项目；Framer Motion 保留且无明显卡顿。

**全部打通后**

- [ ] Sanity 驱动博客与项目。
- [ ] Neon 同时服务 **`guestbook`（留言墙）** 与 **`comments`（博客评论）**（除非你明确砍掉其中一种产品能力）。
- [ ] Clerk 覆盖两条线的写操作；middleware `publicRoutes` 含 `/guestbook`、`/blog` 等公开阅读路径。
- [ ] 无 Drizzle 或仅保留最薄封装；表结构有 SQL 或文档可查。

---

## 六、与 first-portfolio 的对照索引（迁移时查）

| 能力 | 主要参考路径 |
|------|----------------|
| Sanity 查询 | `sanity/queries.ts`、`sanity/lib/client.ts` |
| 博客 UI | `app/(main)/blog/*`、`components/PostPortableText.tsx` |
| 站点设置 / 项目 | `getSettings` |
| **留言墙** | `app/(main)/guestbook/*`、`app/api/guestbook/route.ts`、`db/schema.ts` → `guestbook` |
| **博客评论** | `components/Commentable.tsx`、`app/api/comments/[id]/route.ts`、`db/schema.ts` → `comments` |
| Clerk | `middleware.ts`、`app/layout.tsx`、`Header.tsx` |
| 动效参考 | `Headline.tsx`、`BlogPostPage.tsx`、`Header.tsx` 等中的 `framer-motion` |
| **勿再迁移** | `components/Vanta*`、`lib/redis.ts`（除非换限流实现）、`app/api/reactions`、`app/api/newsletter`、`emails/*`、Edge Config 分支 |

---

*文档版本：v4 — 阶段 0 勾选完成；§五 增加阶段 0 自检项。*
