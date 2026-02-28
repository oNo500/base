# 测试规范

## 组织方式

测试文件跟着被测代码放，同目录下。`__tests__/` 只放跨模块的端到端场景。

```
src/
  components/
    navbar/
      index.tsx
      navbar.test.tsx       # 组件单测
  features/
    auth/
      components/
        login-form/
          index.tsx
          login-form.test.tsx
      hooks/
        use-auth.ts
        use-auth.test.ts
      api/
        auth.ts
        auth.test.ts

__tests__/
  e2e/
    checkout-flow.test.tsx  # 跨模块的完整用户流程
  setup.ts
```

## 测试类型

测试类型靠内容区分，不靠目录或文件名后缀。

| 类型 | 特征 | mock 策略 |
|---|---|---|
| 单元测试 | 只渲染一个组件 | mock 所有外部依赖 |
| 集成测试 | 渲染多个真实组件 | 只 mock 无法在 jsdom 运行的模块（`next/link`、`next-themes`） |
| e2e | 完整用户操作序列 | 同集成测试，用 `userEvent` 替代 `fireEvent` |

页面层（`app/`）不测，逻辑收敛到 feature 里再测。

Snapshot 不单独分层，需要时在组件的 `.test.tsx` 里加 `toMatchSnapshot`，用 `vi.setSystemTime` 固定动态值。

## Mock 原则

| 模块 | 做法 |
|---|---|
| `next/link`、`next-themes` | 必须 mock |
| `@/config/env` | 必须 mock |
| `@workspace/ui`、`@workspace/icons` | 不需要 mock，直接解析源码 |
| 项目内部组件 | 单元测试中 mock；集成测试中不 mock |

## 运行

```bash
pnpm vitest run                   # 全部
pnpm vitest run --project=unit    # 按 project 过滤（见 vitest.config.mts）
```
