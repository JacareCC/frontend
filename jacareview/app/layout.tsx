export const metadata = {
  title: 'Jacareview',
  description: 'Search, review and get rewards!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
