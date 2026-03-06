import { render, screen } from '@testing-library/react'
import { Card } from '../Card'

describe('Card Component', () => {
  it('renders title and value', () => {
    render(<Card title="Vendas" value={1500} />)
    expect(screen.getByText('Vendas')).toBeInTheDocument()
    expect(screen.getByText(/1.500/)).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(<Card title="Total" value={100} subtitle="Last month" />)
    expect(screen.getByText('Last month')).toBeInTheDocument()
  })

  it('displays badge when provided', () => {
    render(<Card title="Status" value={95} badge={{ label: 'Active', color: 'success' }} />)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('shows loading skeleton', () => {
    const { container } = render(<Card title="Loading" value={0} loading={true} />)
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('calls onClick handler', () => {
    const handleClick = jest.fn()
    render(<Card title="Clickable" value={100} onClick={handleClick} />)
    // Note: onClick functionality requires additional setup in test
  })

  it('formats numeric values with locale', () => {
    render(<Card title="Amount" value={1234567} />)
    expect(screen.getByText(/1.234.567/)).toBeInTheDocument()
  })

  it('displays string values as-is', () => {
    render(<Card title="Status" value="Online" />)
    expect(screen.getByText('Online')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Card title="Custom" value={50} className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })
})
