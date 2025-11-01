import Header from "@/components/header"
import Hero from "@/components/hero"
import CategoriesShowcase from "@/components/CategoriesShowcase"
import FeaturedProducts from "@/components/featured-products"
import BrandShowcase from "@/components/BrandShowcase"
import Testimonials from "@/components/Testimonials"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import Bestsellers from "@/components/ui/BestSellers"
import CampaignVideo from "@/components/ui/CampaignVideo"
import Sustainability from "@/components/ui/Sustainability"

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <CategoriesShowcase />
      <FeaturedProducts />
      <Bestsellers />
      {/* <AboutSectios /> */}
      <CampaignVideo />
      <BrandShowcase />
      <Testimonials />
      {/* <BeautyBlog /> */}
      <Sustainability />
      {/* <SocialFeed /> */}
      <Newsletter />
      <Footer />
    </main>
  )
}
