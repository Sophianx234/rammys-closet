"use client";

import { ReactNode, useState } from "react";
import OverviewTab from "./overview/page";
import ProductsTab from "./products/page";
import Sidebar from "@/components/ui/side-bar";
import Topbar from "@/components/ui/topbar";

export default function AdminPage({ children }: { children: ReactNode}) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex   bg-muted">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex  flex-col">
        <Topbar />
        <main className="  p-8">
         {children}
        </main>
      </div>
    </div>
  );
}
