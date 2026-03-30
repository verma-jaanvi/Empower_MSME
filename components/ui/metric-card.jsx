"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }) {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1200, bounce: 0 })
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, motionValue, value])

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent =
          prefix + latest.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix
      }
    })
  }, [spring, prefix, suffix, decimals])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

export function MetricCard({
  title,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  change,
  changeType = "percent",
  description,
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  delay = 0,
  className,
}) {
  const isPositive = change > 0
  const isNeutral = change === 0 || change === undefined

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-lg", iconBg)}>
          {Icon && <Icon className={cn("h-5 w-5", iconColor)} />}
        </div>
        {!isNeutral && (
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
              isPositive ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
            )}
          >
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(change)}{changeType === "percent" ? "%" : ""}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-3xl font-bold tracking-tight text-foreground">
          <AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
        </div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
    </motion.div>
  )
}
