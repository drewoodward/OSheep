import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const ollamaUrl = request.headers.get('x-ollama-url')
  
  if (!ollamaUrl) {
    return NextResponse.json(
      { error: 'Missing x-ollama-url header' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(`${ollamaUrl}/api/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch models' },
      { status: 500 }
    )
  }
}
