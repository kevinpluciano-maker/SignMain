import { useState, useRef, useCallback, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  placeholder = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="%23f3f4f6"/></svg>',
  onLoad,
  onError,
  sizes
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up intersection observer for lazy loading
  const setRef = useCallback((node: HTMLImageElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    if (node && !priority) {
      imgRef.current = node;
      
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observerRef.current?.disconnect();
          }
        },
        {
          rootMargin: '50px',
          threshold: 0.1
        }
      );
      
      observerRef.current.observe(node);
    }
  }, [priority]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();
  };

  // Generate responsive srcset for better performance
  const generateSrcSet = () => {
    // Disabled to prevent 404 errors on non-existent image variants
    return undefined;
  };

  // Error state
  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-muted text-muted-foreground ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <span className="text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Placeholder while loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0 w-full h-full bg-gray-100 animate-pulse"
          aria-hidden="true"
        />
      )}
      
      {/* Main image - only load when intersecting or priority */}
      {(isIntersecting || priority) && (
        <img
          ref={setRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 bg-transparent ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: 'transparent' }}
        />
      )}
    </div>
  );
};