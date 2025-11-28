

import Sidebar from "@/components/ui/side-bar";
import Topbar from "@/components/ui/topbar";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode, useState } from "react";
import '../globals.css';

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export default function AdminPage({ children }: { children: ReactNode}) {
 
  return (
       <html lang="en">

      <body className={`font-sans w-dvw flex  antialiased`}>

    <div className="overflow-hidden  bg-muted">
      <Sidebar  />
      <div className="flex-1 flex  flex-col">
        <Topbar />
        <main className=" p-2 sm:p-8">
         {children}
        </main>
      </div>
    </div>
      </body>
       </html>
  );
}
