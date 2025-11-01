"use client";

import { motion } from "framer-motion";

export default function CampaignVideo() {
  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Background (you can switch to video later) */}
      {/* 
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/campaign.mp4" type="video/mp4" />
      </video> 
      */}
      <img
        src="/imgs/f-5.jpg"
        alt="Campaign Video Placeholder"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-serif font-bold mb-4"
        >
          Unveil the Glow Collection
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg text-gray-200 mb-6 max-w-lg"
        >
          Experience a new era of radiant confidence.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="bg-primary hover:bg-primary/90 text-black px-8 py-4 rounded-full font-medium shadow-lg"
        >
          Shop Now
        </motion.button>
      </div>

      {/* Optional soft glow overlay for elegance */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        transition={{ delay: 0.5, duration: 1 }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl pointer-events-none"
      />
    </section>
  );
}
