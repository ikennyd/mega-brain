import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    services: {
      frontend: 'running',
      api: 'running',
      database: 'connected',
    },
  });
}
