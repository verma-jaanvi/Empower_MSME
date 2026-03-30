"use client"

import { useState } from "react"
import PublicNavbar from "@/components/public-navbar"
import GlobalFooter from "@/components/global-footer"
import FloatingSpamCheck from "@/components/floating-spam-check"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export default function SpamCheckPage() {
  const { t } = useLanguage()
  const [smsText, setSmsText] = useState("")
  const [isChecking, setIsChecking] = useState(false)

  const handleCheckMessage = () => {
    if (!smsText.trim()) {
      alert("Please paste an SMS message to check")
      return
    }

    setIsChecking(true)
    setTimeout(() => {
      setIsChecking(false)
      alert("SMS checked! (Placeholder - no real spam detection yet)")
      setSmsText("")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />
      <FloatingSpamCheck />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Check SMS for Spam</CardTitle>
              <CardDescription className="text-base mt-2">
                Paste a business-related SMS message to check if it might be spam
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="sms" className="block text-sm font-medium text-foreground">
                  {t("pasteSMS")}
                </label>
                <textarea
                  id="sms"
                  placeholder="Dear customer, claim your prize now! Visit link..."
                  value={smsText}
                  onChange={(e) => setSmsText(e.target.value)}
                  className="w-full min-h-32 rounded-lg border border-border bg-background p-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button
                onClick={handleCheckMessage}
                disabled={isChecking}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg h-12"
              >
                {isChecking ? "Checking..." : t("checkMessage")}
              </Button>

              <div className="rounded-lg bg-secondary/30 p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-2">How it works:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Copy and paste the SMS message here</li>
                  <li>Click "Check Message" to analyze it</li>
                  <li>Get instant feedback on potential spam indicators</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <GlobalFooter />
    </div>
  )
}
