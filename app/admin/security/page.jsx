"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import AdminSidebar from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Shield, Lock, Eye, Activity, Clock, CheckCircle2, XCircle, Globe, Smartphone, LogIn } from "lucide-react"

const auditLogs = [
  { id: 1, action: "KYC Approved", user: "priya@greenleaf.com", admin: "admin@empowermsme.com", ip: "103.21.244.x", timestamp: "2026-03-30 22:14:32", type: "success" },
  { id: 2, action: "Login Attempt Failed", user: "unknown@attacker.com", admin: null, ip: "185.220.101.x", timestamp: "2026-03-30 21:58:11", type: "warning" },
  { id: 3, action: "Campaign Created", user: "rahul@techweave.in", admin: null, ip: "49.43.22.x", timestamp: "2026-03-30 20:32:45", type: "info" },
  { id: 4, action: "User Account Suspended", user: "spam_user@fake.com", admin: "admin@empowermsme.com", ip: "103.21.244.x", timestamp: "2026-03-30 19:11:08", type: "danger" },
  { id: 5, action: "Loan Disbursed", user: "meena@coolchain.in", admin: "admin@empowermsme.com", ip: "103.21.244.x", timestamp: "2026-03-30 18:45:22", type: "success" },
  { id: 6, action: "MFA Enabled", user: "ankit.investor@gmail.com", admin: null, ip: "106.76.33.x", timestamp: "2026-03-30 17:22:10", type: "info" },
  { id: 7, action: "Suspicious Login — New Device", user: "vikram.lender@vc.com", admin: null, ip: "77.88.55.x", timestamp: "2026-03-30 15:08:55", type: "warning" },
  { id: 8, action: "Admin Password Changed", user: "admin@empowermsme.com", admin: null, ip: "103.21.244.x", timestamp: "2026-03-30 11:30:01", type: "info" },
]

const loginActivity = [
  { user: "priya@greenleaf.com", device: "Chrome / Windows", location: "Mumbai, IN", time: "22 min ago", status: "active" },
  { user: "ankit.investor@gmail.com", device: "Safari / iPhone", location: "Bangalore, IN", time: "1h ago", status: "active" },
  { user: "meena@coolchain.in", device: "Chrome / Android", location: "Delhi, IN", time: "3h ago", status: "ended" },
  { user: "vikram.lender@vc.com", device: "Unknown / Linux", location: "Moscow, RU", time: "9h ago", status: "flagged" },
]

const LOG_STYLES = { success: "bg-emerald-500/10 text-emerald-600", warning: "bg-amber-500/10 text-amber-600", danger: "bg-red-500/10 text-red-600", info: "bg-blue-500/10 text-blue-600" }
const LOG_ICONS = { success: CheckCircle2, warning: AlertTriangle, danger: XCircle, info: Activity }

export default function AdminSecurityPage() {
  const [mfaEnabled, setMfaEnabled] = useState(true)
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true)
  const [ipBlockEnabled, setIpBlockEnabled] = useState(false)
  const [alerts, setAlerts] = useState([
    { id: 1, message: "Suspicious login from Moscow, RU for vikram.lender@vc.com", severity: "high", dismissed: false },
    { id: 2, message: "5 failed login attempts from IP 185.220.101.x in the last hour", severity: "medium", dismissed: false },
  ])

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="border-b border-border bg-card px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Security Console</h1>
                <p className="text-muted-foreground mt-0.5">Audit logs, login activity, MFA controls, and threat alerts</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* Active Alerts */}
            <div className="space-y-3">
              {alerts.filter(a => !a.dismissed).map((alert, i) => (
                <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className={`flex items-center justify-between gap-4 p-4 border rounded-xl ${alert.severity === "high" ? "border-red-500/30 bg-red-500/5" : "border-amber-500/30 bg-amber-500/5"}`}>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`h-5 w-5 flex-shrink-0 ${alert.severity === "high" ? "text-red-500" : "text-amber-500"}`} />
                    <div>
                      <p className="text-sm font-medium">{alert.message}</p>
                      <Badge variant="secondary" className={alert.severity === "high" ? "bg-red-500/10 text-red-600 mt-1" : "bg-amber-500/10 text-amber-600 mt-1"}>{alert.severity} severity</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" className="text-xs h-7 bg-transparent">Investigate</Button>
                    <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => setAlerts(a => a.map(x => x.id === alert.id ? {...x, dismissed: true} : x))}>Dismiss</Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* MFA Control Panel */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5 text-primary" /> Security Controls</CardTitle>
                    <CardDescription>Platform-wide security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {[
                      { label: "Multi-Factor Authentication", sublabel: "Require MFA for all admin logins", checked: mfaEnabled, onChange: setMfaEnabled, id: "mfa" },
                      { label: "API Rate Limiting", sublabel: "Limit: 100 req/min per IP", checked: rateLimitEnabled, onChange: setRateLimitEnabled, id: "ratelimit" },
                      { label: "Suspicious IP Auto-Block", sublabel: "Auto-block IPs with 10+ failures", checked: ipBlockEnabled, onChange: setIpBlockEnabled, id: "ipblock" },
                    ].map(control => (
                      <div key={control.id} className="flex items-center justify-between p-4 border border-border rounded-xl">
                        <div>
                          <Label htmlFor={control.id} className="font-medium cursor-pointer">{control.label}</Label>
                          <p className="text-xs text-muted-foreground mt-0.5">{control.sublabel}</p>
                        </div>
                        <Switch id={control.id} checked={control.checked} onCheckedChange={control.onChange} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Live Login Activity */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5 text-primary" /> Login Activity</CardTitle>
                    <CardDescription>Recent sessions and location tracking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {loginActivity.map((activity, i) => (
                        <div key={i} className={`flex items-center justify-between p-3 border rounded-xl ${activity.status === "flagged" ? "border-red-500/30 bg-red-500/5" : "border-border"}`}>
                          <div className="flex items-center gap-3">
                            {activity.status === "active" ? <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> :
                             activity.status === "flagged" ? <AlertTriangle className="h-4 w-4 text-red-500" /> :
                             <div className="h-2 w-2 rounded-full bg-muted-foreground" />}
                            <div>
                              <p className="text-sm font-medium truncate max-w-40">{activity.user}</p>
                              <p className="text-xs text-muted-foreground">{activity.device}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-xs font-medium ${activity.status === "flagged" ? "text-red-500" : "text-muted-foreground"}`}>{activity.location}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Immutable Audit Log */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Immutable Audit Log</CardTitle>
                      <CardDescription>All platform actions recorded — tamper-proof, ordered by time</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">🔒 Immutable</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b border-border bg-muted/30">
                        <tr>
                          {["Time", "Action", "User", "IP Address", "Status"].map(h => (
                            <th key={h} className="py-2.5 px-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {auditLogs.map((log, i) => {
                          const Icon = LOG_ICONS[log.type]
                          return (
                            <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 + i * 0.04 }}
                              className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                              <td className="py-2.5 px-4">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{log.timestamp}</div>
                              </td>
                              <td className="py-2.5 px-4 font-medium">{log.action}</td>
                              <td className="py-2.5 px-4 text-xs text-muted-foreground truncate max-w-36">{log.user}</td>
                              <td className="py-2.5 px-4 font-mono text-xs text-muted-foreground">{log.ip}</td>
                              <td className="py-2.5 px-4">
                                <Badge className={LOG_STYLES[log.type]}>
                                  <Icon className="h-3 w-3 mr-1" /> {log.type}
                                </Badge>
                              </td>
                            </motion.tr>
                          )
                        })}
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
