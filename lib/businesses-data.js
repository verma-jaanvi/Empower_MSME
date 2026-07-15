/**
 * lib/businesses-data.js
 *
 * Single source of truth for all MSME business listings.
 * Imported by:
 *   - app/page.jsx          (shows first 3 as "Featured")
 *   - app/marketplace/page.jsx (shows full grid with filters)
 *
 * To add a new business, just push a new object into ALL_BUSINESSES.
 * Both pages update automatically.
 */

export const ALL_BUSINESSES = [
  // ── Featured 3 (shown on homepage) ──────────────────────────────────────────
  {
    id: "greenleaf-organics",
    name: "GreenLeaf Organics",
    tagline: "Organic farm-to-table supply chain, Maharashtra",
    description:
      "Connecting 1,200+ organic farmers directly with urban households and restaurant chains via a tech-enabled cold-chain logistics network. FSSAI certified, export-ready.",
    sector: "AgriTech",
    location: "Pune, Maharashtra",
    goal: "₹75L",
    raised: "₹52L",
    progress: 69,
    rating: 4.8,
    reviews: 124,
    tags: ["Export Ready", "Women-Led"],
    stage: "Growth",
    founded: "2021",
    employees: "48",
    featured: true,
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-600",
    initials: "GO",
  },
  {
    id: "shilpakraft-studios",
    name: "ShilpaKraft Studios",
    tagline: "Handloom textiles & artisan collective, Rajasthan",
    description:
      "A GI-tagged handloom brand aggregating 200+ rural artisans across Rajasthan. Sells direct-to-consumer via D2C website and exports to 12 countries. UNESCO cultural heritage partner.",
    sector: "Handicrafts",
    location: "Jaipur, Rajasthan",
    goal: "₹40L",
    raised: "₹31L",
    progress: 78,
    rating: 4.9,
    reviews: 98,
    tags: ["GI Tagged", "200+ Artisans"],
    stage: "Scale-up",
    founded: "2019",
    employees: "12 + 200 artisans",
    featured: true,
    accentFrom: "from-amber-500",
    accentTo: "to-orange-600",
    initials: "SK",
  },
  {
    id: "swiftmed-logistics",
    name: "SwiftMed Logistics",
    tagline: "Cold-chain pharmaceutical delivery network",
    description:
      "Last-mile cold-chain pharmaceutical distribution serving 3,000+ pharmacies across Karnataka and Tamil Nadu. ISO 9001 & GDP certified. Partnered with 14 top pharma manufacturers.",
    sector: "HealthTech",
    location: "Bengaluru, Karnataka",
    goal: "₹1.2Cr",
    raised: "₹88L",
    progress: 73,
    rating: 4.7,
    reviews: 76,
    tags: ["ISO Certified", "B2B"],
    stage: "Growth",
    founded: "2020",
    employees: "91",
    featured: true,
    accentFrom: "from-blue-500",
    accentTo: "to-indigo-600",
    initials: "SM",
  },

  // ── Additional listings (marketplace only) ───────────────────────────────────
  {
    id: "solaryana-energy",
    name: "Solaryana Energy",
    tagline: "Rooftop solar installation for rural SMEs",
    description:
      "Provides affordable rooftop solar systems to rural factories and farms using a pay-as-you-save model. Installed 1,800+ systems across MP and UP. MNRE empanelled installer.",
    sector: "CleanTech",
    location: "Bhopal, Madhya Pradesh",
    goal: "₹2Cr",
    raised: "₹1.3Cr",
    progress: 65,
    rating: 4.6,
    reviews: 54,
    tags: ["MNRE Empanelled", "Rural Focus"],
    stage: "Growth",
    founded: "2020",
    employees: "67",
    featured: false,
    accentFrom: "from-yellow-500",
    accentTo: "to-amber-600",
    initials: "SE",
  },
  {
    id: "nourish-bites",
    name: "NourishBites",
    tagline: "Millet-based healthy snack brand, D2C",
    description:
      "A D2C millet snack brand sourcing directly from tribal farmers in Jharkhand. Listed on Amazon, Flipkart, and 400+ modern trade outlets. Featured in Forbes India 30 under 30.",
    sector: "FoodTech",
    location: "Ranchi, Jharkhand",
    goal: "₹60L",
    raised: "₹41L",
    progress: 68,
    rating: 4.8,
    reviews: 213,
    tags: ["D2C", "Tribal Sourcing"],
    stage: "Scale-up",
    founded: "2022",
    employees: "29",
    featured: false,
    accentFrom: "from-green-500",
    accentTo: "to-emerald-600",
    initials: "NB",
  },
  {
    id: "vedacraft-wellness",
    name: "VedaCraft Wellness",
    tagline: "Ayurvedic skincare — science-backed formulations",
    description:
      "Clean-label Ayurvedic skincare formulated by AYUSH-registered practitioners. Export to 8 countries, USFDA facility registered. 98% repeat customer rate. Bootstrapped to ₹3.2Cr ARR.",
    sector: "D2C / Wellness",
    location: "Coimbatore, Tamil Nadu",
    goal: "₹80L",
    raised: "₹48L",
    progress: 60,
    rating: 4.9,
    reviews: 187,
    tags: ["AYUSH Certified", "Export Ready"],
    stage: "Scale-up",
    founded: "2021",
    employees: "34",
    featured: false,
    accentFrom: "from-purple-500",
    accentTo: "to-violet-600",
    initials: "VW",
  },
  {
    id: "buildfast-tech",
    name: "BuildFast Technologies",
    tagline: "Construction tech SaaS for tier-2 contractors",
    description:
      "Mobile-first project management and procurement SaaS for small construction contractors. 1,400 paid customers, ₹2.8Cr ARR, growing 18% MoM. Currently pre-Series A.",
    sector: "B2B SaaS",
    location: "Ahmedabad, Gujarat",
    goal: "₹3Cr",
    raised: "₹1.8Cr",
    progress: 60,
    rating: 4.5,
    reviews: 42,
    tags: ["SaaS", "Pre-Series A"],
    stage: "Early Growth",
    founded: "2023",
    employees: "18",
    featured: false,
    accentFrom: "from-cyan-500",
    accentTo: "to-blue-600",
    initials: "BT",
  },
  {
    id: "kisan-connect",
    name: "KisanConnect",
    tagline: "Agri-input marketplace for small farmers",
    description:
      "A B2B marketplace connecting small farmers with certified agri-input dealers for seeds, fertilisers, and pesticides at transparent prices. Serving 85,000+ farmers across 6 states.",
    sector: "AgriTech",
    location: "Hyderabad, Telangana",
    goal: "₹1.5Cr",
    raised: "₹95L",
    progress: 63,
    rating: 4.7,
    reviews: 88,
    tags: ["85K+ Farmers", "B2B Marketplace"],
    stage: "Growth",
    founded: "2020",
    employees: "55",
    featured: false,
    accentFrom: "from-lime-500",
    accentTo: "to-green-600",
    initials: "KC",
  },
  {
    id: "drobe-fashion",
    name: "Drobe Fashion",
    tagline: "Sustainable fashion rental for working women",
    description:
      "India's first fashion rental platform focused on working women in metro cities. Partners with 300+ designers, 50,000+ subscribers, 4.2M clothes rented. Carbon-neutral operations.",
    sector: "Fashion / Sustainability",
    location: "Mumbai, Maharashtra",
    goal: "₹90L",
    raised: "₹54L",
    progress: 60,
    rating: 4.6,
    reviews: 310,
    tags: ["Women-Led", "Sustainable"],
    stage: "Growth",
    founded: "2021",
    employees: "43",
    featured: false,
    accentFrom: "from-pink-500",
    accentTo: "to-rose-600",
    initials: "DF",
  },
]

/** The 3 homepage-featured businesses (same objects, no duplication) */
export const FEATURED_BUSINESSES = ALL_BUSINESSES.filter((b) => b.featured)

/** All unique sectors for the filter dropdown */
export const SECTORS = ["All Sectors", ...new Set(ALL_BUSINESSES.map((b) => b.sector))]

/** All unique states for the filter dropdown */
export const LOCATIONS = [
  "All Locations",
  ...new Set(ALL_BUSINESSES.map((b) => b.location.split(", ")[1])),
]

/** All funding stages */
export const STAGES = ["All Stages", "Early Growth", "Growth", "Scale-up"]
