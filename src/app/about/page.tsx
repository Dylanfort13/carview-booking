"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import { Zap, Users, MapPin, Award } from "lucide-react";
import { FadeUp } from "@/components/Motion";
import { useCms } from "@/lib/CmsProvider";

const fallbackStats = [
  { label: "Electric Fleet", value: "100%" },
  { label: "Happy Renters", value: "399+" },
  { label: "East Vancouver", value: "Location" },
  { label: "Turo Rating", value: "5.0" },
];

const fallbackValues = [
  "A calmer, more immersive rental experience",
  "A reason to explore your city differently",
  "A leisure activity that fits solo drives or time with friends and family",
  "Easy access to podcasts, audiobooks, and music for longer drives",
  "A driving experience designed to feel intentional, not rushed",
];

const statIcons = [Zap, Users, MapPin, Award];

export default function AboutPage() {
  const { aboutStats, aboutValues, aboutStory, aboutExperience, loaded } = useCms()
  const stats = (loaded && aboutStats?.length ? aboutStats : fallbackStats) as { label: string; value: string }[]
  const values = (loaded && aboutValues?.length ? aboutValues : fallbackValues) as string[]
  const story = (loaded && aboutStory) || "Carview is transforming how people view driving."
  const experience = (loaded && aboutExperience) || ""
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
            {story}
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
              {stats.map((stat, i) => {
                const Icon = statIcons[i] || Zap
                return (
                  <div key={stat.label} className="bg-surface rounded-xl p-6 text-center border border-border">
                    <Icon size={22} className="text-accent mx-auto mb-3" />
                    <p className="text-2xl font-bold text-navy tracking-tight">{stat.value}</p>
                    <p className="text-xs text-muted mt-1 tracking-wide">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <h2 className="text-2xl font-bold text-navy mb-4 tracking-tight">Our Story</h2>
            <p className="text-muted leading-relaxed mb-4">
              {story}
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
              {experience || story}
            </p>
          </FadeUp>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
