import SEO from "@/components/SEO";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import ImprovedNavigation from "@/components/ImprovedNavigation";
import Breadcrumb from "@/components/Breadcrumb";
import ImprovedSidebar from "@/components/ImprovedSidebar";
import ProductCard from "@/components/ProductCard";
import ProductGrid from "@/components/ProductGrid";
import ImprovedFooter from "@/components/ImprovedFooter";
import EditorToolbar from "@/components/editor/EditorToolbar";
import { getCategoryProducts, getCategoryTitle, getAllProducts, getCategoryProductsSmart } from "@/data/productsData";
import { bestSellersProducts } from "@/data/bestSellersProducts";
import { useEffect } from "react";

const Collections = () => {
  const { category } = useParams();
  
  // Scroll to top when navigating to collections
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);
  
  const getPageTitle = () => {
    if (!category) return "All Products";
    return getCategoryTitle(category);
  };

  const getProducts = () => {
    if (!category) return getAllProducts();
    if (category === "best-sellers") return bestSellersProducts;
    if (category === "new") return getAllProducts().slice(0, 12); // Show newest products
    
    // Use smart category assignment for better product matching
    return getCategoryProductsSmart(category);
  };

  const products = getProducts();
  const pageTitle = getPageTitle();

  // Use full-width layout for ALL collection pages (no sidebar anywhere)
  const isFullWidthLayout = true; // Always use clean, full-width layout

  const getPageDescription = () => {
    if (category === "best-sellers") return "Our most popular professional signage solutions";
    if (category === "new") return "Discover our latest collection of professional signage solutions";
    return `Professional ${pageTitle.toLowerCase()} for your business needs`;
  };
  
  return (
    <>
      <SEO
        title={`${pageTitle} | Professional Signage | Bsign Store`}
        description={getPageDescription()}
        canonical={`/collections/${category || 'all'}`}
        type="website"
      />
      <div className="min-h-screen bg-background">
      <EditorToolbar />
      
        {/* Header */}
        <Header showFilters={true} />
        
        {/* Navigation */}
        <ImprovedNavigation />
        
        {/* Breadcrumb */}
        <Breadcrumb />
        
        {/* Main Content - Always Full Width (No Sidebar) */}
        <div className="container mx-auto px-4">
          <div className="w-full">
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {pageTitle}
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                {getPageDescription()}
              </p>
              <div className="mt-2 text-sm text-muted-foreground">
                {products.length} {products.length === 1 ? 'product' : 'products'} available
              </div>
            </div>
            
            {/* Products Grid - Clean Full Width Layout (3-4 per row) */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-fr [&>*]:h-full">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  rating={product.rating}
                  reviews={product.reviews}
                  badges={product.badges}
                  isNew={false}
                  lazy={index > 8} // Lazy load after first 8 products
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <ImprovedFooter />
      </div>
    </>
  );
};

export default Collections;