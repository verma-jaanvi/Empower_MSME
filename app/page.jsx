"use client"

import Link from "next/link"
import Image from "next/image"
import PublicNavbar from "@/components/public-navbar"
import GlobalFooter from "@/components/global-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FEATURED_BUSINESSES } from "@/lib/businesses-data"
import {
  ArrowRight, TrendingUp, Brain, GraduationCap, Users, Building2,
  DollarSign, CheckCircle, Star, MapPin, Shield, Zap, Globe,
  ChevronRight, Award, BarChart3, HeartHandshake, Sparkles,
  IndianRupee, Briefcase, Lightbulb
} from "lucide-react"

// ─── Static data ────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    icon: DollarSign,
    color: "primary",
    title: "Alternative Financing",
    description:
      "Access revenue-based funding, invoice financing, and MSME-specific loan products without collateral or a credit history from a traditional bank.",
    href: "/auth/select",
    badge: "₹10L – ₹5Cr",
  },
  {
    icon: Brain,
    color: "accent",
    title: "AI Credit Engine",
    description:
      "Our machine-learning model evaluates your business health using cash flow, GST filings, and social proof — not just your CIBIL score.",
    href: "/business/credit-score",
    badge: "No Collateral",
  },
  {
    icon: GraduationCap,
    color: "primary",
    title: "MSME Academy",
    description:
      "Bite-sized courses on GST compliance, digital marketing, export readiness, and financial literacy — available in 10 regional languages.",
    href: "/business/ai-academy",
    badge: "150+ Courses",
  },
  {
    icon: HeartHandshake,
    color: "accent",
    title: "Investor Marketplace",
    description:
      "Connect with 3,000+ angel investors, impact funds, and NBFCs who specifically want to back India's next wave of micro-entrepreneurs.",
    href: "/marketplace",
    badge: "3,000+ Investors",
  },
]

// ↑ FEATURED_BUSINESSES imported from @/lib/businesses-data — no duplication

const IMPACT_STATS = [
  { value: "2,500+", label: "Businesses Funded", sub: "Across 28 states", icon: Building2, color: "primary" },
  { value: "₹480Cr+", label: "Capital Deployed", sub: "Since 2022", icon: IndianRupee, color: "accent" },
  { value: "45,000+", label: "Jobs Created", sub: "Direct employment", icon: Briefcase, color: "primary" },
  { value: "15,000+", label: "Communities Reached", sub: "In tier 2 & 3 cities", icon: Globe, color: "accent" },
  { value: "92%", label: "Repayment Rate", sub: "Industry-best", icon: Shield, color: "primary" },
  { value: "4.8 ★", label: "Platform Rating", sub: "From 6,000+ users", icon: Star, color: "accent" },
]

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create Your Business Profile",
    description:
      "Sign up in under 5 minutes. Connect your GST portal, bank account, and basic business documents. No branch visit required.",
    icon: Briefcase,
  },
  {
    step: "02",
    title: "Get Your AI Credit Score",
    description:
      "Our engine analyses 200+ data points from your business to generate a transparent, explainable MSME Credit Score within 48 hours.",
    icon: Brain,
  },
  {
    step: "03",
    title: "Receive Funding Offers",
    description:
      "Matched investors and lenders send tailored offers directly to your dashboard. Compare terms, accept the best fit, and get funded.",
    icon: IndianRupee,
  },
  {
    step: "04",
    title: "Grow with the Ecosystem",
    description:
      "Use Academy courses, mentorship, and peer networks to scale your business — and come back for your next funding round.",
    icon: TrendingUp,
  },
]

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Founder, GreenLeaf Organics",
    location: "Pune",
    quote:
      "EmpowerMSME gave us ₹52 lakhs in revenue-based funding when three banks turned us down. Within 6 months our revenue doubled. The Academy courses on export compliance were a game-changer.",
    avatar: "PS",
    rating: 5,
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Rajan Pillai",
    role: "CEO, SwiftMed Logistics",
    location: "Bengaluru",
    quote:
      "The AI credit engine understood our business model better than any bank loan officer. We got funded in 11 days. The investor match was spot-on — they genuinely understood cold-chain.",
    avatar: "RP",
    rating: 5,
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Meera Devi",
    role: "Artisan Lead, ShilpaKraft",
    location: "Jaipur",
    quote:
      "Hamara pura samudaay ab digital hai. 200 bunakaron ko kaam mila. Platform bilkul aasan hai — Hindi mein bhi kaam karta hai. Bahut shukriya EmpowerMSME.",
    avatar: "MD",
    rating: 5,
    color: "from-amber-500 to-orange-600",
  },
]

const TRUST_BADGES = [
  { label: "RBI Compliant", icon: Shield },
  { label: "DPIIT Recognised", icon: Award },
  { label: "ISO 27001 Certified", icon: CheckCircle },
  { label: "SIDBI Partner", icon: Zap },
  { label: "MeitY Empanelled", icon: Sparkles },
]

// ─── Sub-components ─────────────────────────────────────────────────────────────

function SectionHeader({ badge, title, subtitle }) {
  return (
    <div className="text-center mb-14 space-y-4">
      {badge && (
        <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1 text-sm font-medium">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

function StarRow({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 lg:py-28">
        {/* Background decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">

            {/* Left — Copy */}
            <div className="space-y-8">
              <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-1.5 text-sm font-medium gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                India's #1 MSME Growth Platform
              </Badge>

              <div className="space-y-5">
                <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                  Fund Your Business.{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Grow Without Limits.
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                  EmpowerMSME connects India's small businesses with alternative
                  financing, AI-powered credit scoring, and an ecosystem built to
                  take you from ₹0 to your next crore — without a bank's approval.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/auth/select">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white text-base h-13 px-8 shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                  >
                    Get Funded Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base h-13 px-8 bg-transparent hover:bg-primary/5 border-border hover:border-primary transition-all duration-200"
                  >
                    Browse Businesses
                  </Button>
                </Link>
              </div>

              {/* Social proof bar */}
              <div className="flex items-center gap-6 pt-2 flex-wrap">
                <div className="flex -space-x-2">
                  {["PS", "RP", "MD", "AK", "SN"].map((init, i) => (
                    <div
                      key={i}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background text-xs font-bold text-white"
                      style={{
                        background: `hsl(${200 + i * 30}, 70%, 45%)`,
                      }}
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <div>
                  <StarRow />
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Trusted by <strong className="text-foreground">6,000+</strong> MSME owners
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Dashboard card */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Floating glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl scale-90" />

              <div className="relative w-full max-w-md space-y-4">
                {/* Main image card */}
                <Card className="overflow-hidden border-2 border-border/60 shadow-2xl">
                  <div className="relative h-52 w-full bg-gradient-to-br from-primary/10 to-accent/10">
                    <Image
                      src="/hero-dashboard.png"
                      alt="EmpowerMSME dashboard showing credit score and funding"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <CardContent className="p-5 space-y-4">
                    {/* Credit score bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-foreground">AI Credit Score</span>
                        <span className="font-bold text-accent">780 / 900</span>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-secondary">
                        <div
                          className="h-2.5 rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                          style={{ width: "87%" }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1.5">Excellent — Top 8% of applicants</p>
                    </div>

                    {/* Funding approved chip */}
                    <div className="flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/5 p-3.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15">
                        <CheckCircle className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">Funding Approved!</p>
                        <p className="text-xs text-muted-foreground">₹52L at 5% revenue share · 24-month term</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Floating stat chips */}
                <div className="flex gap-3">
                  <div className="flex-1 rounded-xl border border-border bg-card/80 backdrop-blur-sm p-3 shadow-md">
                    <p className="text-xs text-muted-foreground">Disbursed Today</p>
                    <p className="text-lg font-bold text-foreground">₹2.4Cr</p>
                  </div>
                  <div className="flex-1 rounded-xl border border-border bg-card/80 backdrop-blur-sm p-3 shadow-md">
                    <p className="text-xs text-muted-foreground">Avg. Processing</p>
                    <p className="text-lg font-bold text-foreground">9 Days</p>
                  </div>
                  <div className="flex-1 rounded-xl border border-border bg-card/80 backdrop-blur-sm p-3 shadow-md">
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                    <p className="text-lg font-bold text-foreground">92%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRUST BADGES ═══════════════════ */}
      <div className="border-y border-border bg-muted/30 py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {TRUST_BADGES.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════ PLATFORM PILLARS ═══════════════════ */}
      <section id="learn-more" className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="What We Offer"
            title="Everything Your Business Needs to Scale"
            subtitle="Four powerful pillars built specifically for India's 63 million MSMEs — from first funding to full-scale growth."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map(({ icon: Icon, color, title, description, href, badge }) => (
              <Link key={title} href={href} className="group">
                <Card className="h-full border-border/60 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="space-y-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-${color}/10 group-hover:bg-${color}/20 transition-colors`}>
                      <Icon className={`h-7 w-7 text-${color}`} />
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-3 text-xs">
                        {badge}
                      </Badge>
                      <CardTitle className="text-lg">{title}</CardTitle>
                      <CardDescription className="mt-2 leading-relaxed">
                        {description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center text-sm font-medium text-primary gap-1 group-hover:gap-2 transition-all">
                      Learn more <ChevronRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="How It Works"
            title="From Sign-Up to Funded in Days"
            subtitle="Our streamlined process removes the bureaucracy. No branch visits, no paper files, no waiting months for a 'maybe'."
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map(({ step, title, description, icon: Icon }, idx) => (
              <div key={step} className="relative">
                {/* Connector line */}
                {idx < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(100%-0.5rem)] w-full h-px border-t-2 border-dashed border-border z-0" />
                )}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-xl font-bold shadow-lg shadow-primary/20">
                      {step}
                    </div>
                  </div>
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/auth/select">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/20 px-10 h-13"
              >
                Start Your Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-3">Free to apply · No credit score minimum · Results in 48 hrs</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURED BUSINESSES ═══════════════════ */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Featured on Platform"
            title="Businesses Changing India"
            subtitle="Meet the entrepreneurs our investors are funding right now. Browse, connect, and invest in India's future."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_BUSINESSES.map((biz) => (
              <Card
                key={biz.id}
                className="group overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 border-border/60"
              >
                {/* Gradient accent bar using per-business colours */}
                <div className={`h-2 bg-gradient-to-r ${biz.accentFrom} ${biz.accentTo}`} />
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${biz.accentFrom} ${biz.accentTo} text-white font-bold text-sm border border-border/40`}>
                      {biz.initials}
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <Badge className="bg-accent/10 text-accent border-accent/20">✓ Verified</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {biz.rating}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <CardTitle className="text-lg">{biz.name}</CardTitle>
                    <CardDescription className="mt-1">{biz.tagline}</CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {biz.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5" /> Sector
                      </span>
                      <span className="font-medium">{biz.sector}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> Location
                      </span>
                      <span className="font-medium">{biz.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <IndianRupee className="h-3.5 w-3.5" /> Funding Goal
                      </span>
                      <span className="font-medium">{biz.goal}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{biz.raised} raised</span>
                      <span className="font-semibold text-accent">{biz.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${biz.progress}%` }}
                      />
                    </div>
                  </div>

                  <Link href="/marketplace">
                    <Button
                      variant="outline"
                      className="w-full mt-2 bg-transparent group-hover:border-primary group-hover:text-primary transition-colors"
                    >
                      View Full Profile
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/marketplace">
              <Button size="lg" variant="outline" className="bg-transparent px-10 border-primary/40 text-primary hover:bg-primary/5">
                Explore All Businesses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ IMPACT STATS ═══════════════════ */}
      <section className="py-24 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Impact"
            title="Numbers That Tell the Story"
            subtitle="Since 2022, EmpowerMSME has become India's most-trusted platform for small business growth."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {IMPACT_STATS.map(({ value, label, sub, icon: Icon, color }) => (
              <Card
                key={label}
                className="group text-center border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="pb-2">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-${color}/10 mx-auto mb-3 group-hover:bg-${color}/20 transition-colors`}>
                    <Icon className={`h-8 w-8 text-${color}`} />
                  </div>
                  <CardTitle className="text-4xl font-bold text-foreground">{value}</CardTitle>
                  <p className="font-semibold text-foreground/80 mt-1">{label}</p>
                  <CardDescription className="text-sm">{sub}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section className="py-24 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Success Stories"
            title="Real Businesses, Real Results"
            subtitle="Don't take our word for it — hear directly from the entrepreneurs we've helped."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map(({ name, role, location, quote, avatar, rating, color }) => (
              <Card
                key={name}
                className="relative overflow-hidden border-border/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full bg-gradient-to-br ${color} opacity-10`} />

                <CardContent className="pt-6 space-y-4">
                  <StarRow count={rating} />
                  <p className="text-muted-foreground leading-relaxed italic text-sm">
                    "{quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${color} text-white font-bold text-sm shrink-0`}
                    >
                      {avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{name}</p>
                      <p className="text-xs text-muted-foreground">{role}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" /> {location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA BANNER ═══════════════════ */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-12 text-center shadow-2xl shadow-primary/20">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-10 -right-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
            </div>

            <div className="relative space-y-6">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-1 backdrop-blur-sm">
                <Lightbulb className="h-3.5 w-3.5 mr-1.5" />
                For Business Owners & Investors
              </Badge>

              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Ready to Take the Next Step?
              </h2>
              <p className="text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                Whether you're an MSME owner looking for your first round of funding, or an
                investor wanting to back India's next success story — your journey starts here.
              </p>

              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <Link href="/auth/select">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 font-semibold text-base h-13 px-8 shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    Apply for Funding
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/50 text-white hover:bg-white/10 text-base h-13 px-8 bg-transparent"
                  >
                    Invest in an MSME
                  </Button>
                </Link>
              </div>

              <p className="text-white/60 text-sm">
                Free to join · No hidden fees · Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  )
}
