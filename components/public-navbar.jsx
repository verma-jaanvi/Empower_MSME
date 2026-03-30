"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import LanguageSelector from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"

export default function PublicNavbar() {
  const { t } = useLanguage()
  const pathname = usePathname()

  const handleNavClick = () => {
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    // Also scroll to top when pathname changes
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={handleNavClick} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
              E
            </div>
            <span className="text-xl font-bold text-foreground">EmpowerMSME</span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              onClick={handleNavClick}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("financing")}
            </Link>
            <Link
              href="/credit-engine"
              onClick={handleNavClick}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("creditEngine")}
            </Link>
            <Link
              href="/academy"
              onClick={handleNavClick}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("academy")}
            </Link>
            <Link
              href="/marketplace"
              onClick={handleNavClick}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("marketplace")}
            </Link>
            <Link
              href="/about"
              onClick={handleNavClick}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("about")}
            </Link>
            <Link
              href="/impact"
              onClick={handleNavClick}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("impact")}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link href="/auth/select" onClick={handleNavClick}>
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                {t("getStarted")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
