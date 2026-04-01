# 📦 Qwen Code CLI 技能包

> 将最佳实践封装为可复用的 AI 技能，提升开发效率与代码质量

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test](https://github.com/your-username/qwen-dev-skills/actions/workflows/test.yml/badge.svg)](https://github.com/your-username/qwen-dev-skills/actions/workflows/test.yml)

## 🚀 快速安装

### 方式一：npm 安装（推荐）⭐

```bash
# 安装到当前项目的 .qwen/skills 目录
npx qwen-dev-skills

# 或全局安装到 ~/.qwen/skills
npx qwen-dev-skills -g

# 或安装到指定路径
npx qwen-dev-skills -p /path/to/project
```

### 方式二：git 克隆

```bash
# 克隆仓库
git clone https://github.com/zhangxudong-g/qwen-dev-skills.git
cd qwen-dev-skills

# 运行安装脚本
# Windows (PowerShell)
.\install.ps1

# Linux / macOS
chmod +x install.sh
./install.sh
```

## 🎯 包含技能

| 技能名称 | 触发关键词 | 核心价值 |
|----------|-----------|----------|
| 🔐 secure-coding-checklist | 安全/验证/注入/密码/权限 | 自动检查安全风险 |
| 🧪 test-driven-development | 测试/TDD/单元测试/覆盖率 | 测试先行开发流程 |
| 📋 code-review-automation | 审查/review/检查/优化 | 结构化代码审查 |
| 🔄 iterative-dev-loop | 迭代/规划/小步/验证 | 5 步开发循环 |
| 📦 project-context-manager | 项目/规范/配置/上下文 | 智能加载项目信息 |

## 🚀 快速开始

### 1. 安装技能包

#### Windows (PowerShell)
```powershell
# 克隆或下载技能包后
cd qwen-dev-skills
.\install.ps1
```

#### Linux / macOS (Bash)
```bash
# 克隆或下载技能包后
cd qwen-dev-skills
chmod +x install.sh
./install.sh
```

### 方式三：手动安装

```bash
# 复制到 Qwen Code 技能目录
cp -r skills/* ~/.qwen/skills/qwen-dev-skills/
# Windows: copy -r skills\* $HOME\.qwen\skills\qwen-dev-skills\
```

### 方式四：npm 包安装

```bash
# 作为依赖安装（会自动复制到 .qwen/skills）
npm install qwen-dev-skills

# 或全局安装
npm install -g qwen-dev-skills
```

### 2. 验证加载
```bash
qwen> "有哪些可用技能？"
# 应显示：secure-coding-checklist, test-driven-development, ...
```

### 3. 使用技能

#### 自动触发（推荐）
```bash
# 描述需求时包含关键词，技能自动加载
qwen> "实现用户登录，需要防爆破和密码加密"
# → 自动触发：secure-coding-checklist

qwen> "用测试驱动的方式开发注册功能"
# → 自动触发：test-driven-development
```

#### 手动指定
```bash
# 显式调用技能
qwen> "/skills code-review-automation"
qwen> "请审查这段代码：@src/auth/login.ts"

# 组合使用
qwen> "先用 iterative-dev-loop 规划任务，再用 secure-coding-checklist 实现"
```

## 📖 技能详解

### 🔐 secure-coding-checklist - 安全编码检查

**触发场景**：编写涉及用户输入、数据库操作、认证授权的代码

**核心功能**：
- ✅ 输入验证检查
- ✅ 注入防护（SQL/XSS/命令注入）
- ✅ 凭证管理（禁止硬编码）
- ✅ 权限校验
- ✅ 加密与传输安全

**示例**：
```
qwen> "实现注册接口，需要邮箱验证和密码加密"
# 自动生成带安全检查的代码
```

### 🧪 test-driven-development - 测试驱动开发

**触发场景**：实现新功能、修复 bug、重构代码

**核心功能**：
- ✅ 智能识别测试框架
- ✅ 生成分层测试用例
- ✅ 实现最小功能代码
- ✅ 自动验证覆盖率

**示例**：
```
qwen> "用 TDD 实现密码强度校验"
# 先生成测试 → 实现功能 → 验证通过
```

### 📋 code-review-automation - 自动化代码审查

**触发场景**：代码审查、准备合并、优化现有代码

**核心功能**：
- ✅ 风险分级（Critical/Warning/Info）
- ✅ 结构化反馈
- ✅ 一键修复建议
- ✅ 自动修复能力

**示例**：
```
qwen> "审查这段代码：@src/auth/login.ts"
# 输出结构化审查报告
```

### 🔄 iterative-dev-loop - 迭代开发循环

**触发场景**：复杂需求开发、需要持续优化

**核心功能**：
- ✅ 5 步标准流程（PLAN→IMPLEMENT→VERIFY→ADAPT→DOCUMENT）
- ✅ 任务自动拆解
- ✅ 小步迭代
- ✅ 自动验证

**示例**：
```
qwen> "用迭代方式开发用户资料更新功能"
# 自动规划任务 → 逐步实现 → 验证反馈
```

### 📦 project-context-manager - 项目上下文管理

**触发场景**：新项目启动、切换模块、理解项目结构

**核心功能**：
- ✅ 自动加载项目规范
- ✅ 技术栈智能检测
- ✅ 目录结构理解
- ✅ 上下文缓存

**示例**：
```
qwen> "开始新项目，开发一个博客系统"
# 推荐技术栈 → 创建骨架 → 初始化规范
```

## ⚙️ 配置自定义

### 调整触发规则
编辑 `~/.qwen/skills/qwen-dev-skills/<skill>/SKILL.md` 中的 `description` 字段：

```yaml
description: |
  [你的自定义描述]
  当用户 [你的触发场景] 时触发。
  关键词：你的，关键词，列表
```

### 修改检查规则
编辑 `reference.md` 或 `examples/` 中的模板文件。

## 🧪 测试技能

```bash
# 运行内置测试用例
qwen> "运行技能测试：secure-coding-checklist"

# 或手动验证
# 1. 创建一个测试文件
# 2. 请求技能审查
# 3. 检查输出是否符合预期
```

## 🔄 更新技能

```bash
# 从 Git 仓库拉取更新（如果技能包来自仓库）
cd ~/.qwen/skills/qwen-dev-skills
git pull origin main

# 或重新运行安装脚本
./install.sh
```

## 🔗 链接

- 📄 [贡献指南](CONTRIBUTING.md)
- 📝 [更新日志](CHANGELOG.md)
- 📜 [许可证](LICENSE)

## ❓ 常见问题

### 技能没有自动触发？
- 检查 `SKILL.md` 的 `description` 是否包含你的请求关键词
- 尝试手动调用：`/skills <skill-name>`
- 使用 `/memory refresh` 重置上下文

### 输出格式不符合预期？
- 编辑 `SKILL.md` 中的输出模板
- 在请求中指定格式："请用表格形式输出"

### 如何贡献新技能？
1. 在 `skills/` 下创建新目录
2. 添加 `SKILL.md`（必需）+ 其他资源
3. 更新本 `README.md` 的技能列表
4. 提交 PR 或分享给团队

## 📜 许可证
MIT - 自由使用、修改、分发

---

<div align="center">

**觉得有用？⭐ 给个 Star 支持一下！**

[提交 Issue](https://github.com/YOUR_USERNAME/qwen-dev-skills/issues) | [参与贡献](https://github.com/YOUR_USERNAME/qwen-dev-skills/blob/main/CONTRIBUTING.md)

</div>
