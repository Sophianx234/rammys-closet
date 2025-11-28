

import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { barlow } from "@/app/(homepage)/layout";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-background">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0">
        <img
          src="/imgs/c-4.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid md:grid-cols-2 items-center gap-10">

          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-6"
          >
            <p className="text-primary font-semibold tracking-wide uppercase">
              Shop Now & Save Up To 25% OFF
            </p>

            <h1 className={`text-5xl md:text-6xl  lg:text-7xl  font-bold leading-[.9]`}>
            Beauty <br /> Beyond Boundaries
          </h1>

            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full text-base shadow-lg">
                Shop Now
              </Button>
            </Link>
          </motion.div>

          

        </div>
      </div>
    </section>
  );
}
