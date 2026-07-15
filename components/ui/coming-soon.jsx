"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Construction, ArrowLeft } from "lucide-react"

export default function ComingSoon({ title, description, backHref, backLabel, sidebar: Sidebar }) {
  const content = (
    <div className="flex-1 flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-6">
          <Construction className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground mb-6">{description || "This feature is coming soon. We're working hard to bring it to you."}</p>
        <Link href={backHref || "/"}>
          <Button variant="outline" className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" /> {backLabel || "Go Back"}
          </Button>
        </Link>
      </motion.div>
    </div>
  )

  if (!Sidebar) return <div className="min-h-screen bg-background flex items-center justify-center">{content}</div>

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-border bg-card px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        </div>
        {content}
      </div>
    </div>
  )
}
