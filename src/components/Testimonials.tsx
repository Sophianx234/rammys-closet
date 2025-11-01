"use client";

import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sophia Laurent",
    role: "Makeup Artist",
    quote:
      "Rammys Closet completely transformed my kit. The textures, colors, and packaging are pure luxury — my clients instantly feel special.",
    rating: 5,
    avatar: "/imgs/professional-woman-avatar-2.jpg",
  },
  {
    id: 2,
    name: "Ava Kim",
    role: "Beauty Enthusiast",
    quote:
      "I've never felt more confident! Their lip collection is stunning and lasts all day. The whole brand feels so premium yet personal.",
    rating: 5,
    avatar: "/imgs/professional-man-avatar.jpg",
  },
  {
    id: 3,
    name: "Isabella Moore",
    role: "Influencer & Content Creator",
    quote:
      "From the moment I opened the package, I knew Rammys Closet was different — elegance, quality, and care in every detail.",
    rating: 5,
    avatar: "/imgs/professional-woman-avatar.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-zinc-950 via-black to-zinc-900 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            What Our Clients Love
          </h2>
          <p className="text-gray-400 text-lg mb-16">
            Real experiences from real beauty lovers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-primary/40 transition-all duration-500 group"
            >
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-primary w-4 h-4" />
                ))}
              </div>

              <FaQuoteLeft className="text-primary/60 w-8 h-8 mx-auto mb-6 group-hover:text-primary transition-colors" />

              <p className="text-gray-200 text-base leading-relaxed mb-8 italic">
                “{testimonial.quote}”
              </p>

              <div className="flex items-center justify-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border border-white/20"
                />
                <div className="text-left">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
