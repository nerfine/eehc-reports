"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"

interface AdminContextType {
  isAdmin: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  login: async () => false,
  logout: () => {},
})

const SESSION_KEY = "ehc_session"
const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000
const ADMIN_USER = "niggafine"
const ADMIN_PASS_HASH = "cd4de393a3903d751ae2a691e2db6e886fe2a71b7b78e883c8700bcd2d911ef8"

async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
}

function isSessionValid(token: string): boolean {
  try {
    const decoded = atob(token)
    const [hash, timestamp] = decoded.split(":")
    const age = Date.now() - parseInt(timestamp, 10)
    return hash === ADMIN_PASS_HASH && age > 0 && age < SESSION_MAX_AGE_MS
  } catch {
    return false
  }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY)
    if (stored && isSessionValid(stored)) {
      setIsAdmin(true)
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  }, [])

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    const enteredHash = await sha256(password)
    if (username === ADMIN_USER && enteredHash === ADMIN_PASS_HASH) {
      const sessionToken = btoa(`${ADMIN_PASS_HASH}:${Date.now()}`)
      localStorage.setItem(SESSION_KEY, sessionToken)
      setIsAdmin(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAdmin(false)
    localStorage.removeItem(SESSION_KEY)
  }, [])

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
