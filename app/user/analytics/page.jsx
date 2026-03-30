"use client"

import { motion } from "framer-motion"
import UserSidebar from "@/components/user-sidebar"
import { MetricCard } from "@/components/ui/metric-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { DollarSign, TrendingUp, BarChart3, Building2 } from "lucide-react"

const portfolioGrowth = [
  { month: "Oct", value: 250 }, { month: "Nov", value: 288 },
  { month: "Dec", value: 340 }, { month: "Jan", value: 370 },
  { month: "Feb", value: 410 }, { month: "Mar", value: 455 },
]

const roiByInvestment = [
  { name: "GreenLeaf", roi: 9, invested: 50, sector: "Agriculture" },
  { name: "TechWeave", roi: 12, invested: 100, sector: "Technology" },
  { name: "Artisan Textiles", roi: 14, invested: 75, sector: "Manufacturing" },
  { name: "CoolChain", roi: 9, invested: 150, sector: "Logistics" },
]

const riskDistribution = [
  { name: "Low Risk", value: 45, color: "#10b981" },
  { name: "Medium Risk", value: 40, color: "#f59e0b" },
  { name: "High Risk", value: 15, color: "#ef4444" },
]

const sectorAllocation = [
  { sector: "Agriculture", value: 50 },
  { sector: "Technology", value: 100 },
  { sector: "Manufacturing", value: 75 },
  { sector: "Logistics", value: 150 },
]

export default function UserAnalyticsPage() {
  const totalInvested = 375000
  const totalValue = 415500
  const avgROI = 11.2
  const activeInvestments = 3

  return (
    <div className="flex h-screen bg-background">
      <UserSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="border-b border-border bg-card px-8 py-6">
            <h1 className="text-3xl font-bold text-foreground">Portfolio Analytics</h1>
            <p className="text-muted-foreground mt-1">Deep dive into your investment performance and risk profile</p>
          </div>

          <div className="p-8 space-y-8">
            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard title="Total Invested" value={totalInvested} prefix="₹" change={35} icon={DollarSign} iconColor="text-primary" iconBg="bg-primary/10" delay={0} />
              <MetricCard title="Portfolio Value" value={totalValue} prefix="₹" change={10.8} icon={TrendingUp} iconColor="text-emerald-500" iconBg="bg-emerald-500/10" delay={0.08} />
              <MetricCard title="Average ROI" value={avgROI} suffix="%" change={1.2} decimals={1} icon={BarChart3} iconColor="text-violet-500" iconBg="bg-violet-500/10" delay={0.16} />
              <MetricCard title="Active Campaigns" value={activeInvestments} icon={Building2} iconColor="text-amber-500" iconBg="bg-amber-500/10" delay={0.24} />
            </div>

            {/* Portfolio Growth Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Value Over Time</CardTitle>
                  <CardDescription>Cumulative portfolio growth (₹ in thousands)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={portfolioGrowth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="userPortGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${v}K`} />
                      <Tooltip formatter={v => [`₹${v}K`, "Portfolio Value"]} />
                      <Area type="monotone" dataKey="value" name="Portfolio Value" stroke="#8b5cf6" fill="url(#userPortGrad)" strokeWidth={2.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* ROI by Investment */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>ROI by Investment</CardTitle>
                    <CardDescription>Annual return on each active investment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={roiByInvestment} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
                        <Tooltip formatter={(v, name) => [name === "roi" ? `${v}%` : `₹${v}K`, name === "roi" ? "ROI" : "Invested"]} />
                        <Legend />
                        <Bar dataKey="roi" name="ROI %" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="invested" name="Invested (₹K)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Risk Distribution */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Distribution</CardTitle>
                    <CardDescription>Portfolio exposure by risk category</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                          {riskDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Pie>
                        <Tooltip formatter={v => [`${v}%`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex gap-4 mt-2 flex-wrap justify-center">
                      {riskDistribution.map(r => (
                        <div key={r.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <div className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} /> {r.name} ({r.value}%)
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sector Allocation */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Sector Allocation (₹ in thousands)</CardTitle>
                  <CardDescription>How your capital is distributed across sectors</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={sectorAllocation} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={v => `₹${v}K`} />
                      <YAxis type="category" dataKey="sector" tick={{ fontSize: 12 }} />
                      <Tooltip formatter={v => [`₹${v}K`, "Invested"]} />
                      <Bar dataKey="value" name="Invested" fill="#3b82f6" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
