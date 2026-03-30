"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("empowermsme_user")
      if (stored) setUser(JSON.parse(stored))
    } catch {}
    setLoading(false)
  }, [])

  const login = (role, name, email) => {
    const u = { role, name, email }
    localStorage.setItem("empowermsme_user", JSON.stringify(u))
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem("empowermsme_user")
    setUser(null)
  }

  const dashboardPath = {
    business: "/business/dashboard",
    user: "/user/dashboard",
    admin: "/admin/dashboard",
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, dashboardPath }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
