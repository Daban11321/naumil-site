import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/home/hero"
import { Products } from "@/components/home/products"
import { DistributorCTA } from "@/components/home/distributor-cta"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Products />
      <DistributorCTA />
      <Footer />
    </main>
  )
}
