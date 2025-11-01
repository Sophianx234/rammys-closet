import Header from "@/components/header"
import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <FeaturedProducts />
      <Newsletter />
      <Footer />
    </main>
  )
}
