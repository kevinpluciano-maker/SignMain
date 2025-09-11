import { useEffect } from 'react';

/**
 * Critical CSS component that inlines essential styles for above-the-fold content
 * Reduces render-blocking resources and improves LCP
 */
export const CriticalCSS = () => {
  useEffect(() => {
    // Load non-critical CSS asynchronously
    const loadCSS = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
      };
      document.head.appendChild(link);
    };

    // Example: Load non-critical styles after initial render
    // loadCSS('/styles/non-critical.css');
  }, []);

  return (
    <style>{`
      /* Critical above-the-fold styles */
      .hero-container {
        height: 100vh;
        position: relative;
        overflow: hidden;
      }
      
      .hero-bg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .hero-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.3);
      }
      
      .hero-content {
        position: relative;
        z-index: 10;
        height: 100%;
        display: flex;
        align-items: center;
      }
      
      /* Prevent layout shift */
      .aspect-ratio-preserve {
        aspect-ratio: attr(width) / attr(height);
      }
      
      /* Fast loading states */
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  );
};