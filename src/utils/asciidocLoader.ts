declare module 'asciidoctor';

/**
 * AsciiDoc Loader
 *
 * Uses the asciidoctor library for proper AsciiDoc to HTML conversion.
 * Supports full AsciiDoc syntax for project documentation.
 */

import AsciiDoctor from 'asciidoctor';

const asciidoctor = AsciiDoctor();

export function convertAsciiDocToHtml(adocContent: string): string {
  if (!adocContent || typeof adocContent !== 'string') {
    return '';
  }

  try {
    // Convert AsciiDoc to HTML using asciidoctor
    const html = asciidoctor.convert(adocContent, {
      // Basic options for HTML5 output
      attributes: {
        'showtitle': false,  // Don't show document title as it's already shown in the page header
        'toc': false,       // TOC is handled by the page layout
        'sectanchors': false,
        'sectlinks': false,
        'hardbreaks': false,
      },
      // Safe mode for client-side conversion
      safe: 'safe',
      // HTML5 output
      backend: 'html5',
    });

    return html as string;
  } catch (error) {
    console.warn('Error converting AsciiDoc:', error);
    return `<div class="error">Error converting AsciiDoc content</div>`;
  }
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