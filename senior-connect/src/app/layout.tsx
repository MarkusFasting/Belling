import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Senior Connect – Koble pensjonister med arbeidsgivere',
  description: 'Senior Connect er Norges plattform for å koble erfarne seniorer (60+) med arbeidsgivere som trenger kompetent arbeidskraft.',
  openGraph: {
    title: 'Senior Connect',
    description: 'Finn erfaren arbeidskraft eller fleksibelt arbeid som pensjonist',
    locale: 'nb_NO',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nb">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
