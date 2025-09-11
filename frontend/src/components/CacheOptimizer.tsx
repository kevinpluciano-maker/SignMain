import { useEffect } from 'react';

/**
 * Cache optimization component for static assets and API responses
 * Sets up service worker and cache strategies for better performance
 */
export const CacheOptimizer = () => {
  useEffect(() => {
    // Register service worker for caching strategies
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Preload critical resources in browser cache
    const preloadCriticalResources = () => {
      const criticalAssets = [
        '/assets/hero-office.jpg',
        '/assets/signassist-logo.png'
      ];

      criticalAssets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = asset;
        document.head.appendChild(link);
      });
    };

    // Cache static assets in memory
    const cacheStaticAssets = async () => {
      if ('caches' in window) {
        try {
          const cache = await caches.open('static-assets-v1');
          const assetsToCache = [
            '/assets/hero-office.jpg',
            '/assets/signassist-logo.png',
            '/assets/bsign-logo.png'
          ];
          
          await cache.addAll(assetsToCache);
        } catch (error) {
          console.warn('Failed to cache static assets:', error);
        }
      }
    };

    // Optimize font loading
    const optimizeFonts = () => {
      // Preload critical font subsets
      const fontPreloads = [
        {
          href: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
          type: 'font/woff2'
        }
      ];

      fontPreloads.forEach(font => {
        if (!document.querySelector(`link[href="${font.href}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'font';
          link.type = font.type;
          link.href = font.href;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        }
      });
    };

    // Resource hints for third-party domains
    const addResourceHints = () => {
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ];

      domains.forEach(domain => {
        // Add dns-prefetch
        if (!document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`)) {
          const dnsLink = document.createElement('link');
          dnsLink.rel = 'dns-prefetch';
          dnsLink.href = domain;
          document.head.appendChild(dnsLink);
        }

        // Add preconnect for critical domains
        if (domain.includes('fonts.gstatic.com')) {
          if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
            const preconnectLink = document.createElement('link');
            preconnectLink.rel = 'preconnect';
            preconnectLink.href = domain;
            preconnectLink.crossOrigin = 'anonymous';
            document.head.appendChild(preconnectLink);
          }
        }
      });
    };

    // Initialize optimizations
    preloadCriticalResources();
    cacheStaticAssets();
    optimizeFonts();
    addResourceHints();

    // Cleanup function
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
};