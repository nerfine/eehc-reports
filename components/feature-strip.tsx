"use client"

import { Globe, RefreshCw, FileText, Lock } from "lucide-react"
import { Reveal } from "@/components/reveal"

const items = [
  { icon: Globe, title: "No Installation", description: "Web-based reports and results." },
  { icon: RefreshCw, title: "Always Up to Date", description: "Real-time scanning and database updates." },
  { icon: FileText, title: "Transparent Reports", description: "Detailed results and easy to understand." },
  { icon: Lock, title: "Privacy Focused", description: "We do not collect or store your data." },
]

export function FeatureStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="grid gap-8 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, description }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <div className="flex items-start gap-4">
              <Icon className="mt-0.5 h-6 w-6 shrink-0 text-muted-foreground" aria-hidden />
              <div>
                <h4 className="font-semibold">{title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
