import ComingSoon from "@/components/ui/coming-soon"
import BusinessSidebar from "@/components/business-sidebar"
export default function Page() {
  return <ComingSoon title="Settings" description="Manage your account preferences, notification settings, and security options." backHref="/business/dashboard" backLabel="Back to Dashboard" sidebar={BusinessSidebar} />
}
