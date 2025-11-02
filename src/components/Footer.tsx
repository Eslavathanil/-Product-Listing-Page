import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email && email.includes("@")) {
      toast({
        title: "Subscribed successfully!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    } else {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="border-b border-primary-foreground/20 pb-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-4">BE THE FIRST TO KNOW</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Sign up for updates from metta muse.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your e-mail..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="secondary" className="shrink-0" onClick={handleSubscribe}>
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">CONTACT US</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>+44 221 133 5360</li>
              <li>customercare@mettamuse.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">CURRENCY</h4>
            <p className="text-sm text-primary-foreground/80">USD</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-primary-foreground transition-smooth">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-smooth">
                  Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-smooth">
                  Artisans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-smooth">
                  Boutiques
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">FOLLOW US</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/80">
              Copyright © 2023 mettamuse. All rights reserved.
            </p>
            <div className="flex gap-2">
              <div className="h-8 w-12 bg-primary-foreground/10 rounded flex items-center justify-center text-xs">
                GPay
              </div>
              <div className="h-8 w-12 bg-primary-foreground/10 rounded flex items-center justify-center text-xs">
                MC
              </div>
              <div className="h-8 w-12 bg-primary-foreground/10 rounded flex items-center justify-center text-xs">
                PP
              </div>
              <div className="h-8 w-12 bg-primary-foreground/10 rounded flex items-center justify-center text-xs">
                AP
              </div>
              <div className="h-8 w-12 bg-primary-foreground/10 rounded flex items-center justify-center text-xs">
                OPay
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
