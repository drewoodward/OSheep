import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const ollamaUrl = request.headers.get('x-ollama-url')
  
  console.log('[API /api/tags] Received request with URL:', ollamaUrl)
  
  if (!ollamaUrl) {
    return NextResponse.json(
      { error: 'Missing x-ollama-url header' },
      { status: 400 }
    )
  }

  try {
    console.log('[API /api/tags] Fetching from:', `${ollamaUrl}/api/tags`)
    
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000) // 30 second timeout
    
    const response = await fetch(`${ollamaUrl}/api/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    })
    
    clearTimeout(timeout)
    
    console.log('[API /api/tags] Response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[API /api/tags] Error response:', errorText)
      return NextResponse.json(
        { error: `Ollama returned ${response.status}: ${errorText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('[API /api/tags] Success, models count:', data.models?.length || 0)
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('[API /api/tags] Fetch error:', error)
    
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout - Ollama server took too long to respond' },
        { status: 504 }
      )
    }
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch models',
        details: 'Cannot reach Ollama server. Check if Tailscale Funnel is running and accessible.'
      },
      { status: 500 }
    )
  }
}
