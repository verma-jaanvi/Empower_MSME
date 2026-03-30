"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import BusinessSidebar from "@/components/business-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Info, TrendingUp, DollarSign, Percent, Calculator } from "lucide-react"

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function generateRBFSchedule(funding, capRate, revenueShare, monthlyRevenue) {
  const totalRepayable = funding * capRate
  const schedule = []
  let remaining = totalRepayable
  let month = 0
  const startMonth = new Date().getMonth()

  while (remaining > 0 && month < 48) {
    const payment = Math.min(monthlyRevenue * (revenueShare / 100), remaining)
    remaining -= payment
    schedule.push({
      month: monthNames[(startMonth + month) % 12],
      revenue: monthlyRevenue / 1000,
      payment: Math.round(payment) / 1000,
      remaining: Math.round(remaining) / 1000,
    })
    month++
    if (month > 3) monthlyRevenue *= 1.02 // 2% MoM growth assumption
  }

  return schedule.slice(0, 12)
}

export default function RBFPage() {
  const [funding, setFunding] = useState(1000000)
  const [capRate, setCapRate] = useState(1.3)
  const [revenueShare, setRevenueShare] = useState(8)
  const [monthlyRevenue, setMonthlyRevenue] = useState(500000)

  const totalRepayable = funding * capRate
  const schedule = generateRBFSchedule(funding, capRate, revenueShare, monthlyRevenue)
  const avgPayment = schedule.reduce((s, r) => s + r.payment, 0) / schedule.length
  const estMonths = Math.ceil(totalRepayable / (monthlyRevenue * revenueShare / 100))

  return (
    <div className="flex h-screen bg-background">
      <BusinessSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="border-b border-border bg-card px-8 py-6">
            <h1 className="text-3xl font-bold text-foreground">Revenue-Based Financing</h1>
            <p className="text-muted-foreground mt-1">Flexible repayment tied to your monthly revenue — no fixed EMI pressure</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Info Banner */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 border border-blue-500/30 bg-blue-500/5 rounded-xl">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <strong>How RBF works:</strong> You receive funding upfront and repay a fixed % of your monthly revenue until you've repaid the total amount (Funding × Cap Rate). Lower revenue months = lower payments. No penalties for slow months.
              </div>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Configuration Panel */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" /> Configure Your RBF</CardTitle>
                    <CardDescription>Adjust parameters to model your repayment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Funding Amount</Label>
                      <div className="flex items-center gap-3">
                        <Input type="number" value={funding} onChange={e => setFunding(Number(e.target.value))} className="flex-1" />
                        <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">₹{(funding / 100000).toFixed(1)}L</span>
                      </div>
                      <Slider min={100000} max={10000000} step={100000} value={[funding]} onValueChange={([v]) => setFunding(v)} className="mt-2" />
                    </div>

                    <div className="space-y-2">
                      <Label>Cap Rate (Total Repayable / Funding)</Label>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-foreground">{capRate}×</span>
                        <span className="text-sm text-muted-foreground">= ₹{(totalRepayable / 100000).toFixed(1)}L total</span>
                      </div>
                      <Slider min={1.1} max={2.0} step={0.05} value={[capRate]} onValueChange={([v]) => setCapRate(v)} />
                      <div className="flex justify-between text-xs text-muted-foreground"><span>1.1× (low cost)</span><span>2.0× (high cost)</span></div>
                    </div>

                    <div className="space-y-2">
                      <Label>Revenue Share %</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">{revenueShare}%</span>
                        <span className="text-sm text-muted-foreground">of monthly revenue</span>
                      </div>
                      <Slider min={3} max={20} step={0.5} value={[revenueShare]} onValueChange={([v]) => setRevenueShare(v)} />
                      <div className="flex justify-between text-xs text-muted-foreground"><span>3% (low repayment)</span><span>20% (fast repayment)</span></div>
                    </div>

                    <div className="space-y-2">
                      <Label>Current Monthly Revenue</Label>
                      <Input type="number" value={monthlyRevenue} onChange={e => setMonthlyRevenue(Number(e.target.value))} />
                      <p className="text-xs text-muted-foreground">= ₹{(monthlyRevenue * revenueShare / 100 / 1000).toFixed(1)}K monthly payment at current revenue</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Summary Metrics */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Total Repayable", value: `₹${(totalRepayable / 100000).toFixed(1)}L`, desc: `${capRate}× of funding`, icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
                    { label: "Revenue Share", value: `${revenueShare}%`, desc: "of monthly revenue", icon: Percent, color: "text-violet-500", bg: "bg-violet-500/10" },
                    { label: "Avg Monthly Payment", value: `₹${(avgPayment * 1000 / 1000).toFixed(0)}K`, desc: "based on your revenue", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { label: "Est. Repayment Period", value: `${Math.min(estMonths, 48)} mo`, desc: "at current revenue", icon: Calculator, color: "text-amber-500", bg: "bg-amber-500/10" },
                  ].map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.07 }}>
                      <Card>
                        <CardContent className="p-5">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${m.bg} mb-3`}>
                            <m.icon className={`h-5 w-5 ${m.color}`} />
                          </div>
                          <p className="text-2xl font-bold">{m.value}</p>
                          <p className="text-sm font-medium text-foreground">{m.label}</p>
                          <p className="text-xs text-muted-foreground">{m.desc}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Comparison: RBF vs EMI */}
                <Card className="border-emerald-500/20 bg-emerald-500/5">
                  <CardContent className="p-5">
                    <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-3">RBF vs Traditional EMI</p>
                    <div className="space-y-2 text-sm">
                      {[
                        ["Fixed EMI (same loan)", `₹${(funding * 0.0456).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} /mo`, "fixed"],
                        ["RBF (high revenue month)", `₹${(monthlyRevenue * 1.3 * revenueShare / 100 / 1000).toFixed(1)}K /mo`, "variable"],
                        ["RBF (low revenue month)", `₹${(monthlyRevenue * 0.6 * revenueShare / 100 / 1000).toFixed(1)}K /mo`, "variable"],
                      ].map(([label, value, type]) => (
                        <div key={label} className="flex justify-between items-center">
                          <span className="text-muted-foreground">{label}</span>
                          <Badge variant="secondary" className={type === "fixed" ? "bg-red-500/10 text-red-600" : "bg-emerald-500/10 text-emerald-600"}>{value}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Repayment Schedule Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Projected Repayment Schedule</CardTitle>
                  <CardDescription>Monthly revenue vs RBF payment (₹ in thousands) — 2% MoM growth assumed</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={schedule} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(v) => [`₹${v}K`]} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#3b82f6" fillOpacity={0.6} radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="left" dataKey="payment" name="RBF Payment" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="remaining" name="Remaining Balance" stroke="#f59e0b" strokeWidth={2} dot={false} />
                    </ComposedChart>
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
