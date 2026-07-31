export interface Product {
  id: string;

  slug: string;

  name: string;

  shortDescription: string;

  description: string;

  image: string;

  gallery: string[];

  category: string;

  material: string;

  origin: string;

  beadSize: number;

  beadCount: number;

  weight: number;

  price: number;

  salePrice?: number;

  sku: string;

  stock: number;

  inStock: boolean;

  rating: number;

  reviewCount: number;

  badge?: "New" | "Best Seller" | "Limited" | "Sale";

  featured: boolean;
}