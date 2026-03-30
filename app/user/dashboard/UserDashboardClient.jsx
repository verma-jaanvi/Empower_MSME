"use client"

import UserSidebar from "@/components/user-sidebar"
import GlobalFooter from "@/components/global-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, TrendingUp, GraduationCap, Bell, ArrowRight } from "lucide-react"

export default function UserDashboardClient() {
  return (
    <div className="flex h-screen bg-background">
      <UserSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="border-b border-border bg-card px-8 py-6">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's your activity overview</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saved Businesses</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">2 pending review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45%</div>
                  <p className="text-xs text-muted-foreground">3 courses in progress</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Businesses</CardTitle>
                  <CardDescription>Businesses you're interested in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Tech Solutions {i}</p>
                            <p className="text-sm text-muted-foreground">Technology • Mumbai</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>Recent updates and alerts</CardDescription>
                    </div>
                    <Bell className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                        New
                      </Badge>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Application approved</p>
                        <p className="text-xs text-muted-foreground">Your proposal to Tech Solutions 2 was approved</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Badge variant="secondary">Info</Badge>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New course available</p>
                        <p className="text-xs text-muted-foreground">Investor Relations module is now live</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Badge variant="secondary">Update</Badge>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Business updated profile</p>
                        <p className="text-xs text-muted-foreground">Tech Solutions 1 added new funding details</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Global Footer */}
        <GlobalFooter />
      </div>
    </div>
  )
}
