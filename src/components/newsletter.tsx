"use client";

import type React from "react";

import { Button } from "./ui/button";
import { useState } from "react";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <section className="py-16 md:py-24 bg-secondary border-y border-border">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold">
            Stay Informed
          </h2>
          <p className="text-muted-foreground">
            Subscribe to our newsletter for exclusive releases and beauty tips
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="flex gap-2">
          <div className="flex-1 relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              size={18}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder-muted-foreground"
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
