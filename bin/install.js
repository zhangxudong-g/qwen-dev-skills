#!/usr/bin/env node
/**
 * qwen-dev-skills 安装脚本
 * 用法:
 *   npx qwen-dev-skills              # 安装到当前项目 .qwen 目录
 *   npx qwen-dev-skills -g           # 安装到全局 ~/.qwen 目录
 *   npx qwen-dev-skills -p /path     # 安装到指定路径
 */

const fs = require('fs');
const path = require('path');

const PACKAGE_NAME = 'qwen-dev-skills';
const VERSION = '1.0.0';

// 解析命令行参数
const args = process.argv.slice(2);
const isGlobal = args.includes('-g') || args.includes('--global');
const customPath = args.find((arg, i) => 
  arg === '-p' || arg === '--path' ? args[i + 1] : null
);
const pathIndex = args.indexOf('-p') || args.indexOf('--path');
const targetPath = customPath || (pathIndex > -1 ? args[pathIndex + 1] : null);

// 确定目标目录
function getTargetDir() {
  if (targetPath) {
    return path.resolve(targetPath, 'skills', PACKAGE_NAME);
  }
  if (isGlobal) {
    const homeDir = process.platform === 'win32' 
      ? process.env.USERPROFILE 
      : process.env.HOME;
    return path.join(homeDir, '.qwen', 'skills', PACKAGE_NAME);
  }
  // 默认：当前项目 .qwen/skills/qwen-dev-skills
  return path.resolve(process.cwd(), '.qwen', 'skills', PACKAGE_NAME);
}

// 复制目录递归
function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`源目录不存在：${src}`);
  }
  
  fs.mkdirSync(dest, { recursive: true });
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 主安装函数
function install() {
  const targetDir = getTargetDir();
  const packageDir = path.resolve(__dirname, '..');
  const skillsSourceDir = path.join(packageDir, 'skills');
  
  console.log(`🚀 安装 ${PACKAGE_NAME} v${VERSION}`);
  console.log(`📁 安装目录：${targetDir}`);
  
  try {
    // 创建目标目录
    fs.mkdirSync(path.dirname(targetDir), { recursive: true });
    
    // 复制技能文件
    copyDir(skillsSourceDir, targetDir);
    console.log(`✅ 技能文件已复制到 ${targetDir}`);
    
    // 创建版本标记
    fs.writeFileSync(path.join(targetDir, '.version'), VERSION);
    
    // 验证安装
    console.log('');
    console.log('🔍 验证安装...');
    const installedSkills = fs.readdirSync(targetDir).filter(f => 
      fs.statSync(path.join(targetDir, f)).isDirectory()
    );
    console.log(`✅ 已安装 ${installedSkills.length} 个技能:`);
    installedSkills.forEach(skill => console.log(`   - ${skill}`));
    
    console.log('');
    console.log('💡 使用方式:');
    console.log('   qwen> "/skills secure-coding-checklist"');
    console.log('   qwen> "实现登录功能，注意安全"');
    
    console.log('');
    console.log('🎉 安装完成！');
    console.log(`📚 查看文档：cat ${path.join(targetDir, '..', '..', 'README.md')}`);
    
  } catch (error) {
    console.error(`❌ 安装失败：${error.message}`);
    process.exit(1);
  }
}

install();
