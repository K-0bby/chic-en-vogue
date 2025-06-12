// Import necessary modules from React and Next.js
import Brands from "@/components/brands";
import Hero from "@/components/hero";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";
import { FeaturedProducts } from "@/components/featured-products";



async function getNewestProducts() {
  const dbProducts = await prisma.product.findMany();
  return dbProducts.map((product) => ({
    id: product.id,
    name: product.name, // Map `name` to `title`
    price: product.price,
    category: product.categoryId, // Map `categoryId` to `category`
    image: product.imageUrl, // Map `imageUrl` to `image`
  }));
}

export default async function Home() {

  const products = await getNewestProducts()

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

                <span className="absolute right-1.5 border border-white rounded-full p-1 bg-white text-black">
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

       
          {/* Category Filter */}
          <FeaturedProducts products={products} />
        

        {/* Testimonials */}
      </div>
    </div>
  );
}
