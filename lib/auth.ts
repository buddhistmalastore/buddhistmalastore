import crypto from "crypto";
import { cookies } from "next/headers";

/* =========================================================
   CONSTANTS
========================================================= */

const AUTH_COOKIE_NAME = "bms_session";

/*
 * Read the secret from environment variables.
 */
const ENV_AUTH_SESSION_SECRET =
  process.env.AUTH_SESSION_SECRET;

/*
 * Validate the environment variable.
 */
if (!ENV_AUTH_SESSION_SECRET) {
  throw new Error(
    "AUTH_SESSION_SECRET is missing. Please add AUTH_SESSION_SECRET to .env.local."
  );
}

/*
 * From this point onward TypeScript knows this is a string.
 */
const AUTH_SESSION_SECRET: string =
  ENV_AUTH_SESSION_SECRET;

/* =========================================================
   SESSION CONFIGURATION
========================================================= */

const SESSION_MAX_AGE =
  30 * 24 * 60 * 60 * 1000;

const SESSION_COOKIE_MAX_AGE =
  30 * 24 * 60 * 60;

/* =========================================================
   SESSION TYPES
========================================================= */

export interface AuthSession {
  customerId: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: number;
}

/* =========================================================
   ENCODE SESSION
========================================================= */

function encodeSession(
  session: AuthSession
): string {
  return Buffer.from(
    JSON.stringify(session)
  ).toString("base64url");
}

/* =========================================================
   DECODE SESSION
========================================================= */

function decodeSession(
  value: string
): AuthSession | null {
  try {
    const json = Buffer.from(
      value,
      "base64url"
    ).toString("utf8");

    const parsed: unknown =
      JSON.parse(json);

    if (
      typeof parsed !== "object" ||
      parsed === null
    ) {
      return null;
    }

    const data =
      parsed as Record<string, unknown>;

    if (
      typeof data.customerId !==
        "number" ||
      typeof data.email !==
        "string" ||
      typeof data.createdAt !==
        "number"
    ) {
      return null;
    }

    return {
      customerId:
        data.customerId,

      email:
        data.email,

      firstName:
        typeof data.firstName ===
        "string"
          ? data.firstName
          : "",

      lastName:
        typeof data.lastName ===
        "string"
          ? data.lastName
          : "",

      createdAt:
        data.createdAt,
    };
  } catch {
    return null;
  }
}

/* =========================================================
   CREATE SIGNATURE
========================================================= */

function createSignature(
  payload: string
): string {
  /*
   * AUTH_SESSION_SECRET is explicitly typed
   * as string above.
   */

  return crypto
    .createHmac(
      "sha256",
      AUTH_SESSION_SECRET
    )
    .update(payload)
    .digest("base64url");
}

/* =========================================================
   CREATE SESSION TOKEN
========================================================= */

export function createSessionToken(
  session: AuthSession
): string {
  const payload =
    encodeSession(session);

  const signature =
    createSignature(payload);

  return `${payload}.${signature}`;
}

/* =========================================================
   VERIFY SESSION TOKEN
========================================================= */

export function verifySessionToken(
  token: string
): AuthSession | null {
  try {
    const parts =
      token.split(".");

    if (parts.length !== 2) {
      return null;
    }

    const payload =
      parts[0];

    const signature =
      parts[1];

    if (!payload || !signature) {
      return null;
    }

    const expectedSignature =
      createSignature(payload);

    const providedBuffer =
      Buffer.from(
        signature,
        "utf8"
      );

    const expectedBuffer =
      Buffer.from(
        expectedSignature,
        "utf8"
      );

    if (
      providedBuffer.length !==
      expectedBuffer.length
    ) {
      return null;
    }

    if (
      !crypto.timingSafeEqual(
        providedBuffer,
        expectedBuffer
      )
    ) {
      return null;
    }

    const session =
      decodeSession(payload);

    if (!session) {
      return null;
    }

    /*
     * Session expires after 30 days.
     */

    if (
      Date.now() -
        session.createdAt >
      SESSION_MAX_AGE
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

/* =========================================================
   SET AUTH SESSION
========================================================= */

export async function setAuthSession(
  session: AuthSession
) {
  const token =
    createSessionToken(session);

  const cookieStore =
    await cookies();

  cookieStore.set({
    name: AUTH_COOKIE_NAME,

    value: token,

    httpOnly: true,

    secure:
      process.env.NODE_ENV ===
      "production",

    sameSite: "lax",

    path: "/",

    maxAge:
      SESSION_COOKIE_MAX_AGE,
  });
}

/* =========================================================
   GET AUTH SESSION
========================================================= */

export async function getAuthSession(): Promise<
  AuthSession | null
> {
  const cookieStore =
    await cookies();

  const cookie =
    cookieStore.get(
      AUTH_COOKIE_NAME
    );

  const token =
    cookie?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

/* =========================================================
   GET AUTHENTICATED CUSTOMER ID
========================================================= */

export async function getAuthenticatedCustomerId(): Promise<
  number | null
> {
  const session =
    await getAuthSession();

  if (!session) {
    return null;
  }

  return session.customerId;
}

/* =========================================================
   GET AUTHENTICATED CUSTOMER
========================================================= */

export async function getAuthenticatedCustomer(): Promise<
  AuthSession | null
> {
  return getAuthSession();
}

/* =========================================================
   CHECK AUTHENTICATION
========================================================= */

export async function isAuthenticated(): Promise<boolean> {
  const session =
    await getAuthSession();

  return session !== null;
}

/* =========================================================
   CLEAR AUTH SESSION
========================================================= */

export async function clearAuthSession() {
  const cookieStore =
    await cookies();

  cookieStore.set({
    name: AUTH_COOKIE_NAME,

    value: "",

    httpOnly: true,

    secure:
      process.env.NODE_ENV ===
      "production",

    sameSite: "lax",

    path: "/",

    maxAge: 0,
  });
}