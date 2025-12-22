import React, { useState } from 'react';

interface ZoomableImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ZoomableImage({ src, alt, className, style }: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${className} cursor-pointer`}
        style={style}
        onClick={() => setIsZoomed(true)}
      />
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => setIsZoomed(false)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}