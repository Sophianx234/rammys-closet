"use client";

import { motion } from "framer-motion";
import { FaSeedling, FaFeatherAlt, FaHandHoldingHeart } from "react-icons/fa";

export default function Sustainability() {
  return (
    <section className="bg-[#faf9f7] text-zinc-900 py-28 relative overflow-hidden">
      {/* Soft background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-100/20 via-transparent to-pink-50/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
            Sustainable Luxury
          </p>

          <h2 className="text-6xl md:text-7xl font-serif leading-[1.1] font-bold">
            Designed for Earth.  
            <span className="block text-gray-500 italic">Made for You.</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg">
            Every drop, every ingredient, every touch — crafted in harmony with
            the planet. Our commitment to sustainability is more than a promise;
            it’s our foundation.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 pt-6">
            <div className="flex items-start gap-3">
              <FaSeedling className="text-3xl text-green-700" />
              <div>
                <h4 className="font-semibold text-lg">Plant-Based</h4>
                <p className="text-gray-600 text-sm">
                  Ethically sourced natural botanicals.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaFeatherAlt className="text-3xl text-amber-700" />
              <div>
                <h4 className="font-semibold text-lg">Light & Gentle</h4>
                <p className="text-gray-600 text-sm">
                  Designed for every skin type and tone.
                </p>
              </div>
            </div>
          </div>

          <button className="mt-10 bg-black text-white px-10 py-4 rounded-full text-lg hover:bg-zinc-800 transition">
            Explore Our Ethos
          </button>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <img
            src="/imgs/f-3.jpg"
            alt="Sustainability Beauty Concept"
            className="w-full h-[600px] object-cover rounded-3xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
