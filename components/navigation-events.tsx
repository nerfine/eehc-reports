"use client"

import { useEffect, useCallback, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"

export function NavigationEvents() {
  const router = useRouter()
  const pathname = usePathname()
  const prevPathname = useRef(pathname)

  const handleTransition = useCallback((href: string) => {
    if (!document.startViewTransition) {
      router.push(href)
      return
    }
    document.startViewTransition(() => {
      router.push(href)
    })
  }, [router])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a[href]")
      if (!anchor) return

      const href = anchor.getAttribute("href")
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return

      try {
        const url = new URL(href, window.location.origin)
        if (url.pathname === pathname) return
        if (url.origin !== window.location.origin) return
      } catch {
        return
      }

      e.preventDefault()
      handleTransition(href)
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [pathname, handleTransition])

  useEffect(() => {
    if (prevPathname.current !== pathname && document.startViewTransition) {
      document.startViewTransition(() => {})
    }
    prevPathname.current = pathname
  }, [pathname])

  return null
}
