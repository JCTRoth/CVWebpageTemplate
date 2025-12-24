#!/usr/bin/env node
/**
 * Generate Preview Placeholders
 * 
 * This script creates simple placeholder preview images for projects that don't have screenshots.
 */

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const PROJECTS_DIR = path.join(__dirname, '..', 'data', 'projects');
const PLACEHOLDER_COLORS = [
  '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6',
  '#1abc9c', '#34495e', '#e67e22', '#16a085', '#27ae60'
];

async function generatePlaceholder(projectName, width = 800, height = 450) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Use project name to determine color
  const colorIndex = projectName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % PLACEHOLDER_COLORS.length;
  const bgColor = PLACEHOLDER_COLORS[colorIndex];
  
  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  
  // Text
  ctx.fillStyle = 'white';
  ctx.font = 'bold 30px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Split project name into lines if too long
  const maxWidth = width - 40;
  const words = projectName.replace(/_/g, ' ').split(' ');
  let lines = [];
  let currentLine = words[0];
  
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  
  // Draw lines
  const lineHeight = 40;
  const startY = height / 2 - (lines.length * lineHeight) / 2;
  
  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + index * lineHeight);
  });
  
  // Save image
  const projectDir = path.join(PROJECTS_DIR, projectName);
  const previewPath = path.join(projectDir, 'preview.png');
  
  const out = fs.createWriteStream(previewPath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  
  await new Promise((resolve) => out.on('finish', resolve));
  
  console.log(`Created placeholder preview for ${projectName}`);
}

async function main() {
  try {
    console.log('Generating preview placeholders...\n');
    
    // Projects that need placeholders
    const projectsWithoutPreviews = [
      'ERP_System',
      'Shell_Script_Utilities',
      'Youtube_Opus_Downloader'
    ];
    
    for (const projectName of projectsWithoutPreviews) {
      const previewPath = path.join(PROJECTS_DIR, projectName, 'preview.png');
      
      if (!fs.existsSync(previewPath)) {
        await generatePlaceholder(projectName);
      } else {
      console.log(`Preview already exists for ${projectName}`);
      }
    }
    
    console.log('\nPreview placeholder generation complete!');
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}