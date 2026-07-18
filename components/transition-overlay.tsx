"use client"

import { motion, AnimatePresence } from "motion/react"
import { usePathname } from "next/navigation"
import { ReactNode, useState, useEffect, useRef, createContext, useContext } from "react"

// --- Transition Context ---
interface TransitionContextValue {
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextValue>({
  isTransitioning: false,
})

export function useTransition() {
  return useContext(TransitionContext)
}

// --- Overlay Slide-In (covers page from bottom) ---
const overlayCoverVariants = {
  initial: {
    y: "100%",
  },
  animate: {
    y: "0%",
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as number[],
    },
  },
  exit: {
    y: "0%",
    transition: {
      duration: 0,
    },
  },
}

// --- Overlay Slide-Out (reveals new page by sliding up) ---
const overlayRevealVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "-100%",
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as number[],
    },
  },
}

// --- Page Content Variants (subtle scale + fade) ---
const pageContentVariants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as number[],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.12,
      ease: [0.22, 1, 0.36, 1] as number[],
    },
  },
}

// --- Transition Overlay Component ---
export function TransitionOverlay({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [displayPath, setDisplayPath] = useState(pathname)
  const [overlayState, setOverlayState] = useState<"idle" | "covering" | "revealing">("idle")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // Clear any pending timers
  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  useEffect(() => {
    if (pathname !== displayPath) {
      clearAllTimers()
      setIsTransitioning(true)

      // Phase 1: Overlay slides in from bottom to cover the page (0–350ms)
      setOverlayState("covering")

      // Phase 2: After overlay covers (~380ms), swap the displayed route
      const swapTimer = setTimeout(() => {
        setDisplayPath(pathname)
      }, 380)
      timersRef.current.push(swapTimer)

      // Phase 3: Brief pause, then start revealing the new page (~400ms)
      const revealTimer = setTimeout(() => {
        setOverlayState("revealing")
      }, 420)
      timersRef.current.push(revealTimer)

      // Phase 4: After overlay slides away, go idle (~780ms)
      const idleTimer = setTimeout(() => {
        setOverlayState("idle")
        setIsTransitioning(false)
      }, 780)
      timersRef.current.push(idleTimer)
    }

    return () => {
      clearAllTimers()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <TransitionContext.Provider value={{ isTransitioning }}>
      {/* Layer 1: Full-screen overlay */}
      <AnimatePresence mode="sync">
        {overlayState === "covering" && (
          <motion.div
            key="overlay-cover"
            className="fixed inset-0 z-[100] bg-background"
            variants={overlayCoverVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        )}
        {overlayState === "revealing" && (
          <motion.div
            key="overlay-reveal"
            className="fixed inset-0 z-[100] bg-background"
            variants={overlayRevealVariants}
            initial="initial"
            animate="animate"
          />
        )}
      </AnimatePresence>

      {/* Layer 2: Page content with subtle scale transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayPath}
          variants={pageContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </TransitionContext.Provider>
  )
}
