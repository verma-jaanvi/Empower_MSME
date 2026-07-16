/**
 * app/api/auth/login/route.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Next.js App Router API Route — Faux authentication backend.
 *
 * Security contract:
 *  • ALL credential validation happens HERE, server-side. Never on the client.
 *  • Passwords are never echoed back in any response.
 *  • Returns standard HTTP status codes: 200 | 400 | 401 | 405 | 500.
 *  • Simulates a realistic 1.5s network round-trip to expose loading states.
 *
 * Production migration checklist:
 *  [ ] Replace MOCK_USERS with a database query (Prisma / Drizzle).
 *  [ ] Replace plain-text password comparison with bcrypt.compare().
 *  [ ] Replace the dummy `token` with a real JWT signed with RS256.
 *  [ ] Set the JWT as an HttpOnly, Secure, SameSite=Strict cookie via
 *        `response.cookies.set(...)` and remove it from the JSON body.
 *  [ ] Add rate-limiting middleware (e.g., Upstash Ratelimit).
 */

import { NextRequest, NextResponse } from "next/server"
import type { User, AppRole, ApiLoginResponse, ApiErrorResponse } from "@/types/auth"

// ─── Mock credential store ────────────────────────────────────────────────────
// In production this is your ORM query + bcrypt comparison.
// Passwords are NEVER sent to the client under any circumstances.

interface MockRecord {
  id: string
  name: string
  email: string
  /** Plain-text only for this mock. Use bcrypt in production. */
  password: string
  role: AppRole
  approved: boolean
}

const MOCK_USERS: MockRecord[] = [
  // ── Business accounts ───────────────────────────────────────────────────────
  {
    id: "biz-001",
    name: "Priya Sharma",
    email: "priya@greenleaf.in",
    password: "business123",
    role: "business",
    approved: true,
  },
  {
    id: "biz-002",
    name: "Rajan Pillai",
    email: "rajan@swiftmed.in",
    password: "business123",
    role: "business",
    approved: true,
  },
  // Any @business.demo email with password "demo" works too (catch-all demo)
  {
    id: "biz-demo",
    name: "Demo Business",
    email: "business@demo.com",
    password: "demo",
    role: "business",
    approved: true,
  },

  // ── Individual / Investor accounts ──────────────────────────────────────────
  {
    id: "usr-001",
    name: "Aditya Kumar",
    email: "aditya@investor.com",
    password: "investor123",
    role: "user",
    approved: true,
  },
  {
    id: "usr-demo",
    name: "Demo Investor",
    email: "user@demo.com",
    password: "demo",
    role: "user",
    approved: true,
  },

  // ── Admin accounts ───────────────────────────────────────────────────────────
  {
    id: "adm-001",
    name: "Platform Admin",
    email: "admin@empowermsme.in",
    password: "admin@secure2024",
    role: "admin",
    approved: true,
  },
  {
    id: "adm-demo",
    name: "Demo Admin",
    email: "admin@demo.com",
    password: "demo",
    role: "admin",
    approved: true,
  },
]

// ─── Simulated network delay ──────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate request body
    let body: { email?: unknown; password?: unknown }
    try {
      body = await request.json()
    } catch {
      return NextResponse.json<ApiErrorResponse>(
        { message: "Invalid request body. Expected JSON with email and password." },
        { status: 400 }
      )
    }

    const { email, password } = body

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json<ApiErrorResponse>(
        { message: "Both email and password are required." },
        { status: 400 }
      )
    }

    const emailClean = email.trim().toLowerCase()
    if (!emailClean || !password) {
      return NextResponse.json<ApiErrorResponse>(
        { message: "Email and password cannot be empty." },
        { status: 400 }
      )
    }

    // 2. Simulate network latency (remove in production)
    await delay(1500)

    // 3. Look up the user by email
    const record = MOCK_USERS.find((u) => u.email === emailClean)

    // 4. Validate credentials — use constant-time comparison in production
    //    (e.g., crypto.timingSafeEqual or bcrypt.compare)
    if (!record || record.password !== password) {
      // Return 401, not 404 — never reveal whether the email exists
      return NextResponse.json<ApiErrorResponse>(
        { message: "Invalid email or password. Please try again." },
        { status: 401 }
      )
    }

    // 5. Build safe user object — strip the password before returning
    const user: User = {
      id: record.id,
      name: record.name,
      email: record.email,
      role: record.role,
      approved: record.approved,
    }

    // 6. Generate a dummy token placeholder
    //    PRODUCTION: Sign a JWT here and set it as an HttpOnly cookie instead.
    //    Example with cookies:
    //      const response = NextResponse.json({ user });
    //      response.cookies.set("session", jwt, {
    //        httpOnly: true, secure: true, sameSite: "strict", maxAge: 60 * 60 * 24
    //      });
    //      return response;
    const dummyToken = `mock-token-${record.id}-${Date.now()}`

    return NextResponse.json<ApiLoginResponse>(
      { user, token: dummyToken },
      { status: 200 }
    )
  } catch (error) {
    // 7. Catch-all for unexpected server errors
    console.error("[/api/auth/login] Unhandled error:", error)
    return NextResponse.json<ApiErrorResponse>(
      { message: "An unexpected server error occurred. Please try again later." },
      { status: 500 }
    )
  }
}

// Reject all non-POST methods explicitly
export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 })
}
