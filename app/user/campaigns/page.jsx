"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import UserSidebar from "@/components/user-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, TrendingUp, Users, DollarSign, Timer, ChevronRight, Filter } from "lucide-react"

const campaigns = [
  { id: "c1", businessName: "GreenLeaf Organics", sector: "Agriculture", region: "Maharashtra", title: "Organic Spice Processing Expansion", description: "Scaling certified organic spice processing capacity to meet export demand. 5-year track record.", goal: 2500000, raised: 1875000, investors: 34, daysLeft: 18, riskLevel: "Low", expectedROI: 14.5, repaymentModel: "Revenue-Based (8%)", tags: ["organic", "export"] },
  { id: "c2", businessName: "TechWeave Solutions", sector: "Technology", region: "Karnataka", title: "AI-Powered SME Inventory SaaS", description: "Building AI inventory management SaaS for small retailers. 120 beta users, strong retention.", goal: 5000000, raised: 2200000, investors: 47, daysLeft: 30, riskLevel: "Medium", expectedROI: 18.0, repaymentModel: "Fixed EMI (24 months)", tags: ["saas", "technology"] },
  { id: "c3", businessName: "CoolChain Logistics", sector: "Logistics", region: "Delhi NCR", title: "Cold Chain Expansion — 3 Cities", description: "Expanding temperature-controlled logistics to Jaipur, Lucknow, Chandigarh. Pharma + dairy.", goal: 8000000, raised: 3200000, investors: 23, daysLeft: 45, riskLevel: "Medium", expectedROI: 16.5, repaymentModel: "Fixed EMI (36 months)", tags: ["logistics"] },
  { id: "c4", businessName: "Solar Ease Energy", sector: "Energy", region: "Rajasthan", title: "Rooftop Solar Installation for SMEs", description: "Providing solar financing and installation to 200+ small businesses. Government subsidy eligible.", goal: 3000000, raised: 900000, investors: 18, daysLeft: 60, riskLevel: "Low", expectedROI: 12.0, repaymentModel: "Revenue-Based (5%)", tags: ["solar", "green"] },
]

const RISK_STYLES = { Low: "bg-emerald-500/10 text-emerald-600", Medium: "bg-amber-500/10 text-amber-600", High: "bg-red-500/10 text-red-600" }

function CampaignCard({ campaign, onInvest }) {
  const pct = Math.min((campaign.raised / campaign.goal) * 100, 100)
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }}
      className="border border-border rounded-xl bg-card overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className={`h-1.5 w-full ${campaign.riskLevel === "Low" ? "bg-emerald-500" : campaign.riskLevel === "Medium" ? "bg-amber-500" : "bg-red-500"}`} />
      <div className="p-5 space-y-4">
        <div>
          <div className="flex items-start justify-between mb-2">
            <Badge variant="secondary" className="text-xs">{campaign.sector}</Badge>
            <Badge className={RISK_STYLES[campaign.riskLevel]}>{campaign.riskLevel} Risk</Badge>
          </div>
          <h3 className="font-semibold text-foreground">{campaign.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{campaign.businessName} • {campaign.region}</p>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{campaign.description}</p>
        </div>

        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>₹{(campaign.raised / 100000).toFixed(1)}L raised</span>
            <span className="font-medium">{pct.toFixed(0)}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${campaign.riskLevel === "Low" ? "bg-emerald-500" : "bg-amber-500"}`}
              initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">of ₹{(campaign.goal / 100000).toFixed(1)}L goal</p>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-border">
          <div className="text-center">
            <p className="text-sm font-bold text-emerald-500">{campaign.expectedROI}%</p>
            <p className="text-xs text-muted-foreground">Expected ROI</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">{campaign.investors}</p>
            <p className="text-xs text-muted-foreground">Investors</p>
          </div>
          <div className="text-center">
            <p className={`text-sm font-bold ${campaign.daysLeft <= 15 ? "text-red-500" : "text-foreground"}`}>{campaign.daysLeft}d</p>
            <p className="text-xs text-muted-foreground">Left</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">📋 {campaign.repaymentModel}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full gap-2 bg-gradient-to-r from-primary to-violet-500 hover:opacity-90">
                <DollarSign className="h-4 w-4" /> Invest Now
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Invest in {campaign.businessName}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-muted/30 rounded-xl space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Campaign</span><span className="font-medium">{campaign.title}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Expected ROI</span><span className="font-medium text-emerald-500">{campaign.expectedROI}% p.a.</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Repayment</span><span className="font-medium">{campaign.repaymentModel}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Risk</span><Badge className={RISK_STYLES[campaign.riskLevel]}>{campaign.riskLevel}</Badge></div>
                </div>
                <div className="space-y-2"><Label>Investment Amount (₹)</Label><Input type="number" placeholder="e.g., 50000" /></div>
                <Button className="w-full">Confirm Investment</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.div>
  )
}

export default function InvestorCampaignsPage() {
  const [search, setSearch] = useState("")
  const [sectorFilter, setSectorFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")

  const filtered = campaigns.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.businessName.toLowerCase().includes(search.toLowerCase())
    const matchSector = sectorFilter === "all" || c.sector === sectorFilter
    const matchRisk = riskFilter === "all" || c.riskLevel === riskFilter
    return matchSearch && matchSector && matchRisk
  })

  return (
    <div className="flex h-screen bg-background">
      <UserSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="border-b border-border bg-card px-8 py-6">
            <h1 className="text-3xl font-bold text-foreground">Browse Campaigns</h1>
            <p className="text-muted-foreground mt-1">Discover MSME investment opportunities across sectors</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Search campaigns..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Sector" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  {["Agriculture", "Technology", "Logistics", "Energy", "Manufacturing"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-36"><SelectValue placeholder="Risk" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk</SelectItem>
                  <SelectItem value="Low">Low Risk</SelectItem>
                  <SelectItem value="Medium">Medium Risk</SelectItem>
                  <SelectItem value="High">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p className="text-sm text-muted-foreground">{filtered.length} campaigns found</p>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map(c => <CampaignCard key={c.id} campaign={c} />)}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
