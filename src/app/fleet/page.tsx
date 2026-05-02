import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FleetSection from "@/components/FleetSection";
import Link from "next/link";

export default function FleetPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-28 pb-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-accent text-sm mb-4 transition-colors"
          >
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Our Fleet
          </h1>
          <p className="mt-3 text-white/40 max-w-xl">
            All-electric premium vehicles, impeccably maintained and ready for
            your next adventure in Vancouver.
          </p>
        </div>
      </section>
      <FleetSection />
      <Footer />
    </main>
  );
}
