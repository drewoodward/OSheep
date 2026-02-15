import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "O'Sheep - Your Personal Ollama Chat",
  description: 'Connect to your Ollama instance via Tailscale and chat with AI models',
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
