import { NextResponse } from "next/server";

import {
  searchWooCommerceProductsForAI,
} from "@/lib/woocommerce";

export async function GET(
  request: Request
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const query =
      searchParams.get("q") ||
      "";

    const products =
      await searchWooCommerceProductsForAI(
        query
      );

    return NextResponse.json({
      query,
      count: products.length,
      products: products.map(
        (product: any) => ({
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          stock_status:
            product.stock_status,
          attributes:
            product.attributes,
          categories:
            product.categories,
        })
      ),
    });
  } catch (error) {
    console.error(
      "AI search debug error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}