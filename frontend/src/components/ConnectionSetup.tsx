'use client'

import { useState } from 'react'
import { Server, CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface ConnectionSetupProps {
  onConnect: (url: string) => void
}

export default function ConnectionSetup({ onConnect }: ConnectionSetupProps) {
  const [url, setUrl] = useState('')
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const testConnection = async () => {
    if (!url.trim()) {
      setErrorMessage('Please enter a URL')
      setTestResult('error')
      return
    }

    setTesting(true)
    setTestResult(null)
    setErrorMessage('')

    try {
      // Ensure URL has protocol
      const testUrl = url.startsWith('http') ? url : `https://${url}`
      
      // Test connection by fetching available models directly
      const response = await fetch(`${testUrl}/api/tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error + (data.details ? `\n${data.details}` : ''))
      }
      
      if (data.models && data.models.length > 0) {
        setTestResult('success')
        setTimeout(() => {
          onConnect(testUrl)
        }, 500)
      } else {
        setTestResult('error')
        setErrorMessage('No models found on this Ollama instance')
      }
    } catch (error) {
      setTestResult('error')
      const errorMsg = error instanceof Error ? error.message : 'Failed to connect'
      setErrorMessage(errorMsg)
      console.error('Connection test failed:', error)
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
              <Server className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2 text-slate-800 dark:text-white">
            O'Sheep
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-8">
            Connect to your Ollama instance via Tailscale
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Ollama URL
              </label>
              <input
                id="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && testConnection()}
                placeholder="https://your-server.tail0212b6.ts.net"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>

            {testResult && (
              <div
                className={`flex items-start gap-2 p-3 rounded-lg ${
                  testResult === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                }`}
              >
                {testResult === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                )}
                <div className="text-sm">
                  {testResult === 'success' ? (
                    'Connection successful! Redirecting...'
                  ) : (
                    <>
                      <div className="font-medium">Connection failed</div>
                      {errorMessage && <div className="mt-1">{errorMessage}</div>}
                    </>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={testConnection}
              disabled={testing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {testing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Testing Connection...
                </>
              ) : (
                'Connect'
              )}
            </button>
          </div>

          <div className="mt-6 text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p>💡 Your Ollama URL should be accessible via Tailscale Funnel</p>
            <p>Example: https://your-machine.your-tailnet.ts.net</p>
          </div>
        </div>
      </div>
    </div>
  )
}
