import { Wrench, Layers, Shield, Award } from "lucide-react"

const products = [
  {
    icon: Wrench,
    title: "Furniture Hardware",
    items: ["Cabinet Hinges", "Drawer Systems", "Push Opener"],
  },
  {
    icon: Layers,
    title: "PVC Edge Banding",
    items: ["Various Colors", "Multiple Finishes", "Professional Grade"],
  },
  {
    icon: Shield,
    title: "Verified Authenticity",
    description: "Every product comes with a unique NA Code and Serial Number.",
  },
  {
    icon: Award,
    title: "Industry Leading Quality",
    description: "Trusted by professionals and contractors for durability and precision engineering.",
  },
]

export function Products() {
  return (
    <section className="border-t border-border bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Our Products
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Quality solutions for every furniture project
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.title}
              className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <product.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {product.title}
              </h3>
              {product.items ? (
                <ul className="mt-2 space-y-1">
                  {product.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
