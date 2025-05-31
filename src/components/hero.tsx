"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
// import { heroSlides } from "@/lib/data";
import Image from "next/image";

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Elegance in Every Detail ",
    subtitle: "Discover the latest trends",
    image: "/images/4.jpeg",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "Summer Collection 2024",
    subtitle: "Unleash your style",
    image: "/images/7.jpeg",
    cta: "Order Now",
  },
  {
    id: 3,
    title: "Head Wear Collection",
    subtitle: "Stylish and comfortable",
    image: "/images/5.jpeg",
    cta: "Explore Now",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <div className="relative h-[600px] overflow-hidden rounded-3xl mx-6 mt-6">
      <div className="absolute inset-0">
        <div className="w-full h-full">
          <Image
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative h-full flex items-center justify-center text-center text-white">
            <div className="max-w-2xl px-6 space-y-2">
              <h1 className="border border-gray-200 rounded-full w-fit px-3 py-2 mx-auto">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="font-extrabold text-3xl xl:text-4xl">
                {heroSlides[currentSlide].subtitle}
              </p>
              <Button className="rounded-full relative cursor-pointer mt-6">
                <span className="pr-8">{heroSlides[currentSlide].cta}</span>

                <span className="absolute right-1 border border-white rounded-full p-1 bg-white text-black">
                  <ArrowRight className="w-6 h-6 " />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* slider navigation */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          className="rounded-full w-7 h-7 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          className="rounded-full w-7 h-7 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Paginations dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
