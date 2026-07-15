import ComingSoon from "@/components/ui/coming-soon"
import UserSidebar from "@/components/user-sidebar"
export default function Page() {
  return <ComingSoon title="My Investments" description="Track the status and returns of all your active and completed investments." backHref="/user/dashboard" backLabel="Back to Dashboard" sidebar={UserSidebar} />
}
