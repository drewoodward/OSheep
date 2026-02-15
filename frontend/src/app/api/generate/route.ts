import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const ollamaUrl = request.headers.get('x-ollama-url')
  
  if (!ollamaUrl) {
    return NextResponse.json(
      { error: 'Missing x-ollama-url header' },
      { status: 400 }
    )
  }

  try {
    const body = await request.json()
    
    const response = await fetch(`${ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate response' },
      { status: 500 }
    )
  }
}
