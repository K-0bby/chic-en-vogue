"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

type SortOption = "default" | "A-Z" | "Z-A" | "low-to-high" | "high-to-low";

type FeaturedProductsProps = {
  products: Product[];
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Products");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const categories = [
    "All Products",
    "Hoodies & Joggers",
    "T-shirts",
    "Caps & Hats",
  ];

  // Compute filtered and sorted items dynamically
  const filteredAndSortedItems = useMemo(() => {
    const filtered =
      selectedCategory === "All Products"
        ? products
        : products.filter((product) => product.category === selectedCategory);

    if (sortOption === "A-Z") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "Z-A") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, selectedCategory, sortOption]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:justify-between mt-5">
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
          <Select
            onValueChange={(value) => setSortOption(value as SortOption)}
            defaultValue={sortOption}
          >
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {filteredAndSortedItems.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <Image
              src={`/${product.image}`}
              alt={product.name}
              width={100}
              height={100}
              className="w-full h-60 object-cover rounded-md"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
