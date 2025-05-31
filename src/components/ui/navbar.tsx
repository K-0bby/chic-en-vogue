"use client";

import Link from "next/link";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
// import {
//   Avatar,
//   AvatarImage,
//   AvatarFallback,
// } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <header className="fixed top-0 left-0 right-0 z-50 px-6 xl:px-16 bg-white text-black  transition-all duration-300 border border-b-gray-200">
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
           {/* <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar>
                <AvatarImage
                  src="/avatar.png"
                  alt="user"
                  className="border border-[#F3C5D5] rounded-full bg-[#F3C5D5]"
                />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>

              <span className="text-sm font-medium text-gray-700">
                Sharon Sings
              </span>
              <span
                className={`text-gray-700 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4"
                >
                  <path
                    d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-lg">
            <div className="border border-gray-200 rounded-lg">
              <DropdownMenuItem asChild>
                <Link href="/profile-settings" className="flex items-center gap-2">
                  <UserRoundPen />
                  Profile settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/new-account" className="flex items-center gap-2">
                  <UserRoundPlus />
                  New account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/logout" className="flex items-center gap-2">
                  <LogOut />
                  Logout
                </Link>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu> */}
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
