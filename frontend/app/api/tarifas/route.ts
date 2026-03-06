import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    tarifas: [
      {
        id: 1,
        name: 'Básico',
        price: 299,
        description: 'Plano básico',
      },
      {
        id: 2,
        name: 'Professional',
        price: 899,
        description: 'Plano profissional',
      },
      {
        id: 3,
        name: 'Enterprise',
        price: 2999,
        description: 'Plano enterprise',
      },
    ],
  });
}
