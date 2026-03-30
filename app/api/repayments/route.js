// EmpowerMSME — Repayments Microservice

const repayments = [
  { id: "r1", loanId: "l1", businessId: "b1", totalAmount: 1500000, totalRepayable: 1661000, amountPaid: 692000, remainingBalance: 969000, nextDueDate: "2026-04-25", nextEmiAmount: 69200, isOverdue: false, overdueAmount: 0, tenure: 24, paidMonths: 10, payments: [
    { month: "Jun 2025", amount: 69200, status: "paid", date: "2025-06-25", principal: 56500, interest: 12700 },
    { month: "Jul 2025", amount: 69200, status: "paid", date: "2025-07-25", principal: 57000, interest: 12200 },
    { month: "Aug 2025", amount: 69200, status: "paid", date: "2025-08-22", principal: 57500, interest: 11700 },
    { month: "Sep 2025", amount: 69200, status: "paid", date: "2025-09-25", principal: 58000, interest: 11200 },
    { month: "Oct 2025", amount: 69200, status: "paid", date: "2025-10-25", principal: 58600, interest: 10600 },
    { month: "Nov 2025", amount: 69200, status: "paid", date: "2025-11-24", principal: 59200, interest: 10000 },
    { month: "Dec 2025", amount: 69200, status: "paid", date: "2025-12-25", principal: 59800, interest: 9400 },
    { month: "Jan 2026", amount: 69200, status: "paid", date: "2026-01-25", principal: 60400, interest: 8800 },
    { month: "Feb 2026", amount: 69200, status: "paid", date: "2026-02-25", principal: 61000, interest: 8200 },
    { month: "Mar 2026", amount: 69200, status: "paid", date: "2026-03-22", principal: 61600, interest: 7600 },
    { month: "Apr 2026", amount: 69200, status: "upcoming", date: "2026-04-25", principal: 62200, interest: 7000 },
    { month: "May 2026", amount: 69200, status: "upcoming", date: "2026-05-25", principal: 62800, interest: 6400 },
  ]},
]

const rbfRepayments = [
  { id: "rbf1", businessId: "b1", totalFunding: 1000000, capRate: 1.3, totalRepayable: 1300000, revenueSharePct: 8, amountPaid: 480000, remaining: 820000, monthlyData: [
    { month: "Oct 2025", revenue: 850000, payment: 68000, status: "paid" },
    { month: "Nov 2025", revenue: 920000, payment: 73600, status: "paid" },
    { month: "Dec 2025", revenue: 1100000, payment: 88000, status: "paid" },
    { month: "Jan 2026", revenue: 750000, payment: 60000, status: "paid" },
    { month: "Feb 2026", revenue: 880000, payment: 70400, status: "paid" },
    { month: "Mar 2026", revenue: 950000, payment: 76000, status: "paid" },
    { month: "Apr 2026", revenue: null, payment: null, status: "upcoming" },
  ]}
]

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const businessId = searchParams.get("businessId")
  const type = searchParams.get("type") // "emi" | "rbf"

  if (type === "rbf") {
    const filtered = businessId ? rbfRepayments.filter((r) => r.businessId === businessId) : rbfRepayments
    return Response.json({ success: true, data: filtered })
  }

  const filtered = businessId ? repayments.filter((r) => r.businessId === businessId) : repayments
  return Response.json({ success: true, data: filtered })
}
