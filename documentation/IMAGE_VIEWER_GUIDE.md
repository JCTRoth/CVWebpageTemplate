# Image Viewer Component Documentation

## Overview

The Image Viewer is a production-ready React component that provides an elegant, accessible modal for viewing images with advanced features like zoom, pan, keyboard navigation, and touch gestures.

## Features

- **Zoom Control**: Mouse wheel, pinch gesture, and zoom buttons (1-5x magnification)
- **Pan**: Click and drag to move zoomed images
- **Keyboard Navigation**: Arrow keys to navigate gallery, +/- to zoom, ESC to close
- **Touch Gestures**: Pinch to zoom, swipe (via arrow key support)
- **Responsive Design**: Optimized for desktop, tablet, and mobile screens
- **Accessibility**: Full ARIA labels, focus management, keyboard support
- **Captions**: Optional titles and descriptions for images
- **Gallery Navigation**: Previous/Next buttons with counter display
- **Auto-Detection**: Automatically detects images with `image-viewer-trigger` class

## Installation & Setup

### CVWebpageTemplate

The ImageViewer is already integrated via the `ImageViewerProvider` wrapper in `src/App.tsx`. No additional setup needed.

### ERP_System

The ImageViewer is integrated in `/apps/frontend/src/main.tsx` via the `ImageViewerProvider` wrapper. No additional setup needed.

## Usage

### Basic Usage (Automatic via CSS Class)

Simply add the `image-viewer-trigger` class to any image element:

```html
<img src="photo.jpg" alt="My photo" class="image-viewer-trigger" />
```

Clicking the image opens the viewer. If multiple images have this class, they form a gallery.

### Markdown Integration

For markdown-rendered content, images are automatically tagged. If you need to manually apply the viewer class:

```tsx
import { ensureImageViewerClass } from '@/utils/imageViewerRenderers';
import { useRef, useEffect } from 'react';

export function MarkdownPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (contentRef.current) {
      ensureImageViewerClass(contentRef.current);
    }
  }, []);
  
  return <div ref={contentRef}>{/* rendered markdown */}</div>;
}
```

### Manual Component Usage

Use the `ImageViewer` component directly for custom image galleries:

```tsx
import { ImageViewer, type ImageViewerImage } from '@/components/ImageViewer/ImageViewer';
import { useState } from 'react';

export function GalleryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images: ImageViewerImage[] = [
    {
      src: '/photo1.jpg',
      alt: 'Photo 1',
      title: 'First Photo',
      caption: 'This is the first photo in the gallery',
    },
    {
      src: '/photo2.jpg',
      alt: 'Photo 2',
      caption: 'Second photo',
    },
  ];
  
  return (
    <>
      <button onClick={() => { setIsOpen(true); setCurrentIndex(0); }}>
        View Gallery
      </button>
      
      <ImageViewer
        isOpen={isOpen}
        images={images}
        initialIndex={currentIndex}
        onClose={() => setIsOpen(false)}
        onNavigate={setCurrentIndex}
      />
    </>
  );
}
```

### Using the Hook

For advanced use cases, use the `useImageViewer` hook:

```tsx
import { useImageViewer } from '@/components/ImageViewer/useImageViewer';
import { ImageViewer } from '@/components/ImageViewer/ImageViewer';

export function CustomGallery() {
  const { isOpen, images, currentIndex, onClose, onNavigate } = useImageViewer();
  
  return (
    <ImageViewer
      isOpen={isOpen}
      images={images}
      initialIndex={currentIndex}
      onClose={onClose}
      onNavigate={onNavigate}
    />
  );
}
```

## Component Props

### ImageViewer Props

```typescript
interface ImageViewerProps {
  isOpen: boolean;           // Whether the viewer is open
  images: ImageViewerImage[]; // Array of images to display
  initialIndex?: number;      // Starting image index (default: 0)
  onClose: () => void;        // Callback when viewer closes
  onNavigate?: (index: number) => void; // Callback when navigating
}
```

### ImageViewerImage Interface

```typescript
interface ImageViewerImage {
  src: string;      // Image source URL (required)
  alt?: string;     // Alt text for accessibility
  caption?: string; // Caption shown below image
  title?: string;   // Title shown above caption
}
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `ESC` | Close viewer |
| `←` / `→` | Previous / Next image |
| `+` / `-` | Zoom in / out |

## Renderer Integration

### Markdown Integration

```tsx
import { extendMarkdownItWithImageViewer } from '@/utils/imageViewerRenderers';

// Apply to markdown-it instance
extendMarkdownItWithImageViewer(markdownIt);
```

### Post-Processing HTML

```tsx
import { addImageViewerClassToHtml } from '@/utils/imageViewerRenderers';

const html = markdownIt.render(markdown);
const processedHtml = addImageViewerClassToHtml(html);
```

### React Hook for DOM Elements

```tsx
import { useEnsureImageViewerClass } from '@/utils/imageViewerRenderers';
import { useRef } from 'react';

export function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  useEnsureImageViewerClass(ref);
  
  return <div ref={ref}>{/* content with images */}</div>;
}
```

## Styling & Customization

The ImageViewer uses CSS Modules for scoped styling. To customize:

1. Edit `ImageViewer.module.css` directly
2. Or extend by passing additional classes via CSS class modifications

Key CSS classes:
- `.overlay` - Dark background overlay
- `.container` - Main viewer container
- `.image` - Image element
- `.controls` - Zoom control toolbar
- `.navButton` - Navigation arrow buttons
- `.closeButton` - Close button
- `.caption` - Caption container
- `.counter` - Image counter (X / Y)

## Accessibility Features

- **ARIA Labels**: All buttons have descriptive `aria-label` attributes
- **Keyboard Navigation**: Full keyboard support via shortcuts
- **Focus Management**: Focus returns to clicked image on close
- **Screen Readers**: Semantic HTML with proper roles
- **Touch Accessible**: Large touch targets on mobile (2rem minimum)

## Performance Considerations

- Uses CSS transforms for smooth animations
- Debounces zoom and pan operations
- Lazy loads images only when viewer opens
- Minimal re-renders via React hooks
- Responsive breakpoints (768px, 480px) for mobile optimization

## Browser Support

- Chrome/Edge: Latest versions
- Firefox: Latest versions
- Safari: Latest versions (including iOS Safari)
- Mobile browsers: iOS Safari, Chrome Mobile, Firefox Mobile

## Examples

### Gallery with Mixed Media

```tsx
const galleryImages: ImageViewerImage[] = [
  {
    src: '/images/screenshot1.png',
    title: 'Application Overview',
    caption: 'Main dashboard showing key metrics',
  },
  {
    src: '/images/diagram.svg',
    title: 'Architecture Diagram',
    caption: 'System components and their relationships',
  },
  {
    src: '/images/results.jpg',
    title: 'Results',
    caption: 'Final output visualization',
  },
];
```

### Documentation Page with Images

```tsx
export function DocPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  useEnsureImageViewerClass(contentRef);
  
  return (
    <div ref={contentRef}>
      <h1>Product Guide</h1>
      <img src="/guide.png" alt="Usage guide" />
      <p>Follow the steps shown above...</p>
    </div>
  );
}
```

## Troubleshooting

### Images not opening viewer
- Ensure `image-viewer-trigger` class is added to img elements
- Check that ImageViewerProvider wraps the app
- Verify images have proper `src` attributes

### Zoom/pan not working
- Make sure you're using a supported browser
- Try disabling browser extensions
- Check console for JavaScript errors

### Images appear blurry when zoomed
- Use high-resolution source images (300+ DPI)
- Avoid excessive zoom levels (max 5x)
- Check image optimization settings

## Architecture

The component uses a Provider pattern for seamless integration:

```
ImageViewerProvider
  ↓ wraps entire app
  ↓ provides ImageViewer modal + useImageViewer hook
  ↓ auto-detects images with 'image-viewer-trigger' class
  ↓ renders modally above other content
```

This ensures the viewer works globally without prop drilling.
