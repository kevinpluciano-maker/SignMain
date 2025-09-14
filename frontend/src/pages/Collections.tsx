import SEO from "@/components/SEO";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import ImprovedNavigation from "@/components/ImprovedNavigation";
import Breadcrumb from "@/components/Breadcrumb";
import ImprovedSidebar from "@/components/ImprovedSidebar";
import ProductGrid from "@/components/ProductGrid";
import ImprovedFooter from "@/components/ImprovedFooter";
import EditorToolbar from "@/components/editor/EditorToolbar";
import { getCategoryProducts, getCategoryTitle, getAllProducts } from "@/data/productsData";
import { bestSellersProducts } from "@/data/bestSellersProducts";

const Collections = () => {
  const { category } = useParams();
  
  const getPageTitle = () => {
    if (!category) return "All Products";
    return getCategoryTitle(category);
  };

  const getProducts = () => {
    if (!category) return getAllProducts();
    if (category === "best-sellers") return bestSellersProducts;
    if (category === "new") return getAllProducts().slice(0, 12); // Show newest products
    
    // Handle hyphenated category URLs - convert back to original category keys
    const categoryKey = category.toLowerCase();
    
    // Try direct match first
    let products = getCategoryProducts(categoryKey);
    
    // If no direct match, try mapping common URL patterns back to data keys
    if (products.length === 0) {
      // Map specific URL patterns to data keys
      const categoryMappings: Record<string, string> = {
        'unisex-restroom-signs': 'restroom-signs',
        'women-restroom-signs': 'restroom-signs', 
        'men-restroom-signs': 'restroom-signs',
        'office-door-numbers': 'door-number-signs',
        'house-number-signs': 'door-number-signs',
        'hotel-door-numbers': 'door-number-signs',
        'apartment-door-numbers': 'door-number-signs',
        'interior-door-signs': 'door-signs',
        'medical-office-door-signs': 'door-signs',
        'hotel-door-signs': 'door-signs',
        'no-smoking-signs': 'prohibitory-signs',
        'staff-only-signs': 'prohibitory-signs',
        'elevator-signs': 'info-signs',
        'cafeteria-signs': 'info-signs',
        'directional-exit-signs': 'directional-signs',
        'hospital-directional-signs': 'directional-signs',
        'ada-braille-signs': 'ada-signs',
        'ada-room-name-signs': 'ada-signs',
        'conference-room-signs': 'room-signs',
        'meeting-room-signs': 'room-signs',
        'nameplate-desk-signs': 'desk-signs',
        'executive-desk-signs': 'desk-signs'
      };
      
      const mappedCategory = categoryMappings[categoryKey];
      if (mappedCategory) {
        products = getCategoryProducts(mappedCategory);
        
        // Filter by subcategory if it exists
        if (products.length > 0) {
          const subcategoryFilter = categoryKey.replace(/-/g, '-');
          products = products.filter(product => 
            product.subcategory === subcategoryFilter || 
            product.category === categoryKey ||
            product.name.toLowerCase().includes(subcategoryFilter.replace(/-/g, ' '))
          );
        }
      }
    }
    
    return products;
  };

  const products = getProducts();
  const pageTitle = getPageTitle();

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
        
        {/* Main Content */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            {/* Desktop Sidebar - Only visible on desktop */}
            <div className="hidden md:block">
              <ImprovedSidebar />
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1">
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
              
              {/* Products Grid */}
              <ProductGrid products={products} />
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