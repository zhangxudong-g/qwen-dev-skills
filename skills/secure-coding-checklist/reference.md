# 🔐 安全编码详细规则

## OWASP Top 10 映射

| OWASP 风险 | 本技能检查项 | 修复方案 |
|------------|-------------|----------|
| A01:2021 失效的访问控制 | 权限校验 | 服务端重复校验、角色权限验证 |
| A02:2021 加密机制失效 | 加密与传输 | HTTPS/TLS、强哈希算法 |
| A03:2021 注入 | 注入防护 | 参数化查询、输入转义 |
| A04:2021 不安全设计 | 输入验证 | 类型/长度/格式校验 |
| A05:2021 安全配置错误 | 凭证管理 | 环境变量、密钥服务 |
| A07:2021 身份认证失败 | 凭证管理/加密 | JWT 有效期、防爆破机制 |
| A08:2021 软件和数据完整性失败 | 输入验证 | 文件校验、内容扫描 |
| A09:2021 安全日志和监控失败 | 凭证管理 | 脱敏日志、审计追踪 |

## 密码存储规范

```yaml
推荐算法:
  - bcrypt: cost >= 12
  - argon2id: memory=64MB, iterations=3, parallelism=4
  - scrypt: N=2^14, r=8, p=1

禁止使用:
  - MD5/SHA1/SHA256 (无盐)
  - 明文存储
  - 可逆加密
```

## 输入验证规则

```typescript
// 邮箱验证
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// 密码强度
function validatePassword(pwd: string): boolean {
  return pwd.length >= 8 &&
         /[A-Z]/.test(pwd) &&
         /[a-z]/.test(pwd) &&
         /[0-9]/.test(pwd) &&
         /[^A-Za-z0-9]/.test(pwd)
}

// 文件上传
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
```

## SQL 注入防护

```typescript
// ❌ 危险写法
db.query(`SELECT * FROM users WHERE id = ${userId}`)
db.query(`DELETE FROM posts WHERE author = '${authorName}'`)

// ✅ 安全写法
db.query('SELECT * FROM users WHERE id = ?', [userId])
db.query('DELETE FROM posts WHERE author = ?', [authorName])
```

## XSS 防护

```typescript
// 输出转义
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// React 自动转义 (默认安全)
<div>{userInput}</div> // ✅ 安全

// 危险：禁用转义
<div dangerouslySetInnerHTML={{__html: userInput}} /> // ❌ 仅当可信时使用
```
