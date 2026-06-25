"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getSiteData, type CmsSiteData } from "@/lib/cms";
import {
  vehicles as fallbackVehicles,
  testimonials as fallbackTestimonials,
  faqs as fallbackFaqs,
  contactInfo as fallbackContact,
} from "@/lib/data";

export type CmsContextType = {
  vehicles: typeof fallbackVehicles
  testimonials: typeof fallbackTestimonials
  faqs: typeof fallbackFaqs
  contactInfo: typeof fallbackContact
  features: any[]
  howItWorks: any[]
  location: any
  kmRebates: any[]
  aboutStats: any[]
  aboutValues: string[]
  aboutStory: string
  aboutExperience: string
  newsletter: any
  fleetPage: any
  hero: any
  loaded: boolean
}

const defaultCtx: CmsContextType = {
  vehicles: fallbackVehicles,
  testimonials: fallbackTestimonials,
  faqs: fallbackFaqs,
  contactInfo: fallbackContact,
  features: [],
  howItWorks: [],
  location: null,
  kmRebates: [],
  aboutStats: [],
  aboutValues: [],
  aboutStory: "",
  aboutExperience: "",
  newsletter: null,
  fleetPage: null,
  hero: null,
  loaded: false,
}

const CmsContext = createContext<CmsContextType>(defaultCtx)

export function CmsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CmsContextType>(defaultCtx)

  useEffect(() => {
    getSiteData().then((siteData) => {
      if (!siteData?.customData) return
      const cd = siteData.customData
      setState({
        vehicles: cd.vehicles || fallbackVehicles,
        testimonials: cd.testimonials || fallbackTestimonials,
        faqs: cd.faqs || fallbackFaqs,
        contactInfo: fallbackContact,
        features: cd.features || [],
        howItWorks: cd.howItWorks || [],
        location: cd.location || null,
        kmRebates: cd.kmRebates || [],
        aboutStats: cd.aboutStats || [],
        aboutValues: cd.aboutValues || [],
        aboutStory: cd.aboutStory || "",
        aboutExperience: cd.aboutExperience || "",
        newsletter: cd.newsletter || null,
        fleetPage: cd.fleetPage || null,
        hero: cd.hero || null,
        loaded: true,
      })
    })
  }, [])

  return <CmsContext.Provider value={state}>{children}</CmsContext.Provider>
}

export function useCms() {
  return useContext(CmsContext)
}
