import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Heart, Zap } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="bg-secondary border-b border-border py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-primary text-sm font-semibold uppercase tracking-widest">Our Story</p>
                <h1 className="text-4xl md:text-5xl font-serif font-bold">Rammys Closet: Where Beauty Meets Art</h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Founded on the belief that beauty should be accessible, ethically sourced, and artfully crafted. We
                curate premium cosmetics from around the world to celebrate your unique beauty.
              </p>
              <p className="text-muted-foreground">
                Each product in our collection is handpicked by our team of beauty experts who believe in quality over
                quantity, sustainability over trends.
              </p>
            </div>
            <div className="h-64 md:h-96 bg-primary/10 rounded-lg overflow-hidden flex items-center justify-center">
              <img src="/placeholder.svg?key=jj5x8" alt="About Rammys Closet" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three pillars guide everything we do at Rammys Closet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card border-border p-8 space-y-4 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Heart size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Quality First</h3>
              <p className="text-muted-foreground">
                We only work with brands that meet our rigorous standards for ingredient quality, ethical sourcing, and
                product performance.
              </p>
            </Card>

            <Card className="bg-card border-border p-8 space-y-4 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Award size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Sustainability</h3>
              <p className="text-muted-foreground">
                Environmental responsibility is at our core. We partner with eco-conscious brands and minimize our
                carbon footprint.
              </p>
            </Card>

            <Card className="bg-card border-border p-8 space-y-4 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Zap size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Customer Empowerment</h3>
              <p className="text-muted-foreground">
                We believe in transparency and education. Our team is here to help you find products that work for your
                unique needs.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate beauty experts dedicated to bringing you the best
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rammy Johnson",
                role: "Founder & Creative Director",
                image: "/placeholder.svg?key=niv2w",
              },
              {
                name: "Chioma Adeyemi",
                role: "Head of Curation",
                image: "/placeholder.svg?key=yg7ki",
              },
              {
                name: "Amara Okonkwo",
                role: "Sustainability Officer",
                image: "/placeholder.svg?key=x1j4v",
              },
            ].map((member, index) => (
              <Card key={index} className="bg-card border-border overflow-hidden">
                <div className="h-64 bg-primary/5 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center space-y-2">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary text-sm font-semibold">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Ready to Elevate Your Beauty?</h2>
          <p className="text-lg text-muted-foreground">Explore our curated collection of premium cosmetics</p>
          <Link href="/shop">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
