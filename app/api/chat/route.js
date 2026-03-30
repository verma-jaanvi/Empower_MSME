// EmpowerMSME — Knowledge Academy Chat Microservice
import { searchKnowledgeBase } from "@/lib/knowledge-base"

export async function POST(request) {
  try {
    const { message } = await request.json()
    if (!message?.trim()) {
      return Response.json({ success: false, error: "Message is required" }, { status: 400 })
    }

    const results = searchKnowledgeBase(message)

    if (results.length === 0) {
      return Response.json({
        success: true,
        answer: `I don't have specific information about "${message}" yet. However, I can help you with:\n\n• **MUDRA & PMEGP loans** — Government micro-loan schemes\n• **Udyam Registration** — MSME registration process\n• **GST for MSMEs** — Tax compliance guide\n• **Credit score improvement** — Step-by-step tips\n• **Revenue-Based Financing** — Flexible repayment models\n• **SIDBI schemes** — Development bank programs\n• **Working capital** — Cash flow management\n\nTry asking about any of these topics!`,
        topic: "General Help",
        confidence: 0,
      })
    }

    const best = results[0]

    return Response.json({
      success: true,
      answer: best.answer,
      topic: best.topic,
      confidence: Math.min(Math.round(best.score * 15), 98),
      relatedTopics: results.slice(1).map((r) => r.topic),
    })
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 })
  }
}
