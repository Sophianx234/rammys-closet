"use client";

import { useState } from "react";
import { Bell, Search, LogOut, Settings, User, Menu, LayoutDashboard, Package2, ShoppingCart, UsersRound } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useDashStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const [notifications] = useState(2);
  const { user, setUser } = useDashStore();
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <>
      {/* ---------- TOPBAR ---------- */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50  w-dvw sm:w-full  h-16 flex items-center justify-between border-b border-border bg-gradient-to-r from-neutral-900/90 to-black/80 backdrop-blur-xl px-6 shadow-sm"
      >
        {/* Left: Menu button + Logo */}
        <div className="flex items-center gap-3">
          
            <Menu onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden text-muted-foreground hover:text-foreground" />
          
        </div>

        {/* Center: Search bar (Desktop only) */}
        <div className="hidden md:flex items-center relative w-1/3">
          <Search
            size={18}
            className="absolute left-3 text-muted-foreground pointer-events-none"
          />
          <Input
            placeholder="Search products, orders, or users..."
            className="pl-10 pr-4 h-9 bg-neutral-800/60 border-neutral-700 focus-visible:ring-rose-500/30 text-sm placeholder:text-neutral-500"
          />
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-5">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-transparent border border-transparent hover:border-gray-300 transition-all hover:border text-muted-foreground hover:text-white"
          >
            <Bell size={20} />
            {notifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
            )}
          </Button>

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {user ? (
                <button className="group flex items-center gap-3 rounded-full bg-neutral-900/70 border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800/80 transition p-1.5 pr-3">
                  {user.profile ? (
                    <img
                      src={user.profile}
                      alt={user.name}
                      width={36}
                      height={36}
                      className="rounded-full size-9 object-cover border border-neutral-700"
                    />
                  ) : (
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-700 border border-neutral-700 text-white font-semibold text-sm">
                      {user.name
                        ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
                        : "U"}
                    </div>
                  )}

                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-semibold text-white leading-tight">
                      {user.name || "Unknown"}
                    </span>
                    <span className="text-[11px] text-neutral-400">Admin</span>
                  </div>
                </button>
              ) : (
                <div className="flex items-center gap-3 rounded-full bg-neutral-900/70 border border-neutral-700 p-1.5 pr-3 animate-pulse">
                  <div className="w-9 h-9 rounded-full bg-neutral-700/70" />
                  <div className="hidden sm:flex flex-col items-start gap-1">
                    <div className="h-3 w-20 rounded bg-neutral-700/70" />
                    <div className="h-2.5 w-14 rounded bg-neutral-700/70" />
                  </div>
                </div>
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-52 bg-neutral-900 border border-neutral-800 text-neutral-200"
            >
              <DropdownMenuLabel className="text-neutral-400 text-xs">
                Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-neutral-800" />

              <DropdownMenuItem className="hover:bg-neutral-800">
                <Link href="/admin/settings" className="w-full flex items-center">
                  <Settings className="mr-2 h-4 w-4 text-neutral-400" /> Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-neutral-800" />

              <div
                onClick={handleLogout}
                className="text-rose-500 hover:text-rose-400 hover:bg-neutral-800 flex items-center px-3 py-2 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />{" "}
                {loading ? "Logging out..." : "Logout"}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.header>

      {/* ---------- MOBILE NAV DROPDOWN ---------- */}
      {/* ---------- MOBILE NAV DROPDOWN ---------- */}
<AnimatePresence>
  {mobileMenuOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="md:hidden absolute top-16 left-0 w-full z-40 bg-neutral-900 border-b border-neutral-800 shadow-xl"
    >
      <div className="flex flex-col p-3 space-y-2">

        {user?.role === "admin" &&<Link
          href="/admin/overview"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800"
        >
          <LayoutDashboard size={18} /> Overview
        </Link>
}

        {user?.role === "admin" &&  <Link
          href="/admin/products"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800"
        >
          <Package2 size={18} /> Products
        </Link>}

        <Link
          href="/admin/orders"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800"
        >
          <ShoppingCart size={18} /> Orders
        </Link>

        {user?.role === "admin" &&<Link
          href="/admin/customers"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800"
        >
          <UsersRound size={18} /> Customers
        </Link>
}
        <div
          
          onClick={handleLogout}
          className="flex items-center text-red-400 gap-3 px-4 py-2 rounded-lg  hover:bg-neutral-800"
        >
          <LogOut size={18} /> {loading?'logging out...':"logout"}
        </div>

      </div>
    </motion.div>
  )}
</AnimatePresence>

    </>
  );
}
