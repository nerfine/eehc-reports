"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { label: "Home", href: "/" },
  { label: "Reports", href: "/reports" },
  { label: "Executor Functions", href: "/functions" },
]

export function SiteNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="border-b border-border/40">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Executor<span className="text-primary">Health</span>Check
        </Link>

        <ul className="hidden items-center gap-9 text-sm lg:flex">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={
                    isActive
                      ? "relative pb-1 text-foreground"
                      : "relative pb-1 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  }
                >
                  {link.label}
                  {isActive && (
                    <div className="absolute inset-x-0 -bottom-[21px] h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 lg:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-foreground transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
        <ul className="px-4 pb-4 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-secondary text-foreground font-medium"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
