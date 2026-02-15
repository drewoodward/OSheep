import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const ollamaUrl = request.headers.get('x-ollama-url')
  
  console.log('[API /api/generate] Received request with URL:', ollamaUrl)
  
  if (!ollamaUrl) {
    return NextResponse.json(
      { error: 'Missing x-ollama-url header' },
      { status: 400 }
    )
  }

  try {
    const body = await request.json()
    console.log('[API /api/generate] Request body:', { model: body.model, promptLength: body.prompt?.length })
    
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 60000) // 60 second timeout for generation
    
    const response = await fetch(`${ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    
    clearTimeout(timeout)
    
    console.log('[API /api/generate] Response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[API /api/generate] Error response:', errorText)
      return NextResponse.json(
        { error: `Ollama returned ${response.status}: ${errorText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('[API /api/generate] Success')
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('[API /api/generate] Fetch error:', error)
    
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout - Generation took too long' },
        { status: 504 }
      )
    }
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to generate response',
        details: 'Cannot reach Ollama server. Check if Tailscale Funnel is running and accessible.'
      },
      { status: 500 }
    )
  }
}
