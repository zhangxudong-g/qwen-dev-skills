#!/usr/bin/env node
/**
 * postinstall 脚本
 * 当通过 npm install 安装时自动运行
 */

const fs = require('fs');
const path = require('path');

const PACKAGE_NAME = 'qwen-dev-skills';
const VERSION = '1.0.0';

function getQwenSkillsDir() {
  // 检查是否在项目中使用（node_modules 中）
  const currentDir = process.cwd();
  
  // 尝试找到项目根目录（有 .qwen 或 package.json 的地方）
  let projectRoot = currentDir;
  while (projectRoot !== path.dirname(projectRoot)) {
    if (fs.existsSync(path.join(projectRoot, '.qwen')) || 
        fs.existsSync(path.join(projectRoot, 'package.json'))) {
      break;
    }
    projectRoot = path.dirname(projectRoot);
  }
  
  // 如果在项目中使用，安装到项目 .qwen/skills
  const qwenDir = path.join(projectRoot, '.qwen', 'skills', PACKAGE_NAME);
  return qwenDir;
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    return;
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

// 只在直接安装此包时运行，不是作为依赖
if (process.env.npm_package_name === PACKAGE_NAME || 
    process.argv[1]?.includes('qwen-dev-skills')) {
  
  const targetDir = getQwenSkillsDir();
  const packageDir = path.resolve(__dirname, '..');
  const skillsSourceDir = path.join(packageDir, 'skills');
  
  console.log(`\n🚀 自动安装 ${PACKAGE_NAME} v${VERSION}`);
  console.log(`📁 安装目录：${targetDir}`);
  
  try {
    copyDir(skillsSourceDir, targetDir);
    fs.writeFileSync(path.join(targetDir, '.version'), VERSION);
    console.log(`✅ 技能已自动安装到 ${targetDir}`);
    console.log('💡 在 Qwen Code 中使用：/skills <skill-name>');
  } catch (error) {
    // 静默失败，不影响主安装
    console.log(`⚠️  自动安装失败，请手动运行：npx qwen-dev-skills`);
  }
}
