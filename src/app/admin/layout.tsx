"use client";

import { ReactNode, useEffect, useState } from "react";
import OverviewTab from "./overview/page";
import ProductsTab from "./products/page";
import Sidebar from "@/components/ui/side-bar";
import Topbar from "@/components/ui/topbar";
import { useDashStore } from "@/lib/store";
import { IUser } from "@/models/User";

export default function AdminPage({ children }: { children: ReactNode}) {
  const [activeTab, setActiveTab] = useState("overview");
  const {setUser} = useDashStore()

     useEffect(()=>{
    const getMe = async()=>{
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      if(res.ok ){
        setUser(data.user as IUser)
        console.log('user', data.user)
        
        
  }
}
    getMe()
  },[]) 

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
