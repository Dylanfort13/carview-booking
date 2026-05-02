"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";
import { FadeUp } from "@/components/Motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="text-center mb-16">
            <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em]">
              FAQ
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Common Questions
            </h2>
          </div>
        </FadeUp>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FadeUp key={index} delay={index * 0.05}>
              <div className="border border-border rounded-xl overflow-hidden hover:border-accent/20 transition-colors">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-accent-subtle transition-colors"
                >
                  <span className="text-sm font-semibold text-navy pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-accent flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5 pt-1">
                    <p className="text-sm text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
