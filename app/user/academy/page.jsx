import ComingSoon from "@/components/ui/coming-soon"
import UserSidebar from "@/components/user-sidebar"
export default function Page() {
  return <ComingSoon title="Learning Academy" description="Access courses on financial literacy, investment strategies, and MSME due diligence." backHref="/user/dashboard" backLabel="Back to Dashboard" sidebar={UserSidebar} />
}
