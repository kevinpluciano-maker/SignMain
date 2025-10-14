import SEO from "@/components/SEO";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Grid, List } from "lucide-react";
import Header from "@/components/Header";
import ImprovedNavigation from "@/components/ImprovedNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";
import PageEditor from "@/components/editor/PageEditor";
import DraggableSection from "@/components/editor/DraggableSection";
import EditorToolbar from "@/components/editor/EditorToolbar";
import ProductCard from "@/components/ProductCard";
import { getAllProducts, getCategoryTitle } from "@/data/productsData";

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState("all");
  
  const allProducts = getAllProducts();
  
  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(allProducts.map(product => product.category)));
    return cats.sort();
  }, [allProducts]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== "all") {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
        switch (priceRange) {
          case "under-25":
            return price < 25;
          case "25-50":
            return price >= 25 && price <= 50;
          case "50-100":
            return price >= 50 && price <= 100;
          case "over-100":
            return price > 100;
          default:
            return true;
        }
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
        case "price-high":
          return parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, ''));
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

    return filtered;
  }, [allProducts, selectedCategory, sortBy, priceRange]);

  return (
    <>
      <SEO
        title="All Products | Complete Signage Collection | AB Signs"
        description="Browse our complete collection of professional door signs, restroom signs, office signage and custom architectural signage. Find the perfect sign for your needs."
        canonical="/products"
        type="website"
      />
      <div className="min-h-screen bg-background">
        <EditorToolbar />
        
        <PageEditor>
        <DraggableSection id="header">
          <Header showFilters={true} />
        </DraggableSection>
          
          <DraggableSection id="navigation">
            <ImprovedNavigation />
          </DraggableSection>
        
          <DraggableSection id="all-products-content" className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="text-center mb-16">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  All Products
                </h1>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="mb-12">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-4">
                      {/* Category Filter */}
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-48 border border-input bg-background hover:bg-accent transition-colors">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border border-border shadow-lg z-[100]">
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.length > 0 ? categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {getCategoryTitle(category)}
                            </SelectItem>
                          )) : (
                            <SelectItem value="no-categories" disabled>No categories available</SelectItem>
                          )}
                        </SelectContent>
                      </Select>

                      {/* Price Range Filter */}
                      <Select value={priceRange} onValueChange={setPriceRange}>
                        <SelectTrigger className="w-36 border border-input bg-background hover:bg-accent transition-colors">
                          <SelectValue placeholder="Price" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border border-border shadow-lg z-[100]">
                          <SelectItem value="all">All Prices</SelectItem>
                          <SelectItem value="under-25">Under $25</SelectItem>
                          <SelectItem value="25-50">$25 - $50</SelectItem>
                          <SelectItem value="50-100">$50 - $100</SelectItem>
                          <SelectItem value="over-100">Over $100</SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Sort */}
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-44 border border-input bg-background hover:bg-accent transition-colors">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border border-border shadow-lg z-[100]">
                          <SelectItem value="name">Name (A-Z)</SelectItem>
                          <SelectItem value="price-low">Price (Low to High)</SelectItem>
                          <SelectItem value="price-high">Price (High to Low)</SelectItem>
                          <SelectItem value="rating">Highest Rated</SelectItem>
                          <SelectItem value="reviews">Most Reviews</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg">
                        <span className="font-medium">{filteredAndSortedProducts.length}</span>
                        <span>of</span>
                        <span className="font-medium">{allProducts.length}</span>
                        <span>products</span>
                      </div>
                      
                      <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-lg">
                        <Button
                          variant={viewMode === "grid" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setViewMode("grid")}
                          className="h-8 w-8 p-0"
                        >
                          <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={viewMode === "list" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setViewMode("list")}
                          className="h-8 w-8 p-0"
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid/List */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 auto-rows-fr [&>*]:h-full"
                  : "space-y-6"
              }>
                {filteredAndSortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${(index % 20) * 0.05}s` }}
                  >
                    <ProductCard 
                      id={product.id}
                      name={product.name}
                      image={product.image}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      rating={product.rating}
                      reviews={product.reviews}
                      badges={product.badges}
                      materials={product.materials}
                      designs={product.designs}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Grid className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">No products found</h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    We couldn't find any products matching your criteria. Try adjusting your filters.
                  </p>
                  <Button 
                    size="lg"
                    onClick={() => {
                      setSelectedCategory("all");
                      setPriceRange("all");
                    }}
                    className="px-8 py-3 text-base font-semibold"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
          </DraggableSection>

          <DraggableSection id="footer">
            <ImprovedFooter />
          </DraggableSection>
        </PageEditor>
      </div>
    </>
  );
};

export default AllProducts;