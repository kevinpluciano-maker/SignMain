import { getAllProducts, getCategoryTitle } from "@/data/productsData";
import { updateProductsWithCategories, getCategoryInfo } from "@/utils/categoryUtils";
import ProductCard from "@/components/ProductCard";

const AllProductsSimple = () => {
  const rawProducts = getAllProducts();
  const allProducts = updateProductsWithCategories(rawProducts);
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">All Products</h1>
        <p className="text-center mb-8">Showing {allProducts.length} products</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProducts.map((product) => (
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProductsSimple;