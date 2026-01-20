import { useState, useEffect, useCallback } from 'react';

interface ImageViewerImage {
  src: string;
  alt?: string;
  caption?: string;
  title?: string;
}

const VIEWER_CLASS = 'image-viewer-trigger';

export const useImageViewer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<ImageViewerImage[]>([]);

  // Auto-detect images with viewer class and set up click handlers
  useEffect(() => {
    const handleImageClick = (e: Event) => {
      const target = e.target as HTMLImageElement;
      
      // Find all images with viewer class in the document
      const allImages = Array.from(
        document.querySelectorAll(`img.${VIEWER_CLASS}`)
      ) as HTMLImageElement[];

      // Convert to ImageViewerImage array
      const viewerImages: ImageViewerImage[] = allImages.map((img) => ({
        src: img.src,
        alt: img.alt,
        caption: img.dataset.caption,
        title: img.dataset.title || img.title,
      }));

      setImages(viewerImages);

      // Find the clicked image index
      const clickedIndex = allImages.indexOf(target);
      setCurrentIndex(clickedIndex >= 0 ? clickedIndex : 0);
      setIsOpen(true);
    };

    // Attach click listeners to all images with viewer class
    const allImages = document.querySelectorAll(`img.${VIEWER_CLASS}`);
    allImages.forEach((img) => {
      (img as HTMLImageElement).addEventListener('click', handleImageClick as EventListener);
      (img as HTMLImageElement).style.cursor = 'pointer';
    });

    return () => {
      allImages.forEach((img) => {
        (img as HTMLImageElement).removeEventListener('click', handleImageClick as EventListener);
      });
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleNavigate = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return {
    isOpen,
    images,
    currentIndex,
    onClose: handleClose,
    onNavigate: handleNavigate,
  };
};

export default useImageViewer;
