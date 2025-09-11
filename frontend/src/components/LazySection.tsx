import React, { useState, useRef, useCallback, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

/**
 * Lazy section component that only renders children when in viewport
 * Improves INP by reducing initial DOM complexity
 */
export const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback = <div className="min-h-[200px] bg-muted animate-pulse" />,
  rootMargin = '100px',
  threshold = 0.1,
  className = ''
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (ref.current) {
      // Cleanup previous observer
    }
    
    if (node) {
      ref.current = node;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasIntersected) {
            setIsIntersecting(true);
            setHasIntersected(true);
            observer.disconnect();
          }
        },
        {
          rootMargin,
          threshold
        }
      );
      
      observer.observe(node);
      
      return () => observer.disconnect();
    }
  }, [rootMargin, threshold, hasIntersected]);

  return (
    <div ref={setRef} className={className}>
      {isIntersecting ? children : fallback}
    </div>
  );
};