"use client";

import { Calendar, Car, Key, ThumbsUp } from "lucide-react";
import { useCms } from "@/lib/CmsProvider";
import { FadeUp } from "@/components/Motion";

const fallbackSteps = [
  { icon: Calendar, number: "01", title: "Pick Your Dates", description: "Select when you need a car. Browse availability and choose the EV that fits your trip." },
  { icon: Car, number: "02", title: "Choose Your EV", description: "Pick from our all-electric fleet — Polestar 2 or Tesla Model 3. All premium, all clean." },
  { icon: Key, number: "03", title: "Get the Key", description: "A Transporter meets you on arrival. No rental counters, no lines. Just grab the key and go." },
  { icon: ThumbsUp, number: "04", title: "Drive & Return", description: "Enjoy the ride. Return the car flexibly with at least 40% battery. Earn km rebates too." },
];

const stepIconMap: Record<string, any> = { Calendar, Car, Key, Route: ThumbsUp };

export default function HowItWorks() {
  const { howItWorks } = useCms()
  const steps = howItWorks.length > 0
    ? howItWorks.map((s: any) => ({ ...s, icon: stepIconMap[s.icon] || Calendar }))
    : fallbackSteps
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em]">
              How It Works
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Four Steps. Zero Hassle.
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <FadeUp key={step.number} delay={i * 0.1}>
              <div className="relative text-center group">
                {i < 3 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-accent/30 to-transparent" />
                )}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] mb-6 group-hover:border-accent/30 transition-colors">
                  <step.icon size={28} className="text-accent" strokeWidth={1.5} />
                </div>
                <div className="text-[10px] font-bold text-accent/50 tracking-[0.3em] uppercase mb-2">
                  Step {step.number}
                </div>
                <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-white/35 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
