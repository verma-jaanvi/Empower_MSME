"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BusinessSidebar from "@/components/business-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText, Upload, CheckCircle2, Clock, Search, Banknote, XCircle,
  AlertTriangle, ChevronRight, Plus, Eye, ArrowRight
} from "lucide-react"

const STAGES = [
  { key: "submitted", label: "Submitted", icon: FileText, color: "text-blue-500", bg: "bg-blue-500" },
  { key: "under_review", label: "Under Review", icon: Search, color: "text-amber-500", bg: "bg-amber-500" },
  { key: "approved", label: "Approved", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500" },
  { key: "disbursed", label: "Disbursed", icon: Banknote, color: "text-violet-500", bg: "bg-violet-500" },
]

const loans = [
  { id: "l1", amount: 1500000, purpose: "Working Capital", status: "disbursed", stage: 3, submittedAt: "Jan 5, 2026", approvedAt: "Jan 18, 2026", disbursedAt: "Jan 25, 2026", creditScore: 742, riskLevel: "Low", interestRate: 10.5, tenure: 24, emi: 69200, documents: ["business_reg.pdf", "pan_card.pdf", "gst_returns.pdf", "bank_statement.pdf"] },
  { id: "l2", amount: 500000, purpose: "Equipment Purchase", status: "under_review", stage: 1, submittedAt: "Mar 10, 2026", creditScore: 742, riskLevel: "Low", interestRate: 9.5, tenure: 12, documents: ["quotation.pdf", "bank_statement.pdf"] },
]

const RISK_COLORS = { Low: "bg-emerald-500/10 text-emerald-600", Medium: "bg-amber-500/10 text-amber-600", High: "bg-red-500/10 text-red-600" }

function LoanTimeline({ currentStage }) {
  return (
    <div className="relative flex items-start gap-0">
      {STAGES.map((stage, i) => {
        const done = i < currentStage
        const active = i === currentStage
        const Icon = stage.icon
        return (
          <div key={stage.key} className="flex items-start flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: active || done ? 1 : 0.85, opacity: active || done ? 1 : 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 z-10 ${
                  done ? `${stage.bg} border-transparent text-white` :
                  active ? `bg-card ${stage.color} border-current` :
                  "bg-muted border-border text-muted-foreground"
                }`}
              >
                {done ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </motion.div>
              <div className={`mt-2 text-xs font-medium text-center w-20 ${active ? stage.color : done ? "text-foreground" : "text-muted-foreground"}`}>
                {stage.label}
              </div>
            </div>
            {i < STAGES.length - 1 && (
              <div className="flex-1 mt-5 mx-2">
                <div className="h-0.5 bg-border relative overflow-hidden">
                  <motion.div
                    className={`absolute inset-y-0 left-0 ${stage.bg}`}
                    initial={{ width: "0%" }}
                    animate={{ width: i < currentStage ? "100%" : "0%" }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function DocumentDropzone({ docs }) {
  const [dragging, setDragging] = useState(false)
  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false) }}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
          dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
        }`}
      >
        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm font-medium text-foreground">Drop files here or click to upload</p>
        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG — max 10MB per file</p>
      </div>
      {docs && docs.length > 0 && (
        <div className="mt-4 space-y-2">
          {docs.map((doc, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-3 border border-border rounded-lg bg-muted/20">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{doc}</span>
              </div>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function LoansPage() {
  const [selected, setSelected] = useState(loans[0])

  return (
    <div className="flex h-screen bg-background">
      <BusinessSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="border-b border-border bg-card px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Loan Applications</h1>
                <p className="text-muted-foreground mt-1">Track your loan lifecycle from submission to disbursement</p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> New Application
              </Button>
            </div>
          </div>

          <div className="p-8 grid gap-6 lg:grid-cols-3">
            {/* Loan List */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Applications</h2>
              {loans.map((loan, i) => (
                <motion.div key={loan.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  onClick={() => setSelected(loan)}
                  className={`p-4 border rounded-xl cursor-pointer transition-all ${
                    selected?.id === loan.id ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/40 hover:bg-muted/20"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">₹{(loan.amount / 100000).toFixed(1)}L</p>
                      <p className="text-sm text-muted-foreground">{loan.purpose}</p>
                    </div>
                    <Badge className={RISK_COLORS[loan.riskLevel]}>{loan.riskLevel} Risk</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${STAGES[loan.stage]?.bg || "bg-muted"}`} />
                    <span className="text-xs text-muted-foreground">{STAGES[loan.stage]?.label}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Loan Detail */}
            <div className="lg:col-span-2 space-y-6">
              {selected && (
                <AnimatePresence mode="wait">
                  <motion.div key={selected.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                    {/* Timeline */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Application Progress</CardTitle>
                        <CardDescription>Loan #{selected.id.toUpperCase()} — Submitted {selected.submittedAt}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2 pb-8">
                        <LoanTimeline currentStage={selected.stage} />
                      </CardContent>
                    </Card>

                    {/* Loan Details */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Loan Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {[
                            ["Amount", `₹${(selected.amount / 100000).toFixed(1)} Lakh`],
                            ["Purpose", selected.purpose],
                            ["Interest Rate", `${selected.interestRate}% p.a.`],
                            ["Tenure", `${selected.tenure} months`],
                            ["EMI", selected.emi ? `₹${selected.emi.toLocaleString()}/month` : "—"],
                          ].map(([k, v]) => (
                            <div key={k} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{k}</span>
                              <span className="font-medium">{v}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Risk Assessment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Credit Score</span>
                            <span className="text-2xl font-bold text-emerald-500">{selected.creditScore}</span>
                          </div>
                          <Progress value={((selected.creditScore - 300) / 600) * 100} className="h-2" />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>300 (Poor)</span><span>900 (Excellent)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-emerald-500" />
                            <Badge className={RISK_COLORS[selected.riskLevel]}>{selected.riskLevel} Risk Profile</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Documents */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Documents</CardTitle>
                        <CardDescription>Required documents for loan processing</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <DocumentDropzone docs={selected.documents} />
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
