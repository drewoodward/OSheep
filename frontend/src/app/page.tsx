'use client'

import { useState, useEffect } from 'react'
import ConnectionSetup from '@/components/ConnectionSetup'
import ChatInterface from '@/components/ChatInterface'

export default function Home() {
  const [ollamaUrl, setOllamaUrl] = useState<string>('')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Load saved URL from localStorage
    const savedUrl = localStorage.getItem('ollamaUrl')
    if (savedUrl) {
      setOllamaUrl(savedUrl)
      setIsConnected(true)
    }
  }, [])

  const handleConnect = (url: string) => {
    setOllamaUrl(url)
    setIsConnected(true)
    localStorage.setItem('ollamaUrl', url)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setOllamaUrl('')
    localStorage.removeItem('ollamaUrl')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {!isConnected ? (
        <ConnectionSetup onConnect={handleConnect} />
      ) : (
        <ChatInterface ollamaUrl={ollamaUrl} onDisconnect={handleDisconnect} />
      )}
    </main>
  )
}
