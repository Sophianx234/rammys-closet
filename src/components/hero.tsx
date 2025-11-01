"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-black via-zinc-900 to-background overflow-hidden text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/imgs/c-4.jpg"
          alt="Luxury makeup background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-40 grid md:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">
            The New Era of Elegance
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
            Beauty <br /> Beyond Boundaries
          </h1>

          <p className="text-gray-300 text-lg max-w-md">
            Discover our timeless collection — crafted for confidence, radiance, and individuality. Where luxury meets authenticity.
          </p>

          <div className="flex flex-wrap gap-4 pt-6">
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full text-base shadow-lg"
              >
                Shop Collection
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black rounded-full px-8 py-6 text-base"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right image highlight */}
        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-radial from-primary/40 via-transparent to-transparent blur-3xl" />
            {/* <img
              src="/imgs/c-1.jpg"
              alt="Luxury lipstick product"
              className="relative z-10 w-[400px]  object-cover rounded-3xl shadow-2xl border border-white/10"
            /> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
