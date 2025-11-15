'use client'
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
import { useEffect } from "react"
import { IUser } from "@/models/User"
import { useDashStore } from "@/lib/store"

export default function HomePage() {
  const {setUser} = useDashStore()
     useEffect(()=>{
    const getMe = async()=>{
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      if(res.ok ){
        setUser(data.user as IUser)
        console.log('user', data.user)
        
        
  }
}
    getMe()
  },[]) 
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
