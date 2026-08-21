import { Product } from "@/types/product";

interface WooCommerceImage {
  src: string;
  alt?: string;
}

interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
}

interface WooCommerceAttribute {
  id: number;
  name: string;
  slug: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

interface WooCommerceProduct {
  id: number;
  slug: string;
  name: string;
  sku: string;

  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;

  stock_quantity: number | null;
  stock_status: string;

  featured: boolean;

  average_rating: string;
  rating_count: number;

  categories: WooCommerceCategory[];

  images: WooCommerceImage[];

  attributes: WooCommerceAttribute[];

  short_description: string;
  description: string;
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function getAttribute(
  attributes: WooCommerceAttribute[],
  name: string
): string {
  const attribute = attributes.find(
    (item) =>
      item.name.toLowerCase() === name.toLowerCase()
  );

  return attribute?.options?.[0] || "";
}

function getAttributeValues(
  attributes: WooCommerceAttribute[],
  name: string
): string[] {
  const attribute = attributes.find(
    (item) =>
      item.name.toLowerCase() === name.toLowerCase()
  );

  return attribute?.options || [];
}

export function mapWooCommerceProduct(
  product: WooCommerceProduct
): Product {
  const price = Number(
    product.price ||
      product.regular_price ||
      0
  );

  const regularPrice = Number(
    product.regular_price || 0
  );

  const salePrice = Number(
    product.sale_price || 0
  );

  const oldPrice =
    product.on_sale &&
    regularPrice > salePrice
      ? regularPrice
      : undefined;

  const discount =
    oldPrice && price < oldPrice
      ? Math.round(
          ((oldPrice - price) / oldPrice) * 100
        )
      : undefined;

  const images = product.images.map(
    (image) => image.src
  );

  const category =
    product.categories.find(
      (category) =>
        category.slug !== "uncategorized"
    )?.name ||
    product.categories[0]?.name ||
    "Uncategorized";

  const rating = Number(
    product.average_rating || 0
  );

  // WooCommerce Attributes
  const beadSize = getAttribute(
    product.attributes,
    "Bead Size"
  );

  const beadCountValue = getAttribute(
    product.attributes,
    "Bead Count"
  );

  const beadCount = Number(
    beadCountValue.replace(/\D/g, "")
  ) || 0;

  const chakra = getAttribute(
    product.attributes,
    "Chakra"
  );

  const collection = getAttribute(
    product.attributes,
    "Collection"
  );

  const element = getAttribute(
    product.attributes,
    "Element"
  );

  const gemstone = getAttribute(
    product.attributes,
    "Gemstone"
  );

  const material = getAttribute(
    product.attributes,
    "Material"
  );

  const origin = getAttribute(
    product.attributes,
    "Origin"
  );

  const purpose = getAttributeValues(
    product.attributes,
    "Purpose"
  );

  const weight = getAttribute(
    product.attributes,
    "Weight"
  );

  const zodiac = getAttributeValues(
    product.attributes,
    "Zodiac"
  );

  return {
    id: product.id,
    slug: product.slug,

    name: product.name,
    shortName: product.name,
    sku: product.sku,

    category,

    collection: collection || "General",

    material,

    gemstone,

    origin,

    beadSize,

    beadCount,

    weight,

    purpose,

    chakra,

    zodiac,

    element,

    price,
    oldPrice,
    discount,

    rating,
    reviews: product.rating_count,

    stock:
      product.stock_quantity ?? 0,

    featured: product.featured,

    bestSeller: false,

    newArrival: false,

    badge: product.featured
      ? "New"
      : product.on_sale
        ? "Sale"
        : undefined,

    images,

    shortDescription:
      stripHtml(
        product.short_description
      ),

    description:
      stripHtml(product.description),

    metaTitle: product.name,

    metaDescription:
      stripHtml(
        product.short_description
      ),
  };
}