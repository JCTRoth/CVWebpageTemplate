/**
import * as React from 'react';
 * Image Viewer Renderer Extensions
 * 
 * These utilities extend markdown and asciidoc renderers to automatically
 * add the 'image-viewer-trigger' class to images for lightbox functionality.
 */

import * as React from 'react';

/**
 * Image Viewer Renderer Extensions
 *
 * These utilities extend markdown and asciidoc renderers to automatically
 * add the 'image-viewer-trigger' class to images for lightbox functionality.
 */

export const VIEWER_CLASS = 'image-viewer-trigger';

/**
 * Extends markdown-it to add image viewer class
 * Usage:
 * import md from 'markdown-it';
 * import { extendMarkdownItWithImageViewer } from '@/utils/imageViewerRenderers';
 * 
 * const markdown = md();
 * extendMarkdownItWithImageViewer(markdown);
 */
export function extendMarkdownItWithImageViewer(md: any) {
  const defaultRender = md.renderer.rules.image || ((tokens: any, idx: number) => {
    return md.renderer.renderToken(tokens, idx, {});
  });

  md.renderer.rules.image = function (tokens: any, idx: number, _options: any, _env: any, self: any) {
    const token = tokens[idx];
    const srcIndex = token.attrIndex('src');
    const altIndex = token.attrIndex('alt');
    const titleIndex = token.attrIndex('title');

    // Add viewer class
    const classIndex = token.attrIndex('class');
    if (classIndex >= 0) {
      token.attrSet('class', `${token.attrs[classIndex][1]} ${VIEWER_CLASS}`);
    } else {
      token.attrSet('class', VIEWER_CLASS);
    }

    // Store title/caption in data attributes
    if (titleIndex >= 0) {
      token.attrSet('data-title', token.attrs[titleIndex][1]);
    }
    if (altIndex >= 0) {
      token.attrSet('data-caption', token.attrs[altIndex][1]);
    }

    return defaultRender(tokens, idx, _options, _env, self);
  };

  return md;
}

/**
 * HTML post-processor for markdown output
 * If you're using a markdown parser that returns HTML string,
 * use this to add viewer class to all img tags
 * 
 * Usage:
 * const html = markdownParser.parse(content);
 * const processedHtml = addImageViewerClassToHtml(html);
 */
export function addImageViewerClassToHtml(html: string): string {
  return html.replace(/<img\s+(?![^>]*class="[^"]*image-viewer-trigger)/g, `<img class="${VIEWER_CLASS}" `);
}

/**
 * Post-process HTML to ensure image viewer class is present
 * This is a safe fallback that won't duplicate classes
 */
export function ensureImageViewerClass(element: Element): void {
  const images = element.querySelectorAll('img');
  images.forEach((img) => {
    // Skip images that should not have the viewer
    if (shouldSkipImageViewer(img)) {
      return;
    }

    if (!img.classList.contains(VIEWER_CLASS)) {
      img.classList.add(VIEWER_CLASS);
      img.style.cursor = 'pointer';
    }
  });
}

/**
 * Determines if an image should be excluded from the image viewer
 */
function shouldSkipImageViewer(img: HTMLImageElement): boolean {
  // Skip images in navigation elements
  if (img.closest('nav, header, aside, .sidebar, .navigation, .navbar, .menu')) {
    return true;
  }

  // Skip images with classes that indicate they're UI elements
  const skipClasses = ['logo', 'icon', 'avatar', 'profile', 'favicon', 'object-cover', 'object-contain', 'brand', 'nav-icon', 'menu-icon'];
  for (const className of skipClasses) {
    if (img.classList.contains(className)) {
      return true;
    }
  }

  // Skip very small images (likely icons)
  if (img.naturalWidth > 0 && img.naturalWidth < 50) {
    return true;
  }
  if (img.naturalHeight > 0 && img.naturalHeight < 50) {
    return true;
  }

  // Skip images with data attributes indicating they're not content images
  if (img.hasAttribute('data-no-viewer') || img.getAttribute('data-viewer') === 'false') {
    return true;
  }

  return false;
}

/**
 * React component wrapper to ensure image viewer class on mounted/updated content
 * Usage in a React component:
 * 
 * const ref = useRef<HTMLDivElement>(null);
 * useEffect(() => {
 *   if (ref.current) {
 *     ensureImageViewerClass(ref.current);
 *   }
 * }, [content]);
 * 
 * <div ref={ref} dangerouslySetInnerHTML={{ __html: markdownHtml }} />
 */
export function useEnsureImageViewerClass(ref: React.RefObject<HTMLElement>) {
  React.useEffect(() => {
    if (ref.current) {
      ensureImageViewerClass(ref.current);
    }
  }, [ref]);
}

export default {
  VIEWER_CLASS,
  extendMarkdownItWithImageViewer,
  addImageViewerClassToHtml,
  ensureImageViewerClass,
  useEnsureImageViewerClass,
};
