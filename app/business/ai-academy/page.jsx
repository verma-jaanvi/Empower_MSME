"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BusinessSidebar from "@/components/business-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { quickQuestions } from "@/lib/knowledge-base"
import { Bot, User, Send, Sparkles, BookOpen, RefreshCw } from "lucide-react"

function MarkdownText({ text }) {
  const html = text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^### (.+)$/gm, "<h3 class='font-semibold text-foreground mt-3 mb-1'>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class='font-bold text-foreground mt-3 mb-1'>$1</h2>")
    .replace(/^\| (.+) \|$/gm, (m, r) => `<div class="border-b border-border py-1 text-xs grid grid-cols-2 gap-2"><span>${r.split(" | ").join("</span><span>")}</span></div>`)
    .replace(/^- (.+)$/gm, "<li class='ml-4 list-disc text-sm'>$1</li>")
    .replace(/^✅ (.+)$/gm, "<li class='ml-4 text-sm flex gap-1.5'><span class='text-emerald-500'>✅</span>$1</li>")
    .replace(/^⚠️ (.+)$/gm, "<li class='ml-4 text-sm flex gap-1.5'><span class='text-amber-500'>⚠️</span>$1</li>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>")
  return <div dangerouslySetInnerHTML={{ __html: html }} className="text-sm leading-relaxed prose-sm" />
}

function ChatBubble({ msg, isLatest }) {
  const isBot = msg.role === "assistant"
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-3 ${isBot ? "" : "flex-row-reverse"}`}
    >
      <div className={`flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full ${isBot ? "bg-gradient-to-br from-primary to-violet-500" : "bg-muted"}`}>
        {isBot ? <Bot className="h-4 w-4 text-white" /> : <User className="h-4 w-4 text-muted-foreground" />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isBot ? "bg-card border border-border rounded-tl-sm" : "bg-primary text-primary-foreground rounded-tr-sm"}`}>
        {isBot ? <MarkdownText text={msg.content} /> : <p className="text-sm">{msg.content}</p>}
        {msg.topic && (
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs bg-violet-500/10 text-violet-600">{msg.topic}</Badge>
            {msg.relatedTopics?.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
          </div>
        )}
      </div>
    </motion.div>
  )
}

const WELCOME = {
  role: "assistant",
  content: `**Welcome to the MSME Knowledge Academy!** 🎓

I'm your AI-powered financial advisor, trained on government schemes, MSME regulations, and financial literacy resources.

I can help you with:
- **Government schemes**: MUDRA, PMEGP, Stand-Up India, SIDBI
- **Tax guidance**: GST registration, composition scheme, filing
- **Credit & financing**: Credit score improvement, RBF, P2P lending
- **Business registration**: Udyam, FSSAI, MSME certification

Try one of the quick questions below, or ask me anything!`,
  topic: "Introduction",
}

export default function AIAcademyPage() {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  async function sendMessage(text) {
    const query = text || input.trim()
    if (!query) return
    setInput("")
    setMessages(m => [...m, { role: "user", content: query }])
    setLoading(true)
    try {
      const res = await fetch("/api/chat", { method: "POST", body: JSON.stringify({ message: query }), headers: { "Content-Type": "application/json" } })
      const data = await res.json()
      setMessages(m => [...m, { role: "assistant", content: data.answer, topic: data.topic, relatedTopics: data.relatedTopics }])
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }])
    } finally { setLoading(false) }
  }

  return (
    <div className="flex h-screen bg-background">
      <BusinessSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card px-8 py-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-primary">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Knowledge Academy</h1>
              <p className="text-muted-foreground text-sm">RAG-powered financial advisor for MSME owners</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={() => setMessages([WELCOME])}>
            <RefreshCw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
          {messages.map((msg, i) => <ChatBubble key={i} msg={msg} isLatest={i === messages.length - 1} />)}

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-500">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1.5 items-center h-5">
                  {[0, 0.15, 0.3].map(d => (
                    <motion.div key={d} className="h-2 w-2 rounded-full bg-muted-foreground"
                      animate={{ y: [0, -6, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: d }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick Questions */}
        <div className="px-8 pb-2 flex-shrink-0">
          <div className="flex gap-2 flex-wrap">
            {quickQuestions.slice(0, 4).map(q => (
              <button key={q.query} onClick={() => sendMessage(q.query)} disabled={loading}
                className="text-xs px-3 py-1.5 border border-border rounded-full bg-card hover:bg-muted/50 hover:border-primary/40 transition-all text-muted-foreground hover:text-foreground disabled:opacity-50">
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border bg-card px-8 py-4 flex-shrink-0">
          <div className="flex gap-3 max-w-4xl">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !loading && sendMessage()}
              placeholder="Ask about MUDRA loans, GST, credit scores, government schemes..."
              className="flex-1"
            />
            <Button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="gap-2 px-5">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
