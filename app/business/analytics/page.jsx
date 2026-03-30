"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import BusinessSidebar from "@/components/business-sidebar"
import { MetricCard } from "@/components/ui/metric-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from "recharts"
import { TrendingUp, DollarSign, Users, BarChart3, Download } from "lucide-react"

const revenueData = [
  { month: "Oct", revenue: 850, funding: 250, repayment: 68 },
  { month: "Nov", revenue: 920, funding: 180, repayment: 74 },
  { month: "Dec", revenue: 1100, funding: 420, repayment: 88 },
  { month: "Jan", revenue: 750, funding: 150, repayment: 60 },
  { month: "Feb", revenue: 880, funding: 320, repayment: 70 },
  { month: "Mar", revenue: 950, funding: 280, repayment: 76 },
]

const sectorData = [
  { name: "Technology", value: 28, color: "#3b82f6" },
  { name: "Agriculture", value: 22, color: "#10b981" },
  { name: "Manufacturing", value: 18, color: "#f59e0b" },
  { name: "Retail", value: 15, color: "#8b5cf6" },
  { name: "Others", value: 17, color: "#6b7280" },
]

const investorActivity = [
  { month: "Oct", views: 320, inquiries: 24, investments: 3 },
  { month: "Nov", views: 410, inquiries: 31, investments: 5 },
  { month: "Dec", views: 680, inquiries: 48, investments: 8 },
  { month: "Jan", views: 520, inquiries: 38, investments: 6 },
  { month: "Feb", views: 790, inquiries: 55, investments: 9 },
  { month: "Mar", views: 940, inquiries: 67, investments: 11 },
]

export default function BusinessAnalyticsPage() {
  const [range, setRange] = useState("6m")
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <div className="flex h-screen bg-background">
      <BusinessSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="border-b border-border bg-card px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-muted-foreground mt-1">Track your business performance & funding metrics</p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={range} onValueChange={setRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="6m">Last 6 months</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" /> Export
                </Button>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* KPI Metrics */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard title="Total Funds Raised" value={2500000} prefix="₹" change={12.5} description="Across all campaigns" icon={DollarSign} iconColor="text-primary" iconBg="bg-primary/10" delay={0} />
              <MetricCard title="Active Campaigns" value={3} change={50} description="2 funded this quarter" icon={TrendingUp} iconColor="text-emerald-500" iconBg="bg-emerald-500/10" delay={0.08} />
              <MetricCard title="Investor Interest" value={45} change={28} description="Unique investors engaged" icon={Users} iconColor="text-violet-500" iconBg="bg-violet-500/10" delay={0.16} />
              <MetricCard title="Credit Score" value={742} change={8} description="Improved from 687 last year" icon={BarChart3} iconColor="text-amber-500" iconBg="bg-amber-500/10" delay={0.24} />
            </div>

            {/* Revenue vs Funding Area Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue vs Funding Received</CardTitle>
                  <CardDescription>Monthly comparison of business revenue and external funding (₹ in thousands)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={320}>
                    <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorFunding" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(v) => [`₹${v}K`, ""]} />
                      <Legend />
                      <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" fill="url(#colorRevenue)" strokeWidth={2} />
                      <Area type="monotone" dataKey="funding" name="Funding" stroke="#10b981" fill="url(#colorFunding)" strokeWidth={2} />
                      <Area type="monotone" dataKey="repayment" name="Repayment" stroke="#f59e0b" fill="none" strokeWidth={2} strokeDasharray="5 5" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Bar Chart + Pie Chart Row */}
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Investor Activity</CardTitle>
                    <CardDescription>Profile views, inquiries, and investments per month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={investorActivity} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="views" name="Profile Views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="inquiries" name="Inquiries" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="investments" name="Investments" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Sector Comparison</CardTitle>
                    <CardDescription>How your business compares by sector funding share</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={sectorData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                          {sectorData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v) => [`${v}%`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                      {sectorData.map((s) => (
                        <div key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <div className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                          {s.name} ({s.value}%)
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Performance Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance Summary</CardTitle>
                  <CardDescription>Detailed breakdown of key metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground">
                          <th className="py-3 pr-4 text-left font-medium">Month</th>
                          <th className="py-3 pr-4 text-right font-medium">Revenue</th>
                          <th className="py-3 pr-4 text-right font-medium">Funding</th>
                          <th className="py-3 pr-4 text-right font-medium">Repayment</th>
                          <th className="py-3 text-right font-medium">Profit %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {revenueData.map((row, i) => (
                          <motion.tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.05 }}>
                            <td className="py-3 pr-4 font-medium">{row.month} 2025</td>
                            <td className="py-3 pr-4 text-right">₹{row.revenue}K</td>
                            <td className="py-3 pr-4 text-right text-emerald-600">+₹{row.funding}K</td>
                            <td className="py-3 pr-4 text-right text-red-500">-₹{row.repayment}K</td>
                            <td className="py-3 text-right">
                              <Badge variant="secondary" className={row.revenue > 900 ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}>
                                {(((row.revenue - row.repayment) / row.revenue) * 100).toFixed(1)}%
                              </Badge>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
