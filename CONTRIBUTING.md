# 🤝 贡献指南

感谢你对 Qwen Code 技能包的兴趣！欢迎贡献你的技能和改进。

## 📦 如何贡献

### 1. 提交新技能

#### 创建技能目录
```bash
mkdir -p skills/your-skill-name
```

#### 添加 SKILL.md（必需）
```markdown
---
name: your-skill-name
description: |
  技能的触发描述。
  当用户 [场景] 时触发。
  关键词：你的，触发词，列表
---

# 技能名称

## 功能说明
[详细描述技能的功能]

## 使用示例
[示例用法]
```

#### 添加辅助文件（可选）
- `reference.md` - 详细规则参考
- `examples/` - 示例代码
- `templates/` - 模板文件

### 2. 改进现有技能

- 修复文档错误
- 添加更多示例
- 优化触发规则
- 改进输出格式

### 3. 提交 Bug 报告

请使用 GitHub Issues，并包含：
- 技能名称
- 问题描述
- 复现步骤
- 预期行为 vs 实际行为

## 📝 开发流程

1. **Fork 仓库**
2. **创建分支**: `git checkout -b feature/your-feature`
3. **提交更改**: `git commit -m "feat: add your feature"`
4. **推送到分支**: `git push origin feature/your-feature`
5. **提交 Pull Request**

## 🎯 技能设计原则

### 1. 单一职责
每个技能专注于一个特定领域，避免功能重叠。

### 2. 自动触发
通过 `description` 中的关键词实现智能触发，减少用户手动调用。

### 3. 结构化输出
使用清晰的格式（表格、列表、代码块）输出结果。

### 4. 可操作性
提供具体的修复建议和代码示例，而非仅指出问题。

### 5. 可测试
为技能添加测试用例（`evals/evals.json`），确保行为符合预期。

## 📋 代码规范

### SKILL.md 格式
- 使用 YAML Front Matter 定义 `name` 和 `description`
- 使用 Markdown 编写详细内容
- 包含至少一个使用示例

### 文件命名
- 目录：kebab-case (`secure-coding-checklist`)
- 文件：小写，适当使用连字符

### 文档语言
- 主要使用中文
- 代码示例可以使用英文注释

## 🧪 测试技能

### 本地验证
```bash
# 安装技能
./install.sh

# 在 Qwen Code 中测试
qwen> "/skills your-skill-name"
qwen> "触发关键词测试"
```

### 添加测试用例
在 `evals/evals.json` 中添加：
```json
{
  "skill": "your-skill-name",
  "cases": [
    {
      "id": "test-001",
      "prompt": "测试提示词",
      "expected": ["期望输出 1", "期望输出 2"],
      "files": ["相关文件"]
    }
  ]
}
```

## 📞 问题与讨论

- 💬 一般讨论：GitHub Discussions
- 🐛 Bug 报告：GitHub Issues
- 💡 功能建议：GitHub Issues

## 🎖️ 贡献者

感谢所有为这个项目做出贡献的人！

<!-- 贡献者列表将自动由 GitHub 生成 -->

## 📜 许可证

MIT License - 详见 [LICENSE](LICENSE)
