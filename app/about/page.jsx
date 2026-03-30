import PublicNavbar from "@/components/public-navbar"
import GlobalFooter from "@/components/global-footer"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DollarSign,
  Brain,
  Store,
  GraduationCap,
  Users,
  Building2,
  TrendingUp,
  Shield,
  CheckCircle,
  Target,
} from "lucide-react"

export const metadata = {
  title: "About EmpowerMSME - Building Inclusive Growth",
  description:
    "Learn about EmpowerMSME's mission to empower MSMEs through alternative financing and AI-powered solutions",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold text-foreground sm:text-6xl text-balance">
              About <span className="text-primary">EmpowerMSME</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Building an inclusive digital ecosystem for MSMEs across India
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">Who We Are</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  EmpowerMSME is a comprehensive digital platform designed to unlock growth opportunities for Micro,
                  Small, and Medium Enterprises (MSMEs) across India.
                </p>
                <p>
                  We recognize that traditional financial systems often leave MSMEs underserved. Our mission is to
                  bridge this gap by providing alternative financing options, AI-powered credit evaluation, and
                  personalized financial education.
                </p>
                <p>
                  With a special focus on women-led businesses and enterprises in underserved regions, we're building an
                  ecosystem where every entrepreneur has access to the tools and capital they need to succeed.
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="border-2">
                <CardHeader>
                  <Target className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Our Mission</CardTitle>
                  <CardDescription>Democratize access to financial services for every MSME in India</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-accent mb-2" />
                  <CardTitle>Our Vision</CardTitle>
                  <CardDescription>A thriving ecosystem where no MSME is left behind</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Our Values</CardTitle>
                  <CardDescription>Inclusion, innovation, integrity, and impact</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <Shield className="h-10 w-10 text-accent mb-2" />
                  <CardTitle>Our Commitment</CardTitle>
                  <CardDescription>Building trust through transparency and security</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-20 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">What We Provide</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions designed for the unique needs of MSMEs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Alternative Financing</CardTitle>
                <CardDescription>
                  Access crowdfunding and revenue-based financing options that go beyond traditional bank loans
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                  <Brain className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>AI-Powered Credit Scoring</CardTitle>
                <CardDescription>
                  Get fair credit evaluation using advanced AI that looks beyond traditional credit history
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>MSME Marketplace</CardTitle>
                <CardDescription>
                  Showcase your business to investors and partners in a verified, trusted environment
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                  <GraduationCap className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Financial Literacy & Academy</CardTitle>
                <CardDescription>
                  Learn essential business and financial skills through personalized education programs
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How Platform Works */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">How the Platform Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A seamless ecosystem connecting businesses, investors, and opportunities
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="border-2">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl mb-4">
                  1
                </div>
                <CardTitle>Registration & Verification</CardTitle>
                <CardDescription className="text-base leading-relaxed mt-2">
                  MSMEs create detailed business profiles with documents. Our admin team verifies authenticity to
                  maintain trust and credibility in the ecosystem.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-xl mb-4">
                  2
                </div>
                <CardTitle>AI Credit Evaluation</CardTitle>
                <CardDescription className="text-base leading-relaxed mt-2">
                  Our AI analyzes multiple data points beyond credit history to generate fair credit scores and match
                  businesses with suitable financing options.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl mb-4">
                  3
                </div>
                <CardTitle>Connection & Growth</CardTitle>
                <CardDescription className="text-base leading-relaxed mt-2">
                  Investors discover verified MSMEs, businesses access funding and education, and the entire ecosystem
                  grows together through transparent connections.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Who Can Use Platform */}
      <section className="py-20 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Who Can Use This Platform</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for diverse stakeholders in the MSME ecosystem
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">MSME Owners</CardTitle>
                <CardDescription className="text-base leading-relaxed mt-3">
                  Access alternative financing, showcase your business in the marketplace, get AI-powered credit scores,
                  and learn through personalized financial education programs.
                </CardDescription>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Apply for crowdfunding campaigns
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Create public business profiles
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Access financial literacy courses
                  </li>
                </ul>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-2xl">Investors</CardTitle>
                <CardDescription className="text-base leading-relaxed mt-3">
                  Discover verified MSMEs seeking funding, review AI-generated credit assessments, and invest in
                  businesses aligned with your interests and values.
                </CardDescription>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Browse verified business profiles
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Access AI credit assessments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Track portfolio performance
                  </li>
                </ul>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Learners & Supporters</CardTitle>
                <CardDescription className="text-base leading-relaxed mt-3">
                  Access free and paid financial education courses, learn about the MSME ecosystem, and support
                  businesses through micro-investments and mentorship.
                </CardDescription>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Enroll in academy courses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Support MSMEs you believe in
                  </li>
                </ul>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-2xl">Institutions</CardTitle>
                <CardDescription className="text-base leading-relaxed mt-3">
                  Partner with us to expand financial inclusion, access aggregated insights, and collaborate on
                  initiatives that strengthen the MSME ecosystem nationwide.
                </CardDescription>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Access partnership opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Collaborate on ecosystem growth
                  </li>
                </ul>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  )
}
