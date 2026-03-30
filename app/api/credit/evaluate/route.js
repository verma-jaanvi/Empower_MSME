// EmpowerMSME — Credit Evaluation Microservice
// Transparent, interpretable weighted scoring algorithm
// Score range: 300–900

const WEIGHTS = {
  annualRevenue: 0.20,
  netProfitMargin: 0.15,
  cashFlowStability: 0.15,
  debtToIncome: 0.15,
  repaymentHistory: 0.20,
  businessAge: 0.10,
  gstFilingConsistency: 0.05,
}

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max)
}

function normalize(value, min, max) {
  return clamp((value - min) / (max - min))
}

function evaluateCredit({
  annualRevenue = 0,
  netProfitMargin = 0,
  cashFlowVariance = 50,
  existingDebt = 0,
  repaymentHistory = 50,
  businessAge = 0,
  gstFilingScore = 50,
  industryRiskLevel = "medium",
}) {
  /* ──────────────── Individual factor scores (0–1) ──────────────── */
  const revenueScore = normalize(annualRevenue, 0, 10_000_000) // 0 → ₹1 Cr
  const profitScore = normalize(netProfitMargin, -20, 40) // -20% → +40%
  const cashFlowScore = 1 - normalize(cashFlowVariance, 0, 60) // lower variance = better
  const debtRatio = annualRevenue > 0 ? existingDebt / annualRevenue : 1
  const debtScore = 1 - normalize(debtRatio, 0, 2.5) // lower ratio = better
  const repaymentScore = normalize(repaymentHistory, 0, 100)
  const ageScore = normalize(businessAge, 0, 10) // 0–10 years
  const gstScore = normalize(gstFilingScore, 0, 100)

  const factorScores = {
    annualRevenue: revenueScore,
    netProfitMargin: profitScore,
    cashFlowStability: cashFlowScore,
    debtToIncome: debtScore,
    repaymentHistory: repaymentScore,
    businessAge: ageScore,
    gstFilingConsistency: gstScore,
  }

  /* ──────────────── Weighted composite ──────────────── */
  let weightedSum = 0
  for (const [key, score] of Object.entries(factorScores)) {
    weightedSum += score * WEIGHTS[key]
  }

  // Industry risk penalty
  const industryPenalty = { low: 0, medium: 0.04, high: 0.12 }[industryRiskLevel] ?? 0.04
  weightedSum = clamp(weightedSum - industryPenalty)

  /* ──────────────── Credit score (300–900) ──────────────── */
  const creditScore = Math.round(300 + weightedSum * 600)

  /* ──────────────── Risk category ──────────────── */
  const riskRatio = 1 - weightedSum
  const riskCategory = riskRatio < 0.35 ? "Low" : riskRatio < 0.65 ? "Medium" : "High"

  /* ──────────────── Loan eligibility ──────────────── */
  const eligibilityTier =
    creditScore >= 750 ? "Excellent" :
    creditScore >= 650 ? "Good" :
    creditScore >= 550 ? "Fair" : "Poor"

  const multiplierMap = { Excellent: 3, Good: 2, Fair: 1, Poor: 0.3 }
  const recommendedLoanAmount = Math.round(annualRevenue * (multiplierMap[eligibilityTier] ?? 0.3))

  /* ──────────────── Suggested interest rate ──────────────── */
  const interestRate =
    creditScore >= 750 ? 8.5 :
    creditScore >= 700 ? 10.0 :
    creditScore >= 650 ? 12.5 :
    creditScore >= 600 ? 15.0 : 18.0

  /* ──────────────── Factor contribution breakdown ──────────────── */
  const totalWeightedScore = Object.entries(factorScores)
    .reduce((sum, [key, score]) => sum + score * WEIGHTS[key], 0) || 1

  const LABELS = {
    annualRevenue: "Annual Revenue",
    netProfitMargin: "Net Profit Margin",
    cashFlowStability: "Cash Flow Stability",
    debtToIncome: "Debt-to-Income Ratio",
    repaymentHistory: "Repayment History",
    businessAge: "Business Age",
    gstFilingConsistency: "GST Filing Consistency",
  }

  const factorContributions = Object.entries(factorScores).map(([key, score]) => ({
    key,
    label: LABELS[key],
    rawScore: Math.round(score * 100),
    weight: Math.round(WEIGHTS[key] * 100),
    contribution: Math.round((score * WEIGHTS[key] / totalWeightedScore) * 100),
    weightedScore: Math.round(score * WEIGHTS[key] * 100),
  }))

  /* ──────────────── Human-readable explanations ──────────────── */
  const positives = []
  const improvements = []

  if (repaymentScore >= 0.8) positives.push("Excellent repayment track record — your strongest asset.")
  else if (repaymentScore < 0.5) improvements.push("Improve repayment consistency — it has the highest weight (20%).")

  if (revenueScore >= 0.7) positives.push("Strong annual revenue demonstrates business viability.")
  else if (revenueScore < 0.3) improvements.push("Growing your annual revenue will directly boost your score.")

  if (cashFlowScore >= 0.7) positives.push("Stable cash flow signals operational maturity.")
  else if (cashFlowScore < 0.4) improvements.push("Reduce monthly revenue variance to lower perceived risk.")

  if (debtScore >= 0.7) positives.push("Low existing debt leaves room for new credit.")
  else if (debtScore < 0.4) improvements.push("Paying down existing debt significantly improves eligibility.")

  if (ageScore >= 0.6) positives.push("Established business age strengthens credibility.")
  else improvements.push("Building a longer credit/business history will help over time.")

  if (gstScore >= 0.8) positives.push("Consistent GST filings demonstrate regulatory compliance.")

  return {
    creditScore,
    riskCategory,
    riskRatio: Math.round(riskRatio * 100),
    eligibilityTier,
    recommendedLoanAmount,
    interestRate,
    weightedSum: Math.round(weightedSum * 100),
    factorContributions,
    positives,
    improvements,
    timestamp: new Date().toISOString(),
    methodology: "Weighted linear scoring. Each factor contributes proportionally to the final score. No black-box logic — all weights and sub-scores are fully auditable.",
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const result = evaluateCredit(body)
    return Response.json({ success: true, data: result })
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 400 })
  }
}

export async function GET() {
  return Response.json({
    service: "Credit Evaluation Engine",
    version: "1.0.0",
    methodology: "Weighted linear scoring (interpretable, non-black-box)",
    weights: WEIGHTS,
    scoreRange: { min: 300, max: 900 },
  })
}
