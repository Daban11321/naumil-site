import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { serialNumber, naCode } = await req.json()

  if (!serialNumber || !naCode) {
    return NextResponse.json({ authentic: false })
  }

  const supabaseUrl = process.env.SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY!

  const response = await fetch(
    ${supabaseUrl}/rest/v1/products?Serial_Number=eq.${encodeURIComponent(serialNumber.trim())}&NA_Code=eq.${encodeURIComponent(naCode.trim())}&select=Serial_Number,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: Bearer ${supabaseKey},
      },
    }
  )

  const data = await response.json()
  const authentic = Array.isArray(data) && data.length > 0

  return NextResponse.json({ authentic })
}
