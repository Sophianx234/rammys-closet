"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaCog,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useCart } from "./cart-context";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useDashStore } from "@/lib/store";
import { useRouter } from "next/navigation";

// ⭐ NEW
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, cart,setUser } = useDashStore();
  const router = useRouter();

  function getInitials(name: string) {
    if (!name) return "";
    const parts = name.trim().split(" ");
    return (parts[0]?.[0] + (parts[1]?.[0] || "")).toUpperCase();
  }

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!res.ok) {
        console.error("Logout failed");
        return;
      }

      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
            <Link href="/shop" className="hover:text-primary text-sm">
              Shop
            </Link>
            <Link href="/about" className="hover:text-primary text-sm">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary text-sm">
              Contact
            </Link>
          </nav>

          {/* Right */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Search size={20} />
            </button>

            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative bg-transparent">
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* User */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {!user ? (
                  <button className="p-2 hover:bg-secondary rounded-full">
                    <FaUserCircle className="w-6 h-6" />
                  </button>
                ) : !user.profile ? (
                  <button className="w-9 h-9 flex items-center justify-center bg-secondary border text-primary rounded-full font-bold">
                    {getInitials(user.name)}
                  </button>
                ) : (
                  <button className="w-9 h-9 rounded-full overflow-hidden border hover:ring-2 hover:ring-primary transition-all">
                    <img src={user.profile} className="w-full h-full object-cover" />
                  </button>
                )}
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48 bg-neutral-900">
                {user && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2">
                        <FaUser /> My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center gap-2">
                        <FaShoppingBag /> Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link href="/wishlist" className="flex items-center gap-2">
                        <FaHeart /> Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center gap-2">
                        <FaCog /> Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}

                <DropdownMenuItem asChild>
                  <Link href="/login" className="flex items-center gap-2">
                    <FaSignInAlt /> Login
                  </Link>
                </DropdownMenuItem>

                {user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-500"
                      >
                        <FaSignOutAlt /> {isLoading ? "Logging out..." : "Logout"}
                      </button>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ⭐ Animated Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              key="mobile-menu"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="md:hidden pb-4 mt-2 space-y-2"
            >
              {[
                { name: "Shop", href: "/shop" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Login", href: "/login" },
              ].map((item) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-2 py-2 hover:bg-secondary rounded-lg"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
