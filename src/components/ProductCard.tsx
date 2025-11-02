import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  occasion?: string;
  work?: string;
  fabric?: string;
  segment?: string;
  suitableFor?: string;
  rawMaterials?: string;
  pattern?: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.category && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
            {product.category}
          </Badge>
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-medium text-foreground line-clamp-2">{product.name}</h3>
        <p className="text-lg font-semibold text-accent">${product.price.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
};
