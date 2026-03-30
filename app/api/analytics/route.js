// EmpowerMSME — Analytics Microservice

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const range = searchParams.get("range") || "30d"
  const role = searchParams.get("role") || "business"

  const platformMetrics = {
    totalFundsRaised: 87500000,
    activeCampaigns: 42,
    defaultRate: 2.3,
    avgROI: 14.8,
    totalBusinesses: 1243,
    totalInvestors: 3189,
    totalLoans: 892,
    disbursedAmount: 65000000,
    repaymentRate: 97.7,
    newUsersThisMonth: 180,
  }

  const revenueData = [
    { month: "Oct", revenue: 850000, funding: 250000, repayment: 68000 },
    { month: "Nov", revenue: 920000, funding: 180000, repayment: 73600 },
    { month: "Dec", revenue: 1100000, funding: 420000, repayment: 88000 },
    { month: "Jan", revenue: 750000, funding: 150000, repayment: 60000 },
    { month: "Feb", revenue: 880000, funding: 320000, repayment: 70400 },
    { month: "Mar", revenue: 950000, funding: 280000, repayment: 76000 },
  ]

  const sectorDistribution = [
    { name: "Technology", value: 28, color: "#3b82f6" },
    { name: "Agriculture", value: 22, color: "#10b981" },
    { name: "Manufacturing", value: 18, color: "#f59e0b" },
    { name: "Retail", value: 15, color: "#8b5cf6" },
    { name: "Logistics", value: 10, color: "#ef4444" },
    { name: "Others", value: 7, color: "#6b7280" },
  ]

  const platformGrowth = [
    { month: "Oct", users: 4100, campaigns: 28, loans: 210 },
    { month: "Nov", users: 4450, campaigns: 31, loans: 248 },
    { month: "Dec", users: 4820, campaigns: 35, loans: 287 },
    { month: "Jan", users: 5100, campaigns: 38, loans: 320 },
    { month: "Feb", users: 5280, campaigns: 40, loans: 355 },
    { month: "Mar", users: 5432, campaigns: 42, loans: 392 },
  ]

  const investorPortfolio = [
    { campaign: "GreenLeaf Organics", invested: 50000, currentValue: 54500, roi: 9, status: "active" },
    { campaign: "TechWeave Solutions", invested: 100000, currentValue: 112000, roi: 12, status: "active" },
    { campaign: "Artisan Textiles Co.", invested: 75000, currentValue: 85500, roi: 14, status: "completed" },
    { campaign: "CoolChain Logistics", invested: 150000, currentValue: 163500, roi: 9, status: "active" },
  ]

  return Response.json({
    success: true,
    data: {
      platformMetrics,
      revenueData,
      sectorDistribution,
      platformGrowth,
      investorPortfolio,
      range,
      role,
    },
  })
}
