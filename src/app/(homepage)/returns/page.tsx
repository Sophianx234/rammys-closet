"use client";

import { motion } from "framer-motion";
import { RefreshCw, ShieldCheck, Undo2, PackageX, BadgeCheck } from "lucide-react";

export default function ReturnsPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Returns & Refunds
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            A smooth and simple return process built to give you peace of mind.
          </p>
        </motion.div>

        {/* Main Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-12 shadow-xl space-y-10 leading-relaxed text-gray-300"
        >
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Return Eligibility
            </h2>
            <p className="mb-4">
              We accept returns for items that arrive damaged, defective, incorrect,
              or if you simply change your mind within the allowed return period.
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li><span className="text-gray-300">Unused items:</span> Must be in original condition.</li>
              <li><span className="text-gray-300">Original packaging:</span> Tags and accessories must be intact.</li>
              <li><span className="text-gray-300">Non-returnable items:</span> Includes undergarments and cosmetics.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Return Window
            </h2>
            <p className="mb-4">
              You have <span className="text-gray-200 font-medium">7 days</span> from the date of delivery 
              to request a return. Requests after this period may not be accepted.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
              <Undo2 className="w-5 h-5 text-primary" />
              How to Request a Return
            </h2>

            <ol className="list-decimal list-inside space-y-2 text-gray-400">
              <li>Log into your account.</li>
              <li>Open the <span className="text-gray-300">Orders</span> section.</li>
              <li>Select the item you want to return.</li>
              <li>Submit a <span className="text-gray-300">Return Request</span>.</li>
            </ol>

            <p className="text-gray-400 mt-3">
              We may ask for photos or videos to validate the issue.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
              <PackageX className="w-5 h-5 text-primary" />
              Return Shipping
            </h2>

            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li><span className="text-gray-300">Our fault:</span> Return shipping is free.</li>
              <li><span className="text-gray-300">Changed your mind:</span> Shipping fees may apply.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-primary" />
              Refund Processing
            </h2>

            <p className="mb-4">
              Once your returned item is inspected and approved, refunds are processed within  
              <span className="text-gray-200 font-medium"> 3–7 business days</span>.
            </p>

            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Original payment method</li>
              <li>Store credit</li>
              <li>Voucher</li>
            </ul>

            <p className="text-gray-400 mt-3">
              Shipping fees are refundable only when the issue is from our side.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-primary" />
              Exchanges
            </h2>
            <p>
              You may exchange your product for a different size, color, or style depending on availability.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">Damaged or Incorrect Items</h2>
            <p>
              If your item arrives damaged or incorrect, contact us immediately with your order number and 
              proof of the issue. We will replace it or issue a refund promptly.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">Need Help?</h2>
            <p>
              Our team is here to assist you with any return or refund concerns. Reach us at{" "}
              <span className="text-primary">support@rammys.com</span>.
            </p>
          </section>
        </motion.div>
      </div>
    </section>
  );
}
