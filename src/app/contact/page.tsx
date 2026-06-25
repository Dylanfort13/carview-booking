"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCms } from "@/lib/CmsProvider";
import { Phone, Mail, MapPin, Globe, Send, CheckCircle } from "lucide-react";
import Link from "next/link";
import { FadeUp } from "@/components/Motion";

export default function ContactPage() {
  const { contactInfo } = useCms()
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full border border-border rounded-lg px-4 py-3 text-sm text-navy focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all bg-white";

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
            Contact Us
          </h1>
          <p className="mt-3 text-white/40 max-w-xl">
            Have questions? We&apos;re here to help. Reach out and we&apos;ll
            get back to you as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeUp>
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6 tracking-tight">
                  Get in Touch
                </h2>
                <div className="space-y-5">
                  {[
                    { icon: Phone, label: "Phone", value: contactInfo.phone, href: `tel:${contactInfo.phone}` },
                    { icon: Mail, label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
                    { icon: MapPin, label: "Location", value: contactInfo.address, href: undefined },
                    { icon: Globe, label: "Instagram", value: contactInfo.instagram, href: "https://instagram.com/carviewexperiences" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <item.icon size={17} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-navy uppercase tracking-wider">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-sm text-muted hover:text-accent transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-5 bg-surface rounded-xl border border-border">
                  <p className="text-sm text-muted">
                    <strong className="text-navy">Note:</strong> Our phone number
                    on Google may be incorrect. For any inquiries, please call us at{" "}
                    <a href={`tel:${contactInfo.phone}`} className="text-accent hover:text-accent-hover font-medium">
                      {contactInfo.phone}
                    </a>{" "}
                    or use the contact form.
                  </p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <CheckCircle size={48} className="text-ev-green mb-4" />
                  <h3 className="text-xl font-bold text-navy mb-2 tracking-tight">Message Sent!</h3>
                  <p className="text-muted text-sm">We&apos;ll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-navy mb-2 uppercase tracking-wider">Name</label>
                    <input id="name" type="text" required className={inputClass} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-navy mb-2 uppercase tracking-wider">Email</label>
                    <input id="email" type="email" required className={inputClass} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-navy mb-2 uppercase tracking-wider">Subject</label>
                    <input id="subject" type="text" required className={inputClass} placeholder="How can we help?" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-navy mb-2 uppercase tracking-wider">Message</label>
                    <textarea id="message" rows={5} required className={inputClass + " resize-none"} placeholder="Tell us more..." />
                  </div>
                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-black font-semibold py-3 rounded-md transition-all text-sm tracking-wide hover:shadow-lg hover:shadow-accent/20">
                    <Send size={15} />
                    Send Message
                  </button>
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
