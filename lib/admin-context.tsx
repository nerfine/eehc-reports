"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface AdminContextType {
  isAdmin: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
})

const ADMIN_USER = "niggafine"
const ADMIN_PASS = "3cLCfvN8TgezczX9aGnAtJxMo3heOSsD"

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("ehc_admin")
    if (stored === "true") setIsAdmin(true)
  }, [])

  const login = (username: string, password: string) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsAdmin(true)
      localStorage.setItem("ehc_admin", "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    localStorage.removeItem("ehc_admin")
  }

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
