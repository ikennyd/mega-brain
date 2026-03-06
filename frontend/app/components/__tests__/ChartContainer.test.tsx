import { render, screen, waitFor } from '@testing-library/react'
import { ChartContainer } from '../ChartContainer'

jest.mock('@hooks/useApi', () => ({
  useApi: jest.fn(() => ({
    data: {
      data: [
        { hour: '08:00', sales: 1000, orders: 10, timestamp: new Date() },
        { hour: '09:00', sales: 2000, orders: 20, timestamp: new Date() },
        { hour: '10:00', sales: 1500, orders: 15, timestamp: new Date() },
      ],
    },
    isLoading: false,
  })),
}))

jest.mock('recharts', () => ({
  ...jest.requireActual('recharts'),
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  LineChart: ({ data }) => <div data-testid="line-chart">{data && data.length} items</div>,
  BarChart: ({ data }) => <div data-testid="bar-chart">{data && data.length} items</div>,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />,
  Legend: () => <div />,
  Line: () => <div />,
  Bar: () => <div />,
}))

describe('ChartContainer Component', () => {
  it('renders with default line chart', async () => {
    render(<ChartContainer />)
    await waitFor(() => {
      expect(screen.getByText('Vendas por Hora')).toBeInTheDocument()
      expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    })
  })

  it('renders with custom title', async () => {
    render(<ChartContainer title="Custom Title" />)
    await waitFor(() => {
      expect(screen.getByText('Custom Title')).toBeInTheDocument()
    })
  })

  it('switches to bar chart type', async () => {
    render(<ChartContainer type="bar" />)
    await waitFor(() => {
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
    })
  })

  it('shows loading state', () => {
    const useApiMock = require('@hooks/useApi').useApi
    useApiMock.mockReturnValueOnce({
      data: null,
      isLoading: true,
    })

    const { container } = render(<ChartContainer />)
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('displays empty state when no data', async () => {
    const useApiMock = require('@hooks/useApi').useApi
    useApiMock.mockReturnValueOnce({
      data: { data: [] },
      isLoading: false,
    })

    render(<ChartContainer />)
    await waitFor(() => {
      expect(screen.getByText('Nenhum dado disponível')).toBeInTheDocument()
    })
  })
})
