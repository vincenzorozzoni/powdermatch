import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PowderMatch - Trova il Tuo Sci Perfetto con l\'Intelligenza Artificiale',
  description: 'L\'intelligenza artificiale che analizza il tuo profilo per consigliarti gli sci ideali tra migliaia di modelli',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
