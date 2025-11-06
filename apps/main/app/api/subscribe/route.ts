import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const response = await fetch(
      'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
          revision: '2024-10-15',
        },
        body: JSON.stringify({
          data: {
            type: 'profile-subscription-bulk-create-job',
            attributes: {
              list_id: process.env.KLAVIYO_LIST_ID,
              subscriptions: [
                {
                  email: email,
                  channels: {
                    email: ['MARKETING'],
                  },
                },
              ],
            },
          },
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Klaviyo API error')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Klaviyo subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}