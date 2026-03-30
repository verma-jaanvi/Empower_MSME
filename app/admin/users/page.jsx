"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import AdminSidebar from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, XCircle, Clock, Search, Filter, Eye, Shield, Users, Building2 } from "lucide-react"

const users = [
  { id: "u1", name: "Priya Mehta", email: "priya@greenleaf.com", role: "MSME Owner", business: "GreenLeaf Organics", kycStatus: "verified", profileScore: 87, joinedAt: "Jan 12, 2026", lastLogin: "Mar 29, 2026", documents: ["Aadhar", "PAN", "Udyam Certificate", "GST Certificate"] },
  { id: "u2", name: "Rahul Sharma", email: "rahul@techweave.in", role: "MSME Owner", business: "TechWeave Solutions", kycStatus: "pending", profileScore: 62, joinedAt: "Feb 3, 2026", lastLogin: "Mar 28, 2026", documents: ["Aadhar", "PAN"] },
  { id: "u3", name: "Ankit Joshi", email: "ankit.investor@gmail.com", role: "Investor", business: "—", kycStatus: "verified", profileScore: 94, joinedAt: "Dec 5, 2025", lastLogin: "Mar 30, 2026", documents: ["Aadhar", "PAN", "Bank Statement"] },
  { id: "u4", name: "Sneha Patel", email: "sneha@artisan.co", role: "MSME Owner", business: "Artisan Textiles Co.", kycStatus: "rejected", profileScore: 34, joinedAt: "Mar 1, 2026", lastLogin: "Mar 15, 2026", documents: ["Aadhar"] },
  { id: "u5", name: "Vikram Nair", email: "vikram.lender@vc.com", role: "Investor", business: "—", kycStatus: "pending", profileScore: 71, joinedAt: "Mar 18, 2026", lastLogin: "Mar 29, 2026", documents: ["Aadhar", "PAN"] },
  { id: "u6", name: "Meena Reddy", email: "meena@coolchain.in", role: "MSME Owner", business: "CoolChain Logistics", kycStatus: "verified", profileScore: 91, joinedAt: "Nov 20, 2025", lastLogin: "Mar 30, 2026", documents: ["Aadhar", "PAN", "Udyam Certificate", "GST Certificate", "Bank Statement"] },
]

const KYC_STYLES = {
  verified: "bg-emerald-500/10 text-emerald-600",
  pending: "bg-amber-500/10 text-amber-600",
  rejected: "bg-red-500/10 text-red-600",
}
const KYC_ICONS = { verified: CheckCircle2, pending: Clock, rejected: XCircle }

function ScoreBar({ score }) {
  const color = score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-blue-500" : score >= 40 ? "bg-amber-500" : "bg-red-500"
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div className={`h-full rounded-full ${color}`} initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 0.8 }} />
      </div>
      <span className="text-xs font-medium w-6 text-right">{score}</span>
    </div>
  )
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [kycFilter, setKycFilter] = useState("all")
  const [kycStatuses, setKycStatuses] = useState(Object.fromEntries(users.map(u => [u.id, u.kycStatus])))

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === "all" || u.role === roleFilter
    const matchKyc = kycFilter === "all" || kycStatuses[u.id] === kycFilter
    return matchSearch && matchRole && matchKyc
  })

  const stats = {
    total: users.length,
    verified: Object.values(kycStatuses).filter(s => s === "verified").length,
    pending: Object.values(kycStatuses).filter(s => s === "pending").length,
    rejected: Object.values(kycStatuses).filter(s => s === "rejected").length,
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="border-b border-border bg-card px-8 py-6">
            <h1 className="text-3xl font-bold text-foreground">User Management & KYC</h1>
            <p className="text-muted-foreground mt-1">Verify identities, manage KYC, and profile scoring</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-4">
              {[
                { label: "Total Users", value: stats.total, Icon: Users, color: "text-primary", bg: "bg-primary/10" },
                { label: "KYC Verified", value: stats.verified, Icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                { label: "Pending Review", value: stats.pending, Icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
                { label: "Rejected", value: stats.rejected, Icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" },
              ].map(({ label, value, Icon, color, bg }, i) => (
                <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <Card>
                    <CardContent className="flex items-center gap-4 p-5">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${bg}`}><Icon className={`h-5 w-5 ${color}`} /></div>
                      <div><p className="text-2xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="MSME Owner">MSME Owner</SelectItem>
                  <SelectItem value="Investor">Investor</SelectItem>
                </SelectContent>
              </Select>
              <Select value={kycFilter} onValueChange={setKycFilter}>
                <SelectTrigger className="w-40"><SelectValue placeholder="KYC Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All KYC</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* User Table */}
            <Card>
              <CardHeader>
                <CardTitle>Users ({filtered.length})</CardTitle>
                <CardDescription>Manage KYC verification and profile scoring</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border bg-muted/30">
                      <tr>
                        {["User", "Role", "KYC Status", "Profile Score", "Documents", "Last Login", "Actions"].map(h => (
                          <th key={h} className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((user, i) => {
                        const kycStatus = kycStatuses[user.id]
                        const KycIcon = KYC_ICONS[kycStatus]
                        return (
                          <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                            className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                                    {user.name.split(" ").map(n => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant="secondary" className={user.role === "Investor" ? "bg-violet-500/10 text-violet-600" : "bg-blue-500/10 text-blue-600"}>
                                {user.role}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={KYC_STYLES[kycStatus]}>
                                <KycIcon className="h-3 w-3 mr-1" /> {kycStatus}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 w-32">
                              <ScoreBar score={user.profileScore} />
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-xs text-muted-foreground">{user.documents.length} uploaded</span>
                            </td>
                            <td className="py-3 px-4 text-xs text-muted-foreground">{user.lastLogin}</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                {kycStatus === "pending" && (
                                  <>
                                    <Button size="sm" variant="outline" className="h-7 text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/20"
                                      onClick={() => setKycStatuses(s => ({ ...s, [user.id]: "verified" }))}>Approve</Button>
                                    <Button size="sm" variant="outline" className="h-7 text-xs bg-red-500/10 text-red-600 border-red-500/30 hover:bg-red-500/20"
                                      onClick={() => setKycStatuses(s => ({ ...s, [user.id]: "rejected" }))}>Reject</Button>
                                  </>
                                )}
                                {kycStatus === "verified" && (
                                  <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent gap-1">
                                    <Eye className="h-3 w-3" /> View
                                  </Button>
                                )}
                                {kycStatus === "rejected" && (
                                  <Button size="sm" variant="outline" className="h-7 text-xs bg-amber-500/10 text-amber-600 border-amber-500/30"
                                    onClick={() => setKycStatuses(s => ({ ...s, [user.id]: "pending" }))}>Re-review</Button>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
