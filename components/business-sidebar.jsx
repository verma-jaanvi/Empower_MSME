"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import LanguageSelector from "@/components/language-selector"
import {
  LayoutDashboard,
  Building2,
  DollarSign,
  BarChart3,
  GraduationCap,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react"

export default function BusinessSidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Overview", href: "/business/dashboard", icon: LayoutDashboard },
    { name: "My Profile", href: "/business/profile", icon: Building2 },
    { name: "Funding & Investors", href: "/business/funding", icon: DollarSign },
    { name: "Analytics", href: "/business/analytics", icon: BarChart3 },
    { name: "Academy", href: "/business/academy", icon: GraduationCap },
    { name: "Messages", href: "/business/messages", icon: MessageSquare },
    { name: "Settings", href: "/business/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground font-bold">
          E
        </div>
        <span className="font-bold text-sidebar-foreground">EmpowerMSME</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3 space-y-2">
        <div className="px-3 py-2">
          <LanguageSelector />
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Link>
      </div>
    </div>
  )
}
