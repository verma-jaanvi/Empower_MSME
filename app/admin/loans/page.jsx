import ComingSoon from "@/components/ui/coming-soon"
import AdminSidebar from "@/components/admin-sidebar"
export default function Page() {
  return <ComingSoon title="Loan Approvals" description="Review, approve, or reject loan applications from MSMEs across the platform." backHref="/admin/dashboard" backLabel="Back to Dashboard" sidebar={AdminSidebar} />
}
