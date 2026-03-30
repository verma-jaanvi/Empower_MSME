"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import LanguageSelector from "@/components/language-selector"
import {
  LayoutDashboard, Users, Shield, BarChart3, Building2,
  Settings, LogOut, CheckCircle, AlertTriangle, TrendingUp,
} from "lucide-react"

export default function AdminSidebar() {
  const pathname = usePathname()

  const groups = [
    {
      label: "Platform",
      items: [
        { name: "Platform Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      ],
    },
    {
      label: "Management",
      items: [
        { name: "User Management & KYC", href: "/admin/users", icon: Users },
        { name: "Business Verification", href: "/admin/businesses", icon: Building2 },
        { name: "Campaign Review", href: "/admin/campaigns", icon: TrendingUp },
        { name: "Loan Approvals", href: "/admin/loans", icon: CheckCircle },
      ],
    },
    {
      label: "Security",
      items: [
        { name: "Security Console", href: "/admin/security", icon: Shield },
        { name: "Audit Logs", href: "/admin/audit", icon: AlertTriangle },
      ],
    },
    {
      label: "Account",
      items: [
        { name: "Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ]

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground overflow-hidden">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6 flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white font-bold text-sm">A</div>
        <div>
          <p className="font-bold text-sidebar-foreground text-sm">EmpowerMSME</p>
          <p className="text-xs text-sidebar-foreground/50">Admin Console</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <Link key={item.name} href={item.href}
                    className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      isActive ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground")}>
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3 space-y-2 flex-shrink-0">
        <div className="px-3 py-1"><LanguageSelector /></div>
        <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <LogOut className="h-4 w-4" /> Logout
        </Link>
      </div>
    </div>
  )
}
