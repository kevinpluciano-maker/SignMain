import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import { LazySection } from "@/components/LazySection";
import { CriticalCSS } from "@/components/CriticalCSS";
import FeaturedProducts from "@/components/FeaturedProducts";
import Features from "@/components/Features";
import Header from "@/components/Header";
import ModernNavigation from "@/components/ModernNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";
import PageEditor from "@/components/editor/PageEditor";
import DraggableSection from "@/components/editor/DraggableSection";
import EditorToolbar from "@/components/editor/EditorToolbar";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import { PreloadManager } from "@/components/PreloadManager";
// AccessibilityEnhancer removed per requirements
import { MobilePerformanceOptimizer } from "@/components/MobilePerformanceOptimizer";

const Home = () => {
  return (
    <>
      <CriticalCSS />
      <SEO
        title="Premium ADA Compliant Braille Signs | Acrylic Braille Signs Canada & USA"
        description="Professional ADA compliant acrylic braille signage for offices, healthcare, and commercial spaces. Premium quality door numbers, restroom signs, and custom signage. Serving Canada & USA with expert installation."
        canonical="/"
        type="website"
        keywords={["ADA compliant signs", "braille signage", "acrylic signs", "door number signs", "restroom signs", "office signage", "custom braille signs", "accessibility signage", "professional signage Canada", "braille door signs", "tactile signage"]}
      />
      <div className="min-h-screen bg-background">
        {/* Preload critical homepage resources only */}
        <PreloadManager 
          criticalImages={[
            "/assets/hero-office.jpg",
            "/assets/acrylic-braille-logo.png"
          ]}
        />
        {/* AccessibilityEnhancer removed per requirements */}
        <MobilePerformanceOptimizer />
        <EditorToolbar />
        
        <PageEditor>
          {/* Header - Critical, always loaded */}
          <header>
            <DraggableSection id="header">
              <Header />
            </DraggableSection>
          </header>
          
          {/* Navigation - Critical, always loaded */}
          <nav role="navigation" aria-label="Main navigation">
            <DraggableSection id="navigation">
              <ModernNavigation />
            </DraggableSection>
          </nav>
          
          {/* Hero Section - Critical, always loaded */}
          <main id="main-content" tabIndex={-1}>
            <DraggableSection id="hero">
              <HeroSection />
            </DraggableSection>
          
            {/* Featured Products - Lazy loaded when approaching viewport */}
            <section aria-labelledby="featured-products-title">
              <LazySection 
                fallback={<div className="min-h-[600px] bg-muted/20 animate-pulse" />}
                rootMargin="200px"
              >
                <DraggableSection id="featured-products">
                  <FeaturedProducts />
                </DraggableSection>
              </LazySection>
            </section>
            
            {/* Features - Lazy loaded */}
            <section aria-labelledby="features-title">
              <LazySection 
                fallback={<div className="min-h-[400px] bg-muted/20 animate-pulse" />}
                rootMargin="150px"
              >
                <DraggableSection id="features">
                  <Features />
                </DraggableSection>
              </LazySection>
            </section>
          </main>
          
          {/* Footer - Lazy loaded */}
          <footer role="contentinfo">
            <LazySection 
              fallback={<div className="min-h-[300px] bg-muted/20 animate-pulse" />}
              rootMargin="100px"
            >
              <DraggableSection id="footer">
                <ImprovedFooter />
              </DraggableSection>
            </LazySection>
          </footer>
        </PageEditor>
        
      </div>
    </>
  );
};

export default Home;