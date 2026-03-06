import { NextRequest, NextResponse } from 'next/server';

// Mock sales data - será substituído por Firebase/Supabase depois
const mockSales = [
  { id: 1, product: 'Samsung Galaxy S23', category: 'Eletrônicos', grossTotal: 3499, netRevenue: 2674, margin: 23.5, status: 'completed', timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: 2, product: 'Kit Casa e Jardim', category: 'Casa', grossTotal: 289, netRevenue: 231, margin: 20.0, status: 'completed', timestamp: new Date(Date.now() - 2700000).toISOString() },
  { id: 3, product: 'Fone Bluetooth Sony', category: 'Áudio', grossTotal: 549, netRevenue: 439, margin: 19.9, status: 'completed', timestamp: new Date(Date.now() - 1800000).toISOString() },
  { id: 4, product: 'Jaqueta de Couro Premium', category: 'Vestuário', grossTotal: 899, netRevenue: 719, margin: 19.9, status: 'completed', timestamp: new Date(Date.now() - 900000).toISOString() },
  { id: 5, product: 'Relógio Digital Casio', category: 'Acessórios', grossTotal: 299, netRevenue: 239, margin: 20.0, status: 'completed', timestamp: new Date(Date.now() - 600000).toISOString() },
  { id: 6, product: 'iPhone 14 Pro Max', category: 'Smartphones', grossTotal: 8499, netRevenue: 6799, margin: 19.9, status: 'completed', timestamp: new Date(Date.now() - 300000).toISOString() },
];

export async function GET(request: NextRequest) {
  const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20');
  const offset = parseInt(request.nextUrl.searchParams.get('offset') || '0');

  const data = mockSales.slice(offset, offset + limit);
  const total = mockSales.reduce((sum, sale) => sum + sale.grossTotal, 0);

  return NextResponse.json({
    data,
    total: mockSales.length,
    totalRevenue: total,
    limit,
    offset,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newSale = {
      id: mockSales.length + 1,
      ...body,
      timestamp: new Date().toISOString(),
    };
    mockSales.push(newSale);

    return NextResponse.json({
      success: true,
      message: 'Sales data received',
      data: newSale,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
