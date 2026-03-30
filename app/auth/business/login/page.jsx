"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { Building2, ArrowLeft } from "lucide-react"

export default function BusinessLoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    const name = email.split("@")[0].replace(/[^a-zA-Z]/g, " ")
    login("business", name || "Business Owner", email)
    setTimeout(() => router.push("/business/dashboard"), 400)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center pb-4">
            <Link href="/" className="inline-flex items-center gap-2 justify-center mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">E</div>
              <span className="text-xl font-bold text-foreground">EmpowerMSME</span>
            </Link>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mx-auto mb-2">
              <Building2 className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl">Business Login</CardTitle>
            <CardDescription>Access your MSME dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Business Email</Label>
                <Input id="email" type="email" placeholder="business@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login to Dashboard"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-3">Use any email/password to demo login</p>
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/auth/business/register" className="text-primary hover:underline font-medium">Register your business</Link>
            </div>
            <div className="mt-4 text-center">
              <Link href="/auth/select" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to role selection
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
