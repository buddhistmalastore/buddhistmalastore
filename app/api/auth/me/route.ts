import { NextResponse } from "next/server";

import { getAuthSession } from "@/lib/auth";

/* =========================================================
   GET /api/auth/me
========================================================= */

export async function GET() {
  try {
    const session =
      await getAuthSession();

    /* =======================================================
       NOT AUTHENTICATED
    ======================================================= */

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          customer: null,
        },
        { status: 401 }
      );
    }

    /* =======================================================
       AUTHENTICATED
    ======================================================= */

    return NextResponse.json({
      success: true,

      authenticated: true,

      customer: {
        id: session.customerId,

        email: session.email,

        first_name:
          session.firstName,

        last_name:
          session.lastName,
      },
    });

  } catch (error) {

    console.error(
      "Auth me API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        customer: null,
        error:
          "Unable to verify your account session.",
      },
      { status: 500 }
    );
  }
}