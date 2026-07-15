import ComingSoon from "@/components/ui/coming-soon"
import AdminSidebar from "@/components/admin-sidebar"
export default function Page() {
  return <ComingSoon title="Campaign Review" description="Review and approve funding campaigns before they go live on the platform." backHref="/admin/dashboard" backLabel="Back to Dashboard" sidebar={AdminSidebar} />
}
