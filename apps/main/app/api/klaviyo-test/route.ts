import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasApiKey: !!process.env.KLAVIYO_PRIVATE_API_KEY,
    hasListId: !!process.env.KLAVIYO_LIST_ID,
    apiKeyLength: process.env.KLAVIYO_PRIVATE_API_KEY?.length || 0,
    listIdValue: process.env.KLAVIYO_LIST_ID,
  })
}