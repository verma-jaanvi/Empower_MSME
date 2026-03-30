"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import LanguageSelector from "@/components/language-selector"
import {
  LayoutDashboard, Building2, DollarSign, BarChart3, GraduationCap,
  MessageSquare, Settings, LogOut, FileText, CreditCard,
  Users, Wand2, BookOpen, Repeat2, TrendingUp,
} from "lucide-react"

export default function BusinessSidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Overview", href: "/business/dashboard", icon: LayoutDashboard },
    { name: "My Profile", href: "/business/profile", icon: Building2 },
    { name: "Analytics", href: "/business/analytics", icon: BarChart3 },
    { name: "Loan Applications", href: "/business/loans", icon: FileText },
    { name: "Repayments", href: "/business/repayments", icon: Repeat2 },
    { name: "Campaigns", href: "/business/campaigns", icon: TrendingUp },
    { name: "Funding & Investors", href: "/business/funding", icon: DollarSign },
    { name: "Revenue Financing", href: "/business/rbf", icon: CreditCard },
    { name: "Lending Circles", href: "/business/lending-circles", icon: Users },
    { name: "Credit Score", href: "/business/credit-score", icon: BarChart3 },
    { name: "AI Academy", href: "/business/ai-academy", icon: BookOpen },
    { name: "Story Builder", href: "/business/story-builder", icon: Wand2 },
    { name: "Messages", href: "/business/messages", icon: MessageSquare },
    { name: "Settings", href: "/business/settings", icon: Settings },
  ]

  const groups = [
    { label: "Dashboard", items: navigation.slice(0, 3) },
    { label: "Finance", items: navigation.slice(3, 9) },
    { label: "AI Tools", items: navigation.slice(9, 12) },
    { label: "Account", items: navigation.slice(12) },
  ]

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground overflow-hidden">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6 flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sidebar-primary to-violet-600 text-sidebar-primary-foreground font-bold text-sm">E</div>
        <span className="font-bold text-sidebar-foreground text-sm">EmpowerMSME</span>
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
