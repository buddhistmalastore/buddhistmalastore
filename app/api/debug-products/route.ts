import { NextResponse } from "next/server";

import {
  getWooCommerceProducts,
} from "@/lib/woocommerce";

export async function GET() {
  try {
    const products =
      await getWooCommerceProducts();

    const result =
      products.slice(0, 5).map(
        (product: any) => ({
          id: product.id,
          name: product.name,
          sku: product.sku,
          categories:
            product.categories,
          attributes:
            product.attributes,
          price:
            product.price,
          stock_status:
            product.stock_status,
        })
      );

    return NextResponse.json({
      count: products.length,
      products: result,
    });
  } catch (error) {
    console.error(
      "Debug products error:",
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