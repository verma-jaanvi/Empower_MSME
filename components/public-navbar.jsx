"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import LanguageSelector from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/lib/auth-context"
import { LayoutDashboard, LogOut, ChevronDown } from "lucide-react"

const dashboardLinks = {
  business: "/business/dashboard",
  user: "/user/dashboard",
  admin: "/admin/dashboard",
}

const dashboardLabels = {
  business: "Business Dashboard",
  user: "Investor Dashboard",
  admin: "Admin Console",
}

export default function PublicNavbar() {
  const { t } = useLanguage()
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="border-b border-border bg-card/95 sticky top-0 z-50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">E</div>
            <span className="text-xl font-bold text-foreground">EmpowerMSME</span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: t("financing"), href: "/" },
              { label: t("creditEngine"), href: "/business/credit-score" },
              { label: t("academy"), href: "/business/ai-academy" },
              { label: t("marketplace"), href: "/marketplace" },
              { label: t("about"), href: "/about" },
              { label: t("impact"), href: "/impact" },
            ].map(({ label, href }) => (
              <Link key={href} href={href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <LanguageSelector />
            {user ? (
              // Logged in state
              <div className="flex items-center gap-2">
                <Link href={dashboardLinks[user.role] || "/"}>
                  <Button size="sm" className="gap-1.5 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    {dashboardLabels[user.role]}
                  </Button>
                </Link>
                <Button size="sm" variant="ghost" onClick={handleLogout} className="gap-1.5 text-muted-foreground hover:text-foreground">
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              // Logged out state
              <Link href="/auth/select">
                <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  {t("getStarted")}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
