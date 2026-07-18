"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"

const links = [
  { label: "Home", href: "/" },
  { label: "Reports", href: "/reports" },
  { label: "Executor Functions", href: "/functions" },
]

export function SiteNavbar() {
  const pathname = usePathname()

  return (
    <header className="border-b border-border/40">
      <nav className="relative mx-auto flex max-w-7xl items-center px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span>
            Executor<span className="text-primary">Health</span>Check
          </span>
        </Link>

        <ul className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-9 text-sm lg:flex">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={
                    isActive
                      ? "relative pb-1 text-foreground"
                      : "relative pb-1 text-muted-foreground transition-colors hover:text-foreground"
                  }
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      className="absolute inset-x-0 -bottom-[21px] h-0.5 bg-primary"
                      layoutId="nav-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
