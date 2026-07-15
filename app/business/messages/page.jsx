import ComingSoon from "@/components/ui/coming-soon"
import BusinessSidebar from "@/components/business-sidebar"
export default function Page() {
  return <ComingSoon title="Messages" description="Communicate directly with investors, lenders, and platform support." backHref="/business/dashboard" backLabel="Back to Dashboard" sidebar={BusinessSidebar} />
}
