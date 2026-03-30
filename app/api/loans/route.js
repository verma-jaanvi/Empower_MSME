// EmpowerMSME — Loans Microservice

const loans = [
  { id: "l1", businessId: "b1", amount: 1500000, purpose: "Working Capital", status: "disbursed", stage: "Disbursed", submittedAt: "2026-01-05", reviewedAt: "2026-01-12", approvedAt: "2026-01-18", disbursedAt: "2026-01-25", creditScore: 742, riskLevel: "Low", interestRate: 10.5, tenure: 24, emi: 69200, documents: ["business_reg.pdf", "pan_card.pdf", "gst_returns.pdf", "bank_statement.pdf"] },
  { id: "l2", businessId: "b1", amount: 500000, purpose: "Equipment Purchase", status: "under_review", stage: "Under Review", submittedAt: "2026-03-10", creditScore: 742, riskLevel: "Low", interestRate: 9.5, tenure: 12, documents: ["quotation.pdf", "bank_statement.pdf"] },
  { id: "l3", businessId: "b2", amount: 2000000, purpose: "Business Expansion", status: "approved", stage: "Approved", submittedAt: "2026-02-01", reviewedAt: "2026-02-10", approvedAt: "2026-02-18", creditScore: 698, riskLevel: "Medium", interestRate: 12.5, tenure: 36, emi: 66700, documents: ["business_plan.pdf", "financials.pdf"] },
]

const timeline = {
  "submitted": { label: "Submitted", description: "Application received by the system", icon: "upload" },
  "under_review": { label: "Under Review", description: "Documents being verified by lender", icon: "search" },
  "approved": { label: "Approved", description: "Loan sanctioned, awaiting disbursement", icon: "check" },
  "disbursed": { label: "Disbursed", description: "Funds transferred to your account", icon: "bank" },
  "rejected": { label: "Rejected", description: "Application not approved", icon: "x" },
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const businessId = searchParams.get("businessId")
  const id = searchParams.get("id")

  if (id) {
    const loan = loans.find((l) => l.id === id)
    if (!loan) return Response.json({ success: false, error: "Loan not found" }, { status: 404 })
    return Response.json({ success: true, data: { ...loan, timeline } })
  }

  let filtered = businessId ? loans.filter((l) => l.businessId === businessId) : loans
  return Response.json({ success: true, data: filtered, timeline })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const newLoan = { id: `l${Date.now()}`, ...body, status: "submitted", stage: "Submitted", submittedAt: new Date().toISOString().split("T")[0] }
    loans.push(newLoan)
    return Response.json({ success: true, data: newLoan }, { status: 201 })
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 400 })
  }
}
