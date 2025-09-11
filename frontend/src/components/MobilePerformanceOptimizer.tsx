import { useEffect, useState } from 'react';
import { LazyImage } from "@/components/LazyImage";

/**
 * Mobile Performance Optimizer
 * Implements advanced performance optimizations for mobile devices
 */
export const MobilePerformanceOptimizer = () => {
  const [connectionType, setConnectionType] = useState<string>('4g');
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  useEffect(() => {
    // Detect network connection type
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      setConnectionType(connection.effectiveType || connection.type || '4g');
      
      // Listen for connection changes
      const handleConnectionChange = () => {
        setConnectionType(connection.effectiveType || connection.type || '4g');
        optimizeForConnection(connection.effectiveType || connection.type || '4g');
      };
      
      connection.addEventListener('change', handleConnectionChange);
      
      return () => {
        connection.removeEventListener('change', handleConnectionChange);
      };
    }
  }, []);

  useEffect(() => {
    // Detect device capabilities and power mode
    const detectLowPowerMode = () => {
      // Check various indicators for low power mode
      const battery = (navigator as any).battery;
      const deviceMemory = (navigator as any).deviceMemory;
      const hardwareConcurrency = navigator.hardwareConcurrency;

      if (battery) {
        setIsLowPowerMode(battery.level < 0.2 && !battery.charging);
      } else if (deviceMemory && deviceMemory < 4) {
        setIsLowPowerMode(true);
      } else if (hardwareConcurrency && hardwareConcurrency < 4) {
        setIsLowPowerMode(true);
      }
    };

    detectLowPowerMode();

    // Battery API event listeners
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const handleBatteryChange = () => {
          setIsLowPowerMode(battery.level < 0.2 && !battery.charging);
        };

        battery.addEventListener('levelchange', handleBatteryChange);
        battery.addEventListener('chargingchange', handleBatteryChange);

        return () => {
          battery.removeEventListener('levelchange', handleBatteryChange);
          battery.removeEventListener('chargingchange', handleBatteryChange);
        };
      });
    }
  }, []);

  const optimizeForConnection = (connection: string) => {
    const root = document.documentElement;
    
    // Adjust quality based on connection
    if (connection === 'slow-2g' || connection === '2g') {
      root.style.setProperty('--image-quality', '0.3');
      root.classList.add('low-bandwidth');
    } else if (connection === '3g') {
      root.style.setProperty('--image-quality', '0.6');
      root.classList.remove('low-bandwidth');
    } else {
      root.style.setProperty('--image-quality', '0.9');
      root.classList.remove('low-bandwidth');
    }
  };

  useEffect(() => {
    // Implement adaptive loading based on device capabilities
    const implementAdaptiveLoading = () => {
      const root = document.documentElement;

      if (isLowPowerMode) {
        // Reduce animations and effects
        root.classList.add('low-power-mode');
        
        // Reduce image quality
        root.style.setProperty('--image-quality', '0.4');
        
        // Disable non-critical animations
        const style = document.createElement('style');
        style.textContent = `
          .low-power-mode * {
            animation-duration: 0.1s !important;
            transition-duration: 0.1s !important;
          }
          .low-power-mode .float-animation,
          .low-power-mode .pulse-glow-animation {
            animation: none !important;
          }
        `;
        document.head.appendChild(style);
      } else {
        root.classList.remove('low-power-mode');
      }
    };

    implementAdaptiveLoading();
  }, [isLowPowerMode]);

  useEffect(() => {
    // Implement touch optimization for mobile
    const optimizeTouch = () => {
      // Add touch-action optimization
      const style = document.createElement('style');
      style.textContent = `
        /* Touch optimization */
        .touch-optimized {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Improve scroll performance */
        .scroll-container {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }
        
        /* Optimize button touches */
        button, [role="button"], .clickable {
          min-height: 44px;
          min-width: 44px;
          touch-action: manipulation;
        }
        
        /* Prevent zoom on input focus */
        input, textarea, select {
          font-size: 16px;
        }
        
        @media (max-width: 768px) {
          /* Mobile-specific optimizations */
          .mobile-optimized {
            will-change: transform;
            backface-visibility: hidden;
          }
          
          /* Reduce font variations on mobile */
          * {
            font-feature-settings: normal !important;
          }
        }
        
        /* Connection-based optimizations */
        .low-bandwidth img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
        
        .low-bandwidth video {
          display: none;
        }
        
        .low-bandwidth .background-video,
        .low-bandwidth .hero-animation {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    };

    optimizeTouch();
  }, []);

  useEffect(() => {
    // Implement viewport optimizations
    const optimizeViewport = () => {
      // Add viewport meta tag if not present
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (!viewportMeta) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no';
        document.head.appendChild(meta);
      }

      // Add theme-color meta for mobile browsers
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (!themeColorMeta) {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = '#007cf0';
        document.head.appendChild(meta);
      }

      // Add apple-mobile-web-app meta tags
      const appleMetas = [
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Bsign Store' }
      ];

      appleMetas.forEach(({ name, content }) => {
        if (!document.querySelector(`meta[name="${name}"]`)) {
          const meta = document.createElement('meta');
          meta.name = name;
          meta.content = content;
          document.head.appendChild(meta);
        }
      });
    };

    optimizeViewport();
  }, []);

  useEffect(() => {
    // Implement critical resource hints
    const addResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
      ];

      hints.forEach(({ rel, href, crossOrigin }) => {
        if (!document.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
          const link = document.createElement('link');
          link.rel = rel;
          link.href = href;
          if (crossOrigin) link.crossOrigin = crossOrigin;
          document.head.appendChild(link);
        }
      });
    };

    addResourceHints();
  }, []);

  return null; // This component only adds optimizations
};

/**
 * Enhanced Lazy Image Component with mobile optimizations
 */
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  sizes = "100vw",
  priority = false,
  ...props 
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  [key: string]: any;
}) => {
  const [connectionType, setConnectionType] = useState('4g');

  useEffect(() => {
    const connection = (navigator as any).connection;
    if (connection) {
      setConnectionType(connection.effectiveType || '4g');
    }
  }, []);

  // Generate WebP source if supported
  const generateSources = () => {
    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const avifSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.avif');

    return {
      avif: avifSrc,
      webp: webpSrc,
      fallback: src
    };
  };

  const sources = generateSources();

  // Adjust quality based on connection
  const getQualityMultiplier = () => {
    switch (connectionType) {
      case 'slow-2g':
      case '2g': return 0.3;
      case '3g': return 0.6;
      default: return 1;
    }
  };

  return (
    <picture>
      {/* AVIF source for modern browsers */}
      <source srcSet={sources.avif} type="image/avif" />
      
      {/* WebP source for supported browsers */}
      <source srcSet={sources.webp} type="image/webp" />
      
      {/* Fallback image */}
      <LazyImage
        src={sources.fallback}
        alt={alt}
        className={`mobile-optimized ${className}`}
        width={props.width}
        height={props.height}
        placeholder={priority ? undefined : 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Loading...</text></svg>'}
        {...props}
      />
    </picture>
  );
};