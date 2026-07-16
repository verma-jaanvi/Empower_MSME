"use client"
/**
 * app/business/profile/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Business Profile — read-only view of the authenticated user's MSME profile.
 *
 * Architecture:
 *  • Reads user data from useAuthStore (Zustand) — no prop-drilling.
 *  • Matches the flex h-screen layout pattern used by all business/* pages.
 *  • Links to /business/settings for editing.
 *  • All fields degrade gracefully to "—" when optional fields are empty.
 */

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import BusinessSidebar from "@/components/business-sidebar"
import { useAuthStore } from "@/store/useAuthStore"
import type { User } from "@/types/auth"
import {
  Building2, Mail, Shield, MapPin, Phone, Globe, Users,
  Calendar, FileText, Pencil, Tag, CheckCircle2, Clock,
  Briefcase, ArrowRight, Sparkles
} from "lucide-react"

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Renders "—" when the value is empty/undefined */
function Field({ label, value, icon: Icon }: {
  label: string
  value?: string
  icon: React.ElementType
}) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-border last:border-0">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/8 shrink-0 mt-0.5">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className={`text-sm font-medium ${value ? "text-foreground" : "text-muted-foreground/50"}`}>
          {value || "—"}
        </p>
      </div>
    </div>
  )
}

/** Card wrapper matching the dashboard's card style */
function SectionCard({ title, children, action }: {
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/80">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {action}
      </div>
      <div className="px-6 py-1">{children}</div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BusinessProfilePage() {
  const user = useAuthStore((s) => s.user)

  // Role-to-label display map
  const ACCESS_LABELS: Record<string, { label: string; color: string }> = {
    business: { label: "MSME Business Owner", color: "text-primary bg-primary/10" },
    user: { label: "Individual / Investor", color: "text-accent bg-accent/10" },
    admin: { label: "Platform Administrator", color: "text-red-500 bg-red-500/10" },
  }
  const accessInfo = user ? ACCESS_LABELS[user.role] : null

  // Completion percentage (how many optional fields are filled)
  const OPTIONAL_FIELDS: (keyof User)[] = [
    "businessName", "tagline", "sector", "location",
    "phone", "bio", "gstin", "teamSize", "foundedYear", "website",
  ]
  const filledCount = user
    ? OPTIONAL_FIELDS.filter((f) => Boolean(user[f])).length
    : 0
  const completionPct = Math.round((filledCount / OPTIONAL_FIELDS.length) * 100)

  return (
    <div className="flex h-screen bg-background">
      <BusinessSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">

          {/* ── Page Header ──────────────────────────────────────────────── */}
          <div className="border-b border-border bg-card px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
                <p className="text-muted-foreground mt-1">
                  Your MSME business profile as seen by investors and the platform.
                </p>
              </div>
              <Link
                href="/business/settings"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 hover:opacity-90 transition-opacity"
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Link>
            </div>
          </div>

          <div className="p-8 space-y-6 max-w-5xl">

            {/* ── Hero Card ────────────────────────────────────────────────── */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              {/* Gradient strip */}
              <div className="h-2 bg-gradient-to-r from-primary to-accent" />

              <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-5">
                {/* Avatar */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white text-2xl font-bold shadow-lg shadow-primary/20">
                  {user?.businessName
                    ? user.businessName.slice(0, 2).toUpperCase()
                    : user?.name?.slice(0, 2).toUpperCase() ?? "??"}
                </div>

                {/* Identity */}
                <div className="flex-1 space-y-1.5">
                  <h2 className="text-2xl font-bold text-foreground">
                    {user?.businessName || user?.name || "Business Name"}
                  </h2>
                  {user?.tagline && (
                    <p className="text-muted-foreground text-sm">{user.tagline}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {accessInfo && (
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${accessInfo.color}`}>
                        <Shield className="h-3 w-3" />
                        {accessInfo.label}
                      </span>
                    )}
                    {user?.approved ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-600">
                        <CheckCircle2 className="h-3 w-3" />
                        KYC Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-amber-500/10 text-amber-600">
                        <Clock className="h-3 w-3" />
                        Pending Approval
                      </span>
                    )}
                  </div>
                </div>

                {/* Profile completion ring */}
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <div className="relative h-16 w-16">
                    <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor"
                        strokeWidth="6" className="text-border" />
                      <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor"
                        strokeWidth="6" strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 26}`}
                        strokeDashoffset={`${2 * Math.PI * 26 * (1 - completionPct / 100)}`}
                        className="text-primary transition-all duration-500" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
                      {completionPct}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground text-center leading-tight">
                    Profile<br />Complete
                  </p>
                </div>
              </div>
            </div>

            {/* ── Profile incomplete nudge ──────────────────────────────────── */}
            {completionPct < 100 && (
              <div className="flex items-center gap-4 rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
                <Sparkles className="h-5 w-5 text-amber-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Complete your profile to attract investors</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Profiles with complete information get 3× more investor views.
                  </p>
                </div>
                <Link
                  href="/business/settings"
                  className="flex items-center gap-1 text-sm font-semibold text-amber-600 hover:underline shrink-0"
                >
                  Fill in <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

            {/* ── Two-column grid ───────────────────────────────────────────── */}
            <div className="grid gap-6 lg:grid-cols-2">

              {/* Account Information */}
              <SectionCard title="Account Information">
                <Field label="Display Name" value={user?.name} icon={Building2} />
                <Field label="Email Address" value={user?.email} icon={Mail} />
                <Field label="Access Level" value={accessInfo?.label} icon={Shield} />
                <Field label="Account Status" value={user?.approved ? "Approved & Active" : "Pending Admin Approval"} icon={CheckCircle2} />
              </SectionCard>

              {/* Business Details */}
              <SectionCard
                title="Business Details"
                action={
                  <Link href="/business/settings" className="text-xs text-primary hover:underline font-medium">
                    Edit
                  </Link>
                }
              >
                <Field label="Business Name" value={user?.businessName} icon={Building2} />
                <Field label="Tagline" value={user?.tagline} icon={Tag} />
                <Field label="Sector" value={user?.sector} icon={Briefcase} />
                <Field label="Founded Year" value={user?.foundedYear} icon={Calendar} />
                <Field label="Team Size" value={user?.teamSize ? `${user.teamSize} employees` : undefined} icon={Users} />
              </SectionCard>

              {/* Contact & Online */}
              <SectionCard title="Contact & Online Presence">
                <Field label="Location" value={user?.location} icon={MapPin} />
                <Field label="Phone" value={user?.phone} icon={Phone} />
                <Field label="Website" value={user?.website} icon={Globe} />
                <Field label="GSTIN" value={user?.gstin} icon={FileText} />
              </SectionCard>

              {/* About */}
              <SectionCard title="About the Business">
                <div className="py-3">
                  {user?.bio ? (
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                      {user.bio}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground/50 italic">
                      No description added yet.{" "}
                      <Link href="/business/settings" className="text-primary not-italic hover:underline">
                        Add one →
                      </Link>
                    </p>
                  )}
                </div>
              </SectionCard>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}
