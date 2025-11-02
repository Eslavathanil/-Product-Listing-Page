import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Sidebar } from "@/components/Sidebar";
import { ProductGrid, productData, Product } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState("recommended");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [isCustomizable, setIsCustomizable] = useState(false);

  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[category] || [];
      
      if (value === "all") {
        // Clear this category
        const newFilters = { ...prev };
        delete newFilters[category];
        return newFilters;
      }
      
      const isSelected = current.includes(value);
      const updated = isSelected
        ? current.filter((v) => v !== value)
        : [...current.filter((v) => v !== "all"), value];

      if (updated.length === 0) {
        const newFilters = { ...prev };
        delete newFilters[category];
        return newFilters;
      }

      return {
        ...prev,
        [category]: updated,
      };
    });
  };

  const filteredProducts = useMemo(() => {
    let filtered = productData;

    // Apply customizable filter
    if (isCustomizable) {
      // For demo purposes, filter out some products
      filtered = filtered.filter((_, index) => index % 3 === 0);
    }

    // Apply category filters
    Object.entries(selectedFilters).forEach(([category, values]) => {
      if (values.length > 0 && !values.includes("all")) {
        filtered = filtered.filter((product) => {
          const productValue = product[category as keyof Product];
          return values.includes(productValue as string);
        });
      }
    });

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case "newest":
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        // Random sort for demo
        sorted.sort(() => Math.random() - 0.5);
        break;
    }

    return sorted;
  }, [selectedFilters, sortBy, isCustomizable]);

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const handleClearAllFilters = () => {
    setSelectedFilters({});
    setIsCustomizable(false);
    toast({
      title: "Filters cleared",
      description: "All filters have been reset",
    });
  };

  const handleCartClick = () => {
    toast({
      title: "Cart",
      description: "Your shopping cart is empty",
    });
  };

  const activeFilterCount = Object.values(selectedFilters).reduce(
    (count, values) => count + values.length,
    0
  ) + (isCustomizable ? 1 : 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        cartCount={3} 
        wishlistCount={wishlist.size}
        onCartClick={handleCartClick}
      />
      <Hero />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="mb-6 flex items-center space-x-2">
                <Checkbox
                  id="customizable"
                  checked={isCustomizable}
                  onCheckedChange={(checked) => setIsCustomizable(checked as boolean)}
                />
                <Label htmlFor="customizable" className="text-sm font-medium cursor-pointer">
                  CUSTOMIZABLE
                </Label>
              </div>
              
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAllFilters}
                  className="mb-4 w-full"
                >
                  Clear all filters ({activeFilterCount})
                </Button>
              )}
              
              <Sidebar
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} ITEMS
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden ml-auto"
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  FILTER
                  {activeFilterCount > 0 && (
                    <span className="ml-2 bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-xs">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">RECOMMENDED</SelectItem>
                  <SelectItem value="newest">NEWEST FIRST</SelectItem>
                  <SelectItem value="popular">POPULAR</SelectItem>
                  <SelectItem value="price-low">PRICE: LOW TO HIGH</SelectItem>
                  <SelectItem value="price-high">PRICE: HIGH TO LOW</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Filter Drawer */}
            {isMobileFilterOpen && (
              <div className="fixed inset-0 bg-background z-50 md:hidden overflow-y-auto">
                <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">FILTERS</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileFilterOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-4">
                  <div className="mb-6 flex items-center space-x-2">
                    <Checkbox
                      id="customizable-mobile"
                      checked={isCustomizable}
                      onCheckedChange={(checked) => setIsCustomizable(checked as boolean)}
                    />
                    <Label htmlFor="customizable-mobile" className="text-sm font-medium cursor-pointer">
                      CUSTOMIZABLE
                    </Label>
                  </div>
                  
                  {activeFilterCount > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearAllFilters}
                      className="mb-4 w-full"
                    >
                      Clear all filters ({activeFilterCount})
                    </Button>
                  )}
                  
                  <Sidebar
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                  />
                  
                  <div className="mt-6 sticky bottom-0 bg-background pt-4 border-t">
                    <Button
                      className="w-full"
                      onClick={() => setIsMobileFilterOpen(false)}
                    >
                      View {filteredProducts.length} Products
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <ProductGrid
                products={filteredProducts}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
              />
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  No products match your filters
                </p>
                <Button variant="outline" onClick={handleClearAllFilters}>
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
