"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { vehicles } from "@/lib/data";
import {
  Calendar,
  Star,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Zap,
  Clock,
  Shield,
  MapPin,
  User,
  Car,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Step = 1 | 2 | 3;

const stepMeta = [
  { num: 1, label: "Dates", icon: Calendar },
  { num: 2, label: "Vehicle", icon: Car },
  { num: 3, label: "Details", icon: User },
] as const;

function BookingContent() {
  const searchParams = useSearchParams();
  const preselectedCar = searchParams.get("car") || "";
  const preselectedPickup = searchParams.get("pickup") || "";
  const preselectedReturn = searchParams.get("return") || "";

  const [step, setStep] = useState<Step>(preselectedCar ? 2 : 1);
  const [selectedCar, setSelectedCar] = useState(preselectedCar);
  const [pickupDate, setPickupDate] = useState(preselectedPickup);
  const [returnDate, setReturnDate] = useState(preselectedReturn);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    pickupLocation: "east-vancouver",
  });
  const [confirmed, setConfirmed] = useState(false);

  const days = useMemo(() => {
    if (!pickupDate || !returnDate) return 0;
    const diff =
      (new Date(returnDate).getTime() - new Date(pickupDate).getTime()) /
      (1000 * 60 * 60 * 24);
    return Math.max(diff, 1);
  }, [pickupDate, returnDate]);

  const selectedVehicle = vehicles.find((v) => v.id === selectedCar);
  const totalPrice = selectedVehicle ? selectedVehicle.pricePerDay * days : 0;

  const canProceedStep1 = pickupDate && returnDate && days > 0;
  const canProceedStep2 = selectedCar;
  const canProceedStep3 =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone;

  const inputClass =
    "w-full border border-border rounded-xl px-4 py-3.5 text-sm text-navy focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all bg-white";
  const btnPrimary =
    "inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:bg-slate-200 disabled:cursor-not-allowed text-black disabled:text-slate-400 font-bold px-7 py-3.5 rounded-xl transition-all text-sm tracking-wide hover:shadow-lg hover:shadow-accent/20";
  const btnBack =
    "inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-navy transition-colors px-4 py-3.5";

  if (confirmed) {
    return (
      <main>
        <Navbar />
        <section className="pt-40 pb-32 bg-white min-h-screen">
          <div className="max-w-lg mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={36} className="text-accent" />
              </div>
            </motion.div>

            <h1 className="text-3xl font-bold text-navy mb-3 tracking-tight">
              Booking Confirmed!
            </h1>
            <p className="text-muted mb-10 leading-relaxed">
              Your {selectedVehicle?.year} {selectedVehicle?.name} is reserved
              from {pickupDate} to {returnDate}. We&apos;ll send a confirmation
              email shortly.
            </p>

            <div className="bg-surface rounded-2xl border border-border p-7 mb-10 text-left">
              <h3 className="font-bold text-navy mb-5 text-sm tracking-wide uppercase">
                Booking Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Vehicle</span>
                  <span className="text-navy font-semibold">
                    {selectedVehicle?.year} {selectedVehicle?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Pickup</span>
                  <span className="text-navy font-semibold">{pickupDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Return</span>
                  <span className="text-navy font-semibold">{returnDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Duration</span>
                  <span className="text-navy font-semibold">{days} days</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-border mt-4">
                  <span className="font-bold text-navy">Total</span>
                  <span className="font-bold text-accent text-xl">${totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-muted mb-10">
              <div className="flex items-start gap-3 bg-surface rounded-xl p-4 border border-border">
                <Clock size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span>A Transporter will hand you the key on arrival</span>
              </div>
              <div className="flex items-start gap-3 bg-surface rounded-xl p-4 border border-border">
                <Shield size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span>$500 deposit required at pickup</span>
              </div>
              <div className="flex items-start gap-3 bg-surface rounded-xl p-4 border border-border">
                <Zap size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span>Return with at least 40% battery</span>
              </div>
            </div>

            <Link
              href="/"
              className={btnPrimary}
            >
              Back to Home
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <section className="pt-28 pb-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Book Your EV
          </h1>
          <p className="mt-3 text-white/40 text-lg">
            Select your dates, choose your car, and hit the road.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-0 mb-14">
            {stepMeta.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <button
                  onClick={() => {
                    if (s.num === 1) setStep(1);
                    if (s.num === 2 && canProceedStep1) setStep(2);
                    if (s.num === 3 && canProceedStep2) setStep(3);
                  }}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${
                    step === s.num
                      ? "bg-accent/10 border border-accent/30"
                      : step > s.num
                      ? "bg-surface border border-border cursor-pointer hover:border-accent/20"
                      : "opacity-40 cursor-default"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      step >= s.num
                        ? "bg-accent text-black"
                        : "bg-surface text-muted"
                    }`}
                  >
                    <s.icon size={18} />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Step {s.num}</p>
                    <p className={`text-sm font-semibold ${step >= s.num ? "text-navy" : "text-muted"}`}>
                      {s.label}
                    </p>
                  </div>
                </button>
                {i < 2 && (
                  <div
                    className={`w-8 sm:w-14 h-px mx-2 transition-colors ${
                      step > s.num ? "bg-accent" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1 — Dates */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-2xl font-bold text-navy mb-2 tracking-tight">
                    When do you need a car?
                  </h2>
                  <p className="text-muted mb-10">
                    Pick your dates and we&apos;ll show you what&apos;s available.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="pickup-date" className="block text-xs font-bold text-navy mb-2.5 uppercase tracking-[0.15em]">
                        Pickup Date
                      </label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50" />
                        <input
                          id="pickup-date"
                          type="date"
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className={inputClass + " pl-11"}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="return-date" className="block text-xs font-bold text-navy mb-2.5 uppercase tracking-[0.15em]">
                        Return Date
                      </label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50" />
                        <input
                          id="return-date"
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          min={pickupDate || new Date().toISOString().split("T")[0]}
                          className={inputClass + " pl-11"}
                        />
                      </div>
                    </div>
                  </div>

                  {days > 0 && (
                    <div className="mt-6 bg-accent-subtle border border-accent/20 rounded-xl px-5 py-4 flex items-center gap-3">
                      <Calendar size={18} className="text-accent flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-navy">{days} days</p>
                        <p className="text-xs text-muted">Your rental duration</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-10 flex items-center justify-between">
                    <Link href="/" className={btnBack}>
                      <ArrowLeft size={14} />
                      Home
                    </Link>
                    <button
                      onClick={() => canProceedStep1 && setStep(2)}
                      disabled={!canProceedStep1}
                      className={btnPrimary}
                    >
                      Choose Vehicle
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Vehicle */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold text-navy mb-2 tracking-tight">
                    Choose your ride
                  </h2>
                  <p className="text-muted mb-10">
                    All vehicles are 100% electric and impeccably maintained.
                  </p>

                  <div className="space-y-4">
                    {vehicles.map((vehicle) => {
                      const isSelected = selectedCar === vehicle.id;
                      return (
                        <button
                          key={vehicle.id}
                          onClick={() => setSelectedCar(vehicle.id)}
                          className={`w-full text-left rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                            isSelected
                              ? "border-accent shadow-xl shadow-accent/10"
                              : "border-border hover:border-accent/30"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row">
                            <div className="relative w-full sm:w-64 aspect-[16/10] sm:aspect-auto flex-shrink-0">
                              <Image
                                src={vehicle.image}
                                alt={`${vehicle.year} ${vehicle.name}`}
                                fill
                                className="object-cover"
                              />
                              {isSelected && (
                                <div className="absolute top-3 right-3 bg-accent text-black rounded-lg p-1.5">
                                  <CheckCircle size={16} />
                                </div>
                              )}
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-center">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="text-lg font-bold text-navy tracking-tight">
                                  {vehicle.year} {vehicle.name}
                                </h3>
                                <div className="flex items-center gap-1 text-sm">
                                  <Star size={13} className="text-accent fill-accent" />
                                  <span className="font-semibold text-navy">{vehicle.rating}</span>
                                  <span className="text-muted text-xs">({vehicle.reviews})</span>
                                </div>
                              </div>
                              <p className="text-xs text-muted mb-3 tracking-wide">
                                {vehicle.type} &middot; {vehicle.range} range &middot; {vehicle.seats} seats
                              </p>
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {vehicle.features.slice(0, 3).map((f) => (
                                  <span key={f} className="text-[10px] bg-accent-subtle text-accent font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider">
                                    {f}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center justify-between pt-4 border-t border-border">
                                <div>
                                  <span className="text-2xl font-bold text-navy tracking-tight">${vehicle.pricePerDay}</span>
                                  <span className="text-xs text-muted">/day</span>
                                  {days > 0 && (
                                    <span className="text-xs text-muted ml-2">
                                      &middot; ${vehicle.pricePerDay * days} total
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-10 flex items-center justify-between">
                    <button onClick={() => setStep(1)} className={btnBack}>
                      <ArrowLeft size={14} />
                      Dates
                    </button>
                    <button
                      onClick={() => canProceedStep2 && setStep(3)}
                      disabled={!canProceedStep2}
                      className={btnPrimary}
                    >
                      Your Details
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Details */}
            {step === 3 && selectedVehicle && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                  <div className="lg:col-span-3">
                    <h2 className="text-2xl font-bold text-navy mb-2 tracking-tight">
                      Your details
                    </h2>
                    <p className="text-muted mb-10">
                      We need a few things to prepare your vehicle.
                    </p>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="firstName" className="block text-xs font-bold text-navy mb-2.5 uppercase tracking-[0.15em]">First Name</label>
                          <input id="firstName" type="text" required value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className={inputClass} placeholder="John" />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-xs font-bold text-navy mb-2.5 uppercase tracking-[0.15em]">Last Name</label>
                          <input id="lastName" type="text" required value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className={inputClass} placeholder="Smith" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-navy mb-2.5 uppercase tracking-[0.15em]">Email</label>
                        <input id="email" type="email" required value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClass} placeholder="john@example.com" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold text-navy mb-2.5 uppercase tracking-[0.15em]">Phone Number</label>
                        <input id="phone" type="tel" required value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={inputClass} placeholder="604-555-1234" />
                      </div>
                      <div>
                        <label htmlFor="license" className="block text-xs font-bold text-navy mb-2.5 uppercase tracking-[0.15em]">Driver&apos;s License Number</label>
                        <input id="license" type="text" value={formData.licenseNumber}
                          onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                          className={inputClass} placeholder="Optional" />
                      </div>
                      <div>
                        <label htmlFor="pickupLocation" className="block text-xs font-bold text-navy mb-2.5 uppercase tracking-[0.15em]">Pickup Location</label>
                        <select id="pickupLocation" value={formData.pickupLocation}
                          onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                          className={inputClass + " bg-white"}>
                          <option value="east-vancouver">East Vancouver (Renfrew Skytrain)</option>
                          <option value="yvr-airport">YVR Airport (Domestic Arrivals)</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-10 flex items-center justify-between">
                      <button onClick={() => setStep(2)} className={btnBack}>
                        <ArrowLeft size={14} />
                        Vehicle
                      </button>
                      <button
                        onClick={() => canProceedStep3 && setConfirmed(true)}
                        disabled={!canProceedStep3}
                        className={btnPrimary}
                      >
                        Confirm Booking
                        <CheckCircle size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Summary Sidebar */}
                  <div className="lg:col-span-2">
                    <div className="bg-surface rounded-2xl border border-border p-7 sticky top-28">
                      <h3 className="font-bold text-navy mb-5 text-sm tracking-wide uppercase">
                        Booking Summary
                      </h3>
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-5">
                        <Image src={selectedVehicle.image} alt={`${selectedVehicle.year} ${selectedVehicle.name}`}
                          fill className="object-cover" />
                      </div>
                      <h4 className="font-bold text-navy">
                        {selectedVehicle.year} {selectedVehicle.name}
                      </h4>
                      <p className="text-xs text-muted mb-5">
                        {selectedVehicle.range} range &middot; {selectedVehicle.seats} seats
                      </p>
                      <div className="space-y-3 text-sm border-t border-border pt-5">
                        <div className="flex justify-between">
                          <span className="text-muted">Pickup</span>
                          <span className="text-navy font-semibold">{pickupDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Return</span>
                          <span className="text-navy font-semibold">{returnDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Duration</span>
                          <span className="text-navy font-semibold">{days} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Daily Rate</span>
                          <span className="text-navy font-semibold">${selectedVehicle.pricePerDay}/day</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Deposit</span>
                          <span className="text-navy font-semibold">$500</span>
                        </div>
                        <div className="flex justify-between pt-4 border-t border-border mt-4">
                          <span className="font-bold text-navy">Estimated Total</span>
                          <span className="font-bold text-accent text-xl">${totalPrice}</span>
                        </div>
                      </div>
                      <div className="mt-5 space-y-2">
                        <div className="flex items-start gap-2 text-[11px] text-muted">
                          <MapPin size={12} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Supercharging billed separately after rental with no markup</span>
                        </div>
                        <div className="flex items-start gap-2 text-[11px] text-muted">
                          <Zap size={12} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Additional distance over 300km/day at $0.30/km</span>
                        </div>
                        <div className="flex items-start gap-2 text-[11px] text-muted">
                          <Shield size={12} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Deposit refunded at return</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <BookingContent />
    </Suspense>
  );
}
