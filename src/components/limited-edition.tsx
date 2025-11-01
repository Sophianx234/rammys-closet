"use client"

export default function LimitedEdition() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30">
          <div className="absolute inset-0">
            <img
              src="/limited-edition-luxury-cosmetics-collection.jpg"
              alt="Limited Edition Collection"
              className="w-full h-full object-cover opacity-30"
            />
          </div>

          <div className="relative z-10 px-6 md:px-12 py-16 md:py-24 flex flex-col items-center text-center">
            <span className="inline-block bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Exclusive Release
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">Limited Edition Collection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Be the first to experience our curated holiday collection. Luxury meets exclusivity with limited
              quantities available.
            </p>
            <button className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
              Explore Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
