"use client";

import { useRef, useEffect } from "react";
import { MapPin, Train, Plane } from "lucide-react";
import { useCms } from "@/lib/CmsProvider";
import { FadeUp } from "@/components/Motion";

const fallbackHighlights = [
  { icon: Train, label: "5 min from Renfrew Skytrain" },
  { icon: Plane, label: "YVR Airport pickup available" },
  { icon: MapPin, label: "East Vancouver, BC" },
];

export default function LocationSection() {
  const { location } = useCms()
  const videoRef = useRef<HTMLVideoElement>(null);
  const highlights = location?.highlights
    ? location.highlights.map((label: string, i: number) => ({
        icon: [Train, Plane, MapPin][i] || MapPin,
        label,
      }))
    : fallbackHighlights

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          <div className="relative overflow-hidden rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl min-h-[280px]">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source
                src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Model-3-Interior-Desktop-NA.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 lg:bg-gradient-to-l lg:from-transparent lg:to-black/10" />
          </div>

          <FadeUp>
            <div className="bg-black p-10 sm:p-14 flex flex-col justify-center rounded-b-2xl lg:rounded-b-none lg:rounded-r-2xl relative overflow-hidden">
              <div className="relative">
                <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em]">
                  Our Location
                </span>
                <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  East Vancouver
                </h2>
                <p className="mt-4 text-white/35 leading-relaxed text-sm">
                  Rent an EV in some of the most beautiful cityscapes in the
                  world. From glistening neon Chinatown signs to Waterfront port
                  views, discover why so many people call this culturally rich
                  city home.
                </p>

                <div className="mt-8 space-y-4">
                  {highlights.map((h: any) => (
                    <div key={h.label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <h.icon size={16} className="text-accent" />
                      </div>
                      <span className="text-sm text-white/60">{h.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <p className="text-xs text-white/25 leading-relaxed">
                    Flying into YVR? A Transporter greets you at Domestic
                    Arrivals and guides you straight to your car. No rental
                    counter, no shuttle, no waiting.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
