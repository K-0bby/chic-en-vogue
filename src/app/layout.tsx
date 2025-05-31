import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
// import Footer from "@/components/ui/footer";
import ClientWrapper from "./client-wrapper";

const cormorantSans = Cormorant_Garamond({
  variable: "--font-cormorant-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Chic En Vogue",
    default: "Chic En Vogue",
  },
  description:
    "Discover timeless elegance and modern style at Chic en Vogue. Shop curated fashion that inspire confidence and individuality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantSans.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
