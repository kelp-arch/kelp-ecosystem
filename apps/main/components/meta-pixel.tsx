'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function MetaPixelContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView')
    }
  }, [pathname, searchParams])

  return null
}

export function MetaPixel() {
  return (
    <Suspense fallback={null}>
      <MetaPixelContent />
    </Suspense>
  )
}

declare global {
  interface Window {
    fbq: any
    _fbq: any
  }
}