"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { useCms } from "@/lib/CmsProvider";
import { FadeUp } from "@/components/Motion";

export default function CTASection() {
  const { contactInfo } = useCms()
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to Drive?
          </h2>
          <p className="mt-4 text-lg text-white/40 max-w-xl mx-auto leading-relaxed">
            Book your premium EV rental today. Lightning fast pickup, clean
            cars, and competitive rates.
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-black font-semibold px-8 py-3.5 rounded-md transition-all hover:shadow-lg hover:shadow-accent/20 text-sm tracking-wide"
            >
              Book Now
              <ArrowRight size={16} />
            </Link>
            <a
              href={`tel:${contactInfo.phone}`}
              className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] text-white font-semibold px-8 py-3.5 rounded-md border border-white/10 transition-colors text-sm tracking-wide"
            >
              <Phone size={15} />
              Call Us
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center gap-2 text-white/40 hover:text-accent font-semibold px-8 py-3.5 transition-colors text-sm"
            >
              <Mail size={15} />
              Email
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
