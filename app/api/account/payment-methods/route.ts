import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedCustomerId } from "@/lib/auth";

const WORDPRESS_URL = process.env.WORDPRESS_URL;
const BMS_INTERNAL_API_SECRET =
  process.env.BMS_INTERNAL_API_SECRET;

async function getCustomerId() {
  const customerId = await getAuthenticatedCustomerId();

  if (!customerId) {
    return null;
  }

  return Number(customerId);
}

async function wordpressRequest(
  url: string,
  options: RequestInit = {}
) {
  if (!WORDPRESS_URL) {
    throw new Error("WORDPRESS_URL is missing.");
  }

  if (!BMS_INTERNAL_API_SECRET) {
    throw new Error("BMS_INTERNAL_API_SECRET is missing.");
  }

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "X-BMS-Internal-Secret": BMS_INTERNAL_API_SECRET,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
}

export async function GET() {
  try {
    const customerId = await getCustomerId();

    if (!customerId) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required.",
        },
        { status: 401 }
      );
    }

    const response = await wordpressRequest(
      `${WORDPRESS_URL}/wp-json/bms/v1/payment-methods/${customerId}`
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Payment methods GET error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load payment methods.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const customerId = await getCustomerId();

    if (!customerId) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const tokenId = Number(body?.tokenId);

    if (!Number.isInteger(tokenId) || tokenId <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment method.",
        },
        { status: 400 }
      );
    }

    const response = await wordpressRequest(
      `${WORDPRESS_URL}/wp-json/bms/v1/payment-methods/${customerId}?token_id=${tokenId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Payment methods DELETE error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to remove payment method.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const customerId = await getCustomerId();

    if (!customerId) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const tokenId = Number(body?.tokenId);

    if (!Number.isInteger(tokenId) || tokenId <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment method.",
        },
        { status: 400 }
      );
    }

    const response = await wordpressRequest(
      `${WORDPRESS_URL}/wp-json/bms/v1/payment-methods/${customerId}/default/${tokenId}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Payment methods POST error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to update default payment method.",
      },
      { status: 500 }
    );
  }
}