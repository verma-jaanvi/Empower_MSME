"use client"
/**
 * components/LoginForm.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable login form used by all three role portals:
 *   - app/auth/business/login/page.jsx  (selectedRole="business")
 *   - app/auth/user/login/page.jsx      (selectedRole="user")
 *   - app/admin/login/page.jsx          (selectedRole="admin")
 *
 * Contract:
 *  • Accepts a `selectedRole` prop that determines which portal the user is
 *    trying to enter. Passed through to useAuthStore.login() as `attemptedRole`.
 *  • Does NOT check credentials itself — dispatches to the Zustand store,
 *    which POSTs to the Next.js API route server-side.
 *  • On success, redirects to the role-specific dashboard.
 *  • On error, renders the error string from the store in a dismissible alert.
 */

import { useState, useEffect, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuthStore } from "@/store/useAuthStore"
import type { AppRole } from "@/types/auth"
import { DASHBOARD_PATHS, LOGIN_PATHS } from "@/types/auth"
import {
  Building2, User, Shield, AlertCircle, ArrowLeft,
  Eye, EyeOff, Loader2, CheckCircle2
} from "lucide-react"

// ─── Role-specific display config ─────────────────────────────────────────────

const ROLE_CONFIG = {
  business: {
    Icon: Building2,
    title: "Business Login",
    subtitle: "Access your MSME dashboard",
    emailPlaceholder: "business@example.com",
    demoHint: "Demo: business@demo.com / demo",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    btnClass: "bg-gradient-to-r from-primary to-accent hover:opacity-90",
    backHref: "/auth/select",
    backLabel: "Back to role selection",
  },
  user: {
    Icon: User,
    title: "Investor Login",
    subtitle: "Access your investor dashboard",
    emailPlaceholder: "investor@example.com",
    demoHint: "Demo: user@demo.com / demo",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    btnClass: "bg-gradient-to-r from-primary to-accent hover:opacity-90",
    backHref: "/auth/select",
    backLabel: "Back to role selection",
  },
  admin: {
    Icon: Shield,
    title: "Admin Login",
    subtitle: "Secure access — restricted area",
    emailPlaceholder: "admin@empowermsme.in",
    demoHint: "Demo: admin@demo.com / demo",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
    btnClass: "bg-red-600 hover:bg-red-700",
    backHref: "/",
    backLabel: "Back to Home",
  },
} as const

// ─── Props ────────────────────────────────────────────────────────────────────

interface LoginFormProps {
  /** Which portal this form guards. Drives icon, copy, and RBAC gate. */
  selectedRole: AppRole
  /**
   * Optional register link shown below the form.
   * If omitted, the register prompt is hidden (admin has no self-registration).
   */
  registerHref?: string
  registerLabel?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginForm({
  selectedRole,
  registerHref,
  registerLabel,
}: LoginFormProps) {
  const router = useRouter()
  const { login, isLoading, error, isAuthenticated, user, clearError } = useAuthStore()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const config = ROLE_CONFIG[selectedRole]
  const { Icon } = config

  // Redirect on successful authentication
  useEffect(() => {
    if (isAuthenticated && user) {
      setLoginSuccess(true)
      // Brief success flash before redirect
      const timer = setTimeout(() => {
        router.push(DASHBOARD_PATHS[user.role])
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, user, router])

  // Clear errors when user starts editing the form
  const handleFieldChange = () => {
    if (error) clearError()
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Delegate ALL credential validation to the server via the Zustand store.
    // This component never sees raw password logic.
    await login(email.trim(), password, selectedRole)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 shadow-xl">
          {/* ── Header ──────────────────────────────────────────────────────── */}
          <CardHeader className="text-center pb-4">
            <Link href="/" className="inline-flex items-center gap-2 justify-center mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                E
              </div>
              <span className="text-lg font-bold text-foreground">EmpowerMSME</span>
            </Link>

            <motion.div
              animate={loginSuccess ? { scale: [1, 1.2, 1] } : {}}
              className={`flex h-14 w-14 items-center justify-center rounded-xl ${config.iconBg} mx-auto mb-3`}
            >
              {loginSuccess
                ? <CheckCircle2 className="h-7 w-7 text-accent" />
                : <Icon className={`h-7 w-7 ${config.iconColor}`} />
              }
            </motion.div>

            <CardTitle className="text-2xl">
              {loginSuccess ? "Logged in!" : config.title}
            </CardTitle>
            <CardDescription>
              {loginSuccess ? "Redirecting to your dashboard…" : config.subtitle}
            </CardDescription>
          </CardHeader>

          {/* ── Body ────────────────────────────────────────────────────────── */}
          <CardContent className="space-y-4">
            {/* Admin warning banner */}
            {selectedRole === "admin" && !loginSuccess && (
              <Alert className="border-red-500/20 bg-red-500/5">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-sm text-red-600">
                  This is a restricted area. Unauthorized access is prohibited.
                </AlertDescription>
              </Alert>
            )}

            {/* API error banner */}
            {error && !loginSuccess && (
              <Alert className="border-destructive/30 bg-destructive/5">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="login-email">Email Address</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder={config.emailPlaceholder}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); handleFieldChange() }}
                  disabled={isLoading || loginSuccess}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password with show/hide toggle */}
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); handleFieldChange() }}
                    disabled={isLoading || loginSuccess}
                    required
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className={`w-full h-11 text-white font-medium ${config.btnClass}`}
                disabled={isLoading || loginSuccess || !email || !password}
              >
                {isLoading
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Authenticating…</>
                  : loginSuccess
                    ? <><CheckCircle2 className="mr-2 h-4 w-4" /> Redirecting…</>
                    : "Login to Dashboard"
                }
              </Button>
            </form>

            {/* Demo hint */}
            <p className="text-xs text-muted-foreground text-center bg-muted/40 rounded-lg p-2">
              🔑 {config.demoHint}
            </p>

            {/* Register prompt (hidden for admin) */}
            {registerHref && registerLabel && (
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link href={registerHref} className="text-primary hover:underline font-medium">
                  {registerLabel}
                </Link>
              </div>
            )}

            {/* Back navigation */}
            <div className="text-center">
              <Link
                href={config.backHref}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {config.backLabel}
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
