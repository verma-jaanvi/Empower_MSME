/**
 * types/auth.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Strict TypeScript contract for the entire auth system.
 * Import these types everywhere — never use `any` for auth-related state.
 *
 * Production note: When migrating to a real backend, only the field names in
 * `ApiLoginResponse` need to change; the rest of the system is already typed.
 */

// ─── Roles ────────────────────────────────────────────────────────────────────

/**
 * The three first-class roles on the EmpowerMSME platform.
 * Values are lowercase strings to match the existing routing convention:
 *   /business/dashboard, /user/dashboard, /admin/dashboard
 */
export type AppRole = "business" | "user" | "admin"

// ─── User entity ─────────────────────────────────────────────────────────────

export interface User {
  /** Stable unique identifier (UUID in production, mock string here) */
  id: string
  /** Display name shown in sidebar headers */
  name: string
  /** Verified email address */
  email: string
  /** Role that governs which dashboard and routes the user can access */
  role: AppRole
  /**
   * Business profiles require admin approval before accessing funding tools.
   * Individual/Admin users are auto-approved.
   */
  approved: boolean

  // ── Extended MSME profile fields (optional — populated after onboarding) ──
  /** Legal business name registered with MCA / GST authority */
  businessName?: string
  /** Short headline shown on the marketplace listing */
  tagline?: string
  /** Industry / sector (e.g. "AgriTech", "HealthTech") */
  sector?: string
  /** City and state (e.g. "Pune, Maharashtra") */
  location?: string
  /** Phone number for investor contact */
  phone?: string
  /** Brief company description (≤ 500 chars) */
  bio?: string
  /** GST registration number */
  gstin?: string
  /** Number of full-time employees */
  teamSize?: string
  /** Year the business was founded */
  foundedYear?: string
  /** Public website URL */
  website?: string
}

// ─── Zustand store state ──────────────────────────────────────────────────────

export interface AuthState {
  /** Hydrated user object; null when not authenticated */
  user: User | null
  /** Derived boolean — true when `user` is non-null */
  isAuthenticated: boolean
  /** True while the login API fetch is in-flight */
  isLoading: boolean
  /**
   * Human-readable error message for display in the UI.
   * null means no error (either not attempted or last attempt succeeded).
   */
  error: string | null
}

// ─── Store actions ────────────────────────────────────────────────────────────

export interface AuthActions {
  /**
   * Dispatch a login attempt to the Next.js API route.
   *
   * @param email        — User-provided email
   * @param password     — User-provided password (never stored on client)
   * @param attemptedRole — The portal the user is trying to enter. The store
   *                        will throw if the server returns a different role,
   *                        preventing cross-portal access even if credentials
   *                        are valid for a different role.
   */
  login: (email: string, password: string, attemptedRole: AppRole) => Promise<void>
  /** Clear user state and all session artifacts */
  logout: () => void
  /** Reset error without affecting user state (e.g., when form changes) */
  clearError: () => void
  /**
   * Merge `updatedFields` into the current user object in the store.
   *
   * Simulates a 1-second API round-trip, then deep-merges the supplied
   * partial User into the current session user.
   *
   * @param updatedFields — Only the fields that changed; untouched fields
   *                        are preserved from the current user object.
   * @returns `true` on success, `false` if no user is logged in or an
   *          unexpected error occurs (error string is set in store state).
   *
   * Production note: Replace the setTimeout with a PATCH /api/users/me call
   * that persists the changes to the database before updating local state.
   */
  updateProfile: (updatedFields: Partial<User>) => Promise<boolean>
}

export type AuthStore = AuthState & AuthActions

// ─── API contract ─────────────────────────────────────────────────────────────

/** Shape of the JSON body sent FROM the client TO the API route */
export interface ApiLoginRequest {
  email: string
  password: string
}

/**
 * Shape of the JSON body returned BY the API route on success (HTTP 200).
 *
 * Production note: `token` is currently a dummy string. In production:
 *  1. Replace `token` with `Set-Cookie: session=...; HttpOnly; SameSite=Strict`
 *  2. Remove `token` from the JSON body entirely — never send tokens to JS.
 *  3. Subsequent API calls authenticate via the cookie automatically.
 */
export interface ApiLoginResponse {
  user: User
  /** Placeholder — marks where the HttpOnly cookie will go in production */
  token: string
}

/** Shape returned when the API route responds with a non-200 status */
export interface ApiErrorResponse {
  message: string
}

// ─── Dashboard routing map ────────────────────────────────────────────────────

/** Maps every AppRole to its authenticated entry-point route */
export const DASHBOARD_PATHS: Record<AppRole, string> = {
  business: "/business/dashboard",
  user: "/user/dashboard",
  admin: "/admin/dashboard",
}

/** Maps every AppRole to its login page route */
export const LOGIN_PATHS: Record<AppRole, string> = {
  business: "/auth/business/login",
  user: "/auth/user/login",
  admin: "/admin/login",
}
