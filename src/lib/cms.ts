const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || '5'

export type CmsSiteData = {
  content: any
  customData: any
  seo: any
  tenant: { companyName: string; niche: string }
  status: string
}

let cached: CmsSiteData | null = null

export async function getSiteData(): Promise<CmsSiteData | null> {
  if (cached) return cached
  try {
    const res = await fetch(`/api/cms?tenant=${TENANT_ID}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    cached = await res.json()
    return cached
  } catch {
    return null
  }
}
