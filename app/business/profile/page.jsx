import ComingSoon from "@/components/ui/coming-soon"
import BusinessSidebar from "@/components/business-sidebar"
export default function Page() {
  return <ComingSoon title="Business Profile" description="Build and manage your MSME profile, upload documents, and showcase your business to investors." backHref="/business/dashboard" backLabel="Back to Dashboard" sidebar={BusinessSidebar} />
}
