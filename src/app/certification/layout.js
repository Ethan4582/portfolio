export const metadata = {
  title: 'My Certification',
  icons: {
    icon: '/logo2.png', // This sets the favicon for this route
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
