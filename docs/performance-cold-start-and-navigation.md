# 冷启动、Neon 用量与客户端导航：策略备忘

本文记录对 **first-portfolio（已上线）** 与 **portfolio-pro（重构中）** 的差异观察，以及如何在「快、省、可维护」之间做取舍。可与 `nextjs-dev-compile-vs-production.md` 对照阅读。

---

## 1. 事实对比：为什么新项目 `next start` 感觉「极快」

本地对两个仓库各执行一次 `next build` 后的路由特征（节选）：

| 项目 | 首页 `/` | 典型内页 | 构建体量感 |
|------|----------|----------|------------|
| **portfolio-pro** | 静态 `○`，First Load JS ≈ **87 kB** | `/blog` 等同样静态、同量级 | 页面少、无 CMS/Auth/DB 运行时 |
| **first-portfolio** | 动态 `ƒ`，First Load JS ≈ **261 kB** | `/blog/[slug]` 约 **599 kB**；`/guestbook` 约 **343 kB** | 大量 `ƒ` 按需服务端渲染 + Clerk + Sanity + 客户端体积 |

结论（直观）：

- **生产「快」**不仅指 Netlify 冷不冷，更取决于：**每次请求要不要跑 Node 函数、要打几个外部 API、要下发多少 JS**。
- portfolio-pro 当前几乎是 **纯静态 HTML + 少量共享 JS**，所以 **localhost:3001 与路由切换都会极快**——这是架构结果，不是 Netlify 魔法。
- 旧站把 Sanity、Neon、Redis、Clerk、Footer 里的 DB 查询等放在**请求路径**上，天然更重；再叠加 **Middleware 167 kB** 等，冷启动与导航成本都会上去。

---

## 2. Netlify「十几分钟后首次访问很慢」：到底是什么慢？

常见是 **多层叠加**，需要分开想：

1. **Serverless / Edge 函数冷启动**  
   一段时间无流量后，首次要 **拉起运行时 + 加载你的 bundle**。Middleware、动态页面、API Route 都会参与。

2. **下游依赖冷启动**  
   **Neon** 在无连接时可进入休眠；**第一次连库**的建连 + 唤醒可能比函数本身还慢。  
   **Upstash** 通常比「自建 TCP 数据库」轻，但仍有 RTT。

3. **运行时工作**  
   动态 RSC 要在边缘/节点上 **fetch Sanity、拼 HTML**。缓存未命中时，用户感知就是「白屏或久等」。

**用 Better Stack 每 5 分钟打全站** 的效果：

- 往往同时 **温了 Netlify 函数** 和 **Neon（若该请求会查库）**。
- 副作用：只要探测请求触达数据库或重逻辑，就会 **持续消耗 Neon compute**，容易把 **CU-hrs** 打满——这是经济账，不是工具错。

---

## 3. 比「定时 ping」更好的方向（推荐优先级）

### A. 让「公共页面」尽量不需要每次请求都打 DB / 少打 Sanity

- 对 **博客列表、文章正文、项目列表、首页** 等：优先 **SSG** 或 **ISR**（`revalidate`），让 **CDN 边缘缓存 HTML**。  
- 首访用户拿到的是 **缓存页**，不唤醒复杂服务端路径时，**Neon 甚至不会被碰到**。

### B. 把「监控」和「业务请求」拆开

- 健康检查只打 **不查库的静态路径** 或 **专用 `/api/health`**（返回 200、**不连接 Neon**）。  
- 这样仍可缓解 **纯函数冷启动** 的一部分，同时 **不把 Neon 当闹钟用**。

### C. Neon 侧省算力

- 查官方文档里与 **规模/自动休眠/最小容量** 相关的档位；开发/预览与生产分开项目。  
- 应用侧：**连接串 + 短查询 + 缓存**；避免在 **高流量监控请求** 上跑重查询。

### D. 部署与缓存策略

- Netlify：**合适的 `Cache-Control` / 静态资源长期缓存**；动态路由能 ISR 则 ISR。  
- 若某类页面 **必须动态**：考虑 **Edge 可缓存片段** 或 **stale-while-revalidate** 类策略（视平台能力而定）。

### E. 接受「冷启动存在」，用产品手段补体验

- 见下一节 **loading / streaming**，让用户知道「在加载」而不是「卡死」。

---

## 4. 站内从 Home 点到 Blog 要等 ~1 秒：可能原因与对策

**可能原因（旧站常见组合）：**

- **动态路由**：每次导航都要 **RSC payload + 服务端取数**（Sanity、Redis、Footer 的 DB…），**串行 waterfall** 会放大延迟。
- **Middleware**：每个请求先过 Clerk / Edge Config / 其它逻辑，增加 **TTFB**。
- **JS 体积**：首段 JS 大 → **解析与 hydration** 长，体感「点完要等一下才有反应」。
- **无 loading UI**：Next App Router 默认会等 **新 segment 的 RSC 就绪** 再一次性替换，**没有骨架屏**时感觉像「卡住」。

**对策（portfolio-pro 后续可逐项落地）：**

| 手段 | 作用 |
|------|------|
| **`app/(main)/blog/loading.tsx`（及同级路由）** | 点击链接触发导航时立刻显示骨架/转圈，**管理预期**。 |
| **`loading.tsx` 放在合适 layout 层级** | 子路由切换只替换 `main` 区域，**Header 可保持不动**。 |
| **Sanity `fetch` + `next: { revalidate, tags }`** | 服务端缓存命中率高 → **导航更快、更少打 CMS**。 |
| **并行取数** | 同一页面多个 `fetch` 不要串行 await；必要时 `Promise.all`。 |
| **保留 `next/link` 默认 prefetch** | 视口内链接预取 RSC payload，**hover 或进入视区后**后续点击更快。 |
| **控制客户端边界** | 少把大树标成 `use client`；大依赖动态 `import()`。 |

**原则**：**能静态/缓存的不要动态；必须动态的用 loading + 缓存 + 并行把 1s 压下去。**

---

## 5. portfolio-pro 重构建议清单（方便后续改）

1. **默认路径**  
   - 首页、博客列表、文章详情、项目页：**SSG/ISR + CDN**，Neon **仅留言墙 / 评论等写路径或明确需要的读路径**。

2. **数据层**  
   - 统一 `getPosts` / `getPost` 封装里做 **revalidate + tag**，避免每个页面手写一套 fetch。

3. **UI**  
   - **`loading.tsx`** 已在 `/blog`、`/blog/[slug]`、`/projects`、`/guestbook` 落地（脉冲骨架）。**本地如何验收**（Slow 4G、`MOCK_PAGE_DELAY_MS`）：见 [`docs/phase1-status-and-data-strategy.md`](./phase1-status-and-data-strategy.md) **§7**。  
   - 可选：`Suspense` 边界细分 **侧栏 vs 正文**，先出壳再流式补块。

4. **监控与运维**  
   - 若仍用外部 uptime：**只 ping 静态资源或轻量 health**，**禁止**对会打 Neon 的 URL 高频探测。

5. **与 REFACTOR-PLAN 对齐**  
   - 规划文档已吸收本文：**§二之二（性能与上线策略）**、**§4.6**、阶段 2–3 与 §五「全部打通后」性能项。  
   - 已砍掉 Redis / 邮件等，**导航与冷启动路径天然变短**；接上 Sanity 时 **不要恢复「每请求必打全栈」** 的习惯。

---

## 6. 小结

- **新项目极速**：主要来自 **静态化 + 小包体**，不是「换了个框架就永远快」。  
- **旧站慢 + Neon 爆表**：**定时全站 ping** 是在用 **持续算力** 换 **冷启动时间**，长期不如 **缓存架构 + 轻量健康检查**。  
- **站内 1 秒等待**：优先 **ISR/缓存与并行取数** 压时间，同时用 **`loading.tsx`** 把体验做成「可预期」。

---

*基于本地构建输出对比（first-portfolio Next 14.2.x / portfolio-pro Next 14.2.x）；线上 Netlify/Neon 具体数值以你控制台与 APM 为准。*
