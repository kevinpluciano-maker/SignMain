import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditorProvider } from "@/contexts/EditorContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { CartProvider } from "@/contexts/CartContext";
import { MobilePerformanceOptimizer } from "@/components/MobilePerformanceOptimizer";
import { PreloadManager } from "@/components/PreloadManager";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import AllProducts from "./pages/AllProducts";
import AllProductsDebug from "./pages/AllProductsDebug";
import AllProductsSimple from "./pages/AllProductsSimple";
import AllProductsFixed from "./pages/AllProductsFixed";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import InstallationGuide from "./pages/InstallationGuide";
import Privacy from "./pages/Privacy";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ModernContact from "./pages/ModernContact";
import ModernAbout from "./pages/ModernAbout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CurrencyProvider>
        <CartProvider>
          <EditorProvider>
          <MobilePerformanceOptimizer />
          <PreloadManager 
            criticalImages={[
              "/src/assets/hero-office.jpg",
              "/src/assets/bsign-logo.png"
            ]}
          />
          <PerformanceMonitor />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<AllProductsSimple />} />
              <Route path="/products-debug" element={<AllProductsDebug />} />
              <Route path="/products-original" element={<AllProducts />} />
              <Route path="/collections/new" element={<Collections />} />
              <Route path="/collections/best-sellers" element={<Collections />} />
              <Route path="/collections/:category" element={<Collections />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/about" element={<ModernAbout />} />
              <Route path="/contact" element={<ModernContact />} />
              <Route path="/installation-guide" element={<InstallationGuide />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </EditorProvider>
        </CartProvider>
      </CurrencyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
