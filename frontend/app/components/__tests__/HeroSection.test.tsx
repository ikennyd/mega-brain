import { render, screen, waitFor } from '@testing-library/react'
import { HeroSection } from '../HeroSection'

// Mock useApi hook
jest.mock('@hooks/useApi', () => ({
  useApi: jest.fn(() => ({
    data: {
      data: {
        vendorTotal: 50000,
        todaySales: 5000,
        monthSales: 80000,
        growthPercent: 15,
        currencySymbol: 'R$',
      },
    },
    isLoading: false,
  })),
}))

describe('HeroSection Component', () => {
  it('renders main metrics cards', async () => {
    render(<HeroSection />)
    await waitFor(() => {
      expect(screen.getByText('Vendas Hoje')).toBeInTheDocument()
      expect(screen.getByText('Total Mês')).toBeInTheDocument()
      expect(screen.getByText('Crescimento')).toBeInTheDocument()
    })
  })

  it('displays vendor total section', async () => {
    render(<HeroSection />)
    await waitFor(() => {
      expect(screen.getByText('Total Acumulado')).toBeInTheDocument()
    })
  })

  it('shows loading state', () => {
    const useApiMock = require('@hooks/useApi').useApi
    useApiMock.mockReturnValueOnce({
      data: null,
      isLoading: true,
    })

    const { container } = render(<HeroSection />)
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0)
  })

  it('renders sync status indicator', async () => {
    render(<HeroSection />)
    await waitFor(() => {
      expect(screen.getByText('Sincronizando...')).toBeInTheDocument()
    })
  })

  it('formats currency values correctly', async () => {
    render(<HeroSection />)
    await waitFor(() => {
      expect(screen.getByText(/R\$.*50\.000/)).toBeInTheDocument()
    })
  })
})
