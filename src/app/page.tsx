import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FleetSection from "@/components/FleetSection";
import Features from "@/components/Features";
import LocationSection from "@/components/LocationSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <FleetSection />
      <Features />
      <LocationSection />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Newsletter />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
