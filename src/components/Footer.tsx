"use client";

import Link from "next/link";
import { useCms } from "@/lib/CmsProvider";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

export default function Footer() {
  const { contactInfo } = useCms()
  return (
    <footer className="bg-black text-white">
      <div className="divider-gold" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight gold-gradient">
                CARVIEW
              </span>
            </Link>
            <p className="mt-4 text-sm text-white/40 leading-relaxed">
              Premium EV rentals in Vancouver. Lightning fast pickup,
              impeccably clean cars, cost-efficient pricing.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xs uppercase tracking-[0.2em] text-accent mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/fleet", label: "Fleet" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-xs uppercase tracking-[0.2em] text-accent mb-5">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/50">
                <Phone size={13} className="mt-0.5 flex-shrink-0 text-accent/60" />
                {contactInfo.phone}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/50">
                <Mail size={13} className="mt-0.5 flex-shrink-0 text-accent/60" />
                {contactInfo.email}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/50">
                <MapPin size={13} className="mt-0.5 flex-shrink-0 text-accent/60" />
                {contactInfo.address}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/50">
                <Globe size={13} className="mt-0.5 flex-shrink-0 text-accent/60" />
                {contactInfo.instagram}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-xs uppercase tracking-[0.2em] text-accent mb-5">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-white/50 hover:text-accent transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/50 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href={contactInfo.turo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-accent transition-colors"
                >
                  Find us on Turo
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 tracking-wide">
            &copy; {new Date().getFullYear()} Carview. All rights reserved.
          </p>
          <p className="text-xs text-white/30 tracking-wide">
            EV Rentals &middot; Vancouver, BC
          </p>
        </div>
      </div>
    </footer>
  );
}
