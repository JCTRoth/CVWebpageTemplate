// Lightweight loader that supports loading documentation either from:
// - a local path within src/data or src/data/projects (bundled as an asset)
// - an external http(s) URL
// Supports both Markdown (.md) and AsciiDoc (.adoc, .asciidoc) formats
// Returns the HTML content or an empty string on failure.

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
        return convertAsciiDocToHtml(content);
      }
      // For markdown, return as-is (will be processed by react-markdown)
      return content;
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
      return convertAsciiDocToHtml(content);
    }
    
    // For markdown, return as-is (will be processed by react-markdown)
    return content;

  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Failed to load documentation:', e);
    return '';
  }
}

// Backward compatibility: alias loadMarkdown to loadDocumentation
export const loadMarkdown = loadDocumentation;

export default loadMarkdown;
