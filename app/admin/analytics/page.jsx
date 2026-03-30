"use client"

import { motion } from "framer-motion"
import AdminSidebar from "@/components/admin-sidebar"
import { MetricCard } from "@/components/ui/metric-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { TrendingUp, Users, DollarSign, AlertTriangle, Building2, BarChart3 } from "lucide-react"

const platformGrowth = [
  { month: "Oct", users: 4100, campaigns: 28, loans: 210 },
  { month: "Nov", users: 4450, campaigns: 31, loans: 248 },
  { month: "Dec", users: 4820, campaigns: 35, loans: 287 },
  { month: "Jan", users: 5100, campaigns: 38, loans: 320 },
  { month: "Feb", users: 5280, campaigns: 40, loans: 355 },
  { month: "Mar", users: 5432, campaigns: 42, loans: 392 },
]

const loanVolumeData = [
  { month: "Oct", disbursed: 8500, repaid: 3200, defaulted: 180 },
  { month: "Nov", disbursed: 9200, repaid: 4100, defaulted: 210 },
  { month: "Dec", disbursed: 12400, repaid: 5800, defaulted: 240 },
  { month: "Jan", disbursed: 7800, repaid: 6200, defaulted: 150 },
  { month: "Feb", disbursed: 10500, repaid: 7100, defaulted: 190 },
  { month: "Mar", disbursed: 11200, repaid: 7900, defaulted: 160 },
]

const sectorDistribution = [
  { name: "Technology", value: 28, color: "#3b82f6" },
  { name: "Agriculture", value: 22, color: "#10b981" },
  { name: "Manufacturing", value: 18, color: "#f59e0b" },
  { name: "Retail", value: 15, color: "#8b5cf6" },
  { name: "Logistics", value: 10, color: "#ef4444" },
  { name: "Others", value: 7, color: "#6b7280" },
]

const defaultRateData = [
  { month: "Oct", rate: 3.1 },
  { month: "Nov", rate: 2.9 },
  { month: "Dec", rate: 2.6 },
  { month: "Jan", rate: 2.8 },
  { month: "Feb", rate: 2.4 },
  { month: "Mar", rate: 2.3 },
]

export default function AdminAnalyticsPage() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="border-b border-border bg-card px-8 py-6">
            <h1 className="text-3xl font-bold text-foreground">Platform Analytics</h1>
            <p className="text-muted-foreground mt-1">Real-time platform health, growth metrics, and financial overview</p>
          </div>

          <div className="p-8 space-y-8">
            {/* KPI Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <MetricCard title="Total Funds Raised" value={87500000} prefix="₹" change={18.5} description="Platform lifetime" icon={DollarSign} iconColor="text-primary" iconBg="bg-primary/10" delay={0} />
              <MetricCard title="Total Users" value={5432} change={12.3} description="+180 this month" icon={Users} iconColor="text-violet-500" iconBg="bg-violet-500/10" delay={0.08} />
              <MetricCard title="Active Campaigns" value={42} change={7.7} description="8 funded this month" icon={TrendingUp} iconColor="text-emerald-500" iconBg="bg-emerald-500/10" delay={0.16} />
              <MetricCard title="Active Businesses" value={1243} change={9.2} description="892 KYC verified" icon={Building2} iconColor="text-amber-500" iconBg="bg-amber-500/10" delay={0.24} />
              <MetricCard title="Loan Default Rate" value={2.3} suffix="%" change={-0.5} description="Improved from 2.8%" icon={AlertTriangle} iconColor="text-red-500" iconBg="bg-red-500/10" delay={0.32} decimals={1} />
              <MetricCard title="Avg ROI for Investors" value={14.8} suffix="%" change={1.2} description="Across all campaigns" icon={BarChart3} iconColor="text-cyan-500" iconBg="bg-cyan-500/10" delay={0.4} decimals={1} />
            </div>

            {/* Platform Growth */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                  <CardDescription>Users, campaigns, and loans over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={platformGrowth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        {["users", "campaigns", "loans"].map((k, i) => (
                          <linearGradient key={k} id={`grad_${k}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={["#3b82f6", "#10b981", "#f59e0b"][i]} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={["#3b82f6", "#10b981", "#f59e0b"][i]} stopOpacity={0} />
                          </linearGradient>
                        ))}
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="users" name="Users" stroke="#3b82f6" fill="url(#grad_users)" strokeWidth={2} />
                      <Area type="monotone" dataKey="campaigns" name="Campaigns" stroke="#10b981" fill="url(#grad_campaigns)" strokeWidth={2} />
                      <Area type="monotone" dataKey="loans" name="Loans" stroke="#f59e0b" fill="url(#grad_loans)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Loan Volume */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Volume (₹ in thousands)</CardTitle>
                    <CardDescription>Disbursed, repaid, and defaulted amounts per month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={loanVolumeData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip formatter={v => [`₹${v}K`]} />
                        <Legend />
                        <Bar dataKey="disbursed" name="Disbursed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="repaid" name="Repaid" fill="#10b981" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="defaulted" name="Defaulted" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Sector Pie */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Sector Distribution</CardTitle>
                    <CardDescription>Businesses by sector</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={sectorDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                          {sectorDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Pie>
                        <Tooltip formatter={v => [`${v}%`]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-1.5 mt-2">
                      {sectorDistribution.map(s => (
                        <div key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                          {s.name}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Default Rate Trend */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Default Rate Trend (%)</CardTitle>
                  <CardDescription>Platform-wide loan default rate improving over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={defaultRateData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} domain={[0, 5]} />
                      <Tooltip formatter={v => [`${v}%`, "Default Rate"]} />
                      <Line type="monotone" dataKey="rate" name="Default Rate" stroke="#ef4444" strokeWidth={2.5} dot={{ fill: "#ef4444", r: 4 }} />
                    </LineChart>
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
