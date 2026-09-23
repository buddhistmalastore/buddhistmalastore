import { NextRequest, NextResponse } from "next/server";

const WORDPRESS_URL = process.env.WORDPRESS_URL;

function getStoreApiUrl(path: string) {
  if (!WORDPRESS_URL) {
    throw new Error("WORDPRESS_URL is not configured");
  }

  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  return `${WORDPRESS_URL.replace(/\/$/, "")}/wp-json/wc/store/v1${path}`;
}

function getForwardHeaders(request: NextRequest) {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  const cartToken = request.headers.get("Cart-Token");
  const nonce = request.headers.get("Nonce");

  if (cartToken) {
    headers["Cart-Token"] = cartToken;
  }

  if (nonce) {
    headers["Nonce"] = nonce;
  }

  return headers;
}

function forwardStoreApiHeaders(response: Response) {
  const headers = new Headers();

  const contentType = response.headers.get("content-type");

  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  const cartToken = response.headers.get("Cart-Token");

  if (cartToken) {
    headers.set("Cart-Token", cartToken);
  }

  const nonce = response.headers.get("Nonce");

  if (nonce) {
    headers.set("Nonce", nonce);
  }

  const cartHash = response.headers.get("Cart-Hash");

  if (cartHash) {
    headers.set("Cart-Hash", cartHash);
  }

  return headers;
}

function getRequestedPath(request: NextRequest, fallback: string) {
  const url = new URL(request.url);
  return url.searchParams.get("path") || fallback;
}

/* =========================================================
   GET
========================================================= */

export async function GET(request: NextRequest) {
  try {
    const path = getRequestedPath(request, "/cart");

    const response = await fetch(getStoreApiUrl(path), {
      method: "GET",
      headers: getForwardHeaders(request),
      cache: "no-store",
    });

    const text = await response.text();

    return new NextResponse(text, {
      status: response.status,
      headers: forwardStoreApiHeaders(response),
    });
  } catch (error) {
    console.error(
      "WooCommerce Store API GET error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to connect to WooCommerce Store API.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   POST
========================================================= */

export async function POST(request: NextRequest) {
  try {
    const path = getRequestedPath(
      request,
      "/checkout"
    );

    const body = await request.text();

    const headers = getForwardHeaders(request);

    headers["Content-Type"] = "application/json";

    const response = await fetch(getStoreApiUrl(path), {
      method: "POST",
      headers,
      body,
      cache: "no-store",
    });

    const text = await response.text();

    return new NextResponse(text, {
      status: response.status,
      headers: forwardStoreApiHeaders(response),
    });
  } catch (error) {
    console.error(
      "WooCommerce Store API POST error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to process WooCommerce Store API request.",
      },
      {
        status: 500,
      }
    );
  }
}