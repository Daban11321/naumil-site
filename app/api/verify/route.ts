import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { serialNumber, naCode } = await req.json()

  if (!serialNumber || !naCode) {
    return NextResponse.json({ authentic: false })
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY

  const serial = encodeURIComponent(serialNumber.trim())
  const code = encodeURIComponent(naCode.trim())
  const url = supabaseUrl + '/rest/v1/products?Serial_Number=eq.' + serial + '&NA_Code=eq.' + code + '&select=Serial_Number'

  const response = await fetch(url, {
    headers: {
      apikey: supabaseKey as string,
      Authorization: 'Bearer ' + supabaseKey,
    },
  })

  const data = await response.json()
  const authentic = Array.isArray(data) && data.length > 0

  return NextResponse.json({ authentic })
}
