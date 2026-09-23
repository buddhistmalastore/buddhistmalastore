import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const wordpressUrl = process.env.WORDPRESS_URL?.replace(/\/$/, "");

  if (!wordpressUrl) {
    return NextResponse.json(
      { success: false, error: "WORDPRESS_URL is not configured." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${wordpressUrl}/wp-json/bms/v1/woopayments-config`,
      { cache: "no-store" }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            data?.error ||
            "Unable to retrieve WooPayments configuration.",
        },
        { status: response.status || 502 }
      );
    }

    return NextResponse.json(
      { success: true, config: data.config },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("WooPayments config bridge failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to connect to the WooPayments configuration service.",
      },
      { status: 502 }
    );
  }
}
