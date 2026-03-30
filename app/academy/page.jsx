import Link from "next/link"
import PublicNavbar from "@/components/public-navbar"
import GlobalFooter from "@/components/global-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Lock, PlayCircle } from "lucide-react"

export const metadata = {
  title: "Academy - EmpowerMSME",
  description: "Financial education and business development resources",
}

export default function AcademyPage() {
  const modules = [
    { id: 1, title: "Financial Basics for MSMEs", locked: false, lessons: 8 },
    { id: 2, title: "Credit Score Fundamentals", locked: false, lessons: 6 },
    { id: 3, title: "Fundraising Strategies", locked: true, lessons: 10 },
    { id: 4, title: "Business Growth Planning", locked: true, lessons: 12 },
    { id: 5, title: "Investor Relations", locked: true, lessons: 8 },
    { id: 6, title: "Financial Compliance", locked: true, lessons: 9 },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            MSME <span className="text-primary">Academy</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Personalized financial education and business development resources
          </p>
        </div>

        {/* CTA Card */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl">Start Your Learning Journey</CardTitle>
                <CardDescription className="text-base">
                  Access full courses, quizzes, and personalized recommendations
                </CardDescription>
              </div>
              <Link href="/auth/select">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                  Login to Continue
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>

        {/* Modules Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Card key={module.id} className={module.locked ? "opacity-75" : "hover:shadow-lg transition-shadow"}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${module.locked ? "bg-muted" : "bg-primary/10"}`}
                  >
                    {module.locked ? (
                      <Lock className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      <PlayCircle className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  {!module.locked && <Badge variant="secondary">Preview</Badge>}
                </div>
                <CardTitle className="mt-4">{module.title}</CardTitle>
                <CardDescription>
                  {module.lessons} lessons • {module.locked ? "Login required" : "Free preview"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant={module.locked ? "outline" : "default"} className="w-full" disabled={module.locked}>
                  {module.locked ? "Locked" : "Start Preview"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Global Footer */}
      <GlobalFooter />
    </div>
  )
}
