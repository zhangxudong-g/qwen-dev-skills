#!/bin/bash
# qwen-dev-skills/install.sh
# 一键安装 Qwen Code 开发技能包

set -e

SKILLS_DIR="${QWEN_SKILLS_DIR:-$HOME/.qwen/skills}"
PACKAGE_NAME="qwen-dev-skills"
VERSION="1.0.0"

echo "🚀 安装 $PACKAGE_NAME v$VERSION"
echo "📁 安装目录：$SKILLS_DIR"

# 创建目录
mkdir -p "$SKILLS_DIR/$PACKAGE_NAME"

# 复制技能文件（如果从本地运行）
if [ -d "./skills" ]; then
    cp -r ./skills/* "$SKILLS_DIR/$PACKAGE_NAME/"
    echo "✅ 技能文件已复制到 $SKILLS_DIR/$PACKAGE_NAME"
else
    echo "⚠️ 未找到 ./skills 目录，请确保在技能包根目录运行此脚本"
    exit 1
fi

# 创建版本标记
echo "$VERSION" > "$SKILLS_DIR/$PACKAGE_NAME/.version"

# 验证安装
echo ""
echo "🔍 验证安装..."
if command -v qwen &> /dev/null; then
    echo "✅ Qwen Code CLI 已安装"
    echo "💡 使用方式:"
    echo "   qwen> \"/skills secure-coding-checklist\""
    echo "   qwen> \"实现登录功能，注意安全\""
else
    echo "⚠️ 未检测到 qwen 命令，请先安装：npm install -g @qwen-code/qwen-code"
fi

echo ""
echo "🎉 安装完成！"
echo "📚 查看文档：cat $SKILLS_DIR/$PACKAGE_NAME/README.md"
echo "🔄 更新技能：重新运行此脚本或从 Git 拉取最新版本"
