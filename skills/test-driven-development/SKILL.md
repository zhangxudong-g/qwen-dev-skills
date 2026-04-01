---
name: test-driven-development
description: |
  测试驱动开发工作流：先写测试→实现功能→验证覆盖。
  当用户请求实现新功能、修复 bug、重构代码或提到"测试"/"TDD"/"覆盖率"时触发。
  关键词：测试、TDD、单元测试、集成测试、覆盖率、断言、mock、jest、vitest、pytest
---

# 🧪 测试驱动开发流程

## 🔄 标准工作流（自动引导）

```
1️⃣ 理解需求 → 2️⃣ 编写失败测试 → 3️⃣ 实现最小功能 
→ 4️⃣ 运行测试通过 → 5️⃣ 重构优化 → 6️⃣ 重复直到完成
```

## 🎯 自动执行步骤

### Step 1: 智能识别测试环境
```bash
# 自动检测（无需用户指定）
 @package.json "测试框架？测试命令？覆盖率工具？"
 @README.md "如何运行测试？"
 @tests/ "现有测试结构？"
```

### Step 2: 生成测试用例模板
根据功能描述，自动生成**分层测试**：

```typescript
// ✅ 核心路径 (Happy Path)
it('should [预期行为] when [正常输入]', async () => { ... })

// ✅ 边界条件 (Edge Cases)  
it('should handle empty/null/undefined input', async () => { ... })
it('should reject input exceeding max length', async () => { ... })

// ✅ 错误处理 (Error Paths)
it('should throw ValidationError for invalid format', async () => { ... })
it('should handle database connection failure gracefully', async () => { ... })

// ✅ 安全相关 (Security)
it('should prevent SQL injection via input', async () => { ... })
it('should not log sensitive data', async () => { ... })
```

### Step 3: 实现最小功能代码
- 仅实现**通过当前测试**所需的最小代码
- 保持函数单一职责（≤30 行）
- 关键逻辑添加注释（特别是安全/边界处理）

### Step 4: 自动验证与反馈
```bash
# 运行相关测试
!npm run test -- --testNamePattern="新功能" --passWithNoTests

# 输出覆盖率（如果配置了）
!npm run test:coverage -- src/new-feature/ --silent

# 反馈结果
✅ 测试通过：5/5 | 覆盖率：85% (核心逻辑 100%)
⚠️ 建议：添加并发场景测试
```

## 📤 输出格式规范

### 测试代码模板
```typescript
// tests/unit/[module].test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { mockDb, mockLogger } from '../test-utils'

describe('[功能模块]', () => {
  beforeEach(() => {
    mockDb.reset()
    mockLogger.reset()
  })

  describe('[子功能]', () => {
    it('核心场景：[描述]', async () => {
      // Arrange
      const input = createValidInput()
      
      // Act
      const result = await targetFunction(input)
      
      // Assert
      expect(result).toMatchObject({ success: true })
      expect(mockDb.query).toHaveBeenCalledWith(
        expect.stringContaining('parameterized'),
        expect.arrayContaining([input.id])
      )
    })

    it('边界场景：[描述]', async () => {
      // 测试空值/超长/特殊字符等
    })

    it('错误场景：[描述]', async () => {
      // 测试异常处理
    })
  })
})
```

### 覆盖率要求（可配置）
```yaml
# 从 QWEN.md 或用户输入读取
coverage_targets:
  core_logic: 0.80      # 核心业务 >= 80%
  security_code: 1.00   # 安全代码 100%
  edge_cases: required  # 边界条件必须覆盖
```

## 🧪 示例

### 用户请求
```
"用 TDD 方式实现密码强度校验"
```

### 技能响应
```markdown
## 🧪 Step 1: 编写失败测试

```typescript
// tests/unit/password-validator.test.ts
import { validatePassword } from '@/utils/password-validator'

describe('密码强度校验', () => {
  it('应拒绝长度<8 的密码', () => {
    expect(validatePassword('short')).toMatchObject({
      valid: false,
      errors: ['MIN_LENGTH']
    })
  })

  it('应要求包含大写字母', () => {
    expect(validatePassword('alllowercase1')).toMatchObject({
      valid: false,
      errors: ['REQUIRE_UPPERCASE']
    })
  })

  it('应接受强密码', () => {
    expect(validatePassword('StrongP@ss1')).toMatchObject({
      valid: true,
      score: 4
    })
  })
})
```

✅ 运行测试：`npm run test -- password-validator`  
🔴 结果：3/3 失败（预期，功能未实现）

## 🧪 Step 2: 实现最小功能

```typescript
// src/utils/password-validator.ts
export function validatePassword(password: string) {
  const errors: string[] = []
  
  if (password.length < 8) errors.push('MIN_LENGTH')
  if (!/[A-Z]/.test(password)) errors.push('REQUIRE_UPPERCASE')
  if (!/[a-z]/.test(password)) errors.push('REQUIRE_LOWERCASE')
  if (!/[0-9]/.test(password)) errors.push('REQUIRE_NUMBER')
  if (!/[^A-Za-z0-9]/.test(password)) errors.push('REQUIRE_SPECIAL')
  
  return {
    valid: errors.length === 0,
    errors,
    score: Math.max(0, 5 - errors.length)
  }
}
```

✅ 运行测试：3/3 通过  
📊 覆盖率：92% (核心逻辑 100%)

## 🧪 Step 3: 重构优化（可选）
- 提取规则配置到常量
- 添加国际化错误消息
- 添加密码常见弱项检查

🎯 结论：功能完成，测试通过，可合并
```

## 📚 参考
- 测试框架配置：reference.md#test-setup
- 常见测试模式：examples/test-patterns/
- Mock 最佳实践：reference.md#mocking
