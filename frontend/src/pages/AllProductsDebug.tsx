import { getAllProducts } from "@/data/productsData";

const AllProductsDebug = () => {
  const allProducts = getAllProducts();
  
  console.log("Debug: All products:", allProducts);
  console.log("Debug: Products length:", allProducts.length);
  
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold mb-8">Products Debug Page</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <p>Total products: {allProducts.length}</p>
        <div className="mt-4">
          {allProducts.length > 0 ? (
            <div className="space-y-2">
              {allProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="border p-2 rounded">
                  <strong>{product.name}</strong> - {product.price}
                </div>
              ))}
              {allProducts.length > 5 && (
                <p className="text-gray-500">... and {allProducts.length - 5} more</p>
              )}
            </div>
          ) : (
            <p className="text-red-500">No products found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProductsDebug;