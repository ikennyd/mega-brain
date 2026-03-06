import { NextRequest, NextResponse } from 'next/server'

// WebSocket endpoint para updates em tempo real
// Nota: WebSocket puro em Next.js Serverless tem limitações
// Considere usar Socket.io com servidor Node.js separado ou Supabase Realtime

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message: 'Sales WebSocket endpoint',
      status: 'available',
      note: 'WebSocket connections should be handled via Socket.io server',
      endpoint: '/api/ws/sales',
    },
    { status: 200 }
  )
}
