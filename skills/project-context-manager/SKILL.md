---
name: project-context-manager
description: |
  项目上下文管理：自动加载规范、配置、依赖信息。
  当用户开始新项目、切换模块、需要理解项目结构或提到"项目"/"规范"/"配置"/"上下文"时触发。
  关键词：项目、规范、配置、上下文、结构、依赖、框架、初始化、环境、团队
---

# 📦 项目上下文管理器

## 🎯 自动加载的上下文

### 1️⃣ 项目规范 (QWEN.md / CLAUDE.md)
```yaml
# 自动解析并应用:
coding_standards:
  - TypeScript 严格模式 (noImplicitAny: true)
  - 禁止 any 类型，使用 unknown + 类型守卫
  - 所有异步函数必须 try/catch 或返回 Promise

security_policies:
  - 密码存储：bcrypt (cost >= 12)
  - 密钥管理：环境变量 + 密钥服务，禁止硬编码
  - 日志规范：敏感数据自动脱敏

testing_requirements:
  - 核心业务：单元测试覆盖率 >= 80%
  - 安全代码：100% 覆盖 + 渗透测试用例
  - API 端点：必须有集成测试
```

### 2️⃣ 技术栈智能检测
```bash
# 自动识别（无需用户指定）
 @package.json "框架/测试工具/构建配置"
 @tsconfig.json "TypeScript 严格程度/模块系统"
 @.eslintrc / @pyproject.toml "代码规范规则"
 @docker-compose.yml "服务依赖/环境配置"
```

### 3️⃣ 目录结构理解
```
# 自动建立项目地图（首次加载时）
src/
├── auth/          # ✅ 认证模块 (已了解)
│   ├── login.ts   # 邮箱 + 密码登录
│   └── jwt.ts     # 令牌生成/验证
├── api/           # ✅ API 层 (已了解)
│   ├── users/     # 用户相关端点
│   └── middleware/# 认证/日志中间件
├── utils/         # ✅ 工具函数 (已了解)
│   ├── validator/# 输入验证
│   └── security/  # 加密/脱敏
└── [new]/         # 🆕 新功能 (待开发)
```

## 🔄 智能上下文切换

### 模块级聚焦
```
当用户说"在 auth 模块添加功能"时:
✅ 自动加载:
   - src/auth/ 所有相关文件
   - 认证相关规范 (密码策略/令牌配置)
   - 现有测试用例 (避免重复)
   - 依赖服务 (Redis/数据库配置)
```

### 任务级上下文
```
当用户说"修复登录超时问题"时:
✅ 自动关联:
   - 登录相关代码 (login.ts, jwt.ts)
   - 超时配置 (config/auth.ts)
   - 相关测试 (login.test.ts)
   - 监控指标 (如果配置了)
```

## ⚙️ 上下文优化策略

### 精简原则（避免信息过载）
```
✅ 仅加载:
   - 当前任务直接相关的文件/规范
   - 最近修改的上下文（30 分钟内）
   - 用户显式 @的文件

✅ 大文件处理:
   - >500 行：提供摘要 + 关键片段
   - 配置类：仅加载相关字段
   - 重复信息：自动去重

✅ 按需展开:
   - 用户问"详细看"时再加载完整内容
   - 复杂逻辑：先给流程图/伪代码
```

### 缓存机制
```
🗄️ 上下文缓存:
   - 已加载文件：缓存 30 分钟 (或直到文件变更)
   - 项目规范：缓存直到 QWEN.md 变更
   - 用户可手动：/context refresh 强制刷新

🔍 变更检测:
   - 监听文件修改时间戳
   - Git diff 检测未提交变更
   - 用户显式 @的文件优先刷新
```

## 📤 输出格式

### 上下文摘要模板
```
## 📦 项目上下文：[项目名]

### 🎯 当前焦点
- 模块：[src/auth/]
- 任务：[实现双因素认证]
- 相关规范：[密码策略/令牌配置]

### 🔑 关键配置
```yaml
auth:
  jwt_expiry: 15m
  refresh_expiry: 7d
  mfa_required_for: ['admin', 'finance']
```

### 🗂️ 相关文件
| 文件 | 作用 | 状态 |
|------|------|------|
| src/auth/login.ts | 登录主逻辑 | ✅ 已加载 |
| src/auth/mfa.ts | 双因素逻辑 | 🆕 待创建 |
| tests/auth/mfa.test.ts | 测试用例 | 🆕 待创建 |

### ⚠️ 注意事项
- 双因素必须兼容现有登录流程
- 备份码生成需加密存储
- 审计日志记录 MFA 事件
```

## 🧪 示例

### 用户请求
```
"开始新项目，用 Qwen Code 开发一个博客系统"
```

### 技能响应
```markdown
## 📦 项目初始化：博客系统

### 🎯 推荐技术栈 (基于常见实践)
```yaml
frontend:
  framework: Next.js 14 (App Router)
  language: TypeScript (strict)
  styling: Tailwind CSS

backend:
  runtime: Node.js 20+
  framework: Express / Fastify
  database: PostgreSQL + Prisma ORM

devops:
  testing: Vitest + Playwright
  linting: ESLint + Prettier
  deployment: Docker + Vercel/Railway
```

### 📋 第一步：创建项目骨架
```bash
# 推荐命令 (可一键执行)
npx create-next-app@latest blog --typescript --tailwind --app --src-dir
cd blog
npm install prisma @prisma/client
npx prisma init
```

### 📄 初始化关键文件
```markdown
# QWEN.md (项目规范)
## 博客系统编码规范
- 所有 API 响应统一格式：`{ success, data?, error? }`
- 文章 slug 必须 URL 安全 + 唯一
- 用户内容必须 XSS 过滤 + 长度限制
- 图片上传：限制类型 + 大小 + 自动压缩
```

### 🔄 下一步建议
1. 运行 `npm run dev` 验证项目启动
2. 配置 Prisma Schema (用户/文章/评论)
3. 实现基础 CRUD (先用户模块)
4. 添加认证 (NextAuth.js 推荐)

💡 需要我帮你生成初始的 QWEN.md 或 Prisma schema 吗？
```

## 📚 参考
- 上下文配置示例：examples/context-configs/
- 多项目支持方案：reference.md#multi-project
- 团队规范同步：reference.md#team-sync
