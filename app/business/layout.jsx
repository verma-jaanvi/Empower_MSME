import ProtectedLayout from "@/components/ProtectedLayout"

/**
 * Business portal layout guard.
 * Wraps all routes under /business/* with role="business" protection.
 * Unauthenticated users → /auth/business/login
 * Wrong role users → Unauthorized view with link to their own dashboard.
 */
export default function BusinessLayout({ children }) {
  return <ProtectedLayout requiredRole="business">{children}</ProtectedLayout>
}
