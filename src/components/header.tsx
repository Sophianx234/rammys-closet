"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "./cart-context";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                RC
              </span>
            </div>
            <span className="hidden sm:inline font-semibold text-lg">
              Rammys Closet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/shop"
              className="text-sm hover:text-primary transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side - Search and Cart */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Search size={20} />
            </button>
            <Link href="/cart">
              <Button
                variant="outline"
                size="icon"
                className="relative bg-transparent"
              >
                <ShoppingCart size={20} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              href="/shop"
              className="block px-2 py-2 hover:bg-secondary rounded-lg transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="block px-2 py-2 hover:bg-secondary rounded-lg transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-2 py-2 hover:bg-secondary rounded-lg transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/account"
              className="block px-2 py-2 hover:bg-secondary rounded-lg transition-colors"
            >
              My Account
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
