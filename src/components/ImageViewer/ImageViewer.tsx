import React, { useState, useEffect, useRef, useCallback } from 'react';
import { XMarkIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import styles from './ImageViewer.module.css';

export interface ImageViewerImage {
  src: string;
  alt?: string;
  caption?: string;
  title?: string;
}

interface ImageViewerProps {
  isOpen: boolean;
  images: ImageViewerImage[];
  initialIndex?: number;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  isOpen,
  images,
  initialIndex = 0,
  onClose,
  onNavigate,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentImage = images[currentIndex];
  const hasMultiple = images.length > 1;

  // Update currentIndex when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Handle keyboard events
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasMultiple) goToPrevious();
          break;
        case 'ArrowRight':
          if (hasMultiple) goToNext();
          break;
        case '+':
        case '=':
          zoomIn();
          break;
        case '-':
        case '_':
          zoomOut();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasMultiple, currentIndex]);

  // Handle wheel zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isOpen) return;
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(1, Math.min(5, zoom + delta));
    setZoom(newZoom);
  }, [zoom, isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }
  }, [isOpen, handleWheel]);

  // Handle mouse drag for panning
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || zoom <= 1) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch for pinch zoom
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 2) return;

    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const distance = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );

    // Simple pinch gesture detection
    if (!containerRef.current?.dataset.lastDistance) {
      containerRef.current!.dataset.lastDistance = distance.toString();
      return;
    }

    const lastDistance = parseFloat(containerRef.current.dataset.lastDistance);
    const delta = (distance - lastDistance) / 100;
    const newZoom = Math.max(1, Math.min(5, zoom + delta));
    setZoom(newZoom);
    containerRef.current.dataset.lastDistance = distance.toString();
  }, [zoom]);

  const handleTouchEnd = () => {
    if (containerRef.current) {
      delete containerRef.current.dataset.lastDistance;
    }
  };

  // Navigation functions
  const goToPrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      onNavigate?.(newIndex);
      resetView();
    }
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      onNavigate?.(newIndex);
      resetView();
    }
  };

  // Zoom controls
  const zoomIn = () => {
    setZoom((prev) => Math.min(5, prev + 0.25));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(1, prev - 0.25));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleClose = () => {
    resetView();
    onClose();
  };

  if (!isOpen || !currentImage) return null;

  return (
    <div className={styles.overlay} onClick={handleClose} role="dialog" aria-modal="true" aria-label="Image viewer">
      <div
        className={styles.container}
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Caption - moved to top */}
        {(currentImage.caption || currentImage.title) && (
          <div className={styles.caption} role="region" aria-label="Image caption">
            <p>{currentImage.title && <strong>{currentImage.title}</strong>}</p>
            {currentImage.caption && <p>{currentImage.caption}</p>}
          </div>
        )}

        {/* Image */}
        <div className={styles.imageWrapper}>
          <img
            ref={imageRef}
            src={currentImage.src}
            alt={currentImage.alt || `Image ${currentIndex + 1}`}
            className={styles.image}
            style={{
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              cursor: zoom > 1 ? 'grab' : 'default',
            }}
            draggable={false}
          />
        </div>

        {/* Close button */}
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close image viewer"
          title="Close (ESC)"
        >
          <XMarkIcon className={styles.icon} />
        </button>

        {/* Zoom controls */}
        <div className={styles.controls}>
          <button
            onClick={zoomOut}
            aria-label="Zoom out"
            title="Zoom out (- key)"
            disabled={zoom <= 1}
          >
            <MagnifyingGlassMinusIcon className={styles.icon} />
          </button>
          <span className={styles.zoomLevel}>{Math.round(zoom * 100)}%</span>
          <button
            onClick={zoomIn}
            aria-label="Zoom in"
            title="Zoom in (+ key)"
            disabled={zoom >= 5}
          >
            <MagnifyingGlassPlusIcon className={styles.icon} />
          </button>
          <button
            onClick={resetView}
            aria-label="Reset view"
            title="Reset view"
          >
            Reset
          </button>
        </div>

        {/* Navigation buttons */}
        {hasMultiple && (
          <>
            <button
              className={`${styles.navButton} ${styles.navPrev}`}
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              aria-label="Previous image"
              title="Previous (← key)"
            >
              <ChevronLeftIcon className={styles.icon} />
            </button>
            <button
              className={`${styles.navButton} ${styles.navNext}`}
              onClick={goToNext}
              disabled={currentIndex === images.length - 1}
              aria-label="Next image"
              title="Next (→ key)"
            >
              <ChevronRightIcon className={styles.icon} />
            </button>
            <div className={styles.counter} role="status" aria-live="polite">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageViewer;
