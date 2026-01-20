import React, { useEffect } from 'react';
import ImageViewer from './ImageViewer';
import { useImageViewer } from './useImageViewer';
import { ensureImageViewerClass } from '../../utils/imageViewerRenderers';

/**
 * ImageViewerProvider
 * 
 * Integrate this component at the root of your app to enable image viewer functionality.
 * Usage:
 * 
 * import ImageViewerProvider from '@/components/ImageViewer/ImageViewerProvider';
 * 
 * <ImageViewerProvider>
 *   <YourApp />
 * </ImageViewerProvider>
 * 
 * Then add the 'image-viewer-trigger' class to any image:
 * <img src="..." alt="..." class="image-viewer-trigger" />
 * 
 * For markdown/asciidoc, this is done automatically by the renderers.
 */
export const ImageViewerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen, images, currentIndex, onClose, onNavigate } = useImageViewer();

  useEffect(() => {
    // Add image-viewer-trigger class to all images on the page at mount time
    ensureImageViewerClass(document.documentElement);

    // Use MutationObserver to watch for new images being added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            ensureImageViewerClass(node as Element);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {children}
      <ImageViewer
        isOpen={isOpen}
        images={images}
        initialIndex={currentIndex}
        onClose={onClose}
        onNavigate={onNavigate}
      />
    </>
  );
};

export default ImageViewerProvider;
