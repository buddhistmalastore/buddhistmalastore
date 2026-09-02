import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Product } from "@/types/product";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

import ProductPageContent from "@/components/product-details/ProductPageContent";

import { getWooCommerceProducts } from "@/lib/woocommerce";
import { mapWooCommerceProduct } from "@/lib/woocommerceMapper";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SITE_URL = "https://buddhistmalastore.com";

/**
 * Get a product by its slug.
 */
async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const wooCommerceProducts =
    await getWooCommerceProducts();

  const products: Product[] =
    wooCommerceProducts.map(
      mapWooCommerceProduct
    );

  return products.find(
    (item) => item.slug === slug
  );
}

/**
 * Convert an image URL into an absolute URL.
 */
function getAbsoluteImageUrl(
  image: string
): string {
  if (image.startsWith("http")) {
    return image;
  }

  return `${SITE_URL}${
    image.startsWith("/") ? "" : "/"
  }${image}`;
}

/**
 * Create Product JSON-LD structured data.
 */
function createProductSchema(
  product: Product
) {
  const productUrl =
    `${SITE_URL}/product/${product.slug}`;

  const productImages =
    product.images?.map(
      getAbsoluteImageUrl
    ) ?? [];

  const description =
    product.metaDescription ||
    product.shortDescription ||
    product.description;

  const schema: Record<
    string,
    unknown
  > = {
    "@context":
      "https://schema.org",

    "@type": "Product",

    name: product.name,

    description,

    sku: product.sku,

    url: productUrl,

    image: productImages,

    brand: {
      "@type": "Brand",
      name: "Buddhist Mala Store",
    },

    category: product.category,

    material: product.material,

    offers: {
      "@type": "Offer",

      url: productUrl,

      priceCurrency: "USD",

      price:
        product.price.toFixed(2),

      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",

      itemCondition:
        "https://schema.org/NewCondition",

      seller: {
        "@type":
          "Organization",

        name: "Buddhist Mala Store",

        url: SITE_URL,
      },
    },
  };

  /**
   * Only add aggregateRating when
   * genuine review data exists.
   */
  if (
    product.reviews > 0 &&
    product.rating > 0
  ) {
    schema.aggregateRating = {
      "@type":
        "AggregateRating",

      ratingValue:
        product.rating.toFixed(1),

      reviewCount:
        product.reviews,

      bestRating: "5",

      worstRating: "1",
    };
  }

  return schema;
}

/**
 * Create BreadcrumbList JSON-LD.
 */
function createBreadcrumbSchema(
  product: Product
) {
  const productUrl =
    `${SITE_URL}/product/${product.slug}`;

  /**
   * The category URL points to the
   * Shop page with the WooCommerce
   * category filter.
   */
  const categoryUrl =
    `${SITE_URL}/shop?category=${encodeURIComponent(
      product.category
    )}`;

  return {
    "@context":
      "https://schema.org",

    "@type":
      "BreadcrumbList",

    itemListElement: [
      {
        "@type":
          "ListItem",

        position: 1,

        name: "Home",

        item: SITE_URL,
      },

      {
        "@type":
          "ListItem",

        position: 2,

        name: "Shop",

        item:
          `${SITE_URL}/shop`,
      },

      {
        "@type":
          "ListItem",

        position: 3,

        name: product.category,

        item: categoryUrl,
      },

      {
        "@type":
          "ListItem",

        position: 4,

        name: product.name,

        item: productUrl,
      },
    ],
  };
}

/**
 * Dynamic SEO metadata for every product.
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product =
    await getProductBySlug(slug);

  /**
   * Product does not exist.
   */
  if (!product) {
    return {
      title:
        "Product Not Found",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /**
   * Use WooCommerce SEO fields
   * when available.
   */
  const productTitle =
    product.metaTitle ||
    `${product.name} | Buddhist Mala Store`;

  const productDescription =
    product.metaDescription ||
    product.shortDescription ||
    `Shop ${product.name}, handcrafted in Nepal. Authentic Buddhist mala and spiritual handicraft from Buddhist Mala Store.`;

  const productUrl =
    `${SITE_URL}/product/${product.slug}`;

  /**
   * Use the actual WooCommerce
   * product image.
   *
   * Fall back to the site-wide
   * social image if necessary.
   */
  const productImage =
    product.images &&
    product.images.length > 0
      ? getAbsoluteImageUrl(
          product.images[0]
        )
      : `${SITE_URL}/og-image.jpg`;

  return {
    title:
      productTitle,

    description:
      productDescription,

    alternates: {
      canonical:
        productUrl,
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        "max-image-preview":
          "large",

        "max-snippet": -1,

        "max-video-preview":
          -1,
      },
    },

    openGraph: {
      type: "website",

      url: productUrl,

      siteName:
        "Buddhist Mala Store",

      title:
        productTitle,

      description:
        productDescription,

      locale: "en_US",

      images: [
        {
          url:
            productImage,

          alt:
            product.name,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        productTitle,

      description:
        productDescription,

      images: [
        productImage,
      ],
    },
  };
}

/**
 * Product detail page.
 */
export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  // Get live products from WooCommerce
  const wooCommerceProducts =
    await getWooCommerceProducts();

  // Convert WooCommerce products
  // to our Product format
  const products: Product[] =
    wooCommerceProducts.map(
      mapWooCommerceProduct
    );

  // Find current product
  const currentIndex =
    products.findIndex(
      (item) =>
        item.slug === slug
    );

  if (currentIndex === -1) {
    notFound();
  }

  const product =
    products[currentIndex];

  // Previous product
  const previous =
    currentIndex > 0
      ? products[
          currentIndex - 1
        ]
      : undefined;

  // Next product
  const next =
    currentIndex <
    products.length - 1
      ? products[
          currentIndex + 1
        ]
      : undefined;

  /*
   * Related Products
   *
   * First choose products from
   * the same category.
   *
   * If there are fewer than 4,
   * fill remaining positions
   * with other products.
   */
  const sameCategoryProducts =
    products.filter(
      (item) =>
        item.id !== product.id &&
        item.category ===
          product.category
    );

  const otherProducts =
    products.filter(
      (item) =>
        item.id !== product.id &&
        item.category !==
          product.category
    );

  const relatedProducts = [
    ...sameCategoryProducts,
    ...otherProducts,
  ].slice(0, 4);

  /**
   * Structured data.
   */
  const productSchema =
    createProductSchema(
      product
    );

  const breadcrumbSchema =
    createBreadcrumbSchema(
      product
    );

  return (
    <>
      {/* Product Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              productSchema
            ).replace(
              /</g,
              "\\u003c"
            ),
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbSchema
            ).replace(
              /</g,
              "\\u003c"
            ),
        }}
      />

      <Header />

      <ProductPageContent
        product={product}
        previous={
          previous
        }
        next={next}
        relatedProducts={
          relatedProducts
        }
      />

      <Footer />
    </>
  );
}