
interface Brands {
    id: number;
    image: string;
}

export const brands: Brands [] = [
{
    id: 1,
    image: '/brands/1.png',
  },
  {
    id: 2,
    image: '/brands/2.png',
  },
  {
    id: 3,
    image: '/brands/3.png',
  },
  {
    id: 4,
    image: '/brands/4.png',
  },
  {
    id: 5,
    image: '/brands/5.webp',
  },
  {
    id: 6,
    image: '/brands/6.png',
  },
  {
    id: 7,
    image: '/brands/1.webp',
  },
  {
    id: 8,
    image: '/brands/2.webp',
  },
  {
    id: 9,
    image: '/brands/3.webp',
  },
  {
    id: 10,
    image: '/brands/4.webp',
  },
  {
    id: 11,
    image: '/brands/6.webp',
  }
]

interface Products {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}


export const products: Products[] = [
  {
    id: 1,
    name: "Premium Hoodie",
    price: 49.99,
    category: "Hoodies & Joggers",
    image: "/products/hoodie1.jpg",
    description: "A comfortable and stylish hoodie made from high-quality materials."
  },
  {
    id: 2,
    name: "Classic T-Shirt",
    price: 19.99,
    category: "T-shirts",
    image: "/products/tshirt1.jpg",
    description: "A classic t-shirt that never goes out of style."
  },
  {
    id: 3,
    name: "Trendy Cap",
    price: 15.99,
    category: "Caps & Hats",
    image: "/products/cap1.jpg",
    description: "A trendy cap to complete your look."
  },
  {
    id: 4,
    name: "Jogger Pants",
    price: 39.99,
    category: "Hoodies & Joggers",
    image: "/products/jogger1.jpg",
    description: "Comfortable jogger pants for everyday wear."
  },
  {
    id: 5,
    name: "Graphic T-Shirt",
    price: 24.99,
    category: "T-shirts",
    image: "/products/tshirt2.jpg",
    description: "A graphic t-shirt with a unique design."
  },
  {
    id: 6,
    name: "Snapback Hat",
    price: 18.99,
    category: "Caps & Hats",
    image: "/products/cap2.jpg",
    description: "A stylish snapback hat for casual outings."
  }
]