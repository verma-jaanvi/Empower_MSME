"use client"

import BusinessSidebar from "@/components/business-sidebar"
import GlobalFooter from "@/components/global-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Heart, TrendingUp, DollarSign, Users, ArrowUpRight } from "lucide-react"

export default function DashboardClient() {
  return (
    <div className="flex h-screen bg-background">
      <BusinessSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="border-b border-border bg-card px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Business Overview</h1>
                <p className="text-muted-foreground mt-1">Track your business performance and funding</p>
              </div>
              <Badge className="bg-accent text-accent-foreground">Verified</Badge>
            </div>
          </div>

          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3 text-accent" />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Investor Interest</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">8 pending proposals</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">725</div>
                  <p className="text-xs text-muted-foreground text-accent">Good standing</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Funding Status</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹25L</div>
                  <p className="text-xs text-muted-foreground">of ₹50L goal</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Proposals</CardTitle>
                  <CardDescription>Investor proposals awaiting your review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Investor {i}</p>
                            <p className="text-sm text-muted-foreground">₹{5 * i}L investment proposal</p>
                          </div>
                        </div>
                        <Badge variant="secondary">New</Badge>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Proposals
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Completion</CardTitle>
                  <CardDescription>Complete your profile to attract more investors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Overall Progress</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-primary to-accent" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>✓ Basic Information</span>
                        <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                          Complete
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>✓ Business Details</span>
                        <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                          Complete
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>• Financial Information</span>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>• Document Upload</span>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                    </div>
                    <Button className="w-full">Complete Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <GlobalFooter />
      </div>
    </div>
  )
}
