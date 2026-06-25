"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Zap, Star } from "lucide-react";
import { FadeUp } from "@/components/Motion";
import { useCms } from "@/lib/CmsProvider";

export default function Hero() {
  const { hero } = useCms()
  const badgeText = hero?.badge || "100% Electric Fleet"
  const headline = hero?.headline || "Drive the Future."
  const subheadline = hero?.subheadline || "Rent Electric."
  const description = hero?.description || "Premium EV rentals in Vancouver. Lightning fast pickup, impeccably clean cars, cost-efficient pricing."
  const heroBgVideo = hero?.videoUrl || "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-3-Performance-Performance-Mobile-LHD.mp4"
  const happyTrips = hero?.happyTrips || "399+ happy trips"
  const turoRating = hero?.turoRating || "5.0 Turo Rating"
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover grayscale"
        poster="/images/vancouver-night.jpg"
      >
        <source
          src={heroBgVideo}
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-accent/[0.04] rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/[0.03] rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-2xl">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 border border-accent/30 rounded-full px-5 py-2 mb-8 bg-accent/5 backdrop-blur-sm">
              <Zap size={13} className="text-accent" />
              <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">
                {badgeText}
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold text-white leading-[1.05] tracking-tight">
              {headline}
              <br />
              <span className="gold-gradient">{subheadline}</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-6 text-base sm:text-lg text-white/45 leading-relaxed max-w-lg">
              {description}
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-10 bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-xl p-6 max-w-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="pickup"
                    className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-[0.2em]"
                  >
                    Pickup
                  </label>
                  <div className="relative">
                    <Calendar
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/50"
                    />
                    <input
                      id="pickup"
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="return"
                    className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-[0.2em]"
                  >
                    Return
                  </label>
                  <div className="relative">
                    <Calendar
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/50"
                    />
                    <input
                      id="return"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
                    />
                  </div>
                </div>
              </div>
              <Link
                href={
                  pickupDate && returnDate
                    ? `/booking?pickup=${pickupDate}&return=${returnDate}`
                    : "/booking"
                }
                className="mt-4 w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-black font-bold py-3.5 rounded-lg transition-all hover:shadow-lg hover:shadow-accent/25 text-sm tracking-wide"
              >
                Search Available Cars
                <ArrowRight size={15} />
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-white/25">
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-1.5">
                  {["I", "A", "R", "B", "E"].map((l, i) => (
                    <div
                      key={l}
                      className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center text-[9px] font-bold"
                      style={{
                        backgroundColor: `rgba(201,168,76,${0.3 - i * 0.04})`,
                        color: "#c9a84c",
                      }}
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <span>{happyTrips}</span>
              </div>
              <div className="w-px h-3.5 bg-white/10" />
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={11} className="text-accent fill-accent" />
                ))}
                <span className="ml-1">{turoRating}</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
