"use client";

import { Zap, Clock, DollarSign, Shield, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import { useCms } from "@/lib/CmsProvider";
import { FadeUp } from "@/components/Motion";

const fallbackFeatures = [
  { icon: Clock, title: "Lightning Fast Pickup", description: "When you arrive, we hand you the keys immediately. No rental counters, no waiting." },
  { icon: Sparkles, title: "Impeccably Clean", description: "Rigorous cleaning and disinfecting after each rental. Every car feels like your own." },
  { icon: DollarSign, title: "Cost-Efficient", description: "We pass operational savings to you. Earn rebates when you drive less. $500 deposit." },
  { icon: Zap, title: "100% Electric", description: "No gas, no emissions. Pure, quiet, premium driving with instant torque and cutting-edge tech." },
  { icon: MapPin, title: "YVR Airport Pickup", description: "A Transporter greets you at YVR and guides you to your car. No lines, no hassle." },
  { icon: Shield, title: "All-Star Host", description: "399+ trips, 5.0 rating. Top-rated and most experienced host on Turo." },
];

const iconMap: Record<string, any> = { Zap, Clock, DollarSign, Shield, MapPin, Sparkles, BatteryCharging: Zap, Star: Shield, Plane: MapPin };

export default function Features() {
  const { features: cmsFeatures, kmRebates } = useCms()
  const features = cmsFeatures.length > 0
    ? cmsFeatures.map((f: any) => ({ ...f, icon: iconMap[f.icon] || Clock }))
    : fallbackFeatures
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em]">
              Why Choose Us
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Quick, Clean, Cost-Efficient
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              You&apos;re renting a car worth $30k&ndash;$60k. You deserve a
              $30k&ndash;$60k experience.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FadeUp key={feature.title} delay={i * 0.08}>
              <div className="group p-7 rounded-xl border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 bg-white">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <feature.icon size={20} className="text-accent" />
                </div>
                <h3 className="text-base font-bold text-navy mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3}>
          <div className="mt-20 rounded-2xl p-8 sm:p-12 relative overflow-hidden bg-black">
            <Image
              src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Interior-Desktop-LHD.png"
              alt="Tesla Model 3 Interior"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/80" />
            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                KM Rebate Program
              </h3>
              <p className="text-white/40 mb-8 text-sm leading-relaxed">
                For cost-efficiency, we rebate you if you&apos;re not driving as
                much. At the end of your rental:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { km: "200 km/day", rebate: "$4/day" },
                  { km: "150 km/day", rebate: "$8/day" },
                  { km: "100 km/day", rebate: "$12/day" },
                  { km: "50 km/day", rebate: "$16/day" },
                ].map((tier) => (
                  <div
                    key={tier.km}
                    className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 text-center backdrop-blur-sm"
                  >
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">
                      Less than
                    </p>
                    <p className="text-base font-bold text-white tracking-tight">
                      {tier.km}
                    </p>
                    <p className="text-accent font-semibold text-sm mt-1.5">
                      Rebate {tier.rebate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
