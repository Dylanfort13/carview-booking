import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import { Zap, Users, MapPin, Award } from "lucide-react";
import { FadeUp } from "@/components/Motion";

const stats = [
  { icon: Zap, label: "Electric Fleet", value: "100%" },
  { icon: Users, label: "Happy Renters", value: "399+" },
  { icon: MapPin, label: "Location", value: "East Vancouver" },
  { icon: Award, label: "Turo Rating", value: "5.0" },
];

const values = [
  "A calmer, more immersive rental experience",
  "A reason to explore your city differently",
  "A leisure activity that fits solo drives or time with friends and family",
  "Easy access to podcasts, audiobooks, and music for longer drives",
  "A driving experience designed to feel intentional, not rushed",
];

export default function AboutPage() {
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
            About Carview
          </h1>
          <p className="mt-3 text-white/40 max-w-2xl leading-relaxed">
            Carview is transforming how people view driving. Historically,
            people have hated it, but now the very act of driving is deeply
            immersive and soul-fulfilling.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-2xl font-bold text-navy mb-4 tracking-tight">Our Mission</h2>
            <p className="text-muted leading-relaxed mb-10">
              Our mission is to fulfill and nourish people&apos;s souls. The
              main way: by creating transportation experiences that are deeply
              immersive. The founders have spent tens of thousands of hours on
              leisure drives, exploring cities and landscapes. Even if you only
              rent with us once, we hope to leave a good impression on you about
              driving!
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-surface rounded-xl p-6 text-center border border-border">
                  <stat.icon size={22} className="text-accent mx-auto mb-3" />
                  <p className="text-2xl font-bold text-navy tracking-tight">{stat.value}</p>
                  <p className="text-xs text-muted mt-1 tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <h2 className="text-2xl font-bold text-navy mb-4 tracking-tight">Our Story</h2>
            <p className="text-muted leading-relaxed mb-4">
              Welcome to Carview: East Vancouver! After serving 400 renters
              across 2 years, we&apos;ve learned what makes driving feel
              genuinely enjoyable:
            </p>
            <ul className="space-y-2.5 mb-10">
              {values.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2 className="text-2xl font-bold text-navy mb-4 tracking-tight">The Carview Experience</h2>
            <p className="text-muted leading-relaxed mb-4">
              Over here, renting a car is a great experience! It&apos;s like
              going to the cinema! Where there&apos;s beauty everywhere, from
              the mountains to the towering forests to the vibrant cityscapes.
              Step into a new world when you rent with us!
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Carview was inspired from over 50,000 hours of leisure drives in
              cities! Rent an EV in some of the most beautiful cityscapes in the
              world. From glistening signs at neon Chinatown to rivaling
              Waterfront port views, discover why so many people choose to call
              this culturally rich city their home.
            </p>
            <p className="text-muted leading-relaxed">
              Carview started in East Vancouver, circa 2023. Instagram @CarviewExperiences
            </p>
          </FadeUp>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
