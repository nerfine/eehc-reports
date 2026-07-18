"use client"

import { ReactNode } from "react"
import { TransitionOverlay } from "@/components/transition-overlay"
import { LayoutGroup } from "motion/react"

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LayoutGroup>
      <TransitionOverlay>{children}</TransitionOverlay>
    </LayoutGroup>
  )
}
