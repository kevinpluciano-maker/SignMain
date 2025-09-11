import { useState, useEffect } from 'react';

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  lazy?: boolean;
  priority?: boolean;
  sizes?: string;
}

export const useImageOptimization = (
  src: string, 
  options: ImageOptimizationOptions = {}
) => {
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formats, setFormats] = useState<string[]>([]);

  const {
    width,
    height, 
    quality = 85,
    format = 'auto',
    lazy = true,
    priority = false,
    sizes
  } = options;

  useEffect(() => {
    // Check for modern format support
    const checkFormatSupport = async () => {
      const supportedFormats: string[] = [];
      
      // Check AVIF support
      if (await supportsFormat('avif')) {
        supportedFormats.push('avif');
      }
      
      // Check WebP support
      if (await supportsFormat('webp')) {
        supportedFormats.push('webp');
      }
      
      supportedFormats.push('jpg', 'jpeg', 'png');
      setFormats(supportedFormats);
    };

    const supportsFormat = (format: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = `data:image/${format};base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=`;
      });
    };

    checkFormatSupport();

    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      setError(null);
    };
    
    img.onerror = () => {
      console.log('Image optimization error for:', src);
      setError('Failed to load image');
      setIsLoaded(false);
    };

    // Generate optimized source URLs (placeholder for actual optimization service)
    let optimizedUrl = src;
    
    // In production, you would generate URLs like:
    // optimizedUrl = `${CDN_URL}/${src}?w=${width}&h=${height}&q=${quality}&f=${format}`;
    
    img.src = optimizedUrl;
    setOptimizedSrc(optimizedUrl);
  }, [src, width, height, quality, format]);

  return {
    src: optimizedSrc,
    isLoaded,
    error,
    loading: (lazy && !priority) ? 'lazy' as const : 'eager' as const,
    formats,
    sizes
  };
};

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 85,
  priority = false,
  sizes,
  onLoad,
  onError,
  className = '',
  ...props
}) => {
  const { src: optimizedSrc, isLoaded, error, loading, formats } = useImageOptimization(src, {
    width,
    height,
    quality,
    lazy: !priority,
    priority,
    sizes
  });

  const [imageError, setImageError] = useState(false);

  const handleLoad = () => {
    onLoad?.();
  };

  const handleError = () => {
    console.log('Image loading error for:', src);
    setImageError(true);
    onError?.();
  };

  if (error || imageError) {
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

  // Generate srcset for responsive images
  const generateSrcSet = () => {
    // For static images, don't generate complex srcsets as they don't exist
    // This prevents 404 errors that could cause "image unavailable" messages
    return undefined;
  };

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      sizes={sizes}
      onLoad={handleLoad}
      onError={handleError}
      className={`transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      {...props}
    />
  );
};