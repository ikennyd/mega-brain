import { render, screen, waitFor } from '@testing-library/react'
import { TarifasGrid } from '../TarifasGrid'

jest.mock('@hooks/useApi', () => ({
  useApi: jest.fn(() => ({
    data: {
      data: [
        {
          id: '1',
          name: 'Mercado Livre',
          logo: 'ml.png',
          sales: 100,
          revenue: 50000,
          commission: 5000,
          commissionPercent: 10,
          status: 'active' as const,
          lastSync: new Date(),
        },
        {
          id: '2',
          name: 'OLX',
          logo: 'olx.png',
          sales: 80,
          revenue: 40000,
          commission: 3200,
          commissionPercent: 8,
          status: 'syncing' as const,
          lastSync: new Date(),
        },
      ],
    },
    isLoading: false,
  })),
}))

describe('TarifasGrid Component', () => {
  it('renders marketplace grid', async () => {
    render(<TarifasGrid />)
    await waitFor(() => {
      expect(screen.getByText('Marketplaces')).toBeInTheDocument()
      expect(screen.getByText('Mercado Livre')).toBeInTheDocument()
    })
  })

  it('displays all marketplace cards', async () => {
    render(<TarifasGrid />)
    await waitFor(() => {
      expect(screen.getByText('OLX')).toBeInTheDocument()
    })
  })

  it('shows commission percentages', async () => {
    render(<TarifasGrid />)
    await waitFor(() => {
      expect(screen.getByText('10%')).toBeInTheDocument()
      expect(screen.getByText('8%')).toBeInTheDocument()
    })
  })

  it('displays sync status indicators', async () => {
    render(<TarifasGrid />)
    await waitFor(() => {
      const statusElements = screen.getAllByRole('generic')
      expect(statusElements.length).toBeGreaterThan(0)
    })
  })

  it('formats currency values', async () => {
    render(<TarifasGrid />)
    await waitFor(() => {
      expect(screen.getByText(/R\$ [\d,]+/)).toBeInTheDocument()
    })
  })

  it('shows loading state', () => {
    const useApiMock = require('@hooks/useApi').useApi
    useApiMock.mockReturnValueOnce({
      data: null,
      isLoading: true,
    })

    const { container } = render(<TarifasGrid />)
    expect(container.querySelectorAll('.animate-pulse').length).toBe(4)
  })
})
