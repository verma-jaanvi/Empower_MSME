"use client"

import { motion } from "framer-motion"
import BusinessSidebar from "@/components/business-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { AlertTriangle, CheckCircle2, Clock, TrendingDown, Calendar, Bell } from "lucide-react"

const paymentHistory = [
  { month: "Jun", amount: 69.2, status: "paid" },
  { month: "Jul", amount: 69.2, status: "paid" },
  { month: "Aug", amount: 69.2, status: "paid" },
  { month: "Sep", amount: 69.2, status: "paid" },
  { month: "Oct", amount: 69.2, status: "paid" },
  { month: "Nov", amount: 69.2, status: "paid" },
  { month: "Dec", amount: 69.2, status: "paid" },
  { month: "Jan", amount: 69.2, status: "paid" },
  { month: "Feb", amount: 69.2, status: "paid" },
  { month: "Mar", amount: 69.2, status: "paid" },
  { month: "Apr", amount: 69.2, status: "upcoming" },
  { month: "May", amount: 69.2, status: "upcoming" },
]

const balanceData = [
  { month: "Jun", remaining: 1430 },
  { month: "Jul", remaining: 1361 },
  { month: "Aug", remaining: 1291 },
  { month: "Sep", remaining: 1220 },
  { month: "Oct", remaining: 1148 },
  { month: "Nov", remaining: 1075 },
  { month: "Dec", remaining: 1001 },
  { month: "Jan", remaining: 925 },
  { month: "Feb", remaining: 848 },
  { month: "Mar", remaining: 769 },
]

const upcoming = [
  { date: "Apr 25, 2026", amount: 69200, type: "EMI", daysLeft: 25, overdue: false },
  { date: "May 25, 2026", amount: 69200, type: "EMI", daysLeft: 55, overdue: false },
]

export default function RepaymentsPage() {
  const totalLoan = 1500000
  const paid = 692000
  const remaining = 969000
  const paidPct = (paid / (paid + remaining)) * 100

  return (
    <div className="flex h-screen bg-background">
      <BusinessSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="border-b border-border bg-card px-8 py-6">
            <h1 className="text-3xl font-bold text-foreground">Repayment Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track your EMIs, payment history, and remaining balance</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Alert */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <Alert className="border-blue-500/30 bg-blue-500/5">
                <Bell className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-700 dark:text-blue-400">
                  Next EMI of <strong>₹69,200</strong> is due on <strong>April 25, 2026</strong> — 25 days remaining
                </AlertDescription>
              </Alert>
            </motion.div>

            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: "Total Loan", value: `₹${(totalLoan / 100000).toFixed(1)}L`, sub: "Original disbursed amount", icon: TrendingDown, color: "text-primary", bg: "bg-primary/10", delay: 0 },
                { title: "Amount Paid", value: `₹${(paid / 100000).toFixed(1)}L`, sub: "10 EMIs completed", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", delay: 0.08 },
                { title: "Remaining Balance", value: `₹${(remaining / 100000).toFixed(1)}L`, sub: "14 EMIs remaining", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10", delay: 0.16 },
              ].map((card, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: card.delay }} whileHover={{ y: -4 }}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${card.bg}`}>
                          <card.icon className={`h-5 w-5 ${card.color}`} />
                        </div>
                      </div>
                      <div className="text-3xl font-bold">{card.value}</div>
                      <div className="text-sm font-medium text-foreground mt-1">{card.title}</div>
                      <div className="text-xs text-muted-foreground">{card.sub}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Repayment Progress Bar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Overall Repayment Progress</CardTitle>
                    <span className="text-2xl font-bold text-foreground">{paidPct.toFixed(1)}%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative h-4 w-full rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${paidPct}%` }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>₹{(paid / 100000).toFixed(1)}L Paid</span>
                    <span>₹{(remaining / 100000).toFixed(1)}L Remaining</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Payment History Chart */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>Monthly EMI payments (₹ in thousands)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={paymentHistory} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip formatter={(v) => [`₹${v}K`, "EMI"]} />
                        <Bar dataKey="amount" name="EMI" radius={[4, 4, 0, 0]}
                          fill="#10b981"
                          data={paymentHistory.map(p => ({ ...p, fill: p.status === "upcoming" ? "#94a3b8" : "#10b981" }))} />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />Paid</div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><div className="h-2.5 w-2.5 rounded-full bg-slate-400" />Upcoming</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Remaining Balance Chart */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Remaining Balance Trend</CardTitle>
                    <CardDescription>Outstanding principal over time (₹ in thousands)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={240}>
                      <AreaChart data={balanceData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <defs>
                          <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip formatter={(v) => [`₹${v}K`, "Balance"]} />
                        <Area type="monotone" dataKey="remaining" name="Balance" stroke="#3b82f6" fill="url(#balGrad)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Upcoming Payments */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Payments</CardTitle>
                  <CardDescription>Scheduled EMIs and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcoming.map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                            <Calendar className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">{p.type} — {p.date}</p>
                            <p className="text-sm text-muted-foreground">{p.daysLeft} days remaining</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg">₹{p.amount.toLocaleString()}</span>
                          <Badge variant="secondary" className="bg-blue-500/10 text-blue-600">Upcoming</Badge>
                        </div>
                      </div>
                    ))}
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
