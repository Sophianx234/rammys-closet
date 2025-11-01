"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "./ui/button";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white">
      <div className="grid md:grid-cols-2 items-stretch max-w-7xl mx-auto">
        {/* Left Content */}
        <motion.div
          className="relative z-10 flex flex-col justify-center px-8 py-24 md:py-32 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold mb-4">
            Join the Inner Circle
          </p>

          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">
            Exclusive Beauty Awaits
          </h2>

          <p className="text-gray-300 text-lg max-w-md mx-auto md:mx-0 mb-10">
            Subscribe for curated trends, product drops, and insider beauty
            tips from industry experts — designed to inspire your elegance.
          </p>

          <motion.form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mx-auto md:mx-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative w-full">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-zinc-800/70 border border-zinc-700 rounded-full pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/80 text-white placeholder-gray-400 transition"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full text-base font-medium shadow-lg"
            >
              Subscribe
            </Button>
          </motion.form>

          <p className="text-sm text-gray-500 pt-6">
            No spam — just pure beauty inspiration.
          </p>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <img
            src="/imgs/c-6.jpg"
            alt="Luxury makeup model"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
