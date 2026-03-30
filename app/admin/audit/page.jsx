import ComingSoon from "@/components/ui/coming-soon"
import AdminSidebar from "@/components/admin-sidebar"
export default function Page() {
  return <ComingSoon title="Audit Logs" description="Full immutable audit trail of all platform actions, accessible here for compliance review." backHref="/admin/security" backLabel="Back to Security" sidebar={AdminSidebar} />
}
