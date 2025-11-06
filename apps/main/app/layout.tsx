import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { MetaPixel } from '@/components/meta-pixel'

export const metadata: Metadata = {
  title: {
    template: '%s - Kelp Institute',
    default: 'Kelp Institute - Evidence-Based Recovery Framework',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1609602343355196');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1609602343355196&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body>
        <MetaPixel />
        {children}
      </body>
    </html>
  )
}
