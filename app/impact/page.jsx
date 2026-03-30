import PublicNavbar from "@/components/public-navbar"
import GlobalFooter from "@/components/global-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Users,
  Building2,
  Briefcase,
  DollarSign,
  Award,
  Heart,
  Globe,
  Target,
  Lightbulb,
  HandshakeIcon,
  Sparkles,
} from "lucide-react"

export const metadata = {
  title: "Our Impact - EmpowerMSME",
  description: "Discover the real-world impact of EmpowerMSME in empowering MSMEs and strengthening the economy",
}

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="mb-4 bg-accent/20 text-accent-foreground">
              Impact Report 2026
            </Badge>
            <h1 className="text-5xl font-bold text-foreground sm:text-6xl text-balance">
              Our <span className="text-primary">Impact</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Empowering MSMEs. Strengthening the economy. Building a more inclusive future.
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Impact by the Numbers</h2>
            <p className="text-lg text-muted-foreground">Real outcomes driving meaningful change</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-5xl font-bold text-foreground">2,847</CardTitle>
                <CardDescription className="text-base mt-2">MSMEs Onboarded</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-5xl font-bold text-foreground">₹127Cr</CardTitle>
                <CardDescription className="text-base mt-2">Funding Facilitated</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-5xl font-bold text-foreground">18,492</CardTitle>
                <CardDescription className="text-base mt-2">Investors Engaged</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-5xl font-bold text-foreground">52,134</CardTitle>
                <CardDescription className="text-base mt-2">Jobs Supported</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Additional Metrics */}
          <div className="grid gap-6 md:grid-cols-3 mt-6">
            <Card className="border-2 text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold text-foreground">₹4.8L</CardTitle>
                <CardDescription className="text-base mt-2">Average Funding per MSME</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mx-auto mb-3">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-3xl font-bold text-foreground">68%</CardTitle>
                <CardDescription className="text-base mt-2">Women-Led Businesses</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-3">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold text-foreground">28</CardTitle>
                <CardDescription className="text-base mt-2">States Covered</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-20 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Impact Areas</h2>
            <p className="text-lg text-muted-foreground">Driving change across multiple dimensions</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">Financial Inclusion</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Breaking barriers to financial access for underserved MSMEs, particularly women entrepreneurs and
                      businesses in tier-2 and tier-3 cities. Our AI-powered credit engine has enabled 1,847 businesses
                      to access formal credit for the first time.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-3xl font-bold text-foreground">73%</p>
                    <p className="text-sm text-muted-foreground mt-1">First-time borrowers</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-3xl font-bold text-foreground">94%</p>
                    <p className="text-sm text-muted-foreground mt-1">Repayment rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">MSME Growth</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Accelerating business growth through access to capital and education. MSMEs on our platform have
                      reported an average revenue growth of 142% within the first year of receiving funding.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-3xl font-bold text-foreground">142%</p>
                    <p className="text-sm text-muted-foreground mt-1">Avg. revenue growth</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-3xl font-bold text-foreground">2.4x</p>
                    <p className="text-sm text-muted-foreground mt-1">Job creation rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">Credit Accessibility</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Revolutionizing credit assessment with AI to provide fair evaluation beyond traditional credit
                      scores. Our technology has helped businesses with thin credit files secure funding opportunities.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-3xl font-bold text-foreground">8,427</p>
                    <p className="text-sm text-muted-foreground mt-1">Credit reports generated</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-3xl font-bold text-foreground">87%</p>
                    <p className="text-sm text-muted-foreground mt-1">Approval rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 flex-shrink-0">
                    <Lightbulb className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">Knowledge Empowerment</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Building financial literacy and business skills through our academy. Over 12,000 entrepreneurs
                      have completed courses on financial management, digital marketing, and business planning.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-3xl font-bold text-foreground">12,384</p>
                    <p className="text-sm text-muted-foreground mt-1">Course completions</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-3xl font-bold text-foreground">4.7/5</p>
                    <p className="text-sm text-muted-foreground mt-1">Learner satisfaction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Future Vision</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Building on our success to create even greater impact
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Platform Expansion</CardTitle>
                <CardDescription className="text-base leading-relaxed mt-2">
                  Reach 10,000+ MSMEs across all Indian states by 2027, with enhanced regional language support and
                  localized financial products.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                  <HandshakeIcon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl">Ecosystem Partnerships</CardTitle>
                <CardDescription className="text-base leading-relaxed mt-2">
                  Collaborate with banks, NBFCs, and government initiatives to create a comprehensive support network
                  for MSMEs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Innovation & Technology</CardTitle>
                <CardDescription className="text-base leading-relaxed mt-2">
                  Develop advanced AI models for even more accurate credit assessment and personalized financial
                  guidance for each MSME.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Vision Statement */}
          <Card className="mt-12 border-2 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl mb-4">Our Commitment to 2030</CardTitle>
              <CardDescription className="text-lg leading-relaxed max-w-3xl mx-auto">
                By 2030, we aim to become India's largest digital enablement platform for MSMEs, facilitating ₹1,000+
                crore in funding, empowering 50,000+ businesses, and creating 2,00,000+ sustainable jobs across the
                nation. Together, we're building an ecosystem where no entrepreneur is left behind.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <GlobalFooter />
    </div>
  )
}
