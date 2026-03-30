"use client"

import Link from "next/link"
import PublicNavbar from "@/components/public-navbar"
import GlobalFooter from "@/components/global-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Brain, GraduationCap, Users, Building2, DollarSign, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
                  {t("heroTitle")}
                  <br />
                  <span className="text-primary">{t("heroSubtitle")}</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t("heroDescription")}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/auth/select">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg h-14 px-8"
                  >
                    {t("getStarted")}
                  </Button>
                </Link>
                <Link href="#learn-more">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg h-14 px-8 bg-transparent"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {t("learnMore")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Progress Card */}
            <div className="relative">
              <Card className="border-2 shadow-xl">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                      +35 points
                    </Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-primary to-accent" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img
                    src="/images/success-celebration.jpg"
                    alt="Women entrepreneurs celebrating success"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="flex items-start gap-3 rounded-lg border border-accent/30 bg-accent/5 p-4">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Funding approved!</p>
                      <p className="text-sm text-muted-foreground">$12,500 at 5% revenue share</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Pillars */}
      <section id="learn-more" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">{t("empoweringGrowth")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("comprehensivePlatform")}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">{t("alternativeFinancing")}</CardTitle>
                <CardDescription>{t("alternativeFinancingDesc")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Brain className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="mt-4">{t("aiCreditEngine")}</CardTitle>
                <CardDescription>{t("aiCreditEngineDesc")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">{t("msmeAcademy")}</CardTitle>
                <CardDescription>{t("msmeAcademyDesc")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="mt-4">{t("communityEcosystem")}</CardTitle>
                <CardDescription>{t("communityEcosystemDesc")}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured MSMEs */}
      <section className="py-20 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">{t("featuredBusinesses")}</h2>
            <p className="text-lg text-muted-foreground">{t("discoverMSMEs")}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary">{t("verified")}</Badge>
                  </div>
                  <CardTitle className="mt-4">Tech Solutions {i}</CardTitle>
                  <CardDescription>Innovative SaaS platform for small businesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("sector")}</span>
                      <span className="font-medium">Technology</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("location")}</span>
                      <span className="font-medium">Mumbai, India</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("fundingGoal")}</span>
                      <span className="font-medium">₹50L</span>
                    </div>
                    <Link href="/marketplace">
                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        {t("viewProfile")}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/marketplace">
              <Button size="lg">
                {t("exploreAll")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">{t("ourImpact")}</h2>
            <p className="text-lg text-muted-foreground">{t("creatingChange")}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-4xl font-bold mt-4">2,500+</CardTitle>
                <CardDescription className="text-base">{t("businessesFunded")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mx-auto">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-4xl font-bold mt-4">15,000+</CardTitle>
                <CardDescription className="text-base">{t("communitiesImpacted")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-4xl font-bold mt-4">45,000+</CardTitle>
                <CardDescription className="text-base">{t("jobsCreated")}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  )
}
