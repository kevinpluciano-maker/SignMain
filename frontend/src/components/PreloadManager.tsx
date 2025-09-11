import { useEffect } from 'react';

interface PreloadManagerProps {
  criticalImages?: string[];
  criticalFonts?: string[];
  criticalScripts?: string[];
}

/**
 * Preload manager for critical resources
 * Optimizes LCP by preloading hero images and critical assets
 */
export const PreloadManager: React.FC<PreloadManagerProps> = ({
  criticalImages = [],
  criticalFonts = [],
  criticalScripts = []
}) => {
  useEffect(() => {
    // Preload critical images
    criticalImages.forEach(src => {
      if (!document.querySelector(`link[href="${src}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });

    // Preload critical fonts
    criticalFonts.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.href = href;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });

    // Preload critical scripts
    criticalScripts.forEach(src => {
      if (!document.querySelector(`link[href="${src}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'script';
        link.href = src;
        document.head.appendChild(link);
      }
    });

    // Prefetch DNS lookups for external domains
    const externalDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    externalDomains.forEach(domain => {
      if (!document.querySelector(`link[href="${domain}"]`)) {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      }
    });

    // Preconnect to critical third-parties
    const preconnectDomains = [
      'https://fonts.gstatic.com'
    ];

    preconnectDomains.forEach(domain => {
      if (!document.querySelector(`link[href="${domain}"][rel="preconnect"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });
  }, [criticalImages, criticalFonts, criticalScripts]);

  return null;
};