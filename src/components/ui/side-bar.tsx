"use client";

import {
  LayoutDashboard,
  Package2,
  ShoppingCart,
  UsersRound,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  LayoutGrid,
  LucidePanelLeft,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { name: "Overview", key: "overview", icon: LayoutDashboard },
  { name: "Products", key: "products", icon: Package2 },
  { name: "Orders", key: "orders", icon: ShoppingCart },
  { name: "Customers", key: "customers", icon: UsersRound },
  { name: "Analytics", key: "analytics", icon: BarChart3 },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen flex sticky top-0 flex-col border-r border-neutral-800 bg-[#0A0A0A] text-neutral-200 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* HEADER */}
     <div className="flex items-center justify-between h-16 border-b border-neutral-800 px-4">
  {!collapsed && (
    <div className="flex items-center gap-3">
      {/* Logo */}
      <img
        src="/x-1.jpg" // Replace with your logo path
        alt="Logo"
        className="size-9 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h1 className="text- font-bold tracking-tight text-white">
          Rammy’s Closet
        </h1>
        <p className="text-xs text-muted-foreground hidden sm:block">
          Admin Dashboard
        </p>
      </div>
    </div>
  )}
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setCollapsed(!collapsed)}
    className="text-neutral-400 hover:text-white"
  >
    <LucidePanelLeft size={20}/>
  </Button>
</div>

      {/* NAVIGATION */}
      <nav className="flex-1 flex flex-col gap-1 p-3">
        {navItems.map(({ name, key, icon: Icon }) => {
          const active = activeTab === key;
          return (
            <motion.button
              key={key}
              onClick={() => setActiveTab(key)}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              <Icon
                size={20}
                className={`transition-colors ${
                  active ? "text-rose-400" : "text-neutral-500"
                }`}
              />
              {!collapsed && <span>{name}</span>}
              {active && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-pink-500 to-fuchsia-500 rounded-r"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* FOOTER ACTIONS */}
      <div className="border-t border-neutral-800 p-3 mt-auto space-y-1">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
        >
          <Settings size={19} className="text-neutral-500" />
          {!collapsed && "Settings"}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-rose-500 hover:text-rose-400 hover:bg-neutral-900 transition-all"
        >
          <LogOut size={19} className="text-rose-500" />
          {!collapsed && "Logout"}
        </motion.button>
      </div>
    </aside>
  );
}
