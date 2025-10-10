import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { SecurityHeaders } from "@/components/SecurityHeaders";
import { PreloadManager } from "@/components/PreloadManager";
import { CacheOptimizer } from "@/components/CacheOptimizer";
import { MobilePerformanceOptimizer } from "@/components/MobilePerformanceOptimizer";
import App from "./App.tsx";
import "./index.css";

// Critical resources to preload
const criticalImages = [
  "/assets/hero-office.jpg"
];

// Note: Fonts are already loaded via Google Fonts CSS in index.html
// No need to preload individual font files as it causes warnings
const criticalFonts: string[] = [];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <AccessibilityProvider>
        <PerformanceMonitor />
        <SecurityHeaders />
        <CacheOptimizer />
        <MobilePerformanceOptimizer />
        <PreloadManager 
          criticalImages={criticalImages}
          criticalFonts={criticalFonts}
        />
        <App />
      </AccessibilityProvider>
    </HelmetProvider>
  </StrictMode>
);
