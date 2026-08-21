import { NextResponse } from "next/server";

import { setAuthSession } from "@/lib/auth";

const WORDPRESS_URL = process.env.WORDPRESS_URL;

if (!WORDPRESS_URL) {
  throw new Error("WORDPRESS_URL is missing.");
}

/* =========================================================
   POST /api/auth/register
========================================================= */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    const firstName =
      typeof body.firstName === "string"
        ? body.firstName.trim()
        : "";

    const lastName =
      typeof body.lastName === "string"
        ? body.lastName.trim()
        : "";

    /* =======================================================
       VALIDATION
    ======================================================= */

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          error: "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    /* =======================================================
       WORDPRESS REGISTRATION
    ======================================================= */

    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/bms/v1/register`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        }),

        cache: "no-store",
      }
    );

    /* =======================================================
       WORDPRESS ERROR
    ======================================================= */

    if (!response.ok) {
      let errorMessage =
        "Unable to create your account.";

      try {
        const errorData = await response.json();

        if (
          typeof errorData.message === "string"
        ) {
          errorMessage = errorData.message;
        }
      } catch {
        // Keep default error message.
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
        },
        {
          status: response.status,
        }
      );
    }

    /* =======================================================
       CUSTOMER
    ======================================================= */

    const data = await response.json();

    if (
      !data ||
      data.success !== true ||
      !data.customer
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Account was created but customer information could not be retrieved.",
        },
        { status: 500 }
      );
    }

    const customer = data.customer;

    const customerId = Number(customer.id);

    if (
      !Number.isInteger(customerId) ||
      customerId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid customer account.",
        },
        { status: 500 }
      );
    }

    /* =======================================================
       CREATE NEXT.JS SESSION
    ======================================================= */

    await setAuthSession({
      customerId,

      email:
        typeof customer.email === "string"
          ? customer.email
          : email,

      firstName:
        typeof customer.first_name === "string"
          ? customer.first_name
          : firstName,

      lastName:
        typeof customer.last_name === "string"
          ? customer.last_name
          : lastName,

      createdAt: Date.now(),
    });

    /* =======================================================
       RESPONSE
    ======================================================= */

    return NextResponse.json(
      {
        success: true,

        customer: {
          id: customerId,

          email:
            customer.email || email,

          first_name:
            customer.first_name || firstName,

          last_name:
            customer.last_name || lastName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Registration API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to create your account. Please try again.",
      },
      { status: 500 }
    );
  }
}