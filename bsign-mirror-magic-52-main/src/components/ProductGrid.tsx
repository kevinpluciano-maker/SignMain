import ProductCard from "./ProductCard";
import EditableProductCard from "./editor/EditableProductCard";
import { bestSellersProducts } from "@/data/bestSellersProducts";
import { Product } from "@/data/productsData";
import { useEditor } from "@/contexts/EditorContext";

interface ProductGridProps {
  products?: Product[] | any[];
  category?: string;
}

const ProductGrid = ({ products, category }: ProductGridProps = {}) => {
  const { isEditing, isPreviewing } = useEditor();
  
  // Use provided products or fallback to best sellers
  const displayProducts = products || bestSellersProducts;

  const ProductComponent = (isEditing || isPreviewing) ? EditableProductCard : ProductCard;


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8 px-2 sm:px-0">
      {displayProducts.map((product, index) => (
        <div 
          key={product.id} 
          className="animate-fade-in transition-all duration-300"
          style={{ animationDelay: `${(index % 15) * 0.08}s` }}
        >
          <ProductComponent {...product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;