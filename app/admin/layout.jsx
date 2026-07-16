import ProtectedLayout from "@/components/ProtectedLayout"

/**
 * Admin portal layout guard.
 * Wraps all routes under /admin/* EXCEPT /admin/login with role="admin" protection.
 * Note: /admin/login is outside this layout (it's app/admin/login/page.jsx directly),
 * so it remains publicly accessible.
 */
export default function AdminLayout({ children }) {
  return <ProtectedLayout requiredRole="admin">{children}</ProtectedLayout>
}
