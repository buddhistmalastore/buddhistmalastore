import { NextResponse } from "next/server";

import { clearAuthSession } from "@/lib/auth";

/* =========================================================
   POST /api/auth/logout
========================================================= */

export async function POST() {
  try {
    await clearAuthSession();

    return NextResponse.json({
      success: true,
      message: "You have been logged out successfully.",
    });

  } catch (error) {

    console.error(
      "Logout API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to log out. Please try again.",
      },
      { status: 500 }
    );
  }
}