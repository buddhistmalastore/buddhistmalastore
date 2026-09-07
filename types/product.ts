export interface Product {
  id: number;

  slug: string;

  // Basic
  name: string;
  shortName?: string;
  sku: string;

  // Categories
  category: string;
  collection: string;

  // Material
  material: string;
  gemstone: string;
  origin: string;

  // Beads
  beadSize: string;
  beadCount: number;
  weight?: string;

  // Spiritual
  purpose: string[];
  chakra?: string;
  zodiac?: string[];
  element?: string;

  // Pricing
  price: number;
  oldPrice?: number;
  discount?: number;

  // Reviews
  rating: number;
  reviews: number;

  // Inventory
  stock: number;

  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;

  badge?:
    | "New"
    | "Best Seller"
    | "Limited"
    | "Handmade"
    | "Sale";

  // Images
  images: string[];

  // Product Video
  // Optional so existing products continue working
  video?: string;

  // Description
  shortDescription: string;
  description: string;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
}