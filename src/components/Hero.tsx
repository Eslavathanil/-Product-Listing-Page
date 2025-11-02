import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="bg-muted py-12 md:py-16 relative">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          DISCOVER OUR PRODUCTS
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
          Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque. Dolor
          integer scelerisque nibh amet mi ut elementum dolor.
        </p>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </section>
  );
};
