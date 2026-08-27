import { NextRequest, NextResponse } from "next/server";

import {
  searchAllWooCommerceProducts,
} from "@/lib/woocommerce";

export async function GET(
  request: NextRequest
) {
  try {
    const search =
      request.nextUrl.searchParams
        .get("q")
        ?.trim();

    if (!search || search.length < 2) {
      return NextResponse.json(
        {
          products: [],
        },
        {
          status: 200,
        }
      );
    }

    const products =
      await searchAllWooCommerceProducts(
        search
      );

    return NextResponse.json(
      {
        products,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Product search API error:",
      error
    );

    return NextResponse.json(
      {
        products: [],
        error:
          "Unable to search products.",
      },
      {
        status: 500,
      }
    );
  }
}