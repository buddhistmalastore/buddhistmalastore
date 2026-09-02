import type { MetadataRoute } from "next";
import { getWooCommerceProducts } from "@/lib/woocommerce";

const SITE_URL = "https://buddhistmalastore.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getWooCommerceProducts();

  const staticPages = [
    "",
    "about",
    "shop",
    "gemstones",
    "blog",
    "contact",
    "faq",
    "privacy-policy",
    "returns",
    "shipping",
  ];

  const staticUrls = staticPages.map((page) => ({
    url: page ? `${SITE_URL}/${page}` : SITE_URL,
    lastModified: new Date(),
  }));

  const productUrls = products
    .filter((product: any) => product?.slug)
    .map((product: any) => ({
      url: `${SITE_URL}/product/${product.slug}`,
      lastModified: new Date(),
    }));

  return [...staticUrls, ...productUrls];
}