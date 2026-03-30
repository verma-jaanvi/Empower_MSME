// EmpowerMSME — Campaign Management Microservice

const campaigns = [
  { id: "c1", businessId: "b1", businessName: "GreenLeaf Organics", sector: "Agriculture", region: "Maharashtra", title: "Organic Spice Processing Unit Expansion", description: "Scaling certified organic spice processing capacity to meet export demand.", goal: 2500000, raised: 1875000, investors: 34, daysLeft: 18, riskLevel: "Low", expectedROI: 14.5, repaymentModel: "Revenue-Based (8%)", status: "active", createdAt: "2026-02-01", tags: ["organic", "export"] },
  { id: "c2", businessId: "b2", businessName: "TechWeave Solutions", sector: "Technology", region: "Karnataka", title: "SaaS Platform for SME Inventory Management", description: "Building AI-powered inventory SaaS for small retailers. 120 beta users.", goal: 5000000, raised: 2200000, investors: 47, daysLeft: 30, riskLevel: "Medium", expectedROI: 18.0, repaymentModel: "Fixed EMI (24 months)", status: "active", createdAt: "2026-01-15", tags: ["saas", "technology"] },
  { id: "c3", businessId: "b3", businessName: "Artisan Textiles Co.", sector: "Manufacturing", region: "Rajasthan", title: "Handloom Modernization & E-commerce Launch", description: "Modernizing 50 artisan looms and launching D2C e-commerce.", goal: 1500000, raised: 1500000, investors: 89, daysLeft: 0, riskLevel: "Low", expectedROI: 12.0, repaymentModel: "Revenue-Based (6%)", status: "funded", createdAt: "2025-12-01", tags: ["textile", "artisan"] },
  { id: "c4", businessId: "b4", businessName: "CoolChain Logistics", sector: "Logistics", region: "Delhi NCR", title: "Cold Chain Expansion — 3 New Hub Cities", description: "Expanding temperature-controlled logistics to Jaipur, Lucknow, Chandigarh.", goal: 8000000, raised: 3200000, investors: 23, daysLeft: 45, riskLevel: "Medium", expectedROI: 16.5, repaymentModel: "Fixed EMI (36 months)", status: "active", createdAt: "2026-03-01", tags: ["logistics", "cold chain"] },
]

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const sector = searchParams.get("sector")
  const region = searchParams.get("region")
  const status = searchParams.get("status")
  const businessId = searchParams.get("businessId")

  let filtered = campaigns
  if (sector && sector !== "all") filtered = filtered.filter((c) => c.sector === sector)
  if (region && region !== "all") filtered = filtered.filter((c) => c.region === region)
  if (status) filtered = filtered.filter((c) => c.status === status)
  if (businessId) filtered = filtered.filter((c) => c.businessId === businessId)

  return Response.json({ success: true, data: filtered, total: filtered.length })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const newCampaign = { id: `c${Date.now()}`, ...body, raised: 0, investors: 0, status: "active", createdAt: new Date().toISOString().split("T")[0] }
    campaigns.push(newCampaign)
    return Response.json({ success: true, data: newCampaign }, { status: 201 })
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 400 })
  }
}
