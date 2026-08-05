"use client"

import { ThreeDMarquee } from "@/components/ui/3d-marquee"

const img1 = "/unnamed.png"
const img2 = "/unnamed2.png"
const marqueeImages = [
  img1, img2, img1, img2, img1, img2, img1, img2, img1, img2,
  img1, img2, img1, img2, img1, img2, img1, img2, img1, img2,
  img1, img2, img1, img2, img1, img2, img1, img2, img1, img2,
  img1,
]

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-8 py-12 sm:gap-12 sm:py-16 lg:grid-cols-2 lg:py-24">
      <div className="px-4 sm:px-6 animate-fade-in-up">
        <h1 className="text-balance text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          Executor diagnostics. Real results.
        </h1>
        <p className="mt-5 max-w-md text-base sm:text-lg leading-relaxed text-muted-foreground sm:mt-6">
          ExecutorHealthCheck scans, tests, and benchmarks executors to deliver real security insights you can trust.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="/reports"
            className="rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(255,255,255,0.1)] active:scale-[0.97] transition-transform"
          >
            View Reports
          </a>
        </div>
      </div>

      <div className="flex justify-end pr-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <ThreeDMarquee images={marqueeImages} />
      </div>
    </section>
  )
}
