"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BusinessSidebar from "@/components/business-sidebar"
import { CreditGauge, RiskBadge } from "@/components/ui/credit-gauge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Brain, ChevronRight, ChevronLeft, Sparkles, Info, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

const STEPS = ["Business Info", "Financials", "Credit History", "Results"]

const DEFAULTS = {
  annualRevenue: 2000000,
  netProfitMargin: 12,
  cashFlowVariance: 20,
  existingDebt: 300000,
  repaymentHistory: 80,
  businessAge: 3,
  gstFilingScore: 85,
  industryRiskLevel: "medium",
}

function FieldSlider({ label, value, min, max, step, onChange, suffix = "", help }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-1">{label} {help && <span className="text-muted-foreground text-xs">({help})</span>}</Label>
        <span className="text-sm font-bold text-foreground">{value.toLocaleString()}{suffix}</span>
      </div>
      <Slider min={min} max={max} step={step} value={[value]} onValueChange={([v]) => onChange(v)} />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min.toLocaleString()}{suffix}</span><span>{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  )
}

export default function CreditScorePage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(DEFAULTS)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function evaluate() {
    setLoading(true)
    try {
      const res = await fetch("/api/credit/evaluate", { method: "POST", body: JSON.stringify(form), headers: { "Content-Type": "application/json" } })
      const data = await res.json()
      if (data.success) { setResult(data.data); setStep(3) }
    } catch { } finally { setLoading(false) }
  }

  const barColors = { repaymentHistory: "#10b981", annualRevenue: "#3b82f6", netProfitMargin: "#8b5cf6", cashFlowStability: "#06b6d4", debtToIncome: "#f59e0b", businessAge: "#ec4899", gstFilingConsistency: "#6b7280" }

  return (
    <div className="flex h-screen bg-background">
      <BusinessSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="border-b border-border bg-card px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-primary">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">AI Credit Scoring Engine</h1>
                <p className="text-muted-foreground mt-0.5">Transparent, explainable credit evaluation — no black-box models</p>
              </div>
            </div>
          </div>

          <div className="p-8 max-w-4xl mx-auto space-y-6">
            {/* Stepper */}
            <div className="flex items-center gap-2">
              {STEPS.map((s, i) => (
                <div key={i} className="flex items-center gap-2 flex-1 last:flex-none">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all ${
                    i < step ? "bg-emerald-500 text-white" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>{i < step ? "✓" : i + 1}</div>
                  <span className={`text-sm font-medium hidden sm:block ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                  {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? "bg-emerald-500" : "bg-border"}`} />}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Step 0: Business Info */}
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <Card>
                    <CardHeader><CardTitle>Business Information</CardTitle><CardDescription>Basic details about your business</CardDescription></CardHeader>
                    <CardContent className="space-y-6">
                      <FieldSlider label="Annual Revenue" value={form.annualRevenue} min={0} max={10000000} step={100000} onChange={v => set("annualRevenue", v)} suffix="₹" help="Last 12 months" />
                      <FieldSlider label="Business Age" value={form.businessAge} min={0} max={20} step={0.5} onChange={v => set("businessAge", v)} suffix=" yrs" />
                      <div className="space-y-2">
                        <Label>Industry Risk Category</Label>
                        <Select value={form.industryRiskLevel} onValueChange={v => set("industryRiskLevel", v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low Risk (Healthcare, Education, Food)</SelectItem>
                            <SelectItem value="medium">Medium Risk (Technology, Retail, Services)</SelectItem>
                            <SelectItem value="high">High Risk (Construction, Mining, Crypto)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 1: Financials */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <Card>
                    <CardHeader><CardTitle>Financial Metrics</CardTitle><CardDescription>Profitability and debt information</CardDescription></CardHeader>
                    <CardContent className="space-y-6">
                      <FieldSlider label="Net Profit Margin" value={form.netProfitMargin} min={-20} max={50} step={0.5} onChange={v => set("netProfitMargin", v)} suffix="%" />
                      <FieldSlider label="Cash Flow Variance" value={form.cashFlowVariance} min={0} max={100} step={1} onChange={v => set("cashFlowVariance", v)} suffix="%" help="Lower = more stable" />
                      <FieldSlider label="Existing Debt" value={form.existingDebt} min={0} max={5000000} step={50000} onChange={v => set("existingDebt", v)} suffix="₹" />
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Credit History */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <Card>
                    <CardHeader><CardTitle>Credit & Compliance History</CardTitle><CardDescription>Repayment track record and GST compliance</CardDescription></CardHeader>
                    <CardContent className="space-y-6">
                      <FieldSlider label="Repayment History Score" value={form.repaymentHistory} min={0} max={100} step={1} onChange={v => set("repaymentHistory", v)} help="0 = all defaults, 100 = perfect" />
                      <FieldSlider label="GST Filing Consistency" value={form.gstFilingScore} min={0} max={100} step={1} onChange={v => set("gstFilingScore", v)} help="% of returns filed on time" />
                      <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-xl flex items-start gap-3">
                        <Info className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-700 dark:text-blue-300">Your data is processed securely. The credit score is calculated using a transparent weighted model — no black-box AI. All factor weights are fully disclosed in the result.</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Results */}
              {step === 3 && result && (
                <motion.div key="s3" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  {/* Score Card */}
                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                          <CreditGauge score={result.creditScore} size={220} animate />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div>
                            <h2 className="text-2xl font-bold text-foreground">Your Credit Score</h2>
                            <p className="text-muted-foreground">Based on {result.factorContributions.length} financial factors</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { label: "Risk Category", value: <RiskBadge risk={result.riskCategory} /> },
                              { label: "Eligibility Tier", value: <Badge className="bg-primary/10 text-primary">{result.eligibilityTier}</Badge> },
                              { label: "Recommended Loan", value: `₹${(result.recommendedLoanAmount / 100000).toFixed(1)}L` },
                              { label: "Suggested Rate", value: `${result.interestRate}% p.a.` },
                            ].map(({ label, value }) => (
                              <div key={label}>
                                <p className="text-xs text-muted-foreground">{label}</p>
                                <div className="mt-0.5 font-semibold text-sm">{typeof value === "string" ? value : value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Factor Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-violet-500" /> Score Explainability</CardTitle>
                      <CardDescription>What drove your score — fully transparent, no black-box logic</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={result.factorContributions} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                          <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
                          <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} width={115} />
                          <Tooltip formatter={(v, n, p) => [`${v}% contribution (score: ${p.payload.rawScore}/100)`, p.payload.label]} />
                          <Bar dataKey="contribution" name="Contribution" radius={[0, 6, 6, 0]}>
                            {result.factorContributions.map((f, i) => (
                              <Cell key={i} fill={barColors[f.key] || "#3b82f6"} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>

                      {/* Factor detail table */}
                      <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border text-muted-foreground">
                              <th className="py-2 text-left font-medium">Factor</th>
                              <th className="py-2 text-center font-medium">Your Score</th>
                              <th className="py-2 text-center font-medium">Weight</th>
                              <th className="py-2 text-center font-medium">Contribution</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.factorContributions.map((f) => (
                              <tr key={f.key} className="border-b border-border/50">
                                <td className="py-2">{f.label}</td>
                                <td className="py-2 text-center"><Badge variant="secondary" className={f.rawScore >= 70 ? "bg-emerald-500/10 text-emerald-600" : f.rawScore >= 40 ? "bg-amber-500/10 text-amber-600" : "bg-red-500/10 text-red-600"}>{f.rawScore}/100</Badge></td>
                                <td className="py-2 text-center text-muted-foreground">{f.weight}%</td>
                                <td className="py-2 text-center font-medium">{f.contribution}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Insights */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {result.positives.length > 0 && (
                      <Card className="border-emerald-500/20">
                        <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Strengths</CardTitle></CardHeader>
                        <CardContent><ul className="space-y-2">{result.positives.map((p, i) => <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span>{p}</li>)}</ul></CardContent>
                      </Card>
                    )}
                    {result.improvements.length > 0 && (
                      <Card className="border-amber-500/20">
                        <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-4 w-4 text-amber-500" /> Improvement Areas</CardTitle></CardHeader>
                        <CardContent><ul className="space-y-2">{result.improvements.map((p, i) => <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span>{p}</li>)}</ul></CardContent>
                      </Card>
                    )}
                  </div>

                  <div className="p-3 border border-border rounded-xl bg-muted/30 text-xs text-muted-foreground">
                    <strong>Methodology:</strong> {result.methodology}
                  </div>

                  <Button variant="outline" className="w-full bg-transparent" onClick={() => { setStep(0); setResult(null) }}>Re-evaluate with Different Data</Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            {step < 3 && (
              <div className="flex items-center justify-between">
                <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
                {step < 2 ? (
                  <Button className="gap-2" onClick={() => setStep(s => s + 1)}>
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button className="gap-2 bg-gradient-to-r from-primary to-violet-500" onClick={evaluate} disabled={loading}>
                    {loading ? "Evaluating..." : <><Brain className="h-4 w-4" /> Calculate Score</>}
                  </Button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
