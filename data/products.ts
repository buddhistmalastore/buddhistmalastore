import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    slug: "tiger-eye-meditation-mala",
    sku: "BMS-001",

    name: "Tiger Eye Meditation Mala",
    shortName: "Tiger Eye Mala",

    category: "Gemstone",
    collection: "Meditation",

    material: "Tiger Eye",
    gemstone: "Tiger Eye",
    origin: "Nepal",

    beadSize: "8mm",
    beadCount: 108,
    weight: "92g",

    purpose: [
      "Protection",
      "Confidence",
      "Prosperity",
    ],

    chakra: "Solar Plexus",

    zodiac: [
      "Leo",
      "Capricorn",
    ],

    element: "Earth",

    price: 149,
    oldPrice: 189,
    discount: 20,

    rating: 4.9,
    reviews: 128,

    stock: 25,

    featured: true,
    bestSeller: true,
    newArrival: false,

    badge: "Best Seller",

    images: [
      "/products/tiger-eye-1.jpg",
      "/products/tiger-eye-2.jpg",
    ],

    shortDescription:
      "Authentic handcrafted Tiger Eye Mala.",

    description:
      "Premium handcrafted Tiger Eye meditation mala made in Nepal using natural gemstones and traditional craftsmanship.",

    metaTitle:
      "Tiger Eye Meditation Mala",

    metaDescription:
      "Handmade Tiger Eye Mala from Nepal.",
  },
];