import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  isNew?: boolean;
  category?: string;
  occasion?: string;
  work?: string;
  fabric?: string;
  segment?: string;
  materials?: string;
  pattern?: string;
}

export const productData: Product[] = [
  {
    id: "1",
    name: "PPXOC Milkyway dress in...",
    price: 300,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
    inStock: true,
    category: "women",
    occasion: "formal",
    fabric: "silk",
    segment: "premium",
    pattern: "solid",
  },
  {
    id: "2",
    name: "PPXOC Milkyway dress in...",
    price: 300,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop",
    inStock: true,
    isNew: true,
    category: "women",
    occasion: "party",
    fabric: "cotton",
    segment: "premium",
    pattern: "floral",
  },
  {
    id: "3",
    name: "Product name",
    price: 300,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=500&fit=crop",
    inStock: true,
    category: "men",
    occasion: "casual",
    fabric: "cotton",
    pattern: "striped",
  },
  {
    id: "4",
    name: "High-Quality",
    price: 200,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=500&fit=crop",
    inStock: true,
    category: "women",
    occasion: "casual",
    fabric: "cotton",
    segment: "budget",
  },
  {
    id: "5",
    name: "Product name",
    price: 250,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
    inStock: false,
    category: "men",
    occasion: "formal",
    fabric: "wool",
    segment: "premium",
  },
  {
    id: "6",
    name: "Milkyway dress",
    price: 300,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop",
    inStock: true,
    category: "women",
    occasion: "party",
    work: "handmade",
    fabric: "silk",
  },
  {
    id: "7",
    name: "Comfort Wear",
    price: 300,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=500&fit=crop",
    inStock: true,
    category: "men",
    occasion: "casual",
    fabric: "cotton",
    materials: "organic",
  },
  {
    id: "8",
    name: "Milkyway dress in...",
    price: 300,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=500&fit=crop",
    inStock: false,
    category: "women",
    fabric: "silk",
  },
  {
    id: "9",
    name: "Product Collection",
    price: 300,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
    inStock: true,
    category: "kids",
    occasion: "casual",
    pattern: "solid",
  },
  {
    id: "10",
    name: "Modern Styles",
    price: 300,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop",
    inStock: true,
    category: "women",
    work: "machine",
    fabric: "cotton",
  },
  {
    id: "11",
    name: "Comfort Wear",
    price: 300,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=500&fit=crop",
    inStock: true,
    category: "men",
    occasion: "casual",
    materials: "synthetic",
  },
  {
    id: "12",
    name: "Product name",
    price: 300,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=500&fit=crop",
    inStock: true,
    category: "women",
    pattern: "floral",
  },
];

interface ProductGridProps {
  products: Product[];
  wishlist: Set<string>;
  onToggleWishlist: (productId: string) => void;
}

export const ProductGrid = ({ products, wishlist, onToggleWishlist }: ProductGridProps) => {
  const handleWishlistClick = (product: Product) => {
    onToggleWishlist(product.id);
    const isAdding = !wishlist.has(product.id);
    
    toast({
      title: isAdding ? "Added to wishlist" : "Removed from wishlist",
      description: isAdding ? `${product.name} has been added to your wishlist` : `${product.name} has been removed from your wishlist`,
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => {
        const isInWishlist = wishlist.has(product.id);
        
        return (
          <div key={product.id} className="group relative">
            {/* Product Image */}
            <div className="relative aspect-[3/4] bg-muted mb-3 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Wishlist Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleWishlistClick(product)}
                className={`absolute top-2 right-2 bg-card/80 hover:bg-card transition-colors ${
                  isInWishlist ? "text-accent" : ""
                }`}
              >
                <Heart className={`h-4 w-4 ${isInWishlist ? "fill-accent" : ""}`} />
              </Button>

              {/* Out of Stock Badge */}
              {!product.inStock && (
                <Badge
                  variant="secondary"
                  className="absolute bottom-2 left-2 bg-muted text-muted-foreground"
                >
                  OUT OF STOCK
                </Badge>
              )}

              {/* New Badge */}
              {product.isNew && (
                <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                  NEW
                </Badge>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-foreground line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                ${product.price}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
