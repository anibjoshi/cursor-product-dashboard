import React from 'react'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          {children}
        </div>
      </body>
    </html>
  )
}