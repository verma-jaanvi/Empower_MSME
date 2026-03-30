"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"

export default function FloatingSpamCheck() {
  const [showBubble, setShowBubble] = useState(false)
  const pathname = usePathname()

  const hideFloatingIcon = pathname === "/auth/select"

  useEffect(() => {
    if (hideFloatingIcon) return

    setShowBubble(true)
    const timer = setTimeout(() => {
      setShowBubble(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [hideFloatingIcon, pathname])

  if (hideFloatingIcon) {
    return null
  }

  return (
    <>
      {/* Message Bubble */}
      {showBubble && (
        <div className="fixed bottom-24 right-6 z-40 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-card border border-border rounded-lg shadow-lg p-3 max-w-xs">
            <p className="text-sm text-foreground leading-relaxed">
              Got a business-related SMS? Wanna check if it's spam or not?
            </p>
          </div>
        </div>
      )}

      {/* Floating Icon */}
      <Link
        href="/sms-spam-check"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
      >
        <MessageCircle className="h-8 w-8" />
      </Link>
    </>
  )
}
