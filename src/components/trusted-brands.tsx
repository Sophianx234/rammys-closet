"use client"

export default function TrustedBrands() {
  const brands = [
    { name: "MAC", logo: "/mac-cosmetics-logo.jpg" },
    { name: "Urban Decay", logo: "/urban-decay-logo.jpg" },
    { name: "Fenty Beauty", logo: "/fenty-beauty-logo.jpg" },
    { name: "Charlotte Tilbury", logo: "/charlotte-tilbury-logo.jpg" },
    { name: "Too Faced", logo: "/placeholder.svg?height=60&width=120" },
    { name: "NARS", logo: "/placeholder.svg?height=60&width=120" },
  ]

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Trusted Brands</h2>
          <p className="text-lg text-muted-foreground">We partner with the world's leading beauty brands</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-card rounded-lg border border-border hover:border-accent/50 transition-colors group"
            >
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                className="w-full h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
