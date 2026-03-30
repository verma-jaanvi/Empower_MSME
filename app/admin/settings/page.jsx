import ComingSoon from "@/components/ui/coming-soon"
import AdminSidebar from "@/components/admin-sidebar"
export default function Page() {
  return <ComingSoon title="Admin Settings" description="Configure platform-wide settings, integrations, and system preferences." backHref="/admin/dashboard" backLabel="Back to Dashboard" sidebar={AdminSidebar} />
}
