
import { NextResponse } from "next/server";

import { setAuthSession } from "@/lib/auth";

const WORDPRESS_URL = process.env.WORDPRESS_URL;

const TURNSTILE_SECRET_KEY =
  process.env.TURNSTILE_SECRET_KEY;

if (!WORDPRESS_URL) {
  throw new Error("WORDPRESS_URL is missing.");
}

if (!TURNSTILE_SECRET_KEY) {
  throw new Error(
    "TURNSTILE_SECRET_KEY is missing."
  );
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
      typeof body.first_name === "string"
        ? body.first_name.trim()
        : "";

    const lastName =
      typeof body.last_name === "string"
        ? body.last_name.trim()
        : "";

    const turnstileToken =
      typeof body.turnstileToken === "string"
        ? body.turnstileToken
        : "";

    /* =======================================================
       VALIDATION
    ======================================================= */

    if (!firstName) {
      return NextResponse.json(
        {
          success: false,
          error: "First name is required.",
        },
        { status: 400 }
      );
    }

    if (!lastName) {
      return NextResponse.json(
        {
          success: false,
          error: "Last name is required.",
        },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Email address is required.",
        },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        {
          success: false,
          error: "Password is required.",
        },
        { status: 400 }
      );
    }

    if (firstName.length > 50) {
      return NextResponse.json(
        {
          success: false,
          error:
            "First name must be 50 characters or fewer.",
        },
        { status: 400 }
      );
    }

    if (lastName.length > 50) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Last name must be 50 characters or fewer.",
        },
        { status: 400 }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        {
          success: false,
          error: "Email address is too long.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    if (!turnstileToken) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please complete the human verification.",
        },
        { status: 400 }
      );
    }

    /* =======================================================
       CLOUDFLARE TURNSTILE VERIFY
    ======================================================= */

    const turnstileFormData = new FormData();

    turnstileFormData.append(
      "secret",
      TURNSTILE_SECRET_KEY!
    );

    turnstileFormData.append(
      "response",
      turnstileToken
    );

    const ip =
      request.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim();

    if (ip) {
      turnstileFormData.append(
        "remoteip",
        ip
      );
    }

    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: turnstileFormData,
      }
    );

    const turnstileData =
      await turnstileResponse.json();

    if (
      !turnstileResponse.ok ||
      !turnstileData.success
    ) {
      console.error(
        "Turnstile verification failed:",
        turnstileData
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Human verification failed. Please try again.",
        },
        { status: 403 }
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
          "Content-Type":
            "application/json",
          Accept:
            "application/json",
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
        // Keep default message.
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
            "Account was created but customer information could not be retrieved.",
        },
        { status: 500 }
      );
    }

    const customer =
      data.customer;

    const customerId =
      Number(customer.id);

    if (
      !Number.isInteger(customerId) ||
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
       CREATE SESSION
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
          : firstName,

      lastName:
        typeof customer.last_name ===
        "string"
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