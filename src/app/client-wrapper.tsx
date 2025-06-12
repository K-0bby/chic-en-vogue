"use client"; // Marks this as a client component

import { usePathname } from "next/navigation";
import Footer from "@/components/ui/footer"; // Adjust the import path as needed
import Navbar from "@/components/ui/navbar";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showFooter = !pathname.startsWith("/admin");
  const showNav = !pathname.startsWith("/admin") // Exclude footer on admin pages

  return (
    <>
      {showNav && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </>
  );
}
