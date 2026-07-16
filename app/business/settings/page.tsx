"use client"
/**
 * app/business/settings/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Business Settings — edit profile form backed by useAuthStore.updateProfile().
 *
 * Architecture:
 *  • Reads current user from Zustand on mount → pre-fills all form fields.
 *  • Local `useState` tracks in-flight edits (controlled inputs).
 *  • On submit: calls updateProfile(), awaits result, redirects to /profile.
 *  • Email field is read-only (email changes require re-verification).
 *  • Server-controlled fields (id, role, approved) are never sent.
 *  • All event handlers are fully typed (React.FormEvent, React.ChangeEvent).
 *
 * Production note: Add optimistic UI and error boundary when connecting a
 * real PATCH /api/users/me endpoint.
 */

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import BusinessSidebar from "@/components/business-sidebar"
import { useAuthStore } from "@/store/useAuthStore"
import type { User } from "@/types/auth"
import {
  Building2, Mail, MapPin, Phone, Globe, Users,
  Calendar, FileText, Tag, Loader2, CheckCircle2,
  ArrowLeft, Save, AlertCircle, Info
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

/** Only the fields the user is allowed to edit — excludes id, role, email, approved */
type EditableProfile = Pick<
  User,
  | "name"
  | "businessName"
  | "tagline"
  | "sector"
  | "location"
  | "phone"
  | "bio"
  | "gstin"
  | "teamSize"
  | "foundedYear"
  | "website"
>

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Styled text input row */
function FormField({
  id,
  label,
  hint,
  icon: Icon,
  value,
  onChange,
  disabled = false,
  readOnly = false,
  placeholder,
  type = "text",
  maxLength,
}: {
  id: string
  label: string
  hint?: string
  icon: React.ElementType
  value: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  readOnly?: boolean
  placeholder?: string
  type?: string
  maxLength?: number
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        {label}
        {readOnly && (
          <span className="ml-auto text-xs text-muted-foreground font-normal flex items-center gap-1">
            <Info className="h-3 w-3" /> Read-only
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        maxLength={maxLength}
        className={[
          "w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
          readOnly || disabled
            ? "bg-muted/50 text-muted-foreground cursor-not-allowed border-border"
            : "bg-background border-border text-foreground hover:border-primary/40",
        ].join(" ")}
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

/** Styled textarea row */
function FormTextarea({
  id,
  label,
  hint,
  value,
  onChange,
  disabled,
  placeholder,
  maxLength,
}: {
  id: string
  label: string
  hint?: string
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
  placeholder?: string
  maxLength?: number
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground flex justify-between">
        <span>{label}</span>
        {maxLength && (
          <span className="text-xs text-muted-foreground font-normal">
            {value.length} / {maxLength}
          </span>
        )}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={4}
        className={[
          "w-full rounded-lg border border-border px-3.5 py-2.5 text-sm resize-none",
          "bg-background text-foreground hover:border-primary/40",
          "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors",
          disabled ? "opacity-60 cursor-not-allowed" : "",
        ].join(" ")}
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

/** Section card matching the profile page's visual language */
function SettingsSection({ title, description, children }: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="px-6 py-5 space-y-5">{children}</div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BusinessSettingsPage() {
  const router = useRouter()
  const { user, isLoading, error, updateProfile, clearError } = useAuthStore()

  // ── Local form state ────────────────────────────────────────────────────────
  // Initialised from Zustand; reflects the user's current saved values.
  const [form, setForm] = useState<EditableProfile>({
    name: "",
    businessName: "",
    tagline: "",
    sector: "",
    location: "",
    phone: "",
    bio: "",
    gstin: "",
    teamSize: "",
    foundedYear: "",
    website: "",
  })

  const [saveSuccess, setSaveSuccess] = useState(false)

  // Hydrate form from Zustand when user loads (handles SSR→CSR hydration gap)
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name ?? "",
        businessName: user.businessName ?? "",
        tagline: user.tagline ?? "",
        sector: user.sector ?? "",
        location: user.location ?? "",
        phone: user.phone ?? "",
        bio: user.bio ?? "",
        gstin: user.gstin ?? "",
        teamSize: user.teamSize ?? "",
        foundedYear: user.foundedYear ?? "",
        website: user.website ?? "",
      })
    }
  }, [user])

  // Typed field updater — works for all string fields of EditableProfile
  const handleChange =
    (field: keyof EditableProfile) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      if (error) clearError()
      setSaveSuccess(false)
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

  // ── Form submit ─────────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setSaveSuccess(false)

    // Strip empty strings before sending so we don't overwrite with blanks
    const payload: Partial<User> = Object.fromEntries(
      Object.entries(form).filter(([, v]) => typeof v === "string" && v.trim() !== "")
    ) as Partial<User>

    const success = await updateProfile(payload)

    if (success) {
      setSaveSuccess(true)
      // Brief success moment then redirect to the profile read view
      setTimeout(() => router.push("/business/profile"), 900)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <BusinessSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">

          {/* ── Page Header ────────────────────────────────────────────────── */}
          <div className="border-b border-border bg-card px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground mt-1">
                  Update your business profile, contact details, and account preferences.
                </p>
              </div>
              <Link
                href="/business/profile"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                View Profile
              </Link>
            </div>
          </div>

          <div className="p-8 max-w-3xl space-y-6">

            {/* Global error banner */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-4">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Save success banner */}
            {saveSuccess && (
              <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-5 py-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <p className="text-sm font-medium text-emerald-700">
                  Profile saved! Redirecting to your profile…
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">

              {/* ── Section 1: Account ─────────────────────────────────────── */}
              <SettingsSection
                title="Account Information"
                description="Core account details — some fields are managed by the platform."
              >
                <FormField
                  id="settings-name"
                  label="Display Name"
                  icon={Building2}
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="Your name or business contact name"
                  disabled={isLoading}
                  hint="Shown in the sidebar and on your public listing."
                />
                <FormField
                  id="settings-email"
                  label="Account Email"
                  icon={Mail}
                  value={user?.email ?? ""}
                  readOnly
                  hint="Email changes require identity re-verification. Contact support."
                  type="email"
                />
              </SettingsSection>

              {/* ── Section 2: Business Details ────────────────────────────── */}
              <SettingsSection
                title="Business Details"
                description="This information appears on your public marketplace listing."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    id="settings-businessName"
                    label="Business Name"
                    icon={Building2}
                    value={form.businessName ?? ""}
                    onChange={handleChange("businessName")}
                    placeholder="e.g. GreenLeaf Organics Pvt. Ltd."
                    disabled={isLoading}
                    hint="Legal name as registered with MCA / GST."
                  />
                  <FormField
                    id="settings-sector"
                    label="Sector"
                    icon={FileText}
                    value={form.sector ?? ""}
                    onChange={handleChange("sector")}
                    placeholder="e.g. AgriTech, HealthTech"
                    disabled={isLoading}
                  />
                </div>

                <FormField
                  id="settings-tagline"
                  label="Tagline"
                  icon={Tag}
                  value={form.tagline ?? ""}
                  onChange={handleChange("tagline")}
                  placeholder="One-line description shown on your listing card"
                  disabled={isLoading}
                  maxLength={120}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    id="settings-foundedYear"
                    label="Founded Year"
                    icon={Calendar}
                    value={form.foundedYear ?? ""}
                    onChange={handleChange("foundedYear")}
                    placeholder="e.g. 2021"
                    disabled={isLoading}
                    maxLength={4}
                  />
                  <FormField
                    id="settings-teamSize"
                    label="Team Size"
                    icon={Users}
                    value={form.teamSize ?? ""}
                    onChange={handleChange("teamSize")}
                    placeholder="e.g. 45"
                    disabled={isLoading}
                  />
                </div>

                <FormField
                  id="settings-gstin"
                  label="GSTIN"
                  icon={FileText}
                  value={form.gstin ?? ""}
                  onChange={handleChange("gstin")}
                  placeholder="e.g. 27AAPFU0939F1ZV"
                  disabled={isLoading}
                  maxLength={15}
                  hint="15-character GST Identification Number."
                />

                <FormTextarea
                  id="settings-bio"
                  label="About the Business"
                  value={form.bio ?? ""}
                  onChange={handleChange("bio")}
                  placeholder="Describe your business, the problem you solve, your traction, and why investors should back you…"
                  disabled={isLoading}
                  maxLength={500}
                  hint="Shown on your full profile page. Aim for 2–3 impactful paragraphs."
                />
              </SettingsSection>

              {/* ── Section 3: Contact ─────────────────────────────────────── */}
              <SettingsSection
                title="Contact & Online Presence"
                description="Help investors and partners reach you."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    id="settings-location"
                    label="Location"
                    icon={MapPin}
                    value={form.location ?? ""}
                    onChange={handleChange("location")}
                    placeholder="e.g. Pune, Maharashtra"
                    disabled={isLoading}
                  />
                  <FormField
                    id="settings-phone"
                    label="Phone Number"
                    icon={Phone}
                    value={form.phone ?? ""}
                    onChange={handleChange("phone")}
                    placeholder="e.g. +91 98765 43210"
                    disabled={isLoading}
                    type="tel"
                  />
                </div>
                <FormField
                  id="settings-website"
                  label="Website"
                  icon={Globe}
                  value={form.website ?? ""}
                  onChange={handleChange("website")}
                  placeholder="https://yourbusiness.com"
                  disabled={isLoading}
                  type="url"
                />
              </SettingsSection>

              {/* ── Save & Cancel ──────────────────────────────────────────── */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isLoading || saveSuccess}
                  className={[
                    "inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all",
                    isLoading || saveSuccess
                      ? "bg-primary/60 cursor-not-allowed"
                      : "bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-primary/20 hover:-translate-y-0.5",
                  ].join(" ")}
                >
                  {isLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
                  ) : saveSuccess ? (
                    <><CheckCircle2 className="h-4 w-4" /> Saved!</>
                  ) : (
                    <><Save className="h-4 w-4" /> Save Changes</>
                  )}
                </button>

                <Link
                  href="/business/profile"
                  className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  Cancel
                </Link>

                {isLoading && (
                  <p className="text-xs text-muted-foreground">
                    Saving your changes…
                  </p>
                )}
              </div>

            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
