"use client"
/**
 * components/ProtectedLayout.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Client-side route guard for authenticated dashboard routes.
 *
 * Usage — wrap your dashboard layout or page:
 *
 *   // app/business/layout.tsx
 *   import ProtectedLayout from "@/components/ProtectedLayout"
 *   export default function BusinessLayout({ children }) {
 *     return <ProtectedLayout requiredRole="business">{children}</ProtectedLayout>
 *   }
 *
 * Ejection logic:
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │  Condition                 │  Action                        │
 *  ├────────────────────────────┼────────────────────────────────┤
 *  │  Hydrating (SSR→CSR gap)   │  Render loading skeleton       │
 *  │  Not authenticated          │  Redirect to role login page   │
 *  │  Authenticated, wrong role  │  Redirect to /unauthorized     │
 *  │  Authenticated, right role  │  Render children normally      │
 *  └─────────────────────────────────────────────────────────────┘
 *
 * Production note: This is a client-side guard only. For true security,
 * add Next.js Middleware (middleware.ts) that validates the HttpOnly session
 * cookie before the page even renders. Client guards are UX, not security.
 */

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import type { AppRole } from "@/types/auth"
import { LOGIN_PATHS, DASHBOARD_PATHS } from "@/types/auth"
import { Loader2, ShieldAlert } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProtectedLayoutProps {
  /** The role required to access this section of the app */
  requiredRole: AppRole
  children: React.ReactNode
}

// ─── Hydration loading skeleton ───────────────────────────────────────────────

function AuthLoadingSkeleton() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium">Verifying session…</p>
      </div>
    </div>
  )
}

// ─── Unauthorised page ────────────────────────────────────────────────────────

function UnauthorizedView({ correctDashboard }: { correctDashboard?: string }) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10 mx-auto">
          <ShieldAlert className="h-10 w-10 text-destructive" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            You don't have permission to view this page. Your account role doesn't
            match the portal you're trying to access.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {correctDashboard && (
            <Link href={correctDashboard}>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Go to My Dashboard
              </Button>
            </Link>
          )}
          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProtectedLayout({ requiredRole, children }: ProtectedLayoutProps) {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()

  /**
   * `hydrated` prevents a flash of the unauthorized view during SSR→CSR
   * hydration, when Zustand hasn't yet reloaded from sessionStorage.
   */
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  // 1. Still rehydrating from sessionStorage — show skeleton
  if (!hydrated) {
    return <AuthLoadingSkeleton />
  }

  // 2. Not authenticated — redirect to the correct role's login page
  if (!isAuthenticated || !user) {
    // Use replace() so the back button doesn't loop back to the protected page
    router.replace(LOGIN_PATHS[requiredRole])
    return <AuthLoadingSkeleton />
  }

  // 3. Authenticated but wrong role — show friendly access denied view
  //    (NOT a redirect loop — show an informative page instead)
  if (user.role !== requiredRole) {
    return <UnauthorizedView correctDashboard={DASHBOARD_PATHS[user.role]} />
  }

  // 4. Fully authenticated with the correct role — render the dashboard
  return <>{children}</>
}
