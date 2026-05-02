"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 py-3"
        >
          <Link
            href="/booking"
            className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-black font-bold py-3.5 rounded-lg text-sm tracking-wide"
          >
            Book Now
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
