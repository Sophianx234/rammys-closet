"use client"

import { Heart } from "lucide-react"

export default function InstagramGrid() {
  const posts = [
    {
      image: "/luxury-beauty-lifestyle-makeup.jpg",
      likes: "2.3K",
    },
    {
      image: "/glamorous-cosmetics-product-shot.jpg",
      likes: "1.8K",
    },
    {
      image: "/luxury-lipstick-swatches.jpg",
      likes: "3.1K",
    },
    {
      image: "/beauty-influencer-makeup-look.jpg",
      likes: "2.7K",
    },
    {
      image: "/luxury-eyeshadow-palette-aesthetic.jpg",
      likes: "2.4K",
    },
    {
      image: "/premium-cosmetics-flatlay.jpg",
      likes: "1.9K",
    },
  ]

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Follow Our Beauty Journey</h2>
          <p className="text-lg text-muted-foreground mb-6">@rammys.closet on Instagram</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg cursor-pointer">
              <img
                src={post.image || "/placeholder.svg"}
                alt={`Instagram post ${index + 1}`}
                className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="w-5 h-5 fill-white" />
                  <span className="font-semibold">{post.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
            Follow @rammys.closet
          </button>
        </div>
      </div>
    </section>
  )
}
