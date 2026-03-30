"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Building2, Shield } from "lucide-react"

export default function RoleSelectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
              E
            </div>
            <span className="text-2xl font-bold text-foreground">EmpowerMSME</span>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Choose Your <span className="text-primary">Role</span>
          </h1>
          <p className="text-lg text-muted-foreground">Select how you want to access the platform</p>
        </div>

        {/* Role Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* User Role */}
          <Card className="hover:shadow-xl transition-shadow border-2 hover:border-primary/50">
            <CardHeader className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Individual</CardTitle>
              <CardDescription className="text-base">Investor • Learner • Mentor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Explore and invest in MSMEs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Access learning modules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Connect with businesses</span>
                </li>
              </ul>
              <div className="flex gap-2">
                <Link href="/auth/user/login" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/user/register" className="flex-1">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Business Role */}
          <Card className="hover:shadow-xl transition-shadow border-2 hover:border-accent/50">
            <CardHeader className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
                <Building2 className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Business</CardTitle>
              <CardDescription className="text-base">MSME Owner • Entrepreneur</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Create business profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Access funding opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Connect with investors</span>
                </li>
              </ul>
              <div className="flex gap-2">
                <Link href="/auth/business/login" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/business/register" className="flex-1">
                  <Button className="w-full bg-accent hover:bg-accent/90">Sign Up</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Admin Role */}
          <Card className="hover:shadow-xl transition-shadow border-2 hover:border-primary/30 opacity-90">
            <CardHeader className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
                <Shield className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">Admin</CardTitle>
              <CardDescription className="text-base">Platform Administrator</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>Manage platform operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>Verify businesses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>Review applications</span>
                </li>
              </ul>
              <Link href="/admin/login" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Admin Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
