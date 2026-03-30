import Link from "next/link"
import PublicNavbar from "@/components/public-navbar"
import GlobalFooter from "@/components/global-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Building2, Search, Filter } from "lucide-react"

export const metadata = {
  title: "Marketplace - EmpowerMSME",
  description: "Explore verified MSMEs seeking funding and partnerships",
}

export default function MarketplacePage() {
  const businesses = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    name: `Business ${i + 1}`,
    sector: ["Technology", "Manufacturing", "Retail", "Services"][i % 4],
    location: ["Mumbai", "Delhi", "Bangalore", "Chennai"][i % 4],
    fundingGoal: "₹" + (25 + i * 5) + "L",
    description: "Innovative solution addressing market needs with sustainable approach",
  }))

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Explore <span className="text-primary">Businesses</span>
          </h1>
          <p className="text-lg text-muted-foreground">Discover verified MSMEs seeking funding and partnerships</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search businesses..." className="pl-9" />
                </div>
              </div>
              <Button variant="outline" className="justify-start bg-transparent">
                <Filter className="mr-2 h-4 w-4" />
                Sector
              </Button>
              <Button variant="outline" className="justify-start bg-transparent">
                <Filter className="mr-2 h-4 w-4" />
                Location
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Business Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <Card key={business.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">Verified</Badge>
                </div>
                <CardTitle className="mt-4">{business.name}</CardTitle>
                <CardDescription>{business.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sector</span>
                    <span className="font-medium">{business.sector}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{business.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Funding Goal</span>
                    <span className="font-medium">{business.fundingGoal}</span>
                  </div>
                  <div className="pt-3 flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      View Profile
                    </Button>
                    <Link href="/auth/select" className="flex-1">
                      <Button className="w-full">Invest</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Global Footer */}
      <GlobalFooter />
    </div>
  )
}
