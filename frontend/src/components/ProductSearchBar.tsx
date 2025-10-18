import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "@/data/productsData";

interface SearchResult {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

const ProductSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Search products
  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    // Get products inside useEffect to avoid dependency issues
    const allProducts = getAllProducts();
    
    const filtered = allProducts
      .filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.category?.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower)
      )
      .slice(0, 6)
      .map(p => ({
        id: p.id,
        name: p.name,
        category: p.category || 'Product',
        price: typeof p.price === 'string' ? parseFloat(p.price.replace(/[^0-9.]/g, '')) : p.price,
        image: p.image
      }));

    setResults(filtered);
  }, [searchTerm]); // Only depend on searchTerm

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleViewAll = () => {
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="relative flex-1 max-w-xl" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search products, room types, ADA signs..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10 h-11 w-full bg-white/90 backdrop-blur-sm border-gray-300 focus:border-cyan-500"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              setResults([]);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && searchTerm.trim().length >= 2 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-2">No products found</p>
              <p className="text-sm text-gray-400">Try searching for "door signs", "restroom", or "ADA"</p>
            </div>
          ) : (
            <>
              <div className="p-2">
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleProductClick(result.id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                  >
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{result.name}</p>
                      <p className="text-sm text-gray-500">{result.category}</p>
                    </div>
                    <span className="text-cyan-600 font-semibold">${result.price}</span>
                  </button>
                ))}
              </div>
              <div className="border-t p-3 bg-gray-50">
                <button
                  onClick={handleViewAll}
                  className="w-full text-center text-cyan-600 font-medium hover:text-cyan-700"
                >
                  View all results for "{searchTerm}"
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearchBar;
