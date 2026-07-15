import ComingSoon from "@/components/ui/coming-soon"
import UserSidebar from "@/components/user-sidebar"
export default function Page() {
  return <ComingSoon title="AI Chatbot" description="Ask questions about investment opportunities, MSME financials, and platform features." backHref="/user/dashboard" backLabel="Back to Dashboard" sidebar={UserSidebar} />
}
