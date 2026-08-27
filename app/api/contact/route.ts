import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
/* =========================================================
   CONFIGURATION
========================================================= */

const GMAIL_USER =
  process.env.GMAIL_USER ||
  "buddhistmalastore@gmail.com";

const GMAIL_APP_PASSWORD =
  process.env.GMAIL_APP_PASSWORD;

const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL ||
  "buddhistmalastore@gmail.com";

/* =========================================================
   HELPERS
========================================================= */

function cleanText(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   POST
========================================================= */

export async function POST(request: Request) {
  try {
    /* =====================================================
       CHECK GMAIL CONFIGURATION
    ===================================================== */

    if (!GMAIL_APP_PASSWORD) {
      console.error(
        "GMAIL_APP_PASSWORD is missing."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    /* =====================================================
       READ REQUEST
    ===================================================== */

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request.",
        },
        { status: 400 }
      );
    }

    const data =
      body as Record<string, unknown>;

    /* =====================================================
       FORM DATA
    ===================================================== */

    const name = cleanText(data.name);
    const email = cleanText(data.email);
    const phone = cleanText(data.phone);
    const subject = cleanText(data.subject);
    const message = cleanText(data.message);

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter your name.",
        },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter your email address.",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (!subject) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please select a subject.",
        },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter your message.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       LENGTH PROTECTION
    ===================================================== */

    if (name.length > 150) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is too long.",
        },
        { status: 400 }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Email address is too long.",
        },
        { status: 400 }
      );
    }

    if (phone.length > 50) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Phone number is too long.",
        },
        { status: 400 }
      );
    }

    if (subject.length > 150) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Subject is too long.",
        },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Message is too long.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    const safeName =
      escapeHtml(name);

    const safeEmail =
      escapeHtml(email);

    const safePhone =
      escapeHtml(
        phone || "Not provided"
      );

    const safeSubject =
      escapeHtml(subject);

    const safeMessage =
      escapeHtml(message).replace(
        /\n/g,
        "<br />"
      );

    /* =====================================================
       CREATE GMAIL TRANSPORTER
    ===================================================== */

    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: GMAIL_USER,
          pass: GMAIL_APP_PASSWORD,
        },
      });

    /* =====================================================
       VERIFY GMAIL CONNECTION
    ===================================================== */

    await transporter.verify();

    /* =====================================================
       SEND EMAIL
    ===================================================== */

    const emailResult =
      await transporter.sendMail({
        from: {
          name: "Buddhist Mala Store",
          address: GMAIL_USER,
        },

        to: CONTACT_EMAIL,

        replyTo: email,

        subject:
          `New Contact Message - ${subject}`,

        text: `
Buddhist Mala Store
New Contact Message

Customer: ${name}
Email: ${email}
Phone / WhatsApp: ${phone || "Not provided"}
Subject: ${subject}

Message:

${message}

--------------------------------
Buddhist Mala Store
https://buddhistmalastore.com
        `.trim(),

        html: `
<!DOCTYPE html>

<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>Buddhist Mala Store Contact Message</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#FBF7F0;
    font-family:Arial,Helvetica,sans-serif;
    color:#29251F;
  "
>

  <div
    style="
      max-width:680px;
      margin:40px auto;
      padding:0 20px;
    "
  >

    <div
      style="
        background:#ffffff;
        border:1px solid #E8DFD2;
        border-radius:24px;
        overflow:hidden;
        box-shadow:0 10px 35px rgba(80,60,30,.08);
      "
    >

      <!-- HEADER -->

      <div
        style="
          background:#F5EEE3;
          padding:28px 30px;
          border-bottom:1px solid #E8DFD2;
        "
      >

        <div
          style="
            font-size:12px;
            font-weight:bold;
            letter-spacing:3px;
            text-transform:uppercase;
            color:#B88620;
          "
        >
          Buddhist Mala Store
        </div>

        <h1
          style="
            margin:10px 0 0;
            font-size:26px;
            line-height:1.3;
            color:#1A1A1A;
          "
        >
          New Contact Message
        </h1>

      </div>

      <!-- CONTENT -->

      <div style="padding:30px;">

        <p
          style="
            margin:0 0 24px;
            font-size:15px;
            line-height:1.7;
            color:#6F685F;
          "
        >
          A customer has submitted a new message
          through the Buddhist Mala Store website.
        </p>

        <!-- CUSTOMER -->

        <div
          style="
            margin-bottom:14px;
            padding:16px 18px;
            background:#FBF7F0;
            border-radius:14px;
          "
        >

          <div
            style="
              font-size:12px;
              color:#91877A;
              margin-bottom:5px;
              text-transform:uppercase;
              letter-spacing:1px;
            "
          >
            Customer
          </div>

          <div
            style="
              font-size:16px;
              font-weight:600;
            "
          >
            ${safeName}
          </div>

        </div>

        <!-- EMAIL -->

        <div
          style="
            margin-bottom:14px;
            padding:16px 18px;
            background:#FBF7F0;
            border-radius:14px;
          "
        >

          <div
            style="
              font-size:12px;
              color:#91877A;
              margin-bottom:5px;
              text-transform:uppercase;
              letter-spacing:1px;
            "
          >
            Email
          </div>

          <div style="font-size:16px;">

            <a
              href="mailto:${safeEmail}"
              style="
                color:#A97816;
                text-decoration:none;
              "
            >
              ${safeEmail}
            </a>

          </div>

        </div>

        <!-- PHONE -->

        <div
          style="
            margin-bottom:14px;
            padding:16px 18px;
            background:#FBF7F0;
            border-radius:14px;
          "
        >

          <div
            style="
              font-size:12px;
              color:#91877A;
              margin-bottom:5px;
              text-transform:uppercase;
              letter-spacing:1px;
            "
          >
            Phone / WhatsApp
          </div>

          <div style="font-size:16px;">
            ${safePhone}
          </div>

        </div>

        <!-- SUBJECT -->

        <div
          style="
            margin-bottom:22px;
            padding:16px 18px;
            background:#FBF7F0;
            border-radius:14px;
          "
        >

          <div
            style="
              font-size:12px;
              color:#91877A;
              margin-bottom:5px;
              text-transform:uppercase;
              letter-spacing:1px;
            "
          >
            Subject
          </div>

          <div
            style="
              font-size:16px;
              font-weight:600;
            "
          >
            ${safeSubject}
          </div>

        </div>

        <!-- MESSAGE -->

        <div
          style="
            padding:20px;
            background:#F5EEE3;
            border-radius:18px;
            border:1px solid #E8DFD2;
          "
        >

          <div
            style="
              font-size:12px;
              color:#91877A;
              margin-bottom:10px;
              text-transform:uppercase;
              letter-spacing:1px;
            "
          >
            Message
          </div>

          <div
            style="
              font-size:15px;
              line-height:1.8;
              word-break:break-word;
            "
          >
            ${safeMessage}
          </div>

        </div>

        <!-- REPLY BUTTON -->

        <div
          style="
            margin-top:25px;
            text-align:center;
          "
        >

          <a
            href="mailto:${safeEmail}"
            style="
              display:inline-block;
              padding:13px 25px;
              border-radius:999px;
              background:#C89A2A;
              color:#ffffff;
              text-decoration:none;
              font-weight:600;
              font-size:14px;
            "
          >
            Reply to Customer
          </a>

        </div>

      </div>

      <!-- FOOTER -->

      <div
        style="
          padding:20px 30px;
          border-top:1px solid #E8DFD2;
          background:#FBF7F0;
          text-align:center;
        "
      >

        <div
          style="
            font-size:13px;
            color:#91877A;
          "
        >
          Buddhist Mala Store &amp; Handicraft Center
        </div>

        <div
          style="
            margin-top:5px;
            font-size:12px;
            color:#A69D91;
          "
        >
          buddhistmalastore.com
        </div>

      </div>

    </div>

  </div>

</body>

</html>
        `,
      });

    /* =====================================================
       LOG SUCCESS
    ===================================================== */

    console.log(
      "Contact email sent:",
      emailResult.messageId
    );

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been sent successfully.",
      },
      { status: 200 }
    );

  } catch (error) {

    console.error(
      "Contact email error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "We could not send your message right now. Please try again later.",
      },
      { status: 500 }
    );
  }
}