// Lightweight loader that supports loading documentation either from:
// - a local path within src/data or src/data/projects (bundled as an asset)
// - an external http(s) URL
// Supports both Markdown (.md) and AsciiDoc (.adoc, .asciidoc) formats
// Returns the HTML content or an empty string on failure.

import resumeData from '../data/resume.json';

// Calculate years of experience based on earliest start date in resume (work only)
export function calculateYearsOfExperience(): string {
  try {
    const dates: Date[] = [];
    if (resumeData.work) {
      for (const job of resumeData.work) {
        const j: any = job;
        const raw = j.start ?? j.startYear ?? j.from ?? null;
        if (raw) {
          const d = parseDateString(String(raw));
          if (d) dates.push(d);
        }
      }
    }
    if (dates.length === 0) return '0';
    const earliest = new Date(Math.min(...dates.map(d => d.getTime())));
    const now = new Date();
    const years = now.getFullYear() - earliest.getFullYear();
    const months = now.getMonth() - earliest.getMonth();
    if (months < 0) {
      return (years - 1).toString();
    }
    return years.toString();
  } catch (e) {
    console.error('Error calculating years of experience:', e);
    return '0';
  }
}

// Parse common date strings found in resume data: supports 'MM.YYYY', 'YYYY', 'MM/YYYY', and ISO strings
function parseDateString(s: string): Date | null {
  const trimmed = s.trim();
  if (!trimmed) return null;
  // Skip 'Present' or similar
  if (/present/i.test(trimmed)) return null;
  // MM.YYYY or M.YYYY or MM-YYYY or MM/YYYY
  const m1 = trimmed.match(/^(\d{1,2})[\.\/-](\d{4})$/);
  if (m1) {
    const month = parseInt(m1[1], 10);
    const year = parseInt(m1[2], 10);
    if (!Number.isNaN(month) && !Number.isNaN(year)) return new Date(year, Math.max(0, month - 1), 1);
  }
  // YYYY
  const m2 = trimmed.match(/^(\d{4})$/);
  if (m2) {
    const year = parseInt(m2[1], 10);
    if (!Number.isNaN(year)) return new Date(year, 0, 1);
  }
  // Fallback: try Date.parse
  const parsed = Date.parse(trimmed);
  if (!Number.isNaN(parsed)) return new Date(parsed);
  return null;
}

// Preprocess content to replace placeholders and custom tags
function preprocessContent(content: string): string {
  // Replace <YEARS_OF_EXPERIENCE /> (new XML-style tag - replace with actual number for non-Markdown processing)
  // For Markdown, this will be handled by the component system
  // For AsciiDoc, we replace it with the actual number
  content = content.replace(/<YEARS_OF_EXPERIENCE\s*\/>/g, calculateYearsOfExperience());
  return content;
}

const isExternal = (url: string) => /^https?:\/\//i.test(url);

// Import AsciiDoc utilities
import {
  convertAsciiDocToHtml,
  isAsciiDocFile,
  getFileExtension
} from './asciidocLoader';

// If a path points to something inside the public folder, normalize to a URL the browser can fetch.
function toPublicPath(url: string): string | undefined {
  // Absolute path starting with '/' is already a public URL in CRA
  if (url.startsWith('/')) return url;
  // Strip a possible leading './'
  const noDot = url.replace(/^\.\//, '');
  // If someone specified a path starting with 'public/', serve it from root
  if (noDot.startsWith('public/')) return `/${noDot.substring('public/'.length)}`;
  return undefined;
}

// Try Vite's glob import first. If not available (CRA), fall back to Webpack's require.context.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let viteMdModules: Record<string, any> | null = null;
try {
  // In Vite, this will be statically analyzed and replaced.
  // Note: two globs - one for raw content, one for asset URLs (if needed later)
  // @ts-ignore
  // Load ALL markdown and asciidoc files under src/data (including projects subfolders)
  const raw = import.meta.glob('../data/**/*.{md,adoc,asciidoc}', { query: '?raw', import: 'default', eager: true });
  viteMdModules = raw as Record<string, string>;
} catch {
  viteMdModules = null;
}

// Webpack fallback
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const require: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let reqCtx: any = null;
try {
  if (!viteMdModules && typeof require !== 'undefined' && require.context) {
    // Fallback for Webpack/CRA: search under data and its subfolders
    reqCtx = require.context('../data', true, /\.(md|adoc|asciidoc)$/);
  }
} catch {
  reqCtx = null;
}

function resolveLocalKey(markdownUrl: string): string | null {
  // If neither Vite nor Webpack contexts available, we can't resolve a bundled asset
  if (!viteMdModules && !reqCtx) return null;
  // Normalize to a suffix path under data/**
  // Accept inputs like:
  // - "/src/data/projects/CAE/README.md"
  // - "src/data/projects/CAE/README.md"
  // - "./src/data/ABOUT_ME.md"
  // - "data/RESUME.md"
  // - "ABOUT_ME.md" (will be interpreted as data/ABOUT_ME.md)
  let key = markdownUrl.replace(/^\.\//, '').replace(/^\//, '');
  key = key.replace(/^src\//i, '').replace(/^\.\/src\//i, '');
  if (!/^(data)\//i.test(key)) {
    // If path doesn't start with data/, assume it refers to a file in data/
    key = `data/${key}`;
  }
  if (!key.toLowerCase().match(/\.(md|adoc|asciidoc)$/)) return null;

  if (viteMdModules) {
    const keys = Object.keys(viteMdModules);
    // Attempt exact matches against several common prefixes
    const candidates = [
      key,
      `./${key}`,
      `/src/${key}`,
      `/src/${key}`.replace(/\\/g, '/'),
    ];
    for (const cand of candidates) {
      const exact = keys.find((x) => x.toLowerCase() === cand.toLowerCase());
      if (exact) return exact;
    }
    // Fallback: suffix search
    const found = keys.find((k) => k.toLowerCase().endsWith(key.toLowerCase()));
    return found ?? null;
  }

  if (reqCtx) {
    const available = reqCtx.keys();
    const direct = available.find((k: string) => k.toLowerCase() === `./${key}`.toLowerCase());
    if (direct) return direct;
    const found = available.find((k: string) => k.toLowerCase().endsWith(key.toLowerCase()));
    return found ?? null;
  }

  return null;
}

export function getMarkdownAssetUrl(markdownUrl?: string): string | undefined {
  if (!markdownUrl) return undefined;
  if (isExternal(markdownUrl)) return markdownUrl;
  const key = resolveLocalKey(markdownUrl);
  if (key) {
    if (viteMdModules && viteMdModules[key]) {
      // For Vite raw modules we already have the content; return undefined so loadMarkdown uses content path
      // Here, we can't produce a URL; loadMarkdown will use the raw content path.
      return undefined;
    }
    if (reqCtx) {
      try {
        const assetUrl: string = reqCtx(key);
        return assetUrl;
      } catch {
        // fallthrough
      }
    }
  }
  // Fallback: if it's a public path, allow consumers to link directly
  const pub = toPublicPath(markdownUrl);
  return pub;
}

export async function loadDocumentation(docUrl?: string): Promise<string> {
  if (!docUrl) return '';
  try {
    const fileExtension = getFileExtension(docUrl);
    const isAdoc = isAsciiDocFile(docUrl);
    
    if (isExternal(docUrl)) {
      const res = await fetch(docUrl);
      if (!res.ok) return '';
      const ct = res.headers.get('content-type') || '';
      // Only treat as documentation if not HTML
      if (/text\/html/i.test(ct)) {
        return '';
      }
      const content = await res.text();
      
      // Convert to HTML based on file type
      if (isAdoc || fileExtension === 'adoc' || fileExtension === 'asciidoc') {
        // Preprocess placeholders, then convert to HTML
        let html = convertAsciiDocToHtml(preprocessContent(content));
        // AsciiDoctor may escape custom tags; ensure <skill> tags remain as raw HTML for React to consume
        html = html.replace(/&lt;skill&gt;/g, '<skill>').replace(/&lt;\/skill&gt;/g, '</skill>');

        // Replace custom <github> and <website> tags produced by the AsciiDoc conversion
        // with concrete <a> anchors that match the IconButton styling (ensures consistent font size).
        const parseAttrs = (attrStr: string) => {
          const attrs: Record<string, string> = {};
          attrStr.replace(/([a-zA-Z0-9\-_:]+)\s*=\s*"([^"]*)"/g, (_m, k, v) => {
            attrs[k] = v;
            return '';
          });
          return attrs;
        };

        const iconSvg = {
          github: '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="flex:0 0 auto"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/></svg>',
          website: '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="flex:0 0 auto"><path d="M8 0a8 8 0 100 16A8 8 0 008 0zm4.93 6H11a12.3 12.3 0 00-.56-2.05A6 6 0 0112.93 6zM8 1.06c.83 1.1 1.42 2.53 1.8 4H6.2c.38-1.47.97-2.9 1.8-4zM4.24 6H2.07A6 6 0 014.24 3.95 12.3 12.3 0 004.24 6zM2.07 10h2.17c-.18.69-.28 1.42-.29 2.05A6 6 0 012.07 10zm3.02 2.05c.38-1.47.97-2.9 1.8-4 0 .01 0 .02 0 .03V12.94a8.01 8.01 0 01-1.8-0.86zM8 14.94V11.97c.01-.01.01-.02.01-.03.83 1.1 1.42 2.53 1.8 4A8.01 8.01 0 018 14.94zM9.76 10H6.24c.39-1.53 1-2.96 1.76-4 .76 1.04 1.37 2.47 1.76 4zM11.73 12.05c-.01-.63-.11-1.36-.29-2.05h2.17a6 6 0 01-1.88 2.05z"/></svg>'
        };

        const buildAnchor = (kind: 'github'|'website', attrs: Record<string,string>, label: string) => {
          const href = attrs.href || attrs['data-href'] || '#';
          const target = attrs.target || '_blank';
          const rel = attrs.rel || 'noopener noreferrer';
          const size = attrs.size || 'md';
          const sizeClass = size === 'lg' ? 'px-4 py-2 text-base' : size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';
          const classes = `not-prose inline-flex items-center gap-2 rounded-md border font-semibold shadow-sm no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 bg-[var(--color-surface)] text-[var(--color-primary)] hover:bg-[var(--color-surface-solid)] ${sizeClass}`;
          const icon = iconSvg[kind] || '';
          // Build anchor HTML with icon and label
          return `<a href="${href}" class="${classes}" target="${target}" rel="${rel}">${icon}<span class="leading-none">${label}</span></a>`;
        };

        // Replace <github ...>...</github>
        html = html.replace(/<github([^>]*)>([\s\S]*?)<\/github>/gi, (_m, attrStr, inner) => {
          const attrs = parseAttrs(attrStr);
          return buildAnchor('github', attrs, inner.trim());
        });

        // Replace <website ...>...</website>
        html = html.replace(/<website([^>]*)>([\s\S]*?)<\/website>/gi, (_m, attrStr, inner) => {
          const attrs = parseAttrs(attrStr);
          return buildAnchor('website', attrs, inner.trim());
        });

        return html;
      }
      // For markdown, return as-is (will be processed by react-markdown)
      return preprocessContent(content);
    }

    const key = resolveLocalKey(docUrl);
    let content = '';
    
    if (viteMdModules && key && viteMdModules[key]) {
      // Vite eager raw content is already a string
      content = String(viteMdModules[key]);
    } else {
      const assetUrl = getMarkdownAssetUrl(docUrl);
      if (assetUrl) {
        const res = await fetch(assetUrl);
        if (!res.ok) return '';
        content = await res.text();
      } else {
        // Final fallback: attempt fetching a normalized public path
        const pub = toPublicPath(docUrl);
        if (pub) {
          const res = await fetch(pub);
          if (!res.ok) return '';
          content = await res.text();
        }
      }
    }
    
    // Convert to HTML based on file type
    if (isAdoc || fileExtension === 'adoc' || fileExtension === 'asciidoc') {
      const html = convertAsciiDocToHtml(preprocessContent(content));
      return html.replace(/&lt;skill&gt;/g, '<skill>').replace(/&lt;\/skill&gt;/g, '</skill>');
    }
    
    // For markdown, return as-is (will be processed by react-markdown)
    return preprocessContent(content);

  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Failed to load documentation:', e);
    return '';
  }
}

// Backward compatibility: alias loadMarkdown to loadDocumentation
export const loadMarkdown = loadDocumentation;

export default loadMarkdown;
