"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import LanguageSelector from "@/components/language-selector"
import {
  LayoutDashboard,
  Building2,
  FileText,
  GraduationCap,
  MessageSquare,
  User,
  Settings,
  LogOut,
} from "lucide-react"

export default function UserSidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
    { name: "Explore Businesses", href: "/user/explore", icon: Building2 },
    { name: "My Applications", href: "/user/applications", icon: FileText },
    { name: "Academy", href: "/user/academy", icon: GraduationCap },
    { name: "AI Chatbot", href: "/user/chatbot", icon: MessageSquare },
    { name: "Profile", href: "/user/profile", icon: User },
    { name: "Settings", href: "/user/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground font-bold">
          E
        </div>
        <span className="font-bold text-sidebar-foreground">EmpowerMSME</span>
      </div>

      {/* Navigation */}
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

      {/* Language Selector and Logout */}
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
