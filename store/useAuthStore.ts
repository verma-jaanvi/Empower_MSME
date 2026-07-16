"use client"
/**
 * store/useAuthStore.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Zustand client-side auth store.
 *
 * Responsibilities:
 *  1. Manage isLoading / error / user / isAuthenticated reactive state.
 *  2. POST credentials to the Next.js API route (never validate on client).
 *  3. Enforce role-portal match: reject login if the API returns a user whose
 *     role doesn't match the portal the user is trying to enter.
 *  4. Persist session to sessionStorage (not localStorage) so the session
 *     ends when the browser tab is closed — a safer default.
 *
 * Production note: When real HttpOnly cookies are in place:
 *  - Remove the sessionStorage persistence entirely.
 *  - Add a `rehydrate()` action that hits GET /api/auth/me on app mount
 *    to restore the session from the cookie.
 */

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { AuthStore, AppRole, ApiLoginResponse, ApiErrorResponse } from "@/types/auth"
import { DASHBOARD_PATHS } from "@/types/auth"

// Role label map for user-friendly error messages
const ROLE_LABELS: Record<AppRole, string> = {
  business: "Business",
  user: "Individual/Investor",
  admin: "Admin",
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // ── Initial state ──────────────────────────────────────────────────────
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // ── login ──────────────────────────────────────────────────────────────
      login: async (email: string, password: string, attemptedRole: AppRole) => {
        // Reset error and start loading
        set({ isLoading: true, error: null })

        try {
          // ── Step 1: POST to the Next.js API route ─────────────────────────
          // Password never touches any client-side logic — it goes straight
          // to the server in the request body.
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // credentials: "include" — uncomment when using HttpOnly cookies
            body: JSON.stringify({ email, password }),
          })

          // ── Step 2: Handle non-2xx responses ─────────────────────────────
          if (!res.ok) {
            let errorMessage = "An error occurred. Please try again."
            try {
              const errorBody: ApiErrorResponse = await res.json()
              errorMessage = errorBody.message || errorMessage
            } catch {
              // Response body wasn't valid JSON — use the generic message
            }
            set({ isLoading: false, error: errorMessage })
            return
          }

          // ── Step 3: Parse success response ───────────────────────────────
          const data: ApiLoginResponse = await res.json()
          const { user } = data

          // ── Step 4: Role-portal security gate ────────────────────────────
          // This is the critical security check: even if the credentials are
          // valid, a BUSINESS user CANNOT enter the ADMIN or USER portal.
          // This prevents cross-portal escalation, even with valid credentials.
          if (user.role !== attemptedRole) {
            const correctLabel = ROLE_LABELS[user.role]
            const attemptedLabel = ROLE_LABELS[attemptedRole]
            set({
              isLoading: false,
              error:
                `These credentials belong to a "${correctLabel}" account, ` +
                `not a "${attemptedLabel}" portal. ` +
                `Please go to the correct login page.`,
            })
            return
          }

          // ── Step 5: Commit authenticated state ───────────────────────────
          // The `token` from the response is intentionally discarded here.
          // In production, the server sets it as an HttpOnly cookie instead.
          // We persist only the safe, non-sensitive user object.
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (networkError) {
          // ── Step 6: Network / unexpected error ───────────────────────────
          console.error("[useAuthStore] login failed:", networkError)
          set({
            isLoading: false,
            error:
              "Unable to reach the server. Please check your connection and try again.",
          })
        }
      },

      // ── logout ─────────────────────────────────────────────────────────────
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
        // In production: also call DELETE /api/auth/session to clear the
        // HttpOnly cookie server-side.
      },

      // ── clearError ─────────────────────────────────────────────────────────
      clearError: () => set({ error: null }),

      // ── updateProfile ──────────────────────────────────────────────────────
      updateProfile: async (updatedFields: Partial<import("@/types/auth").User>): Promise<boolean> => {
        const currentUser = get().user

        // Guard: cannot update profile when not authenticated
        if (!currentUser) {
          set({ error: "You must be logged in to update your profile." })
          return false
        }

        set({ isLoading: true, error: null })

        try {
          // ── Simulated network delay ────────────────────────────────────────
          // Production: replace with PATCH /api/users/me
          //   const res = await fetch("/api/users/me", {
          //     method: "PATCH",
          //     headers: { "Content-Type": "application/json" },
          //     credentials: "include",          // send HttpOnly session cookie
          //     body: JSON.stringify(updatedFields),
          //   })
          //   if (!res.ok) throw new Error("Failed to save profile")
          //   const { user: savedUser } = await res.json()
          await new Promise<void>((resolve) => setTimeout(resolve, 1000))

          // ── Merge only the supplied fields; preserve everything else ───────
          const mergedUser: import("@/types/auth").User = {
            ...currentUser,
            ...updatedFields,
            // These fields are server-controlled — never allow client override
            id: currentUser.id,
            role: currentUser.role,
            email: currentUser.email,   // email change requires re-verification
            approved: currentUser.approved,
          }

          set({ user: mergedUser, isLoading: false, error: null })
          return true
        } catch (err) {
          console.error("[useAuthStore] updateProfile failed:", err)
          set({
            isLoading: false,
            error: "Failed to save profile changes. Please try again.",
          })
          return false
        }
      },
    }),
    {
      name: "empowermsme-auth", // sessionStorage key
      storage: createJSONStorage(() => sessionStorage),
      // Only persist the user — never persist passwords, tokens, or errors
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// ─── Convenience selector hooks ───────────────────────────────────────────────
// Use these instead of grabbing the whole store to avoid unnecessary re-renders.

/** Returns the authenticated user or null */
export const useCurrentUser = () => useAuthStore((s) => s.user)

/** Returns true when a session is active */
export const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated)

/** Returns the correct dashboard path for the current user's role */
export const useDashboardPath = () => {
  const user = useAuthStore((s) => s.user)
  return user ? DASHBOARD_PATHS[user.role] : "/"
}
