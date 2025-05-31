import { brands } from "@/lib/data";
import Image from "next/image";

export default function Brands() {
  return (
    <div className="flex items-center-safe animate-scroll ">
      {brands.map((brand) => (
        <div key={brand.id} className="flex-shrink-0 mx-8 w-32 h-16 flex justify-center">
          <Image
            src={brand.image}
            alt={`Brand ${brand.id}`}
            width={300}
            height={300}
            className="object-cover filter grayscale hover:grayscale-0 transition-all"
          />
        </div>
      ))}
    </div>
  );
}