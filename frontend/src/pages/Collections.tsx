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
        'exam-room-signs': 'info-signs',
        'meeting-room-ada-signs': 'info-signs', 
        'reception-signs': 'info-signs',
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

  // Check if this is an Info Signs related page
  const isInfoSignsPage = category === 'info-signs' || 
                         category === 'exam-room-signs' || 
                         category === 'meeting-room-ada-signs' || 
                         category === 'reception-signs' ||
                         (category && ['exam-room-signs', 'meeting-room-ada-signs', 'reception-signs'].includes(category));

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
          {isInfoSignsPage ? (
            /* Info Signs - Full Width Layout (No Sidebar) */
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
              
              {/* Products Grid - Wider Layout for Info Signs (3-4 per row) */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {products.map((product, index) => (
                  <div key={product.id} className="h-full">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      {/* Product content would go here - using ProductCard component */}
                      <div className="aspect-square overflow-hidden rounded-t-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xl font-bold text-gray-900">{product.price}</span>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-400">★</span>
                              <span className="text-sm font-medium">{product.rating}</span>
                            </div>
                          </div>
                          <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Other Categories - Standard Layout with Sidebar */
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
          )}
        </div>
        
        {/* Footer */}
        <ImprovedFooter />
      </div>
    </>
  );
};

export default Collections;