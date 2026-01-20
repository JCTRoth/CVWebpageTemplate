import { useState, useEffect, useRef } from 'react';
import { ImageViewerImage } from './ImageViewer';

interface UseImageViewerReturn {
  isOpen: boolean;
  images: ImageViewerImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function useImageViewer(): UseImageViewerReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<ImageViewerImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const clickedImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Use event delegation for better reliability
    const handleDocumentClick = (e: Event) => {
      const target = e.target as HTMLElement;
      
      // Check if clicked element is an img with the trigger class
      if (target.tagName === 'IMG' && target.classList.contains('image-viewer-trigger')) {
        const img = target as HTMLImageElement;
        clickedImageRef.current = img;

        // Get all images in order
        const allImages = Array.from(document.querySelectorAll('img.image-viewer-trigger')).map(
          (img) => ({
            src: (img as HTMLImageElement).src,
            alt: (img as HTMLImageElement).alt,
            caption: (img as HTMLImageElement).getAttribute('data-caption'),
            title: (img as HTMLImageElement).getAttribute('data-title'),
          } as ImageViewerImage)
        );

        // Find current image index
        const index = allImages.findIndex((image) => image.src === img.src);

        setImages(allImages);
        setCurrentIndex(index >= 0 ? index : 0);
        setIsOpen(true);
      }
    };

    // Attach event listener to document
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const onClose = () => {
    setIsOpen(false);
    // Return focus to the clicked image if it exists
    if (clickedImageRef.current) {
      clickedImageRef.current.focus();
    }
  };

  const onNavigate = (index: number) => {
    setCurrentIndex(index);
  };

  return {
    isOpen,
    images,
    currentIndex,
    onClose,
    onNavigate,
  };
}
