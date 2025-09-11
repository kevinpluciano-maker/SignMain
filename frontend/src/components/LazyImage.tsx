import { useState, useRef, useCallback } from 'react';
import { OptimizedImage } from '@/hooks/useImageOptimization';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="%23f3f4f6"/></svg>'
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (imgRef.current) {
      // Cleanup previous observer
    }
    
    if (node) {
      imgRef.current = node;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: '50px', // Start loading 50px before entering viewport
          threshold: 0.1
        }
      );
      
      observer.observe(node);
      
      return () => observer.disconnect();
    }
  }, []);

  const handleLoad = () => {
    setHasLoaded(true);
  };

  return (
    <div ref={setRef} className={`relative ${className}`} style={{ width, height }}>
      {!isIntersecting ? (
        <img
          src={placeholder}
          alt=""
          width={width}
          height={height}
          className="w-full h-full object-cover opacity-30"
          aria-hidden="true"
        />
      ) : (
        <OptimizedImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            hasLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          priority={false}
        />
      )}
    </div>
  );
};