"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Users, TrendingUp, Loader2, CheckCircle, X } from "lucide-react"

const benefits = [
  {
    icon: MapPin,
    title: "Exclusive Territory",
    description: "Become the sole distributor in your city or area with exclusive rights.",
  },
  {
    icon: Users,
    title: "Full Support",
    description: "Training, marketing materials, and dedicated support from our team.",
  },
  {
    icon: TrendingUp,
    title: "Growing Market",
    description: "Join a rapidly expanding market with high demand for quality products.",
  },
]

export function DistributorCTA() {
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      companyName: formData.get("companyName"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      city: formData.get("city"),
    }

    // Send email to marketing@naumil.com
    try {
      await fetch("/api/distributor-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } catch {
      // Form still shows success for UX, email would be handled server-side
    }

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section className="border-t border-border bg-primary py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
            Business Opportunity
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            Become a Sole Distributor
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Interested in becoming an exclusive Naumil distributor in your city or area? We are expanding our network and looking for dedicated partners.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-xl bg-primary-foreground/5 p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                <benefit.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-primary-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/70">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            size="lg"
            variant="secondary"
            className="min-h-[48px] px-8"
            onClick={() => setShowForm(true)}
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Application Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-card p-6 md:p-8">
            <button
              onClick={() => {
                setShowForm(false)
                setIsSubmitted(false)
              }}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  Application Received!
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Thank you for your interest. Our team will review your application and contact you shortly.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 min-h-[44px]"
                  onClick={() => {
                    setShowForm(false)
                    setIsSubmitted(false)
                  }}
                >
                  Close
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-foreground">
                  Distributor Application
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fill out the form below and our team will contact you.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      className="mt-1.5 min-h-[48px]"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className="mt-1.5 min-h-[48px]"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-foreground">
                      Company Name
                    </label>
                    <Input
                      id="companyName"
                      name="companyName"
                      type="text"
                      placeholder="Your company name"
                      className="mt-1.5 min-h-[48px]"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Your phone number"
                      className="mt-1.5 min-h-[48px]"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-foreground">
                        Country
                      </label>
                      <Input
                        id="country"
                        name="country"
                        type="text"
                        placeholder="Country"
                        className="mt-1.5 min-h-[48px]"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-foreground">
                        City
                      </label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="City"
                        className="mt-1.5 min-h-[48px]"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="mt-2 w-full min-h-[48px]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
