import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Search,
  X,
  Home,
  Grid3X3,
  User,
  MessageCircle,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigationLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/products", label: "Categories", icon: Grid3X3 },
    { to: "/about", label: "About", icon: User },
    { to: "/contact", label: "Contact", icon: MessageCircle },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Search query:", searchQuery);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white/95 transition-all duration-200"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6 text-herb-green-dark" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-80 bg-herb-cream border-r-2 border-herb-green/20 p-0 overflow-y-auto"
        >
          <SheetHeader className="p-6 pb-4 border-b border-herb-green/10">
            <SheetTitle className="font-playfair text-2xl font-bold text-herb-green-dark text-left">
              Herb Aurora
            </SheetTitle>
            <p className="font-inter text-sm text-herb-green-dark/70 text-left mt-1">
              Pure Skin. Pure Roots. Pure You.
            </p>
          </SheetHeader>

          <div className="p-6 space-y-6">
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-herb-green-dark/50" />
                <Input
                  type="text"
                  placeholder="Search Herbal Products…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 font-inter text-sm bg-white border-herb-green/20 focus:border-herb-green focus:ring-herb-green/20 rounded-lg"
                />
              </div>
            </form>

            {/* Navigation Links */}
            <nav className="space-y-2">
              <h3 className="font-playfair font-semibold text-herb-green-dark text-lg mb-4">
                Navigation
              </h3>
              {navigationLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg font-inter text-herb-green-dark hover:bg-herb-green/10 hover:text-herb-green-dark transition-all duration-200 group"
                  >
                    <IconComponent className="h-5 w-5 text-herb-green group-hover:text-herb-green-dark transition-colors" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Additional Information */}
            <div className="pt-6 border-t border-herb-green/10">
              <div className="bg-herb-green/5 rounded-lg p-4">
                <h4 className="font-playfair font-semibold text-herb-green-dark text-base mb-2">
                  100% Natural & Chemical-Free
                </h4>
                <p className="font-inter text-sm text-herb-green-dark/70 leading-relaxed">
                  Handcrafted Tamil herbal skincare products for natural skin
                  glow and care.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-playfair font-semibold text-herb-green-dark text-base mb-2">
                Need Help?
              </h4>
              <p className="font-inter text-sm text-herb-green-dark/70 mb-3">
                Chat with us on WhatsApp for personalized recommendations.
              </p>
              <Button
                asChild
                className="w-full bg-herb-green hover:bg-herb-green-dark text-white font-inter font-medium py-2 rounded-lg transition-colors"
              >
                <a
                  href="https://wa.me/8248365737"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                >
                  Whatsapp Us
                </a>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HamburgerMenu;
