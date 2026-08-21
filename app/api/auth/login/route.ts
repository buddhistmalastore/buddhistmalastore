import { NextResponse } from "next/server";

import { setAuthSession } from "@/lib/auth";

const WORDPRESS_URL =
  process.env.WORDPRESS_URL;

if (!WORDPRESS_URL) {
  throw new Error(
    "WORDPRESS_URL is missing."
  );
}

/* =========================================================
   POST /api/auth/login
========================================================= */

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    /* =======================================================
       VALIDATION
    ======================================================= */

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Email and password are required.",
        },
        { status: 400 }
      );
    }

    /* =======================================================
       WORDPRESS LOGIN
    ======================================================= */

    const response =
      await fetch(
        `${WORDPRESS_URL}/wp-json/bms/v1/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),

          cache: "no-store",
        }
      );

    /* =======================================================
       WORDPRESS ERROR
    ======================================================= */

    if (!response.ok) {
      let errorMessage =
        "Invalid email or password.";

      try {
        const errorData =
          await response.json();

        if (
          typeof errorData.message ===
          "string"
        ) {
          errorMessage =
            errorData.message;
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
       WORDPRESS CUSTOMER
    ======================================================= */

    const data =
      await response.json();

    if (
      !data ||
      data.success !== true ||
      !data.customer
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to authenticate your account.",
        },
        { status: 401 }
      );
    }

    const customer =
      data.customer;

    const customerId =
      Number(customer.id);

    if (
      !Number.isInteger(
        customerId
      ) ||
      customerId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid customer account.",
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
        typeof customer.email ===
        "string"
          ? customer.email
          : email,

      firstName:
        typeof customer.first_name ===
        "string"
          ? customer.first_name
          : "",

      lastName:
        typeof customer.last_name ===
        "string"
          ? customer.last_name
          : "",

      createdAt:
        Date.now(),
    });

    /* =======================================================
       RESPONSE
    ======================================================= */

    return NextResponse.json({
      success: true,

      customer: {
        id: customerId,

        email:
          customer.email || email,

        first_name:
          customer.first_name || "",

        last_name:
          customer.last_name || "",
      },
    });

  } catch (error) {

    console.error(
      "Login API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to log in. Please try again.",
      },
      { status: 500 }
    );
  }
}