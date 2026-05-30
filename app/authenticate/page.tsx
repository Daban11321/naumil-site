"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldCheck, ShieldAlert, ShieldQuestion, Loader2 } from "lucide-react"

type VerificationStatus = "idle" | "loading" | "success" | "failed"

export default function AuthenticatePage() {
  const [serialNumber, setSerialNumber] = useState("")
  const [naCode, setNaCode] = useState("")
  const [status, setStatus] = useState<VerificationStatus>("idle")

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!serialNumber.trim() || !naCode.trim()) return
    setStatus("loading")
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serialNumber, naCode }),
    })
    const { authentic } = await res.json()
    setStatus(authentic ? "success" : "failed")
  }

  const resetForm = () => {
    setSerialNumber("")
    setNaCode("")
    setStatus("idle")
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-xl px-4">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <ShieldCheck className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Verify Authenticity
            </h1>
            <p className="mt-4 text-muted-foreground">
              Enter the codes from your product sticker to verify it is a genuine Naumil product.
            </p>
          </div>
          <div className="mt-8 rounded-xl border border-border bg-muted/30 p-6">
            <h2 className="text-sm font-semibold text-foreground">How to find your codes:</h2>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>1. Locate the verification sticker on your product</li>
              <li>2. Scratch off the silver panels to reveal the codes</li>
              <li>3. Enter the <strong>Serial Number</strong> and <strong>NA Code</strong> below</li>
            </ol>
          </div>
          {status === "idle" || status === "loading" ? (
            <form onSubmit={handleVerify} className="mt-8 space-y-6">
              <div>
                <label htmlFor="serial" className="block text-sm font-medium text-foreground">
                  Serial Number
                </label>
                <Input id="serial" type="text" placeholder="Enter Serial Number"
                  value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)}
                  className="mt-2 min-h-[48px]" required disabled={status === "loading"} />
              </div>
              <div>
                <label htmlFor="nacode" className="block text-sm font-medium text-foreground">
                  NA Code
                </label>
                <Input id="nacode" type="text" placeholder="Enter NA Code"
                  value={naCode} onChange={(e) => setNaCode(e.target.value)}
                  className="mt-2 min-h-[48px]" required disabled={status === "loading"} />
              </div>
              <Button type="submit" size="lg" className="w-full min-h-[48px]" disabled={status === "loading"}>
                {status === "loading" ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Verifying...</>) : "Verify Product"}
              </Button>
            </form>
          ) : status === "success" ? (
            <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-green-800">Authentic Product</h2>
              <p className="mt-2 text-green-700">This is a genuine Naumil product. Thank you for choosing quality.</p>
              <Button onClick={resetForm} variant="outline" className="mt-6 min-h-[44px]">Verify Another Product</Button>
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <ShieldAlert className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-red-800">Non Authentic Product</h2>
              <p className="mt-2 text-red-700">We could not verify this product. Please check the codes and try again.</p>
              <Button onClick={resetForm} variant="outline" className="mt-6 min-h-[44px]">Try Again</Button>
            </div>
          )}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <ShieldQuestion className="h-5 w-5" />
              <span className="text-sm">Having trouble verifying?</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Contact us at <a href="mailto:info@naumil.com" className="font-medium text-foreground underline">info@naumil.com</a>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
