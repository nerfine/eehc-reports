"use client"

import { motion, useInView, type Variants } from "motion/react"
import { useRef, ReactNode } from "react"

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "fade"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: RevealDirection
  duration?: number
  distance?: number
  once?: boolean
}

const directionOffsets: Record<RevealDirection, { x?: number; y?: number; scale?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  scale: { scale: 0.95 },
  fade: {},
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.55,
  distance = 28,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-60px" })

  const offset = directionOffsets[direction]
  const initial: Record<string, number> = { opacity: 0 }
  const animate: Record<string, number> = { opacity: 1 }

  if (offset.x !== undefined) {
    initial.x = direction === "left" ? -distance : distance
    animate.x = 0
  }
  if (offset.y !== undefined) {
    initial.y = direction === "up" ? distance : -distance
    animate.y = 0
  }
  if (offset.scale !== undefined) {
    initial.scale = 0.95
    animate.scale = 1
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// --- Stagger Container for wrapping multiple Reveal children ---
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delay?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  delay = 0,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  )
}

// --- Stagger Item (used inside StaggerContainer) ---
interface StaggerItemProps {
  children: ReactNode
  className?: string
  direction?: RevealDirection
  distance?: number
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  distance = 24,
}: StaggerItemProps) {
  const offset = directionOffsets[direction]
  const initial: Record<string, number> = { opacity: 0 }
  const animate: Record<string, number> = { opacity: 1 }

  if (offset.x !== undefined) {
    initial.x = direction === "left" ? -distance : distance
    animate.x = 0
  }
  if (offset.y !== undefined) {
    initial.y = direction === "up" ? distance : -distance
    animate.y = 0
  }
  if (offset.scale !== undefined) {
    initial.scale = 0.95
    animate.scale = 1
  }

  const variants: Variants = {
    hidden: initial,
    visible: {
      ...animate,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
