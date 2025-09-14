import { getAllProducts } from "@/data/productsData";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const AllProductsSimple = () => {
  const allProducts = getAllProducts();
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">All Products</h1>
        <p className="text-center mb-8">Showing {allProducts.length} products</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<span class="text-gray-500">Image not found</span>`;
                    }}
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-lg font-bold text-green-600 mb-2">{product.price}</p>
                <p className="text-sm text-gray-600 mb-4">{product.description.slice(0, 100)}...</p>
                <Link 
                  to={`/products/${product.id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProductsSimple;