# qwen-dev-skills/install.ps1
# 一键安装 Qwen Code 开发技能包 (PowerShell 版本)

$ErrorActionPreference = "Stop"

$SkillsDir = if ($env:QWEN_SKILLS_DIR) { $env:QWEN_SKILLS_DIR } else { "$HOME\.qwen\skills" }
$PackageName = "qwen-dev-skills"
$Version = "1.0.0"

Write-Host "🚀 安装 $PackageName v$Version" -ForegroundColor Green
Write-Host "📁 安装目录：$SkillsDir"

# 创建目录
$TargetDir = Join-Path $SkillsDir $PackageName
New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null

# 复制技能文件
if (Test-Path ".\skills") {
    Copy-Item -Path ".\skills\*" -Destination $TargetDir -Recurse -Force
    Write-Host "✅ 技能文件已复制到 $TargetDir" -ForegroundColor Green
} else {
    Write-Host "⚠️ 未找到 .\skills 目录，请确保在技能包根目录运行此脚本" -ForegroundColor Yellow
    exit 1
}

# 创建版本标记
$Version | Out-File -FilePath (Join-Path $TargetDir ".version") -Encoding UTF8

# 验证安装
Write-Host ""
Write-Host "🔍 验证安装..." -ForegroundColor Cyan
try {
    $qwenCmd = Get-Command qwen -ErrorAction Stop
    Write-Host "✅ Qwen Code CLI 已安装" -ForegroundColor Green
    Write-Host "💡 使用方式:" -ForegroundColor Cyan
    Write-Host "   qwen> `"/skills secure-coding-checklist`""
    Write-Host "   qwen> `"实现登录功能，注意安全`""
} catch {
    Write-Host "⚠️ 未检测到 qwen 命令，请先安装：npm install -g @qwen-code/qwen-code" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 安装完成！" -ForegroundColor Green
Write-Host "📚 查看文档：Get-Content $TargetDir\README.md"
Write-Host "🔄 更新技能：重新运行此脚本或从 Git 拉取最新版本"
