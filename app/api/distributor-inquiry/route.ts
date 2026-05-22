import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // In production, you would send this email using a service like Resend, SendGrid, etc.
    // For now, we log the data and return success
    console.log("Distributor inquiry received:", {
      to: "marketing@naumil.com",
      subject: `New Distributor Application from ${data.name}`,
      data: {
        name: data.name,
        email: data.email,
        companyName: data.companyName,
        phone: data.phone,
        country: data.country,
        city: data.city,
      },
    })

    // TODO: Implement email sending with your preferred email service
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'noreply@naumil.com',
    //   to: 'marketing@naumil.com',
    //   subject: `New Distributor Application from ${data.name}`,
    //   html: `...`,
    // })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    )
  }
}
