import 'pollen-css/pollen.css'
import './global.css'
import type { Metadata, Viewport } from 'next'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    template: '%s :: Next.js Blog',
    default: 'Next.js Blog',
  },
  description: 'Next.js Blog',
}

export const viewport: Viewport = {
  viewportFit: 'cover',
  maximumScale: 1,
}
