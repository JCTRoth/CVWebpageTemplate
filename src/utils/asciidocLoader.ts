/**
 * AsciiDoc Loader
 * 
 * Lightweight AsciiDoc to HTML converter for CV webpage.
 * Supports basic AsciiDoc syntax for project documentation.
 */

// Basic AsciiDoc to HTML conversion rules
const ADOC_RULES = [
  // Headers
  { pattern: /^= (.+)$/gm, replacement: '<h1>$1</h1>' },
  { pattern: /^== (.+)$/gm, replacement: '<h2>$1</h2>' },
  { pattern: /^=== (.+)$/gm, replacement: '<h3>$1</h3>' },
  { pattern: /^==== (.+)$/gm, replacement: '<h4>$1</h4>' },
  
  // Bold and italic
  { pattern: /\*\*(.+?)\*\*/g, replacement: '<strong>$1</strong>' },
  { pattern: /\*(.+?)\*/g, replacement: '<em>$1</em>' },
  
  // Monospace
  { pattern: /`(.+?)`/g, replacement: '<code>$1</code>' },
  
  // Links
  { pattern: /link:(.+?)\[(.+?)\]/g, replacement: '<a href="$1">$2</a>' },
  
  // Images
  { pattern: /image::(.+?)\[(.+?)\]/g, replacement: '<img src="$1" alt="$2" />' },
  
  // Unordered lists
  { pattern: /^\* (.+)$/gm, replacement: '<li>$1</li>' },
  
  // Paragraphs (simple approach)
  { pattern: /^(.+)$/gm, replacement: (match, p1) => {
    if (!match.trim().startsWith('<') && !match.trim().startsWith('*')) {
      return `<p>${p1}</p>`;
    }
    return match;
  }}
];

export function convertAsciiDocToHtml(adocContent: string): string {
  if (!adocContent || typeof adocContent !== 'string') {
    return '';
  }
  
  let html = adocContent;
  
  // Apply all conversion rules
  ADOC_RULES.forEach(rule => {
    html = html.replace(rule.pattern, rule.replacement);
  });
  
  // Wrap unordered list items in <ul> tags
  html = html.replace(/<li>(.*?)<\/li>/g, (match) => {
    if (!html.includes('<ul>')) {
      return `<ul>${match}</ul>`;
    }
    return match;
  });
  
  // Basic HTML structure
  return `<div class="adoc-content">${html}</div>`;
}

export function isAsciiDocFile(filename: string): boolean {
  return filename.toLowerCase().endsWith('.adoc') || filename.toLowerCase().endsWith('.asciidoc');
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export default {
  convertAsciiDocToHtml,
  isAsciiDocFile,
  getFileExtension
};