"use client"; // Marks this as a client component

import { usePathname } from "next/navigation";
import Footer from "@/components/ui/footer"; // Adjust the import path as needed

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showFooter = !pathname.startsWith("/admin"); // Exclude footer on admin pages

  return (
    <>
      {children}
      {showFooter && <Footer />}
    </>
  );
}
