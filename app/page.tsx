import { HeroSection } from "@/components/hero-section"
import { WhatWeDo } from "@/components/what-we-do"
import { FeatureStrip } from "@/components/feature-strip"
import { ProfileCard } from "@/components/profile-card"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      
      {/* What we do section with profile card to the left */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 overflow-hidden">
        <div className="relative">
          <div className="hidden xl:block absolute -left-110 top-5">
            <ProfileCard />
          </div>
          <WhatWeDo />
          <div className="xl:hidden flex justify-center mt-8">
            <ProfileCard />
          </div>
        </div>
      </div>
      
      <FeatureStrip />
    </main>
  )
}
