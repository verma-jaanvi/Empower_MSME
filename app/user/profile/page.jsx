import ComingSoon from "@/components/ui/coming-soon"
import UserSidebar from "@/components/user-sidebar"
export default function Page() {
  return <ComingSoon title="My Profile" description="Manage your investor profile, KYC documents, and personal information." backHref="/user/dashboard" backLabel="Back to Dashboard" sidebar={UserSidebar} />
}
