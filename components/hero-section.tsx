import { ThreeDMarquee } from "@/components/ui/3d-marquee"

const img1 = "https://lh3.googleusercontent.com/sitesv/AA5AbUCIOU_SQF0Uofd68Sadm79yR-xkpMkKuOqU2IZu6o_3d82IALlzMr6BnBwi-FwuQ0L8XUsCOd8nCyISnf7jVuyib_WjIdahbfJzXJQftyYTciXru98PRZBOCrDwlTZV5bvPUapdSzusuDnOkqXk5UF-k0VWCP1kw1BiZ2SJ6LCPSIZMMIEb5lQGYXkoQbTpkRXep27m-BAC843sbM1UhACF3RG1o5seiI3JEJa0BWA=w1280"
const img2 = "https://lh3.googleusercontent.com/sitesv/AA5AbUA0mf_PvK8Dvpt8K9AIfx7HqB11NI89Yh0jQnrZgnIZ4WWb8oXi9J5TYrwDdaQtw1CgeSRzUelQ6ZgJcT3Zo3CN0Kj5zCDfuirUV7bAOSf7FsIbTCgzU-22CXO8qwwU8arqI9YIMQtZ8LA5S-0NONM4_SY8_hAFEjcFysKdt50S6Z51LEyZSOP3NDnAkJtBQKxbcDH2tgXZdGOuH_C9OzoRUikLoLmgYae20py0=w1280"
const marqueeImages = [
  img1, img2, img1, img2, img1, img2, img1, img2, img1, img2,
  img1, img2, img1, img2, img1, img2, img1, img2, img1, img2,
  img1, img2, img1, img2, img1, img2, img1, img2, img1, img2,
  img1,
]

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
      <div className="px-6">
        <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Executor diagnostics. Real results.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
          ExecutorHealthCheck scans, tests, and benchmarks executors to deliver real security insights you can trust.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="/reports"
            className="rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            View Reports
          </a>
        </div>
      </div>

      <div className="flex justify-end pr-0">
        <ThreeDMarquee images={marqueeImages} />
      </div>
    </section>
  )
}
