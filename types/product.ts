export interface Product {
  id: string;

  slug: string;

  name: string;

  shortDescription: string;

  description: string;

  /* Images */

  images: {
    front: string;
    back: string;
    gallery: string[];
  };

  /* Category */

  category: string;

  material: string;

  origin: string;

  /* Beads */

  beadSize: number;

  beadCount: number;

  weight: number;

  /* Price */

  price: number;

  salePrice?: number;

  /* Inventory */

  sku: string;

  stock: number;

  inStock: boolean;

  /* Reviews */

  rating: number;

  reviewCount: number;

  /* Labels */

  badge?: "New" | "Best Seller" | "Limited" | "Sale";

  featured: boolean;

  /* Product Details */

  color?: string;

  chakra?: string;

  benefits?: string[];

  specifications?: {
    thread: string;
    guruBead: string;
    knotting: string;
  };
}