# apps/web

`@workspace/web` 的最小启动模板，基于 Next.js 16 App Router 构建。

## 技术栈

- **框架**: Next.js 16 (App Router, React Compiler)
- **样式**: Tailwind CSS v4
- **组件库**: `@workspace/ui`（monorepo 内部包）
- **环境变量**: `@t3-oss/env-nextjs` + Zod 验证
- **测试**: Vitest + Testing Library

## 已包含的基础设施

- 环境变量集中管理（`src/config/env.ts`）
- HTTP 安全响应头（`X-Frame-Options`、`X-Content-Type-Options` 等）
- 完整 metadata 配置（`metadataBase`、Open Graph、Twitter Card）
- 原生 sitemap（`/sitemap.xml`）
- 跳过导航无障碍链接
- 亮/暗色主题支持

## 快速启动

```bash
# 在 monorepo 根目录安装依赖
pnpm install

# 复制环境变量文件
cp apps/web/.env.example apps/web/.env.local

# 启动开发服务器
pnpm dev
```

## 关键约定

### 环境变量

所有环境变量必须在 `src/config/env.ts` 中声明并验证，其他文件从该模块导入，禁止直接访问 `process.env.*` 或 `import.meta.env.*`。

```ts
import { env } from '@/config/env'

env.NEXT_PUBLIC_APP_URL // 正确
process.env.NEXT_PUBLIC_APP_URL // 禁止
```

### 路径别名

应用内路径通过 `@/` 别名引用，跨包路径在 `tsconfig.json` 中配置。
