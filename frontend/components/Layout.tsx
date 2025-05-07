// src/app/layout.tsx
import Link from 'next/link'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Mate Frontend',
  description: 'Palindromos app'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <Link href="/">Home</Link> | <Link href="/about">About</Link> |{' '}
            <Link href="/users">Users List</Link> |{' '}
            <a href="/api/users">Users API</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer style={{ padding: '1rem', marginTop: '2rem', borderTop: '1px solid #ccc' }}>
          <span>I'm here to stay (Footer)</span>
        </footer>
      </body>
    </html>
  )
}
