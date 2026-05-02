"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { vehicles } from "@/lib/data";
import { Star, ArrowLeft, ArrowRight, Zap, Users, Gauge, CheckCircle } from "lucide-react";
import { FadeUp } from "@/components/Motion";

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <main>
        <Navbar />
        <section className="pt-40 pb-32 bg-white min-h-screen">
          <div className="max-w-lg mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-navy mb-4">Vehicle Not Found</h1>
            <Link href="/fleet" className="text-accent hover:text-accent-hover font-semibold text-sm">
              &larr; Back to Fleet
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const specs = [
    { icon: Zap, label: "Range", value: vehicle.range },
    { icon: Users, label: "Seats", value: `${vehicle.seats}` },
    { icon: Gauge, label: "Type", value: vehicle.type },
  ];

  return (
    <main>
      <Navbar />
      <section className="pt-28 pb-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-accent text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Fleet
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {vehicle.year} {vehicle.name}
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={13} className="text-accent fill-accent" />
              ))}
            </div>
            <span className="text-white/50 text-sm">
              {vehicle.rating} ({vehicle.reviews} reviews)
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <FadeUp>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={`${vehicle.year} ${vehicle.name}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-navy mb-4 tracking-tight">About This Vehicle</h2>
                  <p className="text-muted leading-relaxed">{vehicle.description}</p>
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-navy mb-4 tracking-tight">Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {vehicle.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <CheckCircle size={16} className="text-accent flex-shrink-0" />
                        <span className="text-sm text-navy">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>

            <div className="lg:col-span-2">
              <FadeUp delay={0.1}>
                <div className="bg-surface rounded-2xl border border-border p-7 sticky top-24">
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold text-navy tracking-tight">${vehicle.pricePerDay}</span>
                    <span className="text-sm text-muted">/day</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {specs.map((s) => (
                      <div key={s.label} className="text-center p-3 bg-white rounded-xl border border-border">
                        <s.icon size={20} className="text-accent mx-auto mb-2" />
                        <p className="text-xs text-muted uppercase tracking-wider">{s.label}</p>
                        <p className="text-sm font-bold text-navy mt-0.5">{s.value}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/booking?car=${vehicle.id}`}
                    className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-black font-bold py-3.5 rounded-md transition-all hover:shadow-lg hover:shadow-accent/20 text-sm tracking-wide"
                  >
                    Book This Vehicle
                    <ArrowRight size={15} />
                  </Link>

                  <div className="mt-6 pt-6 border-t border-border space-y-2 text-xs text-muted">
                    <p>&middot; 300 km included per day</p>
                    <p>&middot; $0.30/km after 300 km/day</p>
                    <p>&middot; $500 refundable deposit</p>
                    <p>&middot; Minimum age 25</p>
                    <p>&middot; Return with 40%+ battery</p>
                    <p>&middot; KM rebates available</p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
