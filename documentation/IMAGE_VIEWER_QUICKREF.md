# Image Viewer Quick Reference

## Quick Start

### 1. Mark Images
Add class to any image:
```html
<img src="photo.jpg" class="image-viewer-trigger" />
```

### 2. Done!
Clicking opens the viewer. That's it!

---

## Keyboard Controls

| Key | Action |
|-----|--------|
| `ESC` | Close |
| `←` / `→` | Navigate |
| `+` / `-` | Zoom |

---

## Mouse Controls

| Action | Result |
|--------|--------|
| Click image | Open viewer |
| Scroll wheel | Zoom |
| Drag (zoomed) | Pan |
| Click previous/next | Navigate |
| Click close button | Close |

---

## Touch Controls

| Gesture | Result |
|---------|--------|
| Tap image | Open viewer |
| Pinch | Zoom |
| Tap previous/next | Navigate |
| Tap close button | Close |

---

## Component API

### React Component Usage
```tsx
import { ImageViewer } from '@/components/ImageViewer/ImageViewer';

<ImageViewer
  isOpen={isOpen}
  images={images}
  onClose={onClose}
  onNavigate={setCurrentIndex}
/>
```

### Hook Usage
```tsx
import { useImageViewer } from '@/components/ImageViewer/useImageViewer';

const { isOpen, images, currentIndex, onClose, onNavigate } = useImageViewer();
```

### Provider (Already in App!)
```tsx
// Already wraps the app
<ImageViewerProvider>
  <App />
</ImageViewerProvider>
```

---

## Image Data Structure

```typescript
interface ImageViewerImage {
  src: string;      // Required: image URL
  alt?: string;     // Optional: alt text
  caption?: string; // Optional: caption below image
  title?: string;   // Optional: title above caption
}
```

Example:
```tsx
const images: ImageViewerImage[] = [
  {
    src: '/photo1.jpg',
    alt: 'Photo 1',
    title: 'My Title',
    caption: 'Photo taken in 2024'
  },
  // more images...
];
```

---

## Renderer Integration

### Markdown Images
Images in markdown are auto-tagged (no setup needed).

### Manual HTML Processing
```tsx
import { addImageViewerClassToHtml } from '@/utils/imageViewerRenderers';

const html = markdownIt.render(md);
const processed = addImageViewerClassToHtml(html); // adds class
```

### DOM Elements
```tsx
import { useEnsureImageViewerClass } from '@/utils/imageViewerRenderers';

export function Page() {
  const ref = useRef<HTMLDivElement>(null);
  useEnsureImageViewerClass(ref);
  
  return <div ref={ref}>{/* content */}</div>;
}
```

---

## CSS Customization

Main CSS file: `ImageViewer.module.css`

Key classes to override:
- `.overlay` - Dark background
- `.controls` - Zoom toolbar
- `.image` - Image element
- `.navButton` - Navigation arrows
- `.closeButton` - Close button

---

## Troubleshooting

**Images not opening?**
- Ensure `image-viewer-trigger` class exists
- Check ImageViewerProvider wraps the app

**Zoom not working?**
- Make sure you're using a supported browser
- Check console for errors

**Blurry images?**
- Use higher resolution source images (300+ DPI)
- Don't zoom beyond 5x

---

## Integration Status

✅ **CVWebpageTemplate** - Ready to use
✅ **ERP_System Frontend** - Ready to use

Both projects have the viewer integrated and building successfully.

---

## Full Documentation

See [IMAGE_VIEWER_GUIDE.md](./IMAGE_VIEWER_GUIDE.md) for comprehensive documentation.

See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for technical details.
