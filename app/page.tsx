import { HeroSection } from "@/components/hero-section"
import { WhatWeDo } from "@/components/what-we-do"
import { FeatureStrip } from "@/components/feature-strip"
import { ProfileCard } from "@/components/profile-card"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      
      {/* What we do section with profile card to the left */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative">
          {/* Profile card - customize position via className */}
          <ProfileCard className="absolute -left-110 top-5 hidden xl:block" />
          <WhatWeDo />
        </div>
      </div>
      
      <FeatureStrip />
    </main>
  )
}
