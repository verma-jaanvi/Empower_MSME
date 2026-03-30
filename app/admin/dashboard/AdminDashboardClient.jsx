"use client"

import { motion } from "framer-motion"
import { MetricCard } from "@/components/ui/metric-card"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, Building2, TrendingUp, AlertCircle, CheckCircle, Clock, Shield, BarChart3 } from "lucide-react"
import Link from "next/link"

const growthData = [
  { month: "Oct", users: 4100 }, { month: "Nov", users: 4450 },
  { month: "Dec", users: 4820 }, { month: "Jan", users: 5100 },
  { month: "Feb", users: 5280 }, { month: "Mar", users: 5432 },
]

const pendingItems = [
  { id: 1, name: "GreenLeaf Organics", type: "Business", desc: "Submitted 2 days ago", label: "Pending" },
  { id: 2, name: "CoolChain Logistics", type: "Business", desc: "Submitted 4 days ago", label: "Pending" },
  { id: 3, name: "TechWeave Solutions", type: "Business", desc: "Submitted 1 week ago", label: "Review" },
]

const proposals = [
  { id: 1, name: "Investor Group A", amount: "₹50L proposal", label: "Review" },
  { id: 2, name: "Angel Network B", amount: "₹25L proposal", label: "Review" },
  { id: 3, name: "VC Fund C", amount: "₹1Cr proposal", label: "Screening" },
]

const recentActivity = [
  { icon: CheckCircle, color: "text-emerald-500", title: "Business verified", desc: "GreenLeaf Organics approved and activated", time: "2h ago" },
  { icon: AlertCircle, color: "text-amber-500", title: "Proposal flagged", desc: "Investment proposal requires manual review", time: "4h ago" },
  { icon: CheckCircle, color: "text-emerald-500", title: "User registered", desc: "New investor account created", time: "6h ago" },
  { icon: Shield, color: "text-red-500", title: "Security alert", desc: "Suspicious login from unknown location blocked", time: "9h ago" },
]

export default function AdminDashboardClient() {
  return (
    <>
      <div className="border-b border-border bg-card px-8 py-6">
        <h1 className="text-3xl font-bold text-foreground">Platform Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor and manage the EmpowerMSME platform</p>
      </div>

      <div className="p-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Total Users" value={5432} change={12.3} description="+180 this month" icon={Users} iconColor="text-primary" iconBg="bg-primary/10" delay={0} />
          <MetricCard title="Active Businesses" value={1243} change={9.2} description="892 KYC verified" icon={Building2} iconColor="text-emerald-500" iconBg="bg-emerald-500/10" delay={0.08} />
          <MetricCard title="Pending Reviews" value={24} description="Requires action" icon={Clock} iconColor="text-amber-500" iconBg="bg-amber-500/10" delay={0.16} />
          <MetricCard title="Funds Raised" value={87500000} prefix="₹" change={18.5} description="Platform lifetime" icon={TrendingUp} iconColor="text-violet-500" iconBg="bg-violet-500/10" delay={0.24} />
        </div>

        {/* Growth Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Platform User Growth</CardTitle>
                <CardDescription>Monthly active users over the last 6 months</CardDescription>
              </div>
              <Link href="/admin/analytics">
                <Button variant="outline" size="sm" className="bg-transparent gap-1"><BarChart3 className="h-3.5 w-3.5" /> Full Analytics</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={growthData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="adminGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" name="Users" stroke="#3b82f6" fill="url(#adminGrowthGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pending Verifications */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
            <Card>
              <CardHeader>
                <CardTitle>Pending Business Verifications</CardTitle>
                <CardDescription>New MSME applications awaiting approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingItems.map((item, i) => (
                    <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.07 }}
                      className="flex items-center justify-between p-3 border border-border rounded-xl hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-amber-500/10 text-amber-700">{item.label}</Badge>
                    </motion.div>
                  ))}
                  <Link href="/admin/users">
                    <Button variant="outline" className="w-full bg-transparent mt-1">Review All Applications</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Investor Proposals */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
            <Card>
              <CardHeader>
                <CardTitle>Investor Proposals Screening</CardTitle>
                <CardDescription>Investment proposals requiring verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {proposals.map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.07 }}
                      className="flex items-center justify-between p-3 border border-border rounded-xl hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                          <Users className="h-5 w-5 text-violet-500" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{p.name}</p>
                          <p className="text-sm text-muted-foreground">{p.amount}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-700">{p.label}</Badge>
                    </motion.div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent mt-1">Screen All Proposals</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map(({ icon: Icon, color, title, desc, time }, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 + i * 0.07 }}
                    className="flex items-start gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                    <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{title}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{time}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
