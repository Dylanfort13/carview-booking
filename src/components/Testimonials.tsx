"use client";

import { Star } from "lucide-react";
import { useCms } from "@/lib/CmsProvider";
import { FadeUp } from "@/components/Motion";

export default function Testimonials() {
  const { testimonials } = useCms()
  return (
    <section className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em]">
              Testimonials
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              What Our Renters Say
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} className="text-accent fill-accent" />
                ))}
              </div>
              <span className="text-muted text-sm">5.0 from 360+ reviews</span>
            </div>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <FadeUp key={testimonial.name} delay={i * 0.08}>
              <div className="bg-white rounded-xl border border-border p-7 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300">
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={12} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-sm text-navy/70 leading-relaxed mb-5">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-accent">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-navy">
                    {testimonial.name}
                  </span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
