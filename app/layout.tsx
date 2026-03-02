import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ELAGO — Premium Real Estate Discovery',
  description: 'Discover premium properties with our map-first real estate platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden bg-elago-dark font-body">
        {children}
      </body>
    </html>
  )
}
