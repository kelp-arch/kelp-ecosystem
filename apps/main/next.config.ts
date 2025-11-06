import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    KLAVIYO_PRIVATE_API_KEY: process.env.KLAVIYO_PRIVATE_API_KEY,
    KLAVIYO_LIST_ID: process.env.KLAVIYO_LIST_ID,
  },
}

export default nextConfig
