"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Sustainability() {
  return (
    <section className="relative bg-gradient-to-br from-zinc-50 via-white to-zinc-100 text-black overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2">
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="/imgs/f-1.jpg"
            alt="Sustainable beauty concept"
            className="w-full h-full object-cover brightness-[0.95]"
          />
          {/* Soft overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
        </motion.div>

        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col justify-center p-12 lg:p-20 space-y-6 relative"
        >
          <p className="text-gray-500 uppercase tracking-[0.25em] text-xs">
            Conscious Beauty
          </p>

          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
            Our Path to Pure Sustainability
          </h2>

          <div className="w-16 h-[2px] bg-primary my-4" />

          <p className="text-lg text-gray-700 leading-relaxed">
            Every Wunkat creation begins with a simple promise — to nurture your
            beauty while honoring the earth that inspires it. From ethically
            sourced botanicals to refillable glass jars, we’re redefining luxury
            through sustainability.
          </p>

          <p className="text-gray-500 text-sm pt-2">
            Designed for modern elegance. Crafted with conscious intention.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 w-fit mt-6 bg-black text-white px-6 py-3 rounded-full hover:bg-primary hover:text-black transition-colors duration-300"
          >
            Learn More
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Soft background glow */}
      <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] bg-primary/20 blur-3xl rounded-full opacity-40" />
    </section>
  );
}
