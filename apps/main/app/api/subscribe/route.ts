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

    // First, create or get the profile
    const profileResponse = await fetch(
      'https://a.klaviyo.com/api/profiles/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
          revision: '2024-10-15',
        },
        body: JSON.stringify({
          data: {
            type: 'profile',
            attributes: {
              email: email,
            },
          },
        }),
      }
    )

    const profileData = await profileResponse.json()
    
    if (!profileResponse.ok && profileResponse.status !== 409) {
      console.error('Profile creation error:', JSON.stringify(profileData, null, 2))
      throw new Error(`Profile API error: ${profileResponse.status}`)
    }

    // Get profile ID (either from creation or existing profile)
    const profileId = profileData.data?.id || profileData.errors?.[0]?.meta?.duplicate_profile_id

    // Subscribe to list
    const subscribeResponse = await fetch(
      `https://a.klaviyo.com/api/lists/${process.env.KLAVIYO_LIST_ID}/relationships/profiles/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
          revision: '2024-10-15',
        },
        body: JSON.stringify({
          data: [
            {
              type: 'profile',
              id: profileId,
            },
          ],
        }),
      }
    )

    if (!subscribeResponse.ok) {
      const subscribeData = await subscribeResponse.json()
      console.error('Subscribe error:', JSON.stringify(subscribeData, null, 2))
      throw new Error(`Subscribe API error: ${subscribeResponse.status}`)
    }

    console.log('Klaviyo success!')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Klaviyo subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}