import { ShieldCheck, LineChart, Code2, ArrowRight } from "lucide-react"
import { GlareCard } from "@/components/ui/glare-card"

const features = [
  {
    icon: ShieldCheck,
    title: "Vulnerability Scanning",
    description: "Deep scanning of executor files to detect known and unknown vulnerabilities.",
  },
  {
    icon: LineChart,
    title: "Performance Benchmarking",
    description: "Benchmark executor performance under real-world conditions and stress tests.",
  },
  {
    icon: Code2,
    title: "Executor Functions",
    description: "Analyze executor functions, APIs, and behaviors in a controlled environment.",
  },
]

export function WhatWeDo() {
  return (
    <section className="py-16">
      <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">What we do</h2>
      <p className="mx-auto mt-3 max-w-2xl text-pretty text-center text-muted-foreground">
        Comprehensive testing and analysis to keep executor environments safe and secure.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <GlareCard key={title} className="flex flex-col items-center justify-center p-8">
            <Icon className="h-12 w-12 text-white" aria-hidden />
            <p className="text-white font-bold text-xl mt-4">{title}</p>
            <p className="text-white/70 text-sm mt-2 text-center">{description}</p>
          </GlareCard>
        ))}
      </div>
    </section>
  )
}
