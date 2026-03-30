"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

function getScoreColor(score) {
  if (score >= 750) return { stroke: "#10b981", text: "text-emerald-500", label: "Excellent", bg: "bg-emerald-500/10" }
  if (score >= 650) return { stroke: "#3b82f6", text: "text-blue-500", label: "Good", bg: "bg-blue-500/10" }
  if (score >= 550) return { stroke: "#f59e0b", text: "text-amber-500", label: "Fair", bg: "bg-amber-500/10" }
  return { stroke: "#ef4444", text: "text-red-500", label: "Poor", bg: "bg-red-500/10" }
}

export function CreditGauge({ score = 0, size = 200, animate = true }) {
  const [displayScore, setDisplayScore] = useState(animate ? 300 : score)
  const colors = getScoreColor(score)

  const radius = (size - 20) / 2
  const circumference = Math.PI * radius // semicircle
  const minScore = 300
  const maxScore = 900
  const progress = (score - minScore) / (maxScore - minScore)
  const offset = circumference - progress * circumference

  useEffect(() => {
    if (!animate) return
    const start = 300
    const duration = 1500
    const startTime = performance.now()

    const timer = requestAnimationFrame(function update(now) {
      const elapsed = now - startTime
      const pct = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - pct, 3)
      setDisplayScore(Math.round(start + (score - start) * eased))
      if (pct < 1) requestAnimationFrame(update)
    })

    return () => cancelAnimationFrame(timer)
  }, [score, animate])

  const cx = size / 2
  const cy = size / 2
  const startAngle = Math.PI // left (180°)
  const endAngle = 0 // right (0°)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
        <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
          {/* Background track */}
          <path
            d={`M 10 ${cy} A ${radius} ${radius} 0 0 1 ${size - 10} ${cy}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            className="text-border"
          />
          {/* Score zone colors */}
          {/* Poor: 300-550 (0-41.6%) red */}
          <path
            d={`M 10 ${cy} A ${radius} ${radius} 0 0 1 ${size - 10} ${cy}`}
            fill="none"
            stroke="#ef4444"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.416} ${circumference}`}
            opacity={0.2}
          />
          {/* Progress stroke */}
          <motion.path
            d={`M 10 ${cy} A ${radius} ${radius} 0 0 1 ${size - 10} ${cy}`}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {/* Tick marks */}
          {[300, 450, 600, 750, 900].map((tick) => {
            const t = (tick - 300) / 600
            const angle = Math.PI - t * Math.PI
            const x = cx + (radius + 8) * Math.cos(angle)
            const y = cy - (radius + 8) * Math.sin(angle)
            return (
              <text
                key={tick}
                x={x}
                y={y + 4}
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ fontSize: 9 }}
              >
                {tick}
              </text>
            )
          })}
        </svg>

        {/* Score display */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
          <span className={cn("text-4xl font-bold tabular-nums", colors.text)}>{displayScore}</span>
        </div>
      </div>

      {/* Label badge */}
      <div className={cn("px-4 py-1.5 rounded-full text-sm font-semibold", colors.bg, colors.text)}>
        {colors.label}
      </div>

      {/* Range labels */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>300 — Poor</span>
        <span>•</span>
        <span>750+ — Excellent</span>
      </div>
    </div>
  )
}

export function RiskBadge({ risk }) {
  const map = {
    Low: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    Medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    High: "bg-red-500/10 text-red-600 border-red-500/20",
  }
  return (
    <span className={cn("px-3 py-1 rounded-full text-sm font-semibold border", map[risk] || map.Medium)}>
      {risk} Risk
    </span>
  )
}
