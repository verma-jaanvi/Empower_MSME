"use client"
/**
 * lib/auth-context.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * React Context bridge that keeps the existing `useAuth()` API working
 * across all 20+ components that import it (sidebars, navbar, dashboards),
 * while delegating the actual auth state to the Zustand store.
 *
 * Why keep this file?
 *  - Sidebars, navbar, and 15+ other components call `useAuth()` today.
 *  - Changing all of them to `useAuthStore()` is a big refactor.
 *  - This thin wrapper syncs Context with Zustand so both work seamlessly.
 *  - Gradually migrate components to useAuthStore() directly over time.
 */

import { createContext, useContext, useEffect } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { DASHBOARD_PATHS } from "@/types/auth"

// ─── Context definition ───────────────────────────────────────────────────────

const AuthContext = createContext(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }) {
  // Pull everything from Zustand — it is the single source of truth
  const { user, logout, isLoading, isAuthenticated } = useAuthStore()

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        loading: isLoading,
        isAuthenticated,
        /**
         * Legacy compatibility: dashboardPath was used by old code.
         * Now derived from the Zustand user's role via DASHBOARD_PATHS.
         */
        dashboardPath: DASHBOARD_PATHS,
        /**
         * @deprecated Use useAuthStore().login() directly.
         * Kept for backward compatibility with any remaining callers.
         * The real login now goes through the Zustand store → API route.
         */
        login: (role, name, email) => {
          console.warn(
            "[AuthContext] Deprecated login() called. " +
            "Use useAuthStore().login(email, password, role) instead."
          )
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
