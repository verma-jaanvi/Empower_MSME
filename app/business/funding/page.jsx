import ComingSoon from "@/components/ui/coming-soon"
import BusinessSidebar from "@/components/business-sidebar"
export default function Page() {
  return <ComingSoon title="Funding & Investors" description="View and respond to investor proposals, track funding rounds, and connect with capital providers." backHref="/business/dashboard" backLabel="Back to Dashboard" sidebar={BusinessSidebar} />
}
