import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { vehicles } from "@/lib/data";
import { FadeUp, ScaleIn } from "@/components/Motion";

export default function FleetSection() {
  return (
    <section className="py-32 bg-surface" id="fleet">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em]">
              Our Fleet
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              All-Electric. All Premium.
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Choose from our curated selection of premium electric vehicles.
              Each car is impeccably maintained and ready for your journey.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, i) => (
            <ScaleIn key={vehicle.id} delay={i * 0.1}>
              <div className="group bg-white rounded-xl border border-border overflow-hidden hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500">
                <Link href={`/fleet/${vehicle.id}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={vehicle.image}
                      alt={`${vehicle.year} ${vehicle.name}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-accent text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Electric
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-navy text-xs font-semibold px-2.5 py-1 rounded-md">
                      {vehicle.year}
                    </div>
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <Link href={`/fleet/${vehicle.id}`} className="hover:text-accent transition-colors">
                      <h3 className="text-lg font-bold text-navy tracking-tight">
                        {vehicle.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 text-sm">
                      <Star
                        size={13}
                        className="text-accent fill-accent"
                      />
                      <span className="font-semibold text-navy">
                        {vehicle.rating}
                      </span>
                      <span className="text-muted text-xs">
                        ({vehicle.reviews})
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-muted mb-4 tracking-wide">
                    {vehicle.type} &middot; {vehicle.range} range &middot;{" "}
                    {vehicle.seats} seats
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {vehicle.features.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="text-[10px] bg-accent-subtle text-accent font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-2xl font-bold text-navy tracking-tight">
                        ${vehicle.pricePerDay}
                      </span>
                      <span className="text-xs text-muted">/day</span>
                    </div>
                    <Link
                      href={`/booking?car=${vehicle.id}`}
                      className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-black text-xs font-bold px-5 py-2.5 rounded-md transition-all hover:shadow-lg hover:shadow-accent/20 uppercase tracking-wider"
                    >
                      Book
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </ScaleIn>
          ))}
        </div>

        <FadeUp delay={0.3}>
          <div className="text-center mt-12">
            <Link
              href="/fleet"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-semibold text-sm transition-colors tracking-wide"
            >
              View Full Fleet
              <ArrowRight size={15} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
