"use client";

// Import necessary modules from React and Next.js
import Brands from "@/components/brands";
import Hero from "@/components/hero";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Filter } from "lucide-react";
import { useState } from "react";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";


type Item = {
  title: string;
  price: number;
};

type SortOption = "default" | "A-Z" | "Z-A" | "low-to-high" | "high-to-low";

export default function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Products");
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  const categories = [
    "All Products",
    "Hoodies & Joggers",
    "T-shirts",
    "Caps & Hats",
  ];

  // Initialize filteredItems with all products
  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleSortChange = (option: SortOption): void => {
    setSortOption(option);

    // logic for sorting
    const sortedItems: Item[] = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
  };

  return (
    <div className="relative min-h-screen w-full mt-28 px-2 xl:px-24">
      {/* Hero */}
      <Hero />

      {/* Brands */}
      <div className="h-full px-4 xl:px-24 overflow-hidden py-12">
        <Brands />
      </div>

      {/* Explore New & Popular Styles */}
      <div className="h-full mx-auto lg:mt-20 px-7">
        <div className="mt-8 flex flex-col lg:flex-row items-center gap-6 ">
          <div className="lg:w-auto flex flex-col items-center lg:items-start">
            <h5 className="text-black text-center lg:text-left text-lg lg:-rotate-90 lg:p-4 font-bold py-3 inline-flex italic tracking-wide">
              Explore New & Popular Styles
            </h5>
            <div className="bg-gradient-to-r from-[#ff7f50] to-[#ff6b35] w-32 h-1 lg:hidden rounded-full" />
          </div>

          <div className="flex-1 grid grid-cols-3 lg:grid-cols-6 gap-3 h-[600px] lg:h-[700px] w-full">
            {/* Large featured item - spans 2x3 */}
            <div className="col-span-4 row-span-2 group relative overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/hoodie.jpeg"
                alt="featured hoodie"
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs font-medium">New Collection</p>
                <h3 className="text-xs font-bold">Premium Hoodies</h3>
              </div>
            </div>

            {/* Top right - cap */}
            <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-xl">
              <Image
                src="/images/cap.jpeg"
                alt="cap"
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs font-medium">New Collection</p>
                <h3 className="text-xs font-bold">Premium Cap</h3>
              </div>
            </div>

            {/* Middle right - shirt */}
            <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-xl">
              <Image
                src="/images/image5.png"
                alt="black sweater"
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs font-medium">New Collection</p>
                <h3 className="text-xs font-bold">Black Striped sweater</h3>
              </div>
            </div>

            {/* Bottom left under main image */}
            <div className="col-span-4 row-span-4 xl:row-span-2 group relative overflow-hidden rounded-xl">
              <Image
                src="/images/1.jpg"
                alt="men's summer shirt"
                width={100}
                height={100}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs font-medium">New Collection</p>
                <h3 className="text-xs font-bold">Summer shirt</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parallax */}
      <div className="px-4 ">
        <div
          className="relative h-[480px] bg-cover xl:px-28 px-4 bg-fixed bg-center bg-no-repeat my-24 bg-black object-cover rounded-4xl"
          style={{ backgroundImage: 'url("/parallax/parallax.jpg")' }}
        >
          <div className="absolute inset-0 bg-black/50 rounded-4xl" />
          <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between object-cover">
            <div className="md:w-1/2 my-10">
              <h4 className="text-gray-400 uppercase font-bold mt-20 text-sm ">
                Mid season sale
              </h4>
              <h2 className="text-white text-4xl font-bold mt-2 capitalize mb-6 italic">
                Summer Collection Up To 20% Discount
              </h2>
              <Button
                size="lg"
                className="rounded-full relative cursor-pointer mt-6"
              >
                <span className="pr-8">View Collection</span>

                <span className="absolute right-1 border border-white rounded-full p-1 bg-white text-black">
                  <ArrowRight className="w-6 h-6 " />
                </span>
              </Button>
            </div>
            <div className="md:w-1/2"></div>
          </div>
        </div>
      </div>

      {/* New Arrivals */}
      <div className="h-screen container px-4 py-5 xl:px-24">
        <h2 className="text-lg">Popular Products</h2>
        <div className="bg-gradient-to-r from-[#ff7f50] to-[#ff6b35] w-24 h-1 rounded-full mx-5 my-2" />

        <div className="flex flex-col lg:flex-row lg:justify-between mt-5">
          {/* Category Filter */}
          <div
            role="toolbar"
            aria-label="Category Filter"
            className="flex flex-wrap gap-4 mb-8 lg:mb-0 py-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-3 sm:px-4 md:px-6 py-2 transition-all rounded-full",
                  selectedCategory === category
                    ? "bg-[#ff7f50] text-white"
                    : "bg-muted hover:bg-[#ff7f50]/10"
                )}
                aria-pressed={selectedCategory === category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Filter Options */}
          <div className="justify-end items-center hidden lg:flex">
            {/* Filter Button */}
            <Button
              variant="outline"
              className="bg-black text-white p-2 rounded-sm"
            >
              <Filter className="w-4 h-4" />
            </Button>

            {/* Select Dropdown */}
            <Select onValueChange={handleSortChange} defaultValue={sortOption}>
              <SelectTrigger className="bg-black text-white py-1 rounded-sm outline-none">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="A-Z">A-Z</SelectItem>
                <SelectItem value="Z-A">Z-A</SelectItem>
                <SelectItem value="low-to-high">Low to High</SelectItem>
                <SelectItem value="high-to-low">High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>


      {/* Testimonials */}
    </div>
  );
}