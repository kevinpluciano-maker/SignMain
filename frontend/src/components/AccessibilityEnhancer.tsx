import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";

/**
 * Enhanced Accessibility component implementing WCAG 2.1 AA standards
 * Provides keyboard navigation, focus management, and accessibility settings
 */
export const AccessibilityEnhancer = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);

  useEffect(() => {
    // Check user preferences on load
    const savedHighContrast = localStorage.getItem('high-contrast') === 'true';
    const savedFontSize = localStorage.getItem('font-size') || 'normal';
    const savedReducedMotion = localStorage.getItem('reduced-motion') === 'true';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setIsHighContrast(savedHighContrast);
    setFontSize(savedFontSize);
    setReducedMotion(savedReducedMotion || prefersReducedMotion);

    // Apply initial settings
    applyAccessibilitySettings(savedHighContrast, savedFontSize, savedReducedMotion || prefersReducedMotion);
  }, []);

  const applyAccessibilitySettings = (highContrast: boolean, fontSizeValue: string, reducedMotionValue: boolean) => {
    const root = document.documentElement;
    
    // High contrast mode
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Font size adjustments
    root.setAttribute('data-font-size', fontSizeValue);

    // Reduced motion
    if (reducedMotionValue) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  };

  const toggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    localStorage.setItem('high-contrast', newValue.toString());
    applyAccessibilitySettings(newValue, fontSize, reducedMotion);
  };

  const changeFontSize = (newSize: string) => {
    setFontSize(newSize);
    localStorage.setItem('font-size', newSize);
    applyAccessibilitySettings(isHighContrast, newSize, reducedMotion);
  };

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    localStorage.setItem('reduced-motion', newValue.toString());
    applyAccessibilitySettings(isHighContrast, fontSize, newValue);
  };

  // Keyboard navigation enhancement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip to main content with Alt+M
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const main = document.querySelector('main');
        if (main) {
          main.focus();
          main.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Toggle accessibility menu with Alt+A
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setShowAccessibilityMenu(prev => !prev);
      }

      // Close menu with Escape
      if (e.key === 'Escape' && showAccessibilityMenu) {
        setShowAccessibilityMenu(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showAccessibilityMenu]);

  return (
    <AccessibilityProvider>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                   bg-primary text-primary-foreground px-4 py-2 rounded z-50
                   focus:z-50 focus-visible:outline focus-visible:outline-2 
                   focus-visible:outline-offset-2"
        onFocus={(e) => {
          e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
      >
        Skip to main content
      </a>

      {/* Accessibility Menu Toggle */}
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 right-4 z-40 bg-background/95 backdrop-blur-sm"
        onClick={() => setShowAccessibilityMenu(prev => !prev)}
        aria-expanded={showAccessibilityMenu}
        aria-controls="accessibility-menu"
        aria-label="Toggle accessibility settings menu"
      >
        <span className="sr-only">Accessibility Settings</span>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6"/>
          <path d="m4.2 4.2 1.4 1.4m11.8 0 1.4-1.4M1 12h6m6 0h6m-15.4 7.8 1.4-1.4m11.8 0 1.4 1.4"/>
        </svg>
      </Button>

      {/* Accessibility Settings Panel */}
      {showAccessibilityMenu && (
        <div
          id="accessibility-menu"
          className="fixed top-16 right-4 z-50 bg-card border rounded-lg shadow-lg p-4 w-64
                     animate-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-labelledby="accessibility-title"
          aria-describedby="accessibility-description"
        >
          <h3 id="accessibility-title" className="font-semibold mb-2">
            Accessibility Settings
          </h3>
          <p id="accessibility-description" className="text-sm text-muted-foreground mb-4">
            Customize your viewing experience
          </p>

          <div className="space-y-4">
            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between">
              <label htmlFor="high-contrast" className="text-sm font-medium">
                High Contrast
              </label>
              <Button
                id="high-contrast"
                variant={isHighContrast ? "default" : "outline"}
                size="sm"
                onClick={toggleHighContrast}
                aria-pressed={isHighContrast}
                aria-describedby="high-contrast-desc"
              >
                {isHighContrast ? 'On' : 'Off'}
              </Button>
              <div id="high-contrast-desc" className="sr-only">
                {isHighContrast ? 'High contrast mode is enabled' : 'High contrast mode is disabled'}
              </div>
            </div>

            {/* Font Size Controls */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Font Size
              </label>
              <div className="flex gap-1" role="radiogroup" aria-labelledby="font-size-label">
                {[
                  { value: 'normal', label: 'Normal' },
                  { value: 'large', label: 'Large' },
                  { value: 'larger', label: 'Larger' }
                ].map(({ value, label }) => (
                  <Button
                    key={value}
                    variant={fontSize === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeFontSize(value)}
                    role="radio"
                    aria-checked={fontSize === value}
                    aria-describedby={`font-size-${value}-desc`}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="flex items-center justify-between">
              <label htmlFor="reduced-motion" className="text-sm font-medium">
                Reduce Motion
              </label>
              <Button
                id="reduced-motion"
                variant={reducedMotion ? "default" : "outline"}
                size="sm"
                onClick={toggleReducedMotion}
                aria-pressed={reducedMotion}
                aria-describedby="reduced-motion-desc"
              >
                {reducedMotion ? 'On' : 'Off'}
              </Button>
              <div id="reduced-motion-desc" className="sr-only">
                {reducedMotion ? 'Reduced motion is enabled' : 'Reduced motion is disabled'}
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts Info */}
          <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
            <p className="font-medium mb-1">Keyboard shortcuts:</p>
            <ul className="space-y-1">
              <li>Alt + M: Skip to main content</li>
              <li>Alt + A: Toggle this menu</li>
              <li>Esc: Close menu</li>
            </ul>
          </div>
        </div>
      )}
    </AccessibilityProvider>
  );
};