import ComingSoon from "@/components/ui/coming-soon"
import AdminSidebar from "@/components/admin-sidebar"
export default function Page() {
  return <ComingSoon title="Business Verification" description="Review and verify MSME business registrations, documents, and Udyam certificates." backHref="/admin/dashboard" backLabel="Back to Dashboard" sidebar={AdminSidebar} />
}
