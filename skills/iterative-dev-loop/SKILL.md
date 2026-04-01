---
name: iterative-dev-loop
description: |
  小步迭代开发循环：规划→实现→验证→调整。
  当用户开始新功能开发、遇到复杂需求、需要持续优化或提到"规划"/"迭代"/"小步"时触发。
  关键词：规划、迭代、小步、验证、调整、todo、任务、拆解、循环、反馈
---

# 🔄 5 步迭代开发循环

## 🎯 标准流程（自动引导）

```
1️⃣ PLAN: 拆解需求 + 明确验收标准 + 创建任务清单
2️⃣ IMPLEMENT: 小步编码 + 即时测试 + 精准修改  
3️⃣ VERIFY: 运行测试 + 类型检查 + 安全扫描
4️⃣ ADAPT: 根据反馈调整计划 + 处理新约束
5️⃣ DOCUMENT: 更新注释 + 同步文档 + 提交规范
```

## 🛠️ 自动化工具集成

### 任务跟踪 (TodoWrite)
```bash
# 自动创建迭代任务
/plan "实现用户注册功能"
# 输出:
# - [ ] 设计注册接口 Schema (15min)
# - [ ] 实现邮箱格式验证 (10min)  
# - [ ] 实现密码强度校验 (15min)
# - [ ] 添加防重放攻击机制 (20min)
# - [ ] 编写单元测试 (20min)
# - [ ] 集成安全审查 (10min)
```

### 上下文智能加载
```bash
# 自动加载相关上下文（无需用户指定）
 @QWEN.md "项目编码规范 + 安全策略"
 @src/auth/ "现有认证模块结构"  
 @tests/ "测试框架配置 + 示例"
 @package.json "依赖版本 + 脚本命令"
```

### 验证自动化
```bash
# 每次迭代后自动执行（可配置）
!npm run type-check && npm run lint && npm run test:unit -- --passWithNoTests

# 输出精简反馈
✅ 类型检查：通过  
✅ 代码规范：2 处格式警告（自动修复中...）
✅ 单元测试：8/8 通过 | 覆盖率 85%
```

## ⏱️ 迭代节奏控制

### 小步原则（默认启用）
```
📏 代码规模:
  - 单次生成 ≤ 100 行（复杂逻辑自动拆分）
  - 单个函数 ≤ 30 行（单一职责）
  - 单个提交 ≤ 3 个文件（聚焦变更）

⏱️ 时间盒:
  - 编码：5-10 分钟 → 验证：1-2 分钟 → 调整：按需
  - 每 30 分钟强制检查点："当前进度？遇到阻碍？下一步？"
```

### 反馈循环模板
```markdown
## 🔄 迭代 #1/3: [任务名称]

### ✅ 完成
- [x] 实现邮箱验证逻辑
- [x] 添加基础单元测试

### 📊 验证结果  
- 测试：3/3 通过
- 类型：无报错
- 安全：无高风险

### ⚠️ 发现/调整
- 新约束：项目要求邮箱验证异步发送
- 计划更新：添加邮件队列集成任务

### 🎯 下一步
- [ ] 集成邮件发送服务
- [ ] 添加重试机制
- [ ] 编写集成测试
```

## 🧪 示例

### 用户请求
```
"用迭代方式开发用户资料更新功能"
```

### 技能响应
```markdown
## 🔄 迭代开发：用户资料更新

### 📋 Step 1: 规划 (PLAN)
```todo
- [ ] 设计更新接口：PATCH /api/users/:id
- [ ] 实现字段白名单过滤 (防批量赋值)
- [ ] 添加权限校验 (仅本人/管理员可修改)
- [ ] 实现敏感字段脱敏 (不返回密码哈希)
- [ ] 编写单元测试 + 集成测试
- [ ] 添加审计日志
```

### ⚙️ Step 2: 实现 #1 (IMPLEMENT)
```typescript
// src/api/users.ts - 字段白名单
const ALLOWED_FIELDS = ['name', 'avatar', 'bio'] as const

export async function updateUser(userId: string, input: Record<string, any>) {
  // ✅ 白名单过滤
  const safeInput = Object.fromEntries(
    Object.entries(input).filter(([key]) => 
      ALLOWED_FIELDS.includes(key as any)
    )
  )
  
  // ✅ 权限校验 (伪代码)
  if (!await canEditUser(currentUser, userId)) {
    throw new ForbiddenError()
  }
  
  // ... 继续实现
}
```

### ✅ Step 3: 验证 (VERIFY)
```bash
!npm run test:unit -- users.test.ts
# 结果：5/5 通过 | 覆盖率 88%

!npm run type-check  
# 结果：✅ 无类型错误
```

### 🔄 Step 4: 调整 (ADAPT)  
> 发现：项目使用 Redis 缓存用户资料
> 调整：添加缓存失效逻辑

```typescript
// 新增：更新后清除缓存
await redis.del(`user:${userId}`)
```

### 📝 Step 5: 文档 (DOCUMENT)
```markdown
## 变更摘要
- 实现 PATCH /api/users/:id 接口
- 支持字段：name, avatar, bio
- 权限：仅本人/管理员
- 缓存：更新后自动失效

## 测试覆盖
- 单元测试：字段过滤/权限校验/缓存失效
- 集成测试：完整更新流程
- 安全测试：越权访问/批量赋值防护
```

🎯 迭代 #1 完成！继续下一个任务？[y/n]
```

## 📚 参考
- 任务拆解模板：templates/task-breakdown.md
- 验证命令配置：reference.md#verification-commands
- 团队协作指南：reference.md#team-iteration
