"use client";

import Link from "next/link";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Shop", path: "/shop" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 xl:px-24 bg-white text-black  transition-all duration-300 border border-b-gray-200">
      <nav className="flex justify-between items-center container py-2 lg:py-1 xl:px-20">
        <Link href="/" className="flex flex-col items-center">
          <h2 className="font-bold text-3xl tracking-[3px] font-cormorant italic">
            Chic
          </h2>
          <h6 className="font-montserrat text-xs">En Vogue</h6>
          <div className="bg-[#ff7f50] w-10 h-[2px] mt-2 mb-3 mx-auto"></div>
        </Link>

        <div className="flex items-center gap-4 ">
          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map(({ title, path }) => (
              <li key={title} className="hover:text-orange-500 text-gray-600">
                <Link href={path}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          <Search className="w-4 h-4 cursor-pointer" />


          <Link href="/" className="flex items-center gap-3 relative">
            <ShoppingCart className="w-4 h-4" />
            <span className="absolute top-2/4 left-1/2 bg-orange-400 text-white text-xs w-5 h-5 rounded-full flex justify-center items-center">
              0
            </span>
          </Link>
          <Link href="/">
            <span className="flex items-center gap-3">
              <User className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div
          className={`fixed top-0 left-0 h-full w-64 bg-black text-white transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="text-center p-10 flex flex-col gap-4">
            {navItems.map(({ title, path }) => (
              <li
                key={title}
                className="hover:text-orange-500 my-3 cursor-pointer"
              >
                <Link href={path} onClick={toggleMenu}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
