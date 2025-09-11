import React, { createContext, useContext, useEffect, useState } from 'react';

interface AccessibilityState {
  isHighContrast: boolean;
  isReducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'larger';
  focusVisible: boolean;
}

interface AccessibilityContextType extends AccessibilityState {
  toggleHighContrast: () => void;
  setFontSize: (size: AccessibilityState['fontSize']) => void;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AccessibilityState>({
    isHighContrast: false,
    isReducedMotion: false,
    fontSize: 'normal',
    focusVisible: false
  });

  useEffect(() => {
    // Check for user preferences
    const checkPreferences = () => {
      const highContrast = window.matchMedia('(prefers-contrast: high)').matches;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const savedFontSize = localStorage.getItem('accessibility-font-size') as AccessibilityState['fontSize'] || 'normal';

      setState(prev => ({
        ...prev,
        isHighContrast: highContrast,
        isReducedMotion: reducedMotion,
        fontSize: savedFontSize
      }));

      // Apply classes to document
      document.documentElement.classList.toggle('high-contrast', highContrast);
      document.documentElement.classList.toggle('reduced-motion', reducedMotion);
      document.documentElement.setAttribute('data-font-size', savedFontSize);
    };

    checkPreferences();

    // Listen for preference changes
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    contrastQuery.addEventListener('change', checkPreferences);
    motionQuery.addEventListener('change', checkPreferences);

    // Focus visible detection
    const handleKeydown = () => setState(prev => ({ ...prev, focusVisible: true }));
    const handleMousedown = () => setState(prev => ({ ...prev, focusVisible: false }));

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('mousedown', handleMousedown);

    return () => {
      contrastQuery.removeEventListener('change', checkPreferences);
      motionQuery.removeEventListener('change', checkPreferences);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mousedown', handleMousedown);
    };
  }, []);

  const toggleHighContrast = () => {
    setState(prev => ({ ...prev, isHighContrast: !prev.isHighContrast }));
    document.documentElement.classList.toggle('high-contrast');
  };

  const setFontSize = (size: AccessibilityState['fontSize']) => {
    setState(prev => ({ ...prev, fontSize: size }));
    localStorage.setItem('accessibility-font-size', size);
    document.documentElement.setAttribute('data-font-size', size);
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        ...state,
        toggleHighContrast,
        setFontSize,
        announceToScreenReader
      }}
    >
      {children}
      
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:bg-primary focus:text-primary-foreground focus:p-4 focus:z-50 focus:no-underline"
      >
        Skip to main content
      </a>
      
      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" />
    </AccessibilityContext.Provider>
  );
};