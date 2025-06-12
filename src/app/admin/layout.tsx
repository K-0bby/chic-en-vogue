"use client";

import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-dashboard/sidebar";

export const dynamic = "force-dynamic";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarTrigger className="mt-2" />
      <main className="max-w-8xl w-full p-2 md:p-6 mx-auto flex-1 ">
        <div className="pb-1" />
        {children}
      </main>
      {/* <Toaster /> */}
    </SidebarProvider>
  );
}
