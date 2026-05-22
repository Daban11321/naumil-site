import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Award } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Text Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="max-w-xl text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Premium Furniture Hardware & PVC Edge Banding
            </h1>

            <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Quality you can trust for every project. From professional contractors to DIY enthusiasts, Naumil delivers excellence in furniture hardware solutions.
            </p>

            <div className="mt-8">
              <Button asChild size="lg" className="min-h-[48px] px-8">
                <Link href="/authenticate">Verify Product</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-muted-foreground">100% Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-muted-foreground">Premium Quality</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-[3/4]">
            <Image
              src="/images/hero-kitchen.jpg"
              alt="Modern kitchen interior with premium furniture hardware"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
