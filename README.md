# 最基础的项目模版

## 技术栈

1. monorepo + Next.js + shadcn + base ui
2. ENV config: `@t3-oss/env-nextjs`，统一在 `src/config/env.ts` 管理
3. 路由的唯一数据源 `app-paths`
4. fetch: `@infra-x/fwrap`
5. 主题配置：`next-themes`
6. 标配骨架：Navbar / Footer / RootLayout / ThemeToggle

## 测试

测试文件统一放在 `__tests__/`，按类型分目录，用 vitest `test.projects` 区分：

| 目录 | 类型 | 说明 |
|---|---|---|
| `unit/` | 单元测试 | 单组件渲染、props、aria，mock 所有外部依赖 |
| `integration/` | 集成测试 | 多组件协作，只 mock 无法在 jsdom 运行的模块 |
| `snapshot/` | 快照测试 | DOM 结构稳定性，固定系统时间后截取 |
| `e2e/` | 端到端测试 | 用 `userEvent` 模拟完整用户操作序列 |

```bash
pnpm vitest run                   # 全部
pnpm vitest run --project=unit    # 只跑 unit
pnpm vitest run --project=e2e     # 只跑 e2e
```

> 代码编写为测试优先

## CI

GitHub Actions 在 PR 时自动运行 lint / typecheck / test