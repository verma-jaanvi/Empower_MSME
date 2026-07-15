import ComingSoon from "@/components/ui/coming-soon"
import UserSidebar from "@/components/user-sidebar"
export default function Page() {
  return <ComingSoon title="Explore Businesses" description="Browse and discover verified MSME businesses looking for investment across India." backHref="/user/dashboard" backLabel="Back to Dashboard" sidebar={UserSidebar} />
}
