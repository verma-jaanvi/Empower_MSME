"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BusinessSidebar from "@/components/business-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wand2, Copy, Download, RefreshCw, Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

const SECTORS = ["Technology", "Agriculture", "Manufacturing", "Retail", "Healthcare", "Education", "Logistics", "Food & Beverage", "Textile", "Other"]

function generatePitch(form, variant) {
  const { businessName, sector, location, revenue, goal, usp, yearsInBusiness, employees } = form
  const goalL = (Number(goal) / 100000).toFixed(1)
  const revL = (Number(revenue) / 100000).toFixed(1)

  const pitches = {
    professional: `**${businessName}** — Investment Opportunity in ${sector}

${businessName} is a ${yearsInBusiness}-year-old ${sector.toLowerCase()} enterprise based in ${location}, employing ${employees}+ people and generating ₹${revL}L in annual revenue.

**The Opportunity**
We are raising ₹${goalL}L to ${usp}. The ${sector} sector in India is growing at 12-18% CAGR, with significant unmet demand in tier-2 cities like ${location}.

**Why Invest?**
• Proven business model with ${yearsInBusiness} years of operational track record
• Annual revenue of ₹${revL}L with consistent growth trajectory
• Clear deployment plan: 60% operations expansion, 25% technology upgrade, 15% working capital
• Revenue-based repayment — aligned incentives for investors and business

**Financial Projections**
With this funding, we project 40% revenue growth within 18 months, targeting ₹${(revL * 1.4).toFixed(1)}L ARR by FY27.

**Risk Mitigation**
All funds are purpose-bound with monthly reporting. Our credit score of 742 reflects strong financial discipline.`,

    emotional: `Imagine 50 families in ${location} depending on a single decision you make today.

At **${businessName}**, we started ${yearsInBusiness} years ago with a simple belief: that small businesses are the backbone of India. What began as a dream is now a ₹${revL}L company serving hundreds of customers across ${sector.toLowerCase()}.

**But we're not done.**

${usp}. This isn't just about revenue growth — it's about ${employees} people who come to work every morning believing in what we're building. It's about the suppliers we support, the communities we serve.

We're raising ₹${goalL}L — not to survive, but to thrive. To prove that businesses in ${location} can compete, can innovate, can lead.

**Join us.** Not just as an investor, but as a partner in something that matters.

Every rupee you invest generates ripples. In jobs. In families. In futures.

Together, let's build more than a business — let's build a legacy.`,

    data_driven: `**INVESTMENT BRIEF: ${businessName}**
Sector: ${sector} | Location: ${location} | Stage: Growth

━━━━━━━━━━━━━━━━━━━━━━━━━━
**KEY METRICS**
• Annual Revenue: ₹${revL}L (FY25)
• YoY Growth: ~22%
• Employees: ${employees}
• Business Age: ${yearsInBusiness} years
• Credit Score: 742/900 (Good)
━━━━━━━━━━━━━━━━━━━━━━━━━━

**FUNDING ASK: ₹${goalL}L**
Use of Funds:
- 60% → ${usp}
- 25% → Technology & digital infrastructure
- 15% → Working capital & emergency reserve

**RETURNS ANALYSIS**
• Expected ROI: 14-18% p.a.
• Repayment Model: Revenue-share (8% monthly)
• Estimated tenure: 18-24 months
• Cap rate: 1.3× (total repayable = ₹${(goalL * 1.3).toFixed(1)}L)

**RISK PROFILE: LOW-MEDIUM**
✅ ${yearsInBusiness}+ years operational history
✅ Positive EBITDA, sustainable cash flow
✅ Registered: MSME (Udyam), GST, PAN
✅ No existing NPAs or legal disputes

Detailed financial model available on request.`,
  }

  return pitches[variant] || pitches.professional
}

const VARIANTS = [
  { key: "professional", label: "Professional", icon: "🏛️", desc: "Formal, structured, investor-centric" },
  { key: "emotional", label: "Emotional", icon: "❤️", desc: "Story-driven, community impact" },
  { key: "data_driven", label: "Data-Driven", icon: "📊", desc: "Numbers-first, analytical" },
]

export default function StoryBuilderPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ businessName: "", sector: "", location: "", revenue: "", goal: "", usp: "", yearsInBusiness: "", employees: "" })
  const [pitches, setPitches] = useState(null)
  const [activeVariant, setActiveVariant] = useState("professional")
  const [copied, setCopied] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  function generate() {
    const generated = {}
    VARIANTS.forEach(v => { generated[v.key] = generatePitch(form, v.key) })
    setPitches(generated)
    setStep(1)
  }

  function copy() {
    navigator.clipboard.writeText(pitches[activeVariant])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex h-screen bg-background">
      <BusinessSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="border-b border-border bg-card px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500">
                <Wand2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">AI Story Builder</h1>
                <p className="text-muted-foreground mt-0.5">Generate persuasive campaign pitches in 3 different tones</p>
              </div>
            </div>
          </div>

          <div className="p-8 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-amber-500" /> Business Details</CardTitle>
                      <CardDescription>Tell us about your business — we'll craft the perfect investor pitch</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2"><Label>Business Name *</Label><Input placeholder="e.g., GreenLeaf Organics" value={form.businessName} onChange={e => set("businessName", e.target.value)} /></div>
                        <div className="space-y-2">
                          <Label>Sector *</Label>
                          <Select value={form.sector} onValueChange={v => set("sector", v)}>
                            <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
                            <SelectContent>{SECTORS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2"><Label>Location</Label><Input placeholder="e.g., Pune, Maharashtra" value={form.location} onChange={e => set("location", e.target.value)} /></div>
                        <div className="space-y-2"><Label>Years in Business</Label><Input type="number" placeholder="3" value={form.yearsInBusiness} onChange={e => set("yearsInBusiness", e.target.value)} /></div>
                        <div className="space-y-2"><Label>Annual Revenue (₹)</Label><Input type="number" placeholder="2000000" value={form.revenue} onChange={e => set("revenue", e.target.value)} /></div>
                        <div className="space-y-2"><Label>Funding Goal (₹)</Label><Input type="number" placeholder="500000" value={form.goal} onChange={e => set("goal", e.target.value)} /></div>
                        <div className="space-y-2"><Label>Number of Employees</Label><Input type="number" placeholder="25" value={form.employees} onChange={e => set("employees", e.target.value)} /></div>
                      </div>
                      <div className="space-y-2">
                        <Label>How will funds be used? (USP) *</Label>
                        <Textarea placeholder="e.g., expand our cold storage capacity to serve 3 new districts and reduce post-harvest losses by 40%..." value={form.usp} onChange={e => set("usp", e.target.value)} rows={3} />
                      </div>
                      <Button className="w-full gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90"
                        onClick={generate}
                        disabled={!form.businessName || !form.sector || !form.usp}>
                        <Wand2 className="h-4 w-4" /> Generate 3 Pitch Variants
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {step === 1 && pitches && (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="gap-1" onClick={() => setStep(0)}><ChevronLeft className="h-4 w-4" /> Edit Details</Button>
                    <span className="text-muted-foreground text-sm">3 pitches generated for {form.businessName}</span>
                  </div>

                  {/* Variant Tabs */}
                  <div className="flex gap-3">
                    {VARIANTS.map(v => (
                      <button key={v.key} onClick={() => setActiveVariant(v.key)}
                        className={`flex-1 p-4 border rounded-xl text-left transition-all ${activeVariant === v.key ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                        <div className="text-2xl mb-1">{v.icon}</div>
                        <div className="font-semibold text-sm">{v.label}</div>
                        <div className="text-xs text-muted-foreground">{v.desc}</div>
                      </button>
                    ))}
                  </div>

                  {/* Pitch Display */}
                  <AnimatePresence mode="wait">
                    <motion.div key={activeVariant} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle>{VARIANTS.find(v => v.key === activeVariant)?.icon} {VARIANTS.find(v => v.key === activeVariant)?.label} Pitch</CardTitle>
                              <CardDescription>{VARIANTS.find(v => v.key === activeVariant)?.desc}</CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={copy}>
                                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                                {copied ? "Copied!" : "Copy"}
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="p-4 bg-muted/30 rounded-xl font-mono text-sm leading-relaxed whitespace-pre-wrap border border-border">
                            {pitches[activeVariant]}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </AnimatePresence>

                  <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={() => { setPitches(null); setStep(0) }}>
                    <RefreshCw className="h-4 w-4" /> Start Over
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
