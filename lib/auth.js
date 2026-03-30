// Authentication utilities for role-based access control
export const ROLES = {
  USER: "USER",
  BUSINESS: "BUSINESS",
  ADMIN: "ADMIN",
}

// Mock authentication - in production, this would use JWT tokens and secure sessions
export const authService = {
  currentUser: null,

  login(email, password, role) {
    // Mock login - in production, this would validate against a backend
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name: email.split("@")[0],
    }
    this.currentUser = user
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_user", JSON.stringify(user))
    }
    return user
  },

  register(userData, role) {
    // Mock registration
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      role,
      approved: role !== ROLES.BUSINESS, // Business requires approval
    }
    this.currentUser = user
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_user", JSON.stringify(user))
    }
    return user
  },

  logout() {
    this.currentUser = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_user")
    }
  },

  getCurrentUser() {
    if (this.currentUser) return this.currentUser
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("auth_user")
      if (stored) {
        this.currentUser = JSON.parse(stored)
        return this.currentUser
      }
    }
    return null
  },

  hasRole(role) {
    const user = this.getCurrentUser()
    return user && user.role === role
  },
}
