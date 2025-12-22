#!/usr/bin/env node
/**
 * Simple Preview Placeholders
 * 
 * This script creates simple placeholder preview images using basic file operations.
 * It copies existing images or creates simple text-based placeholders.
 */

const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(__dirname, '..', 'data', 'projects');
const GIT_PROJECTS_DIR = path.join(__dirname, '..', 'git_projects');

function copyPreviewIfAvailable(projectName) {
  const projectDir = path.join(GIT_PROJECTS_DIR, projectName);
  const targetDir = path.join(PROJECTS_DIR, projectName);
  
  // Try to find any image in the project
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  
  function findImages(dir) {
    try {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          const result = findImages(fullPath);
          if (result) return result;
        } else if (imageExtensions.includes(path.extname(item).toLowerCase())) {
          return fullPath;
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read
    }
    return null;
  }
  
  const imagePath = findImages(projectDir);
  if (imagePath) {
    const previewPath = path.join(targetDir, 'preview' + path.extname(imagePath));
    fs.copyFileSync(imagePath, previewPath);
    console.log(`✅ Copied preview image for ${projectName}`);
    return true;
  }
  
  return false;
}

function createSimplePlaceholder(projectName) {
  const targetDir = path.join(PROJECTS_DIR, projectName);
  const previewPath = path.join(targetDir, 'preview.txt');
  
  const placeholderContent = `Preview Image Placeholder
================================
Project: ${projectName}

This project needs a preview image.
You can add one by placing an image named 'preview.jpg' or 'preview.png' in this directory.

Suggested images:
- Screenshots of the application
- Architecture diagrams
- Flowcharts
- Any relevant visual representation

File should be named: preview.jpg or preview.png
Recommended size: 800x450 pixels`;
  
  fs.writeFileSync(previewPath, placeholderContent);
  console.log(`ℹ️  Created placeholder file for ${projectName}`);
}

async function main() {
  try {
    console.log('🖼️  Creating preview images for projects...\n');
    
    // List of projects that might need previews
    const projects = [
      'Castle_Game',
      'ERP_System', 
      'Full-Album-Indexer',
      'Handy_Mon',
      'OrigamiMapper',
      'Retro_Games_Launcher',
      'Shell_Script_Utilities',
      'Shopping_List_Server',
      'Train_AI_On_Code',
      'Youtube_Opus_Downloader',
      'Zivilisation_1'
    ];
    
    let createdCount = 0;
    
    for (const projectName of projects) {
      const previewPath = path.join(PROJECTS_DIR, projectName, 'preview.png');
      const previewJpgPath = path.join(PROJECTS_DIR, projectName, 'preview.jpg');
      
      if (fs.existsSync(previewPath) || fs.existsSync(previewJpgPath)) {
        console.log(`✅ Preview already exists for ${projectName}`);
      } else {
        const copied = copyPreviewIfAvailable(projectName);
        if (!copied) {
          createSimplePlaceholder(projectName);
        }
        createdCount++;
      }
    }
    
    console.log(`\n🎉 Preview creation complete! ${createdCount} projects processed.`);
    console.log('\n📝 Next steps:');
    console.log('- Replace preview.txt files with actual images (preview.jpg/png)');
    console.log('- Use screenshots, diagrams, or other relevant visuals');
    console.log('- Recommended size: 800x450 pixels');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}