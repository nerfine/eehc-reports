"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { label: "Home", href: "/", icon: Home },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Executor Functions", href: "/functions", icon: Zap },
]

export function SiteNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 px-3 py-3 sm:px-6">
      <div className="relative mx-auto flex max-w-4xl items-center justify-between gap-2 rounded-full border border-border bg-background/60 px-2.5 py-2 shadow-lg shadow-black/20 backdrop-blur-xl sm:px-3">
        <Link href="/" className="shrink-0 pl-2 text-base font-bold tracking-tight text-foreground">
          Executor<span className="text-primary">Health</span>Check
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all duration-200",
                      isActive
                        ? "bg-secondary font-medium text-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`block h-0.5 w-5 bg-foreground transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-foreground transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-foreground transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      <div className="mx-auto max-w-4xl">
        <div
          className={cn(
            "overflow-hidden rounded-2xl border border-border bg-background/80 backdrop-blur-xl shadow-lg shadow-black/20 transition-all duration-300 ease-out",
            open ? "mt-2 max-h-96 opacity-100" : "mt-0 max-h-0 border-transparent opacity-0 shadow-none"
          )}
        >
          <ul className="flex flex-col gap-1 p-2 lg:hidden">
            {links.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "flex min-h-[44px] items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-secondary font-medium text-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </header>
  )
}
