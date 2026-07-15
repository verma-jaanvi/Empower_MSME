import ComingSoon from "@/components/ui/coming-soon"
import UserSidebar from "@/components/user-sidebar"
export default function Page() {
  return <ComingSoon title="Settings" description="Manage notification preferences, account security, and connected integrations." backHref="/user/dashboard" backLabel="Back to Dashboard" sidebar={UserSidebar} />
}
