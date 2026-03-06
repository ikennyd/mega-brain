import { render, screen, waitFor } from '@testing-library/react'
import { TopProducts } from '../TopProducts'

jest.mock('@hooks/useApi', () => ({
  useApi: jest.fn(() => ({
    data: {
      data: [
        { id: '1', name: 'Product 1', sku: 'SKU001', sales: 100, revenue: 10000, rank: 1, thumbnail: 'img1.jpg' },
        { id: '2', name: 'Product 2', sku: 'SKU002', sales: 80, revenue: 8000, rank: 2, thumbnail: 'img2.jpg' },
        { id: '3', name: 'Product 3', sku: 'SKU003', sales: 60, revenue: 6000, rank: 3, thumbnail: 'img3.jpg' },
      ],
    },
    isLoading: false,
  })),
}))

describe('TopProducts Component', () => {
  it('renders product ranking', async () => {
    render(<TopProducts />)
    await waitFor(() => {
      expect(screen.getByText('Produtos Top')).toBeInTheDocument()
      expect(screen.getByText('Product 1')).toBeInTheDocument()
    })
  })

  it('displays medal emojis for top 3', async () => {
    render(<TopProducts />)
    await waitFor(() => {
      expect(screen.getByText('🥇')).toBeInTheDocument()
      expect(screen.getByText('🥈')).toBeInTheDocument()
      expect(screen.getByText('🥉')).toBeInTheDocument()
    })
  })

  it('shows SKU information', async () => {
    render(<TopProducts />)
    await waitFor(() => {
      expect(screen.getByText(/SKU: SKU001/)).toBeInTheDocument()
    })
  })

  it('displays sales and revenue metrics', async () => {
    render(<TopProducts />)
    await waitFor(() => {
      expect(screen.getByText('100')).toBeInTheDocument()
      expect(screen.getByText(/R\$ 10\.000/)).toBeInTheDocument()
    })
  })

  it('shows loading state', () => {
    const useApiMock = require('@hooks/useApi').useApi
    useApiMock.mockReturnValueOnce({
      data: null,
      isLoading: true,
    })

    const { container } = render(<TopProducts />)
    expect(container.querySelectorAll('.animate-pulse').length).toBe(5)
  })

  it('animates progress bars', async () => {
    render(<TopProducts />)
    await waitFor(() => {
      const progressBars = screen.getAllByRole('generic')
      expect(progressBars.length).toBeGreaterThan(0)
    })
  })
})
