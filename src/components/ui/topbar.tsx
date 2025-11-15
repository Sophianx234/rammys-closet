"use client";

import { useState } from "react";
import { Bell, Search, LogOut, Settings, User, Menu } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
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

export default function Topbar() {
  const [notifications] = useState(2);

  const handleLogout = () => {
    // Hook to your logout logic
    console.log("Logging out...");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full h-16 flex items-center justify-between border-b border-border bg-gradient-to-r from-neutral-900/90 to-black/80 backdrop-blur-xl px-6 shadow-sm"
    >
      {/* Left: Brand + Mobile Menu */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-muted-foreground hover:text-foreground"
        >
          <Menu size={20} />
        </Button>

        <div className="flex flex-col">
         
        </div>
      </div>

      {/* Center: Search Bar */}
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

      {/* Right: Actions */}
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

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="group flex items-center gap-3 rounded-full bg-neutral-900/70 border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800/80 transition p-1.5 pr-3">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Admin Avatar"
                width={36}
                height={36}
                className="rounded-full border border-neutral-700"
              />
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-semibold text-white leading-tight">
                  Damian X
                </span>
                <span className="text-[11px] text-neutral-400">Admin</span>
              </div>
            </button>
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
              <User className="mr-2 h-4 w-4 text-neutral-400" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-neutral-800">
              <Settings className="mr-2 h-4 w-4 text-neutral-400" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-neutral-800" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-rose-500 hover:text-rose-400 hover:bg-neutral-800"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
}
