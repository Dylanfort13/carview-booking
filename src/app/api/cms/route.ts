import { NextRequest, NextResponse } from 'next/server'

const CMS_URL = process.env.CMS_URL || 'https://fortx.site'
const TENANT_ID = process.env.TENANT_ID || '5'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const tenant = searchParams.get('tenant') || TENANT_ID
  const draft = searchParams.get('draft') === 'true'

  try {
    const res = await fetch(`${CMS_URL}/api/public/site?tenant=${tenant}&draft=${draft}`, {
      next: { revalidate: 60 },
    })
    const data = await res.json()
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch CMS data' }, { status: 502 })
  }
}
