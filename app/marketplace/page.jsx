"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import PublicNavbar from "@/components/public-navbar"
import GlobalFooter from "@/components/global-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ALL_BUSINESSES, SECTORS, LOCATIONS, STAGES } from "@/lib/businesses-data"
import {
  Search, Filter, Star, MapPin, Briefcase, IndianRupee,
  ChevronRight, SlidersHorizontal, X, ArrowRight, Sparkles,
  TrendingUp, Users, Building2
} from "lucide-react"

// ─── Reusable BusinessCard (identical design to homepage featured cards) ────────

function BusinessCard({ biz }) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 border-border/60 flex flex-col">
      {/* Per-business colour accent bar */}
      <div className={`h-2 bg-gradient-to-r ${biz.accentFrom} ${biz.accentTo}`} />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          {/* Avatar initials */}
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${biz.accentFrom} ${biz.accentTo} text-white font-bold text-sm border border-border/40 shrink-0`}
          >
            {biz.initials}
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <Badge className="bg-accent/10 text-accent border-accent/20">✓ Verified</Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {biz.rating}
              <span className="text-muted-foreground/60">({biz.reviews})</span>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <CardTitle className="text-lg leading-snug">{biz.name}</CardTitle>
          <CardDescription className="mt-1 text-sm">{biz.tagline}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="text-xs">{biz.stage}</Badge>
          {biz.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>

        {/* Meta details */}
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
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" /> Team Size
            </span>
            <span className="font-medium">{biz.employees}</span>
          </div>
        </div>

        {/* Funding progress */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">{biz.raised} raised</span>
            <span className="font-semibold text-accent">{biz.progress}% funded</span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${biz.accentFrom} ${biz.accentTo} transition-all`}
              style={{ width: `${biz.progress}%` }}
            />
          </div>
        </div>

        {/* CTA buttons — pushed to bottom */}
        <div className="flex gap-2 pt-1 mt-auto">
          <Button
            variant="outline"
            className="flex-1 bg-transparent group-hover:border-primary group-hover:text-primary transition-colors text-sm"
          >
            View Profile
            <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </Button>
          <Link href="/auth/select" className="flex-1">
            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-sm">
              Invest
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Filter chip ─────────────────────────────────────────────────────────────────

function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-150 border",
        active
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary",
      ].join(" ")}
    >
      {label}
      {active && <X className="h-3 w-3" />}
    </button>
  )
}

// ─── Sort options ─────────────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  { value: "progress-desc", label: "Most Funded" },
  { value: "progress-asc", label: "Least Funded" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "name-asc", label: "A → Z" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────────

export default function MarketplacePage() {
  const [query, setQuery] = useState("")
  const [sector, setSector] = useState("All Sectors")
  const [stage, setStage] = useState("All Stages")
  const [sort, setSort] = useState("progress-desc")

  // Derived filtered + sorted list
  const results = useMemo(() => {
    let list = ALL_BUSINESSES.filter((b) => {
      const matchQuery =
        !query ||
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.tagline.toLowerCase().includes(query.toLowerCase()) ||
        b.sector.toLowerCase().includes(query.toLowerCase()) ||
        b.location.toLowerCase().includes(query.toLowerCase())

      const matchSector = sector === "All Sectors" || b.sector === sector
      const matchStage = stage === "All Stages" || b.stage === stage

      return matchQuery && matchSector && matchStage
    })

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "progress-desc": return b.progress - a.progress
        case "progress-asc":  return a.progress - b.progress
        case "rating-desc":   return b.rating - a.rating
        case "name-asc":      return a.name.localeCompare(b.name)
        default:              return 0
      }
    })

    return list
  }, [query, sector, stage, sort])

  const hasActiveFilters = sector !== "All Sectors" || stage !== "All Stages" || query !== ""

  function clearFilters() {
    setQuery("")
    setSector("All Sectors")
    setStage("All Stages")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      {/* ── Page Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-16 border-b border-border">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-4">
              <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-1 text-sm gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                Live Listings
              </Badge>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl tracking-tight">
                Invest in{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  India's Future
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Browse {ALL_BUSINESSES.length} verified MSMEs actively seeking funding.
                Filter by sector, stage, and location to find your perfect match.
              </p>
            </div>

            {/* Aggregate stats */}
            <div className="flex gap-6 shrink-0">
              {[
                { icon: Building2, value: `${ALL_BUSINESSES.length}`, label: "Live Listings" },
                { icon: TrendingUp, value: "₹480Cr+", label: "Total Deployed" },
                { icon: Users, value: "3,000+", label: "Active Investors" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center">
                  <Icon className="h-5 w-5 text-primary mx-auto mb-1" />
                  <p className="text-xl font-bold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters ────────────────────────────────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 space-y-3">
          {/* Search row */}
          <div className="flex gap-3 flex-wrap sm:flex-nowrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="marketplace-search"
                placeholder="Search by name, sector, or location…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary cursor-pointer appearance-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Chip filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-muted-foreground flex items-center gap-1 mr-1">
              <Filter className="h-3 w-3" /> Sector:
            </span>
            {SECTORS.map((s) => (
              <FilterChip
                key={s}
                label={s}
                active={sector === s && s !== "All Sectors"}
                onClick={() => setSector(sector === s ? "All Sectors" : s)}
              />
            ))}

            <span className="text-xs text-muted-foreground flex items-center gap-1 ml-3 mr-1">
              Stage:
            </span>
            {STAGES.map((s) => (
              <FilterChip
                key={s}
                label={s}
                active={stage === s && s !== "All Stages"}
                onClick={() => setStage(stage === s ? "All Stages" : s)}
              />
            ))}

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-2 text-xs text-muted-foreground hover:text-destructive transition-colors underline underline-offset-2"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Results Grid ───────────────────────────────────────────────────────── */}
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Result count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing <strong className="text-foreground">{results.length}</strong> of{" "}
              <strong className="text-foreground">{ALL_BUSINESSES.length}</strong> businesses
              {hasActiveFilters && " · filtered"}
            </p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-xs text-primary hover:underline">
                Show all
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">No businesses found</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Try adjusting your search or removing some filters to see more results.
              </p>
              <Button variant="outline" onClick={clearFilters} className="mt-2 bg-transparent">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((biz) => (
                <BusinessCard key={biz.id} biz={biz} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── CTA Banner ─────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Don't see the right business?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            New MSME listings go live every week. Sign up for investor alerts and be first in line
            when a business that matches your criteria seeks funding.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/select">
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-8">
                Get Investor Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/select">
              <Button variant="outline" className="bg-transparent px-8 border-primary/30 text-primary hover:bg-primary/5">
                List Your Business
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  )
}
