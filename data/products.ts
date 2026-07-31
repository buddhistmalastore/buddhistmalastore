import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",

    slug: "natural-tiger-eye-mala",

    name: "Natural Tiger Eye Mala",

    shortDescription:
      "Premium handcrafted Tiger Eye Buddhist Mala",

    description:
      "Handcrafted in Nepal using authentic 8 mm natural Tiger Eye gemstones with traditional knotting and guru bead.",

    image: "/products/tiger-eye.jpg",

    gallery: [
      "/products/tiger-eye.jpg",
      "/products/tiger-eye-2.jpg",
      "/products/tiger-eye-3.jpg",
    ],

    category: "Gemstone Mala",

    material: "Tiger Eye",

    origin: "Nepal",

    beadSize: 8,

    beadCount: 108,

    weight: 92,

    price: 5990,

    sku: "BM-TG-108",

    stock: 12,

    inStock: true,

    rating: 4.9,

    reviewCount: 28,

    badge: "Best Seller",

    featured: true,
  },

  {
    id: "2",

    slug: "rose-quartz-mala",

    name: "Rose Quartz Mala",

    shortDescription:
      "Luxury handcrafted Rose Quartz Mala",

    description:
      "Traditional Nepalese handcrafted Rose Quartz mala designed for meditation and compassion.",

    image: "/products/rose-quartz.jpg",

    gallery: [
      "/products/rose-quartz.jpg",
    ],

    category: "Gemstone Mala",

    material: "Rose Quartz",

    origin: "Nepal",

    beadSize: 8,

    beadCount: 108,

    weight: 88,

    price: 5690,

    sku: "BM-RQ-108",

    stock: 8,

    inStock: true,

    rating: 4.8,

    reviewCount: 17,

    badge: "New",

    featured: true,
  },
];