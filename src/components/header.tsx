"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
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
import { IUser } from "@/models/User";
import { useDashStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { items } = useCart();
  const { user, cart,setUser } = useDashStore();
  const router = useRouter()
  function getInitials(name: string) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  const first = parts[0]?.[0] || "";
  const last = parts[1]?.[0] || "";
  return (first + last).toUpperCase();
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

    // OPTIONAL: Clear Zustand / context state
    
      setUser(null);

    // Next.js 15 client redirect
    router.push("/login"); 
  } catch (error) {
    console.error("Logout error:", error);
  }
  finally {
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

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="outline"
                size="icon"
                className="relative bg-transparent"
              >
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {!user ? (
                  <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                    <FaUserCircle className="w-6 h-6 text-foreground" />
                  </button>
                ) : !user.profile? <button className="w-9 h-9 flex items-center justify-center bg-secondary border border-primary text-primary rounded-full font-bold">
      {getInitials(user.name) }
    </button>: (
                  <button className="w-9 h-9 rounded-full overflow-hidden border border-border hover:ring-2 hover:ring-primary transition-all">
                    <img
                      src={user?.profile}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </button>
                )}
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48 bg-neutral-900 border border-neutral-800 rounded-md shadow-lg">
  {user&&<>
  <DropdownMenuItem asChild>
    <Link
      href="/profile"
      className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
      >
      <FaUser className="text-primary/80 group-hover:text-black transition-colors" />
      My Profile
    </Link>
  </DropdownMenuItem>
  <DropdownMenuSeparator />
     


  <DropdownMenuItem asChild>
    <Link
      href="/orders"
      className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
    >
      <FaShoppingBag className="text-primary/80 group-hover:text-black transition-colors" />
      Orders
    </Link>
  </DropdownMenuItem>

  <DropdownMenuSeparator />

  <DropdownMenuItem asChild>
    <Link
      href="/wishlist"
      className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
    >
      <FaHeart className="text-primary/80 group-hover:text-black transition-colors" />
      Wishlist
    </Link>
  </DropdownMenuItem>

  <DropdownMenuSeparator />

  <DropdownMenuItem asChild>
    <Link
      href="/settings"
      className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
    >
      <FaCog className="text-primary/80 group-hover:text-black transition-colors" />
      Settings
    </Link>
  </DropdownMenuItem>

  <DropdownMenuSeparator />
 </>
  }
  <DropdownMenuItem asChild>
    <Link
      href="/login"
      className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
    >
      <FaSignInAlt className="text-primary/80 group-hover:text-black transition-colors" />
      Login
    </Link>
  </DropdownMenuItem>

  {user && (
    <>
      <DropdownMenuSeparator />

      <DropdownMenuItem asChild>
        <button onClick={handleLogout} className="group w-full text-left flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
          <FaSignOutAlt className="group-hover:text-black transition-colors" /> {isLoading?"Logging out...":"Logout"}
        </button>
      </DropdownMenuItem>
    </>
  )}
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
            <Link
              href="/shop"
              className="block px-2 py-2 hover:bg-secondary rounded-lg"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="block px-2 py-2 hover:bg-secondary rounded-lg"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-2 py-2 hover:bg-secondary rounded-lg"
            >
              Contact
            </Link>
            <Link
              href="/account"
              className="block px-2 py-2 hover:bg-secondary rounded-lg"
            >
              My Account
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
