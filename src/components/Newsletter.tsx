"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { FadeUp } from "@/components/Motion";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp>
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em]">
            Stay Updated
          </span>
          <h2 className="mt-3 text-xl sm:text-2xl font-bold text-navy tracking-tight">
            Join Our Mailing List
          </h2>
          <p className="mt-2 text-muted text-sm leading-relaxed">
            Receive emails about cars, city views, and what we&apos;re up to.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          {submitted ? (
            <div className="mt-6 flex items-center justify-center gap-2 text-ev-green text-sm font-medium">
              <CheckCircle size={16} />
              You&apos;re on the list!
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="mt-6 flex gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 border border-border rounded-lg px-4 py-3 text-sm text-navy focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all bg-white"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent-hover text-black font-semibold px-5 py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-accent/20 text-sm flex-shrink-0"
              >
                <Send size={15} />
              </button>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
