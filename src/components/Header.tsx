import { ShoppingCart, Search, User, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartCount, wishlistCount, onCartClick }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      toast({
        title: "Searching...",
        description: `Searching for "${searchQuery}"`,
      });
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const handleUserClick = () => {
    toast({
      title: "Sign in",
      description: "Please sign in to your account",
    });
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-accent text-accent-foreground text-center py-2 text-sm">
        Free shipping on orders over $50
      </div>

      {/* Main Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-6">
                  <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                    SHOP
                  </a>
                  <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                    ABOUT
                  </a>
                  <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                    STORIES
                  </a>
                  <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                    BLOG
                  </a>
                  <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                    CONTACT US
                  </a>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-foreground">LOGO</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                SHOP
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                ABOUT
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                STORIES
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                BLOG
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                CONTACT US
              </a>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="h-auto">
                  <SheetHeader>
                    <SheetTitle>Search Products</SheetTitle>
                  </SheetHeader>
                  <div className="flex gap-2 mt-4">
                    <Input
                      placeholder="Search for products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <Button onClick={handleSearch}>Search</Button>
                  </div>
                </SheetContent>
              </Sheet>
              
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
              
              <Button variant="ghost" size="icon" onClick={handleUserClick}>
                <User className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
