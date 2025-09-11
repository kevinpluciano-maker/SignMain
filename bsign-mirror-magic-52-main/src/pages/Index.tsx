import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import ImprovedFooter from "@/components/ImprovedFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header - Contains mobile menu with all navigation and filters */}
      <Header />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Professional Signage Solutions</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Discover our handcrafted collection of ADA-compliant signage with customizable features including size, shape, and Braille options
          </p>
        </div>
        
        {/* Products Grid */}
        <ProductGrid />
      </div>
      
      {/* Footer */}
      <ImprovedFooter />
    </div>
  );
};

export default Index;
