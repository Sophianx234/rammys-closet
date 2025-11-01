"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "./cart-context";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

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
              <span className="text-primary-foreground font-bold text-sm">RC</span>
            </div>
            <span className="hidden sm:inline font-semibold text-lg">
              Rammys Closet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-sm hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-sm hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative bg-transparent">
                <ShoppingCart size={20} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                  <FaUserCircle className="w-6 h-6 text-foreground" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button className="w-full text-left text-red-500 hover:text-red-600">
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
            <Link href="/shop" className="block px-2 py-2 hover:bg-secondary rounded-lg">
              Shop
            </Link>
            <Link href="/about" className="block px-2 py-2 hover:bg-secondary rounded-lg">
              About
            </Link>
            <Link href="/contact" className="block px-2 py-2 hover:bg-secondary rounded-lg">
              Contact
            </Link>
            <Link href="/account" className="block px-2 py-2 hover:bg-secondary rounded-lg">
              My Account
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
