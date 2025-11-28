"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function FAQPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Everything you need to know about orders, delivery, returns and more.
          </p>
        </motion.div>

        {/* FAQ accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-10 shadow-xl"
        >
          <Accordion type="single" collapsible className="space-y-4">

            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg">
                How long does delivery take?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Delivery within Nigeria typically takes <span className="text-primary">2–5 business days</span>.
                International shipping varies based on your region, usually between 5–12 business days.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-lg">
                Do you ship internationally?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Yes. We deliver worldwide through trusted logistic partners,
                ensuring your luxury beauty essentials arrive safely.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-lg">
                Can I return or exchange a product?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Returns are accepted within <span className="text-primary">7 days</span> if the product is unused,
                unopened and in its original packaging.  
                Exchanges apply only for defective or damaged items.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-lg">
                How can I track my order?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Once your order ships, you’ll receive a tracking link via email.
                You can also monitor status via your <span className="text-primary">Account → Orders</span>.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left text-lg">
                Which payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                We accept major debit/credit cards, bank transfers,
                and secure payment options like Paystack & Flutterwave.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left text-lg">
                Are your products authentic and safe?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Every item we sell is sourced from verified distributors and undergoes
                quality checks to ensure safety, authenticity, and premium performance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left text-lg">
                How do I contact customer support?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                You can reach us anytime at <span className="text-primary">info@rammys.com</span>  
                or via the <span className="text-primary">Contact</span> page.
                Our team responds within 24 business hours.
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
