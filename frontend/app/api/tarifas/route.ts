import { NextRequest, NextResponse } from 'next/server';

// Marketplace tariffs data
const tarifas = [
  {
    id: 1,
    name: 'MercadoLivre',
    comissao: 16.5,
    frete: 'variável',
    minimo: 0.5,
    currency: 'BRL',
    updated: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Shopee',
    comissao: 8.0,
    frete: 'buyer',
    minimo: 0.3,
    currency: 'BRL',
    updated: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Amazon',
    comissao: 15.0,
    frete: 'FBA',
    minimo: 0.5,
    currency: 'BRL',
    updated: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Magalu',
    comissao: 10.0,
    frete: 'variável',
    minimo: 0.3,
    currency: 'BRL',
    updated: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest) {
  return NextResponse.json({
    tarifas,
    total: tarifas.length,
    lastUpdate: new Date().toISOString(),
  });
}
