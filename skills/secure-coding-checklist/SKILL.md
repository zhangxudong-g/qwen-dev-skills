---
name: secure-coding-checklist
description: |
  编码时自动执行安全检查：输入验证、注入防护、凭证管理、权限校验。
  当用户编写/修改涉及用户输入、数据库操作、认证授权、文件处理的代码时触发。
  关键词：安全、验证、注入、密码、权限、密钥、加密、认证、授权、凭证、防暴破、脱敏
---

# 🔐 安全编码检查清单

## 🎯 自动检查项（每次代码生成/审查时执行）

### 1️⃣ 输入验证
- [ ] 所有外部输入（API 参数/表单/文件）必须有类型 + 长度 + 格式校验
- [ ] 禁止直接信任前端传入的用户 ID/角色/权限标识
- [ ] 文件上传必须校验：MIME 类型 + 文件大小 + 内容扫描
- [ ] 数组/列表输入必须有数量上限

### 2️⃣ 注入防护
- [ ] SQL 查询必须使用参数化查询（禁止字符串拼接）
- [ ] NoSQL 查询必须过滤 `$where`/`$expr` 等特殊操作符
- [ ] 模板输出必须转义（防 XSS）：`{{ value }}` 而非 `{{{ value }}}`
- [ ] 命令执行必须白名单校验 + 参数转义

### 3️⃣ 凭证管理
- [ ] 禁止硬编码：密钥/密码/令牌/连接字符串
- [ ] 敏感配置必须从环境变量或密钥管理服务读取
- [ ] 日志/错误消息中不得记录：密码/令牌/完整信用卡号/身份证号
- [ ] 调试信息在生产环境必须关闭

### 4️⃣ 权限校验
- [ ] 每个接口/函数入口必须验证用户身份（除非明确公开）
- [ ] 敏感操作（删除/导出/配置修改）必须校验角色权限
- [ ] 禁止通过修改参数实现越权访问（ID 遍历防护）
- [ ] 服务端必须重复校验关键业务规则（不信任前端逻辑）

### 5️⃣ 加密与传输
- [ ] 密码存储必须使用强哈希：bcrypt/argon2（盐值≥12）
- [ ] 敏感数据传输必须使用 HTTPS/TLS
- [ ] JWT 令牌必须设置合理有效期 + 刷新机制
- [ ] 随机值生成必须使用加密安全随机数（非 Math.random）

## 📤 输出格式规范

### 审查报告模板
```
🔐 安全检查：[文件名/功能]

📊 摘要：[1 句话概述风险等级]

🔴 必须修复 (阻断合并)
| # | 位置 | 问题 | 风险 | 修复代码 |
|---|------|------|------|----------|
| 1 | src/x:42 | SQL 注入 | 数据泄露 | `db.query('SELECT...WHERE id=?', [id])` |

🟡 建议优化 (推荐修复)
| # | 位置 | 问题 | 影响 | 优化建议 |
|---|------|------|------|----------|
| 1 | src/y:18 | 日志记录邮箱 | 隐私泄露 | `log.info(`User ${mask(email)} logged in`)` |

🟢 通过项
✓ 密码使用 bcrypt 加密 (cost=12)
✓ 登录失败计数使用 Redis + 自动过期

🔧 一键修复建议
```[语言]
// 复制粘贴即可修复的关键代码
```

🎯 结论：[✅ 通过 / 🟡 建议修改 / 🔴 阻断合并]
```

### 代码生成约束
当用户请求实现功能时，自动应用：
```
1. 所有用户输入先验证后使用
2. 数据库操作默认参数化查询
3. 敏感配置从 process.env 读取
4. 错误消息不泄露内部细节
5. 关键逻辑添加安全注释
```

## 🧪 示例

### 用户请求
```
"实现用户注册接口，需要邮箱验证和密码加密"
```

### 技能响应（代码生成模式）
```typescript
// src/auth/register.ts
// 🔐 安全注释：输入验证 + 密码加密 + 防重放

export async function register(email: string, password: string) {
  // ✅ 输入验证
  if (!isValidEmail(email)) {
    throw new ValidationError('Invalid email format');
  }
  if (password.length < 8 || !/[A-Z]/.test(password)) {
    throw new ValidationError('Password too weak');
  }
  
  // ✅ 防重放：检查邮箱是否已注册
  const existing = await db.query(
    'SELECT id FROM users WHERE email = ?', 
    [email]  // ✅ 参数化查询
  );
  if (existing.length > 0) {
    throw new ConflictError('Email already registered');
  }
  
  // ✅ 密码加密 (bcrypt, cost=12)
  const hashed = await bcrypt.hash(password, 12);
  
  // ✅ 创建用户 (不记录明文密码)
  await db.query(
    'INSERT INTO users (email, password_hash) VALUES (?, ?)',
    [email, hashed]
  );
  
  // ✅ 审计日志 (脱敏)
  logger.info(`User registered: ${maskEmail(email)}`);
  
  return { success: true, userId: generateId() };
}

// 🔐 辅助函数：邮箱脱敏
function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  return `${name[0]}***@${domain}`;
}
```

## 📚 参考
- 详细规则：reference.md
- 安全测试用例：examples/security-tests/
- OWASP Top 10 映射：reference.md#owasp-mapping
