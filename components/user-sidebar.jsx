"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import LanguageSelector from "@/components/language-selector"
import {
  LayoutDashboard, Building2, FileText, GraduationCap,
  MessageSquare, User, Settings, LogOut, TrendingUp, BarChart3,
} from "lucide-react"

export default function UserSidebar() {
  const pathname = usePathname()

  const groups = [
    {
      label: "Investor",
      items: [
        { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
        { name: "Portfolio Analytics", href: "/user/analytics", icon: BarChart3 },
        { name: "Browse Campaigns", href: "/user/campaigns", icon: TrendingUp },
        { name: "My Investments", href: "/user/applications", icon: FileText },
      ],
    },
    {
      label: "Resources",
      items: [
        { name: "Explore Businesses", href: "/user/explore", icon: Building2 },
        { name: "Academy", href: "/user/academy", icon: GraduationCap },
        { name: "AI Chatbot", href: "/user/chatbot", icon: MessageSquare },
      ],
    },
    {
      label: "Account",
      items: [
        { name: "Profile", href: "/user/profile", icon: User },
        { name: "Settings", href: "/user/settings", icon: Settings },
      ],
    },
  ]

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground overflow-hidden">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6 flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-primary text-white font-bold text-sm">I</div>
        <div>
          <p className="font-bold text-sidebar-foreground text-sm">EmpowerMSME</p>
          <p className="text-xs text-sidebar-foreground/50">Investor Portal</p>
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
