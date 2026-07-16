import ProtectedLayout from "@/components/ProtectedLayout"

/**
 * User/Investor portal layout guard.
 * Wraps all routes under /user/* with role="user" protection.
 */
export default function UserLayout({ children }) {
  return <ProtectedLayout requiredRole="user">{children}</ProtectedLayout>
}
