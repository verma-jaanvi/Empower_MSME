import AdminSidebar from "@/components/admin-sidebar"
import GlobalFooter from "@/components/global-footer"
import AdminDashboardClient from "./AdminDashboardClient"

export const metadata = {
  title: "Admin Dashboard - EmpowerMSME",
  description: "Platform administration and management",
}

export default function AdminDashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <AdminDashboardClient />
        </main>

        <GlobalFooter />
      </div>
    </div>
  )
}
